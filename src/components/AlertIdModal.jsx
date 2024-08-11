import React from 'react';

const AlertIdModal = ({ show, handleClose, message,msg }) => {
    if (!show) return null;

    return (
        
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50"></div>
            <div className="bg-white rounded-lg shadow-lg p-8 z-50">
                <h2 className="text-xl font-bold mb-4">{msg}</h2>
                <p>{message}</p>
                <button 
                    onClick={handleClose}
                    className="mt-4 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default AlertIdModal;
