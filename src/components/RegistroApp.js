import { useEffect, useState } from "react";


const RegistroApp = ({ user }) => {

    const [userName, setUserName] = useState('nia');

    const [formValues, setformValue] = useState({
        nombre:'',
        edad:'',
        telefono:'',
        direccion:'',
        correo: 'name@gmail.com',
        contrasena: ''
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
            <h1> Pagina de Inicio {user} </h1>
            <form onSubmit={handleLogin}>
                <a> Inicio </a>
                <a> Registro </a>
                <div class="form-control mb-3">
                    <div class="form-group mb-3">
                        <label >Nombre</label>
                        <input name="nombre" type="text" onChange={handleChange} value={formValues.nombre} class="form-control" placeholder="nombre" />
                    </div>
                    <div class="form-group mb-3">
                        <label >Edad</label>
                        <input name="edad" type="text" onChange={handleChange} value={formValues.edad} class="form-control" placeholder="edad" />
                    </div>
                    <div class="form-group mb-3">
                        <label >Telefono</label>
                        <input name="telefono" type="text" onChange={handleChange} value={formValues.telefono} class="form-control" placeholder="telefono" />
                    </div>
                    <div class="form-group mb-3">
                        <label >Direccion</label>
                        <input name="direccion" type="text" onChange={handleChange} value={formValues.direccion} class="form-control" placeholder="direccion" />
                    </div>
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

export default RegistroApp;