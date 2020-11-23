import React, { createContext, useContext, createPortal } from 'react'
import { useRef } from "react"
import { useState } from "react"
import { useEffect } from "react"

const ModalContext = createContext()

export function ModalProvider({ children }) {
    const modalRef = useRef()
    const [value, setValue] = useState()

    useEffect(() => {
        setValue(modalRef.current)
    }, [])

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    )
}

export function Modal({ onClose, children }) {
    const modalNode = useContext(ModalContext)
    if (!modalNode) return null

    return createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose}>
                <div id="modal-content">
                    {children}
                </div>
            </div>
        </div>,
        modalNode
    )
}
