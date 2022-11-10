import React from "react";
import { StyledRegisterVideo } from "./styles";

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
                            value={values.titulo}
                            onChange={formCadastro.handleChange} 
                        />
                        <input 
                            placeholder="URL" 
                            name="url"
                            value={value.url}
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