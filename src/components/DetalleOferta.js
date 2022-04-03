import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


export default function DetalleOferta({ oferta }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [mensaje, setMensaje] = React.useState('');

    const handleAcept = (opcionSeleccionada) => {

        crearOferta(oferta.idOferta, opcionSeleccionada);
        if(opcionSeleccionada){
            setMensaje("oferta Aceptada");
        }else{

            setMensaje("oferta Rechazada");
        }

    }
  

     //Crear el servicio 
    const crearOferta = async (idOferta, estado) => {
        oferta.esAceptada
        await axios.put(`http://localhost:8080/api/oferta/actualizar/${idOferta}&&${estado}`, oferta)
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

    React.useEffect(() => {
        console.log(oferta);

        }, [])

    return (
        <div>
            <Button onClick={handleOpen}>Ver </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">Oferta</h2>
                    <p> {oferta.notificacion}</p>
                    <p> {mensaje}</p>
                    <Button onClick={ () => handleAcept(1)}>Aceptar</Button>
                    <Button onClick={ () => handleAcept(0)}>Rechazar</Button>
                    <Button onClick={handleClose}>Salir</Button>
                </Box>
            </Modal>
        </div>
    );
}
