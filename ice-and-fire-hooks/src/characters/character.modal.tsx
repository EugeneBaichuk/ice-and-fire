import React from "react"
import { FC, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import IceandfireApi from "../services/iceandfire"
import { Character } from "../types/type"

type Props = {
    character: any,
    loading: boolean,
    error: boolean,
    modalIsVisible: boolean,
    handleModal: Function,
    characterUrl: string | null,
}
const CharterModal: FC<Props> = ({character, loading, error, handleModal, modalIsVisible, characterUrl}) => {
    
    // const [character, setCharacter] = useState<null | Character>(null)
    // const [loadingCharacter, setLoadingCharacter] = useState<boolean>(false)
    // const [errorCharacter, setErrorCharacter] = useState<boolean>(false)

    return (
        <Modal show={modalIsVisible} onHide={handleModal(false)}>
          {error && "Error"}
          {loading && "Loading"}
          <Modal.Header closeButton>
            <Modal.Title>{character?.name || character?.aliases}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <span className="title">Name:</span>{character?.name || character?.aliases}
            <span className="prop">Gender:</span>{character?.gender}
            <span className="prop">Aliases:</span>{character?.aliases}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    )
}
// export default React.memo(CharterModal, (prevP, nextP) => {
//     if (prevP.characterUrl === null && nextP.characterUrl === null) return true
//     return false
// }) либо
export default React.memo(CharterModal)