import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { InputLabel } from "@mui/material";
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Paper from '@mui/material/Paper';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const PerfilClienteApp = ({ }) => {

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let contador = 0;

    const [ hacedores, getHacedores] = useState([]);

    const { idCliente } = useParams();
    const [ cliente, getUsuario] = useState([])
    const [ tareasServicio, getTareasServicio] = useState([]);
    const [ serviciosCliente, getServiciosCliente] = useState([]);
    const [ hacedoresCondiciones ] = useState([]);
    const setHacedoresCondiciones = (dato) => {
        hacedoresCondiciones.push(dato);
    }
    let precioBase;

    const [item, setItem] = useState('');
    const onChangeItem = (e) => {
        setItem(e.target.value);
    }
    const [tarea, setTarea] = useState('');
    const handleChangeTarea = (event) => {
        setTarea(event.target.value);
    };

    const [descripcion, setdescripcion] = useState('');
    const onChangeDescripcion = (e) => {
        setdescripcion(e.target.value);
    }

    const [precio, setPrecio] = useState('');
    const onChangePrecio = (e) => {
        setPrecio(e.target.value);
    }

    const getCliente = async (idCliente) => {
        await axios.get(`http://localhost:8080/api/cliente/${idCliente}`)
            .then(
                (response) => {
                    console.log(response.data);
                    getUsuario(response.data)
                    if (response.data == null) {
                        console.log("Hacedor no encontrado");
                    } else {
                    }
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            )
    }

    //Obtener los servicios solicitador por el cliente
    const getServicios = async (idCliente) => {
        await axios.get(`http://localhost:8080/api/cliente/serviciosCliente/${idCliente}`)
            .then(
                (response) => {
                    console.log(response.data);
                    getServiciosCliente(response.data)
                    if (response.data == null) {
                        console.log("Hacedor no encontrado");
                    } else {
                    }
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            )
    }

    //Obtener las tareas para solcitar servicios por el cliente
    const getTareas = async () => {
        await axios.get(`http://localhost:8080/api/tarea/listarTareas`)
            .then(
                (response) => {
                    getTareasServicio(response.data);
                    if (response.data == null) {
                        console.log("habilidades no encontradas");
                    } else {
                    }
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            )
    }

    //Obtener hacedores
    const obtenerHacedores = async (idTarea) => {
        await axios.get(`http://localhost:8080/api/hacedor/listarHacedores`)
            .then(
                (response) => {
                    getHacedores(response.data);
                    if (response.data != null) {
                        response.data.forEach(element => {
                            verificarHacedores(element.idHacedor, idTarea.idTarea);
                        });
                    } else {

                    }
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            )
        console.log("contador", contador);
    }

    //Crear el servicio 
    const createServicio = async (servicio) => {
        await axios.post(`http://localhost:8080/api/servicio`, servicio)
            .then(
                (response) => {
                    console.log(response.data);
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            )
    }

    //Crear el servicio 
    const crearOferta = async (oferta) => {
        await axios.post(`http://localhost:8080/api/oferta`, oferta)
            .then(
                (response) => {
                    console.log(response.data);
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            )
    }

    //Obtener hacedores que cumplen con las condiciones
    const verificarHacedores = async (idHacedor, idTarea) => {
        await axios.get(`http://localhost:8080/api/servicio/listarDetalleServicio/${idHacedor}&&${idTarea}`)
            .then(
                (response) => {
                    if (response.data != null && response.data != '') {
                        contador += 1;
                        setHacedoresCondiciones(response.data)
                        precioBase += response.data.precioBase;
                    }
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            )
    }

    const crear = () => {

        const tareaUno = tareasServicio.find( result => result.idTarea === tarea );
        const servicio = {
            item: parseInt(item),
            descripcion,
            pagoRealizado: 0,
            tareaTerminada: 0,
            idCliente: cliente,
            idTarea: tareaUno,
            precioServicio: parseInt(precio),
        };

        // crear el servicio
        createServicio(servicio);

        // traer hacedores
        obtenerHacedores(tareaUno);

        console.log(contador > 0, contador, hacedoresCondiciones)
        if (contador > 0) {
            //Crear la oferta para mostrar a los hacedores
            const oferta = {
                notificacion,
                fecha: new Date(),
                tiempoVida: 24,
                esAceptada: false,
                precioBase:parseInt(precio)
            }
            crearOferta(oferta);

        } else {
            //Notificación al cliente que no exiten hacedores con las condiciones para cumplir con el servicio
        }

    }

    useEffect(() => {
        getCliente(idCliente);
        getTareas();
        getServicios(idCliente);
    }, [])

    return (
        <Box sx={{ width: '100%' }}>
            <h2>Detalles Cliente</h2>

            <InputLabel>Nombre: {cliente.nombre}</InputLabel>
            <InputLabel>Telefono: {cliente.telefono}</InputLabel>
            <InputLabel>Edad: {cliente.edad}</InputLabel>
            <InputLabel>Dirección: {cliente.direccion}</InputLabel>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Servicios terminados" {...a11yProps(0)} />
                    <Tab label="Solicitar Servicios" {...a11yProps(1)} />
                    <Tab label="Ofertas Creadas" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                Se listan los servicios que fueron ofertados y verificando que existen hacedores que cumplen con las condiciones

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Nombre Tarea</TableCell>
                                <TableCell align="left">Descripcion</TableCell>
                                <TableCell align="left">Precio Servicio</TableCell>
                                <TableCell align="left">Pago </TableCell>
                                <TableCell align="left">Tarea </TableCell>
                                <TableCell align="left">Oferta </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {serviciosCliente.map((detalle) => (
                                <TableRow
                                    key={detalle.nombreTarea}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{detalle.nombreTarea}</TableCell>
                                    <TableCell align="left">{detalle.descripcion}</TableCell>
                                    <TableCell align="left">{detalle.precioServicio}</TableCell>
                                    <TableCell align="left">{detalle.pagoRealizado ? 'Realizado' : 'Sin pagar'}</TableCell>
                                    <TableCell align="left">{detalle.tareaTerminada ? 'Completada' : 'Sin terminar'}</TableCell>
                                    <TableCell align="left">{detalle.esAceptada ? 'Aceptada ' : 'S'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>

            <TabPanel value={value} index={1}>

                <React.Fragment>
                    <CssBaseline />
                    <Container maxWidth="sm">
                        <Box sx={{ minWidth: 200, maxWidth: 600 }} >
                            <FormControl className="formulario" >
                                Lista de servicios que se pueden Solicitar
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tarea}
                                    label="Seleciona la tarea"
                                    onChange={handleChangeTarea}
                                    required
                                >
                                    {tareasServicio.map(tarea => (
                                        <MenuItem
                                            key={tarea.idTarea}
                                            value={tarea.idTarea}>{tarea.nombre}</MenuItem>
                                    ))}
                                </Select>

                                <TextField onChange={onChangeItem} value={item} id="item" label="Cantidad " variant="outlined" required />
                                <TextField onChange={onChangeDescripcion} value={descripcion} id="descripcion" label="Descripcion" variant="outlined" required />
                                <TextField onChange={onChangePrecio} value={precio} id="precio" label="Precio" variant="outlined" required />
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" onClick={crear}> Crear </Button>
                                </Stack>
                            </FormControl>
                        </Box>
                    </Container>
                </React.Fragment>

            </TabPanel>

            <TabPanel value={value} index={2}>
                Ofertas de Servicios
            </TabPanel>
        </Box>
    )
}

export default PerfilClienteApp;