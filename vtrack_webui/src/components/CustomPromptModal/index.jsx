// CustomPromptModal.js
import React from 'react';

const CustomPromptModal = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md text-center">
        <p className="mb-4">You have unsaved changes. Do you really want to leave?</p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={onConfirm} 
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
          >
            Yes
          </button>
          <button 
            onClick={onCancel} 
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPromptModal;
