import React, {useState} from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import './modal.css'

export default function Example(elem: any) {
    const el = elem.elem; 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log("aaa", el);
    
  
    return (
      <>
        <div className="modal-btn" onClick={handleShow}>
          {el.name || el.aliases} {el.culture}
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
            {el.name || el.aliases} Card
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>name: {el.name || el.aliases}</div>
            <div>Culture: {el.culture || "unknown"}</div>
            <div>gender: {el.gender || "unknown"}</div>
            <div>titles: {el.titles[0] || "unknown"}</div>
            <div>TV Series: {el.tvSeries.map((item: any) => {
              if (item) {
                return `${item} `
              } else {
                return 'unknown'
              }
            })}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }