import React from 'react';

interface TermsOfServiceProps {
  onClose: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-black">
      <div className="bg-white p-8 rounded-lg w-3/4 relative border border-black">
        <button onClick={onClose} className="absolute top-0 right-0 p-4">
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
        <div className="terms-content overflow-y-auto h-96">
          <p>
            Welcome to CourseMagic. Please read these Terms of Service carefully before using our services.
          </p>
          <h3 className="text-xl font-bold">1. Acceptance of Terms</h3>
          <p>
            By using CourseMagic, you agree to comply with and be bound by these terms.
          </p>
          <h3 className="text-xl font-bold">2. Changes to Terms</h3>
          <p>
            CourseMagic reserves the right to change, modify, or revise these terms at any time.
          </p>
          <h3 className="text-xl font-bold">3. Use of Service</h3>
          <p>
            You agree to use the service for lawful purposes and to not violate any third-party rights.
          </p>
          <h3 className="text-xl font-bold">4. Ownership</h3>
          <p>
            You acknowledge that you do not own the generated lesson plans and they may be used by CourseMagic for improving the application.
          </p>
          {/* Add more terms as needed */}
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
