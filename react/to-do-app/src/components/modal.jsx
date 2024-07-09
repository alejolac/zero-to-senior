import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale"
import "react-day-picker/dist/style.css";
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

function ModalComponent({ state, handleState }) {
    const [open, SetOpen] = useState(state.open);
    const [selected, setSelected] = useState();
    const [name, setName] = useState({ txt: state.data.name, edit: false })

    useEffect(() => {
        if (state.data.noFormateDate != undefined) setSelected(state.data.noFormateDate)
    }, [])

    useEffect(() => {
        if (selected == undefined && state.data.date != undefined) {
            state.data.date = undefined;
        }
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
        state.data.noFormateDate = selected;
        handleState(state.data, 1)
    }

    const editName = () => {
        state.data.name = name.txt;
        setName(prevName => ({ ...prevName, edit: false }))
        handleState(state.data)
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
                    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                        {name.edit ? (
                            <>
                                <div>
                                    <TextField
                                        id="standard-basic"
                                        label="Nombre"
                                        variant="standard"
                                        value={name.txt}
                                        onChange={(e) => setName(prevName => ({ ...prevName, txt: e.target.value }))}
                                    />
                                </div>
                                <CheckBoxIcon onClick={() => editName()} sx={{ transition: "0.2s ease-in-out", fontSize: 30, cursor: "Pointer", "&:hover": { color: "#90CAF9" } }} />
                            </>
                        ) : (
                            <>
                                <Typography id="modal-modal-title" variant="h5" component="h2">
                                    {state.data.name}
                                </Typography>
                                <EditIcon onClick={() => setName(prevName => ({ ...prevName, edit: true }))} sx={{ transition: "0.2s ease-in-out", cursor: "Pointer", "&:hover": { color: "#90CAF9" } }} />
                            </>
                        )}
                    </div>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                    <DayPicker locale={es} mode="single" selected={selected} onSelect={setSelected} />
                </Box>
            </Modal>
        </div >
    );
}

export default ModalComponent