import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import { ownerRepository } from '../repositories/ownerRepository';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function ShopApplicationStatusView({ onBack, onNavigateToDashboard, onNavigateToResubmit, onNavigateToRegister }) {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const app = await ownerRepository.getMyApplication();
        setApplication(app);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F8EF] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#E4E4DA] border-t-[#667A3E] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!application) {
    onNavigateToRegister();
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F7F8EF] flex flex-col">
      <Header activeTab="profile" />
      <div className="flex-1 max-w-lg w-full mx-auto p-4 py-12 flex flex-col items-center justify-center">
        
        <div className="bg-white p-8 rounded-3xl border border-[#E4E4DA] shadow-sm text-center w-full">
          {application.applicationStatus === 'PENDING' && (
            <>
              <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock size={40} />
              </div>
              <h2 className="text-2xl font-black text-[#20231B] mb-2">Under Review</h2>
              <p className="text-[#6F7268] text-sm mb-6">
                Your shop registration for <span className="font-bold text-[#20231B]">{application.name}</span> is currently being reviewed by our team. We'll get back to you shortly.
              </p>
              <Button variant="outline" fullWidth onClick={onBack}>Back to Profile</Button>
            </>
          )}

          {application.applicationStatus === 'APPROVED' && (
            <>
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-2xl font-black text-[#20231B] mb-2">Approved!</h2>
              <p className="text-[#6F7268] text-sm mb-6">
                Congratulations! Your shop <span className="font-bold text-[#20231B]">{application.name}</span> has been approved and is now active on MEATLY.
              </p>
              <Button variant="primary" fullWidth onClick={onNavigateToDashboard}>Open Owner Dashboard</Button>
            </>
          )}

          {application.applicationStatus === 'REJECTED' && (
            <>
              <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={40} />
              </div>
              <h2 className="text-2xl font-black text-[#20231B] mb-2">Changes Required</h2>
              <p className="text-[#6F7268] text-sm mb-4">
                Unfortunately, your shop registration could not be approved at this time.
              </p>
              <div className="bg-red-50 text-red-700 p-4 rounded-xl text-left text-sm mb-6">
                <strong>Reason:</strong> {application.rejectionReason}
              </div>
              <Button variant="primary" fullWidth onClick={() => onNavigateToResubmit(application)}>
                Edit & Resubmit
              </Button>
              <div className="mt-4">
                <Button variant="ghost" fullWidth onClick={onBack}>Back to Profile</Button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
