import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import '../styles/InicioSesionApp.css'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { InputLabel } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
const InicioSesionApp = ({ }) => {

    // const [userName, setUserName] = useState('nia');
    const [correo, setCorreo] = React.useState('');
    const onChangeCorreo = (e) => {
        setCorreo(e.target.value);
    }
    const [contrasena, setContrasena] = React.useState('');
    const onChangeContrasena = (e) => {
        setContrasena(e.target.value);
    }

    const [rol, setRol] = React.useState('');
    const handleChangeRol = (event) => {
        setRol(event.target.value);
    };

    let history = useHistory();

    const handleLogin = () => { }
    const [usuarioLogueado, setUsuarioLogueado] = useState([]);

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
    }

    const getUsuarioHacedor = async (correo, contrasena) => {
        await axios.get(`http://localhost:8080/api/hacedor/loginHacedor/${correo}&&${contrasena}`)
            .then(
                (response) => {
                    console.log(response.data);
                    setUsuarioLogueado(response.data);
                    console.log(response.data.idHacedor == null || response.data.idHacedor == "");
                    if (response.data.idHacedor == null || response.data.idHacedor == "") {
                        //usuario no existe
                    } else {
                        history.push("./perfilHacedor/" + response.data.idHacedor);
                    }
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            )
    }

    const getUsuarioCliente = async (correo, contrasena) => {
        axios.get(`http://localhost:8080/api/cliente/loginCliente/${correo}&&${contrasena}`)
            .then(
                (response) => {
                    console.log((response.data.idCliente == null || response.data.idCliente == ""));
                    setUsuarioLogueado(response.data);
                    if (response.data.idCliente == null || response.data.idCliente == "") {
                        //mensaje emergente que los datos ingresados no coinciden con un usuario
                    } else {
                        history.push("./perfilCliente/" + response.data.idCliente);
                        console.log(response.data.idCliente, correo, contrasena)
                    }
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            )
    }

    const iniciarSesion = (e) => {
        //no se refresque la pagina
        console.log(correo, contrasena,);
        e.preventDefault();

        if (rol) {
            getUsuarioCliente(correo, contrasena);
        } else {
            getUsuarioHacedor(correo, contrasena);
        }
    }

    const consulta = () => {
        // console.log(formValues)
    }
    //cuando se renderice todo el componente se ejecuta este metodo
    useEffect(() => {
        consulta();
    }, [])

    return (
        <div>
            <div className="header">
                <h1 className="inicio">
                    Inicio Sesion
                </h1>
                <h1 className="inicio">
                    <a href="./registro">
                        Registro
                    </a>
                </h1>
            </div>
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: '#cfe8fc', minWidth: 200, maxWidth: 600 }} >
                    <FormControl className="formulario" onSubmit={handleChange}>
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

                        <TextField onChange={onChangeCorreo} value={correo} id="correo" label="correo" variant="outlined" required />
                        <TextField type={"password"} onChange={onChangeContrasena} value={contrasena} id="contrasena" label="contrasena" variant="outlined" required />
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" onClick={iniciarSesion}> Iniciar Sesion</Button>
                        </Stack>
                    </FormControl>
                </Box>
            </Container>
        </div>
    )
}

export default InicioSesionApp;