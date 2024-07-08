import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale"
import "react-day-picker/dist/style.css";

function ModalComponent({ state, handleState }) {
    const [open, SetOpen] = useState(state.open)
    const [selected, setSelected] = useState();

    useEffect(() => {
        if (state.data.noFormateDate != undefined) setSelected(state.data.noFormateDate)
    }, [])

    useEffect(() => {
        if (selected != undefined) {
            const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
            const fechaFormateada = selected.toLocaleDateString('es-ES', opciones);
            state.data.date = fechaFormateada;
        }

    }, [selected])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 3,
    };

    const handleclose = () => {
        handleState(state.data, selected)
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={() => handleclose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        {state.data.name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                    <DayPicker locale={es} mode="single" selected={selected} onSelect={setSelected} />
                </Box>
            </Modal>
        </div>
    );
}

export default ModalComponent