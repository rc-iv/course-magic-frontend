import React from 'react';
import Button from '../Button/Button';

interface PrivacyPolicyProps {
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-black">
      <div className="bg-white p-8 rounded-lg w-1/2 relative border border-black">
        <button onClick={onClose} className="absolute top-0 right-0 p-4">
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
        <div className="privacy-policy-content text-left overflow-y-auto h-96">
          <p><strong>Last Updated:</strong> 09/04/2023</p>

          <h3 className="text-xl font-bold">Introduction</h3>
          <p>Welcome to CourseMagic. This Privacy Policy is designed to help you understand how we collect, use, and share your personal information.</p>

          <h3 className="text-xl font-bold">Information We Collect</h3>
          <p>We collect information like your email address, name, and other information you provide during the sign-up process.</p>

          <h3 className="text-xl font-bold">How We Use Your Information</h3>
          <p>We use your information to provide and improve our services, including generating educational materials, and for other purposes described in this policy.</p>

          <h3 className="text-xl font-bold">Ownership of Generated Content</h3>
          <p>Any lesson plans, syllabi, or other educational materials generated by CourseMagic are owned by CourseMagic. These materials may be used by us for improving the application and for other operational purposes.</p>

          <h3 className="text-xl font-bold">Sharing Your Information</h3>
          <p>We do not share your personal information with third parties without your consent, except under certain circumstances like legal requirements.</p>

          <h3 className="text-xl font-bold">Security</h3>
          <p>We take reasonable measures to protect your personal information.</p>

          <h3 className="text-xl font-bold">Changes to This Policy</h3>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

          <h3 className="text-xl font-bold">Contact Us</h3>
          <p>If you have any questions about this Privacy Policy, please contact us.</p>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            text="Close"
            bgColor="bg-red-500"
            textColor="text-white"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
