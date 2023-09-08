import React from 'react';

interface DeleteCourseModalProps {
  onClose: () => void;
  onDelete: () => void;
}

const DeleteCourseModal: React.FC<DeleteCourseModalProps> = ({ onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-black">
      <div className="bg-white p-8 rounded-lg w-1/3 relative border-4 border-red-500">
        <button onClick={onClose} className="absolute top-0 left-0 p-4">X</button>
        <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete this course?</p>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 mr-2">Cancel</button>
          <button onClick={onDelete} className="bg-green-500 text-white px-4 py-2">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCourseModal;
