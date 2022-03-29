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

const RegistroApp = ({ }) => {

    // const [usuarioCreado, addUsuario] = 
    let history = useHistory();
    const [nombre, setNombre] = useState('');
    const onChangeNombre = (e) => {
        setNombre(e.target.value);
    }
    const [edad, setEdad] = useState('');
    const onChangeEdad = (e) => {
        setEdad(e.target.value);
    }
    const [telefono, setTelefono] = useState('');
    const onChangeTelefono = (e) => {
        setTelefono(e.target.value);
    }
    const [direccion, setDireccion] = useState('');
    const onChangeDireccion = (e) => {
        setDireccion(e.target.value);
    }
    const [correo, setCorreo] = useState('');
    const onChangeCorreo = (e) => {
        setCorreo(e.target.value);
    }
    const [contrasena, setContrasena] = useState('');
    const onChangeContrasena = (e) => {
        setContrasena(e.target.value);
    }

    const [rol, setRol] = useState('');
    const handleChangeRol = (event) => {
        setRol(event.target.value);
    };


    
    const Registrase = async () => {
        let rolUsuario;
        if( nombre != '' && edad != '' && telefono != '' && direccion != '' && correo != '' && contrasena != '' ){
            
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
                <h2>
                    Registro de Usuarios
                </h2>
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
                            <TextField onChange={onChangeNombre} value={nombre} id="nombre" label="Nombre" variant="outlined" type="" required />
                            <TextField onChange={onChangeEdad} value={edad} id="edad" label="edad" variant="outlined" required />
                            <TextField onChange={onChangeTelefono} value={telefono} id="telefono" label="telefono" variant="outlined" required />
                            <TextField onChange={onChangeDireccion} value={direccion} id="direccion" label="direccion" variant="outlined" required />
                            <TextField onChange={onChangeCorreo} value={correo} id="correo" label="correo" variant="outlined" required />
                            <TextField type={"password"} onChange={onChangeContrasena} value={contrasena} id="contrasena" label="contrasena" variant="outlined" required />
                            <Stack spacing={2} direction="row">
                                <Button variant="contained" onClick={Registrase}> Registrarse</Button>
                            </Stack>

                        </div>


                    </FormControl>

                </Box>
            </Container>
        </React.Fragment>

    )
}

export default RegistroApp;