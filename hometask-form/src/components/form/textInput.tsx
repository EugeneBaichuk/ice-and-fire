import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"

type PropsState = {
    type?: string,
    placeholder?: string,
    state?:any, 
    setState?:any, 
    value?:any,
    name?: string,
    id?: string
}

const InputComponent = ({type, placeholder, state, setState, value, name, id}: PropsState) => {
    return (
        <div>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={(e) => {
                    setState({ ...state, [`${name || id}`]: e.target.value })
                }}
            />
            {id && <label htmlFor={id}>{id}</label>}
        </div>
)}

export default InputComponent;