import React, { useState } from 'react';
import Purchase from './Purchase';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '40%',
        left: '70%',
        right: '40%',
        bottom: 'auto',
        height: "45%",
        marginRight: '-50%',
        paddingTop: "0px",
        transform: 'translate(-100%, -50%)',
        border: '1px solid lightgrey',
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        justifyContent: "center",
    }
};

Modal.setAppElement('#root')

function PurchaseModal() {
    const [showModal, setShowModal] = useState(false);

    function openModal() {
        setShowModal(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    function closeModal() {
        setShowModal(false);
    }

    return (
        <div>
            <button onClick={openModal}>Buy Stock</button>
            <Modal
                isOpen={showModal}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Purchase Stock Modal"
            >
                <Purchase closeModal={closeModal} />
            </Modal>
        </div>
    );
}

export default PurchaseModal;
