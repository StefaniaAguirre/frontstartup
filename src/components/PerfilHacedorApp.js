import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { InputLabel } from "@mui/material";
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepPurple } from '@mui/material/colors';
import '../styles/perfilHacedorApp.css';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DetalleOferta from './DetalleOferta'

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

const PerfilHacedorApp = ({ }) => {

    // const [ofertas] = addOfertas = (e) => {
    //     ofertas.push(e)
    // }

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [precioH, setPrecioH] = useState('');
    const onChangePrecioH = (e) => {
        setPrecioH(e.target.value);
    }
    const [radio, setRadio] = useState('');
    const onChangeRadio = (e) => {
        setRadio(e.target.value);
    }

    const [tarea, setTarea] = useState('');
    const handleChangeTarea = (event) => {
        setTarea(event.target.value);
    };

    const { idHacedor } = useParams();
    // const [key, setKey] = useState('detalles');
    const [hacedor, getUsuarioHacedor] = useState({});
    const [detallesHacedor, getHabilidadesHacedor] = useState([]);
    const [tareas, getTareasHabilidad] = useState([]);

    //Obtener los detalles del hacedor
    const getHacedor = async (idHacedor) => {
        await axios.get(`http://localhost:8080/api/hacedor/${idHacedor}`)
            .then(
                (response) => {
                    getUsuarioHacedor(response.data)
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            )

    }

    //Obtener las habilidades registradas por el usuario
    const getHabilidades = async (idHacedor) => {
        await axios.get(`http://localhost:8080/api/hacedor/listarDetalle/${idHacedor}`)
            .then(
                (response) => {
                    getHabilidadesHacedor(response.data);
                    if (response.data == null) {
                        console.log("habilidades no encontradas");
                    } else {
                        console.log(response.data);
                    }
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            )
    }

    //Obtener las tareas como habilidades para el hacedor
    const getTareas = async () => {
        await axios.get(`http://localhost:8080/api/tarea/listarTareas`)
            .then(
                (response) => {
                    // getTareasHabilidad(response.data.map((item) => item.nombre));
                    getTareasHabilidad(response.data)
                    if (response.data == null) {
                        console.log("habilidades no encontradas");
                    } else {
                        console.log(response.data);
                    }
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            )

    }
    //Crear el servicio 
    const crearHabilidad = async (habilidadHacedor) => {
        await axios.post(`http://localhost:8080/api/habilidadHacedor`, habilidadHacedor)
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

    //ObtenerOferta Por id
    // const getOferta = async (idOferta) => {
    //     await axios.get(`http://localhost:8080/api/oferta/listarOfertaHacedor/${idOferta}`)
    //         .then(
    //             (response) => {
    //                 // agregar ofertas a la lista
    //                 addOfertas(response.data);
    //                 if (response.data == null) {
    //                     console.log("habilidades no encontradas");
    //                 } else {
    //                     console.log(response.data);
    //                 }
    //             }
    //         ).catch(
    //             (err) => {
    //                 console.log(err);
    //             }
    //         )

    // }

    const agregar = () => {
        const tareaUno = tareas.find(result => result.idTarea === tarea)
        const habilidadHacedor = {
            idHacedor: hacedor,
            idTarea: tareaUno,
            precioHabilidad: parseInt(precioH),
            radio,
        };
        crearHabilidad(habilidadHacedor);
    }

    const verDetalle = () =>{

    }


    useEffect(() => {
        getHacedor(idHacedor);
        getHabilidades(idHacedor);
        getTareas();

        // getOferta(hacedor.idOferta);

    }, [])


    return (
        <Box sx={{ width: '100%' }}>
            <div className="encabezado">
                <h2>Perfil Hacedor</h2>
                <Stack direction="row" spacing={2}>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>{hacedor.nombre ? hacedor.nombre.substring(0, 2) : ''}</Avatar>
                </Stack>
                <div className="texto">
                    <InputLabel>Nombre: {hacedor.nombre}</InputLabel>
                    <InputLabel>Telefono: {hacedor.telefono}</InputLabel>
                    <InputLabel>Edad: {hacedor.edad}</InputLabel>
                    <InputLabel>Dirección: {hacedor.direccion}</InputLabel>
                </div>
            </div>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Detalles perfil" {...a11yProps(0)} />
                    <Tab label="Habilidades" {...a11yProps(1)} />
                    <Tab label="Ofertas" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                Habilidades
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Habilidad</TableCell>
                                <TableCell align="left">Definicion</TableCell>
                                <TableCell align="left">Precio</TableCell>
                                <TableCell align="left">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {detallesHacedor.map((detalle) => (
                                <TableRow
                                    key={detalle.nombre}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{detalle.nombreTarea}</TableCell>
                                    <TableCell align="left">{detalle.definicion}</TableCell>
                                    <TableCell align="left">{detalle.precio}</TableCell>
                                    <TableCell align="left">Acciones</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </TabPanel>

            <TabPanel value={value} index={1}>
                Registrar detalles del hacedor
                <React.Fragment>
                    <CssBaseline />
                    <Container maxWidth="sm">
                        <Box sx={{ bgcolor: '#cfe8fc', minWidth: 200, maxWidth: 600 }} >
                            <FormControl className="formulario" >
                                Lista de habilidades que se pueden agregar
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tarea}
                                    label="Seleciona la tarea"
                                    onChange={handleChangeTarea}
                                    required
                                >
                                    {tareas.map(tarea => (
                                        <MenuItem
                                            key={tarea.idTarea}
                                            value={tarea.idTarea}>{tarea.nombre}</MenuItem>
                                    ))}
                                </Select>
                                <TextField onChange={onChangePrecioH} value={precioH} id="precioH" label="precio Habilidad " variant="outlined" required />
                                <TextField onChange={onChangeRadio} value={radio} id="radio" label="Radio" variant="outlined" required />
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" onClick={agregar}> Agregar </Button>
                                </Stack>
                            </FormControl>
                        </Box>
                    </Container>
                </React.Fragment>

            </TabPanel>

            <TabPanel value={value} index={2}>
                Ofertas de Servicios

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Ofertas</TableCell>
                                <TableCell align="left">Definicion</TableCell>
                                <TableCell align="left">Precio</TableCell>
                                <TableCell align="left">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {ofertas.map((detalle) => (
                                <TableRow
                                    key={detalle.nombre}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{detalle.nombreTarea}</TableCell>
                                    <TableCell align="left">{detalle.definicion}</TableCell>
                                    <TableCell align="left">{detalle.precio}</TableCell>
                                    <TableCell align="left">
                                     <DetalleOferta hacedor={hacedor}></DetalleOferta>
                                    </TableCell>
                                </TableRow>
                            ))} */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
        </Box>

    );


}
export default PerfilHacedorApp;