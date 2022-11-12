import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js";

function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value;
            console.log(value);
            const name = evento.target.name
            setValues({
                ...value,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}

const PROJECT_URL = "https://gqddwscmnnrfcfebcxiv.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxZGR3c2Ntbm5yZmNmZWJjeGl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMDgwNjIsImV4cCI6MTk4Mzc4NDA2Mn0.h1WdEdbqVNP_CEZfn1SazAYJqcGoy9gjlkyZHcRQSDE";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

//obtem miniatura do youtube a partir do url do video
function  getThumbnail ( url )  {
    return  `https://img.youtube.com/vi/ ${ url . split ( "v=" ) [ 1 ] } /hqdefault.jpg` ;
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: {titulo: "frost punk", url:"https://youtube.."}
    });
    const [formVisivel, setFormVisivel] = React.useState(false);


    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
               + 
            </button>
            {formVisivel
                ?(
                    <form onSubmit={(evento) => {
                        evento.preventDefault();

                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: "jogos",
                         })
                         .then((oqueveio) => {
                            console.log(oqueveio);
                         })
                         .catch((err) => {
                            console.log(err);
                         })


                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                            x
                        </button>
                        <input 
                            placeholder="Titulo do video" 
                            name="titulo"
                            value={formCadastro.values.titulo}
                            onChange={formCadastro.handleChange} 
                        />
                        <input 
                            placeholder="URL" 
                            name="url"
                            value={formCadastro.values.url}
                            onChange={formCadastro.handleChange} 
                        />
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
                )
                :false
            }
            

        </StyledRegisterVideo>
    )

}