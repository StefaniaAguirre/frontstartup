// import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const DetallesHacedor = ({ }) => {

    console.log("HOLAAAAAAA");
    // const { idCliente } = useParams();
    const idHacedor = 2;
    const [hacedor, getUsuario] = useState([])
    const [habilidades, getHabilidadesHacedor] = useState([]);


    const getHacedor = async (idHacedor) => {
        await axios.get(`http://localhost:8080/api/hacedor/${idHacedor}`)
            .then(
                (response) => {
                    console.log(response.data);
                    getUsuario(response.data)
                    if (response.data == null) {
                        console.log("Hacedor no encontrado");
                    } else {
                        console.log(response.data);
                    }
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            )
        getHabilidades(idHacedor);
    }

    const getHabilidades = async (idHacedor) => {
        await axios.get(`http://localhost:8080/api/hacedor/listarDetalle/${idHacedor}`)
            .then(
                (response) => {
                    getHabilidadesHacedor(response.data);
                    console.log(response.data);
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

    useEffect(() => {
        getHacedor(2);
    }, [])


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DetallesHacedor;