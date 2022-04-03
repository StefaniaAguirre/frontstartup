import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { InputLabel } from '@mui/material';
import axios from "axios";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import '../styles/registroApp.css';
import { useHistory } from "react-router-dom";
import MensajeEmergente from "./MensajeEmergente";

const RegistroApp = ({ }) => {

    // const [usuarioCreado, addUsuario] = 
    let history = useHistory();
    const [nombre, setNombre] = useState('');
    const [error, setError] = useState({})
    const [idMensaje, setIdMensaje] = useState('');
    const onChangeNombre = (e) => {
        setNombre(e.target.value);
        const isError = e.target.value.length > 45
        updateError(isError, "No se admiten más digitos para el nombre", e.target.name);
    }
    const [edad, setEdad] = useState('');
    const onChangeEdad = (e) => {
        setEdad(e.target.value);
        const isError = e.target.value.length > 2
        updateError(isError, "No se admiten más de dos digitos para la edad", e.target.name);
    }
    const [telefono, setTelefono] = useState('');
    const onChangeTelefono = (e) => {
        setTelefono(e.target.value);
        const isError = e.target.value.length > 10
        updateError(isError, "No se admiten más de 10 digitos para el telefono", e.target.name);
    }
    const [direccion, setDireccion] = useState('');
    const onChangeDireccion = (e) => {
        setDireccion(e.target.value);
        const isError = e.target.value.length > 50
        updateError(isError, "No se admiten más digitos para la dirección", e.target.name);
    }
    const [correo, setCorreo] = useState('');
    const onChangeCorreo = (e) => {
        setCorreo(e.target.value);
        const email = (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(e.target.value)
        const isError = !email
        updateError(isError, "Formato incorrecto para el correo", e.target.name);
    }
    const [contrasena, setContrasena] = useState('');
    const onChangeContrasena = (e) => {
        setContrasena(e.target.value);
        const isError = e.target.value.length > 10
        updateError(isError, "No se admiten más digitos para la dirección", e.target.name);
    }


const [rol, setRol] = useState('');
const handleChangeRol = (event) => {
    setRol(event.target.value);
};

const updateError = (validacion, mensaje, name) => {
    if (validacion) {
        setError({
            ...error,
            [name]: mensaje
        })
    } else {
        setError({
            ...error,
            [name]: ""
        })
    }
}

const Registrase = async () => {

    const keys = Object.keys(error);

    for (const iterator of keys) {
        if (error[iterator].length) {
            setIdMensaje("Verifique el formulario, existen campos invalidos");
            return "";
        }
    }


    let rolUsuario;
    if (nombre != '' && edad != '' && telefono != '' && direccion != '' && correo != '' && contrasena != '') {

        const Usuario = {
            nombre,
            edad,
            telefono,
            direccion,
            correo,
            contrasena,
        }

        console.log(Usuario);
        if (rol == false) {
            rolUsuario = `http://localhost:8080/api/hacedor`;
        } else {
            rolUsuario = 'http://localhost:8080/api/cliente';
        }
        console.log(rolUsuario);
        createUsuario(Usuario, rolUsuario)
    } else {
        // mensaje =
    }
}


const createUsuario = async (usuario, path) => {
    await axios.post(path, usuario)
        .then(
            (response) => {
                if (response.data != null) {
                    console.log(response.data);
                    history.push("./login/");
                } else {
                    console.log(response.data)
                    // error al ingreso de los datos 
                }
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        )
}


useEffect(() => {

}, [])

return (
    <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
            <Box sx={{ minWidth: 200, maxWidth: 600 }} >
                <div className="header">
                    <h1 className="inicio">
                        <a href="./login">
                            Iniciar Sesion
                        </a>
                    </h1>
                    <h1 className="inicio">
                        Registro
                    </h1>
                </div>
                <FormControl className="formulario" >
                    <div className="formulario">
                        <InputLabel id="demo-simple-select-label">Seleciona tu rol</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={rol}
                            label="Seleciona tu rol"
                            onChange={handleChangeRol}
                            required
                        >
                            <MenuItem value={true}>Cliente</MenuItem>
                            <MenuItem value={false}>Hacedor</MenuItem>

                        </Select>
                        <TextField onChange={onChangeNombre} value={nombre} name="nombre" id="nombre" label="Nombre" variant="outlined" type="" required />
                        {
                            error.nombre
                            &&
                            <p> {error.nombre}</p>
                        }
                        <TextField onChange={onChangeEdad} value={edad} name="edad" id="edad" label="edad" variant="outlined" required />
                        {
                            error.edad
                            &&
                            <p> {error.edad}</p>
                        }

                        <TextField onChange={onChangeTelefono} value={telefono} name="telefono" id="telefono" label="telefono" variant="outlined" required />
                        {
                            error.telefono
                            &&
                            <p> {error.telefono}</p>
                        }
                        <TextField onChange={onChangeDireccion} value={direccion} name="direccion" id="direccion" label="direccion" variant="outlined" required />
                        {
                            error.direccion
                            &&
                            <p> {error.direccion}</p>
                        }
                        <TextField onChange={onChangeCorreo} value={correo} type="email" name="correo" id="correo" label="correo" variant="outlined" required />
                        {
                            error.correo
                            &&
                            <p> {error.correo}</p>
                        }
                        <TextField type={"password"} onChange={onChangeContrasena} name="contrasena" value={contrasena} id="contrasena" label="contrasena" variant="outlined" required />
                        {
                            error.contrasena
                            &&
                            <p> {error.contrasena}</p>
                        }
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" onClick={Registrase}> Registrarse</Button>
                        </Stack>
                        <MensajeEmergente mensaje={idMensaje} setMensaje={setIdMensaje} titulo ={"Atención!"} ></MensajeEmergente>

                    </div>


                </FormControl>

            </Box>
        </Container>
    </React.Fragment>)
}

export default RegistroApp;