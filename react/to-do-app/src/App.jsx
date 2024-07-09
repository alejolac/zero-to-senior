import React, { useState, useEffect } from 'react';
import "./App.css"
import Element from './components/elements.jsx';
import Modal from './components/modal.jsx';

// Librerias
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { v4 as uuidv4 } from 'uuid';

// React MUI
import { TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
//

function App() {
  const [name, setName] = useState("")
  const [modal, setModal] = useState({ open: false, data: {} });
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
  const [parent2, enableAnimations2] = useAutoAnimate(/* optional config */)
  const [data, setData] = useState([]);

  const addData = () => {
    const obj = {
      id: uuidv4(),
      name: name,
      date: undefined,
      noFormateDate: undefined,
      description: "",
      state: 1,
      icon: "unassigned",
      color: "",
    }
    setData(prevItems => [obj, ...prevItems]);
    setName("");
  }

  const handleModal = (e, type = 0) => {
    const updatedData = data.map(elem => (
      elem.id === e.id ? e : elem
    ));

    setData(updatedData);
    if (type == 1) setModal(prevModal => ({ ...prevModal, open: false }));
  }

  return (
    <main>
      <div className='title'>
        To - Do - App
      </div>
      <div className='list-head'>
        <div ref={parent} className='list-new'>
          <div className='list-new-title'>
            PARA ASIGNAR
          </div>
          <div className='list-new-input'>
            <div>
              <TextField
                id="standard-basic"
                label="Nombre"
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <CheckBoxIcon onClick={() => addData()} sx={{ transition: "0.2s ease-in-out", fontSize: 30, cursor: "Pointer", "&:hover": { color: "#90CAF9" } }} />
          </div>
          {
            data.length > 0 && (
              data.map((elem, index) => {
                return (
                  elem.date == undefined ? <div key={index} className='list-new-elem' onClick={() => setModal({ open: true, data: { ...elem } })}> <Element data={elem} /> </div> : ""
                )
              })
            )
          }
        </div>
        <div ref={parent2} className='list-new'>
          <div className='list-new-title'>
            PARA HACER
          </div>
          {
            data.length > 0 && (
              data.map((elem, index) => {
                return (
                  elem.date != undefined ? <div key={index} className='list-new-elem' onClick={() => setModal({ open: true, data: { ...elem } })}> <Element data={elem} /> </div> : ""
                )
              })
            )
          }
        </div>
      </div>
      {
        modal.open && (
          <Modal state={modal} handleState={handleModal} />
        )
      }
    </main >
  )
}

export default App;