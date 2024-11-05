// src/components/TermsnCondition.js
import React from 'react';

const TermsnCondition = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-slate-200 rounded-lg shadow-lg p-8 max-w-lg w-full mx-6">
        <h2 className="text-2xl text-center text-teal-700 font-bold mb-4">Terms and Conditions</h2>
        <div className="max-h-80 overflow-y-auto custom-scrollbar">
          <p className="mb-4">
            Welcome to Todo App, a simple and intuitive TODO application designed to help you manage your tasks efficiently. By signing up and using our service, you agree to the following terms and conditions.
          </p>
          <h3 className="text-lg font-bold mb-2">1. Acceptance of Terms</h3>
          <p className="mb-4">
            By accessing and using Todo App, you accept and agree to be bound by the terms and provisions of this agreement. Additionally, when using our services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement.
          </p>
          
          <h3 className="text-lg font-bold mb-2">2. User Accounts</h3>
          <p className="mb-4">
            You must create an account to use certain features of the app. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or mobile device. You agree to accept responsibility for all activities that occur under your account.
          </p>

          <h3 className="text-lg font-bold mb-2">3. Data Collection and Privacy</h3>
          <p className="mb-4">
            Todo App collects and stores your task data, account information, and any other input you provide. We are committed to ensuring that your privacy is protected and will only use the information we collect in accordance with our Privacy Policy.
          </p>
          
          <h3 className="text-lg font-bold mb-2">4. Use of the Service</h3>
          <p className="mb-4">
            Todo App grants you a limited, non-exclusive, non-transferable, and revocable license to use the application for personal task management. You agree not to use the app for any unlawful purposes, including but not limited to the creation of tasks related to illegal activities, fraud, or data mining.
          </p>

          <h3 className="text-lg font-bold mb-2">5. User Content</h3>
          <p className="mb-4">
            You retain ownership of the content you create within the application, such as tasks, lists, or notes. By using the app, you grant us a worldwide, non-exclusive, royalty-free license to use, store, display, and process your content solely for the purpose of providing you with the service.
          </p>

          <h3 className="text-lg font-bold mb-2">6. Termination</h3>
          <p className="mb-4">
            We reserve the right to suspend or terminate your access to the app at any time, with or without cause, and without notice. Upon termination, your right to use the app will immediately cease.
          </p>

          <h3 className="text-lg font-bold mb-2">7. Limitation of Liability</h3>
          <p className="mb-4">
            Todo App will not be liable for any damages of any kind arising from the use of this service, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
          </p>

          <h3 className="text-lg font-bold mb-2">8. Changes to Terms</h3>
          <p className="mb-4">
            We reserve the right to modify these terms at any time. You will be notified of any changes, and your continued use of the app will be deemed as acceptance of any modified terms.
          </p>

          <h3 className="text-lg font-bold mb-2">9. Governing Law</h3>
          <p className="mb-4">
            These terms shall be governed by and construed in accordance with the laws of [Your Country], without regard to its conflict of law provisions.
          </p>
          
          <p className="mb-4">
            If you have any questions or concerns about these terms, please contact us at [Your Contact Information].
          </p>
        </div>
        <div className='flex justify-center'>
        <button
          onClick={onClose}
          className="mt-4 bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800"
        >
          Done
        </button>

        </div>
      </div>
    </div>
  );
};

export default TermsnCondition;
