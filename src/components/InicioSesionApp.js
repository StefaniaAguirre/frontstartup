import { useEffect, useState } from "react";


const InicioSesionApp = ({ user }) => {

    const [userName, setUserName] = useState('nia');

    const [formValues, setformValue] = useState({
        correo: 'lorena@gmail.com',
        contrasena: '123456789'
    });
    const handleLogin = () => { }

    const handleChange = (e) => {
        // console.log(e.target.name,e.target.value );
        setformValue({
            //Copiar el formulario actual para tomar solo el cambio que realicen
            ...formValues, 
            [e.target.name]: e.target.value,
        }
        )
    }

    const iniciarSesion = () => { 
       console.log(formValues); 
    }

    const consulta = () => {
        // console.log(formValues)
    }
    //cuando se renderice todo el componente se ejecuta este metodo
    useEffect(() => {
        consulta();
    }, [userName])

    return (
        <div>
            <h1 onClick={() => setUserName('aguirre' + userName)}> Pagina de Inicio {user} {userName}</h1>
            <form onSubmit={handleLogin}>
                <a> Inicio </a>
                <a> Registo</a>
                <div class="form-control mb-3">
                    <div class="form-group mb-3">
                        <label >Correo</label>
                        <input name="correo" type="text" onChange={handleChange} value={formValues.correo} class="form-control" placeholder="correo" />
                    </div>
                    <div class="form-group mb-3">
                        <label >Contraseña</label>
                        <input type="password" name="contrasena" onChange={handleChange} value={formValues.contrasena} id="" class="form-control" />
                    </div>
                    <div class="mb-3 row">
                        <input type="submit" value="iniciarSesion" class="btn btn-info btn-block btn-succes"
                            onClick={iniciarSesion} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default InicioSesionApp;