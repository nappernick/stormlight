import React, { useState } from 'react';
import Purchase from './Purchase';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '50%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '3px solid black',
        fontFamily: "'DM Sans', sans-serif"

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
