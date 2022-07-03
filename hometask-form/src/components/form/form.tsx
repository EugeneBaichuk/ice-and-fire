import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import InputComponent from "./textInput"

//тип стейта
type TState = {
    name: string,
    born: string | number,
    died: string | number,
    books: string[] | [],
    titles: string[] | [],
    gender: string,
}

//стейт типа TState
const initState: TState = {
    name: '',
    born: '',
    died: '',
    books: [''],
    titles: [''],
    gender: '',
}

const FormComponent = () => {
    //хук useState принимает стейт типа TState с дефолт значением initState
    const [state, setState] = useState<TState>(initState)
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)


    const handleModal = (type: boolean) => () => {
        setModalIsVisible(type)
    }

    return (
        <div className="form">
            <Form onSubmit={(e: any) => {
                e.preventDefault()
            }}>  
                <InputComponent
                    type="text"
                    placeholder="name" 
                    state={state}
                    setState={setState}
                    value={state.name}
                />
                <InputComponent
                    id="born"
                    type="date"
                    placeholder="born"
                    state={state}
                    setState={setState}
                    value={state.born}
                />
                <InputComponent
                    id="died"
                    type="date"
                    placeholder="died"
                    value={state.died}
                    name={'died'}
                    state={state}
                    setState={setState}
                />
                <div>
                    {state.books.map((el, i) => (
                        <div key={i}>
                            <input
                                type="text"
                                placeholder="books"
                                value={state.books[i]}
                                name={'books' + i}
                                onChange={(e) => {
                                    const booksFromState = state.books;
                                    booksFromState[i] = e.target.value;
                                    setState({...state, books: booksFromState})
                                }}
                            />
                        </div>
                    ))}
                    <Button onClick={(e: any) => {
                        const books: string[] = state.books;
                        books.push('')
                        setState({ ...state, books})
                    }}>add book</Button>
                </div>
                <div>
                    {state.titles.map((el, i) => (
                        <div>
                            <input
                                key ={i}
                                type="text"
                                placeholder="title"
                                value={state.titles[i]}
                                name={'titles' + i}
                                onChange={(e) => {
                                    const titles = state.titles;
                                    titles[i] = e.target.value;
                                    setState({...state, titles});
                                }}
                            />
                        </div>
                    ))}
                    <Button onClick={(e: any) => {
                        const titles: string[] = state.titles;
                        titles.push('')
                        setState({ ...state, titles: titles})
                    }}>add title</Button>
                </div>
                <InputComponent
                    type="text"
                    name='gender'
                    placeholder="gender" 
                    state={state}
                    setState={setState}
                    value={state.gender}
                />
                <Button type={'submit'} onClick={handleModal(true)}>submit</Button>
            </Form>
            <Modal show={modalIsVisible} onHide={handleModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{state.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span className="prop">Name:</span>{state.name}
                    <span className="prop">Born:</span>{state.born}
                    <span className="prop">Died:</span>{state.died}
                    <span className="prop">Books:</span>{state.books.join(', ')}
                    <span className="prop">Titles:</span>{state.titles.join(', ')}
                    <span className="prop">Gender:</span>{state.gender}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
        </Modal>
        </div>
    )
}
export default FormComponent