import React, { useState, useEffect } from 'react';
import { adminRepository } from '../../repositories/adminRepository';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';

export default function AdminShopApplicationDetailsView({ applicationId, onBack }) {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const data = await adminRepository.getShopApplicationById(applicationId);
        setApplication(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (applicationId) fetchApp();
  }, [applicationId]);

  const handleApprove = async () => {
    if (!window.confirm('Are you sure you want to approve this shop?')) return;
    setSubmitting(true);
    try {
      await adminRepository.approveShopApplication(applicationId);
      onBack();
    } catch(err) {
      alert(err.message || 'Error approving application');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejection.');
      return;
    }
    setSubmitting(true);
    try {
      await adminRepository.rejectShopApplication(applicationId, rejectReason);
      onBack();
    } catch(err) {
      alert(err.message || 'Error rejecting application');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading application...</div>;
  if (!application) return <div className="p-8 text-center text-red-500">Application not found.</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-[#667A3E] hover:underline font-bold text-sm">
          ? Back to Applications
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E4E4DA] p-6 shadow-sm">
        <div className="flex justify-between items-start mb-6 border-b border-[#E4E4DA] pb-4">
          <div>
            <h2 className="text-2xl font-black text-[#20231B]">{application.name}</h2>
            <p className="text-[#6F7268] text-sm mt-1">Application ID: {application._id}</p>
          </div>
          <Badge variant={application.applicationStatus === 'APPROVED' ? 'success' : application.applicationStatus === 'REJECTED' ? 'error' : 'warning'}>
            {application.applicationStatus}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="font-bold text-[#46552A]">Owner Details</h3>
            <div className="text-sm space-y-2">
              <p><span className="text-[#6F7268]">Name:</span> <span className="font-medium">{application.ownerName}</span></p>
              <p><span className="text-[#6F7268]">Phone:</span> <span className="font-medium">{application.phone}</span></p>
              <p><span className="text-[#6F7268]">Email:</span> <span className="font-medium">{application.email || 'N/A'}</span></p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-[#46552A]">Shop Details</h3>
            <div className="text-sm space-y-2">
              <p><span className="text-[#6F7268]">Type:</span> <span className="font-medium">{application.categories?.[0] || 'N/A'}</span></p>
              <p><span className="text-[#6F7268]">Address:</span> <span className="font-medium">{application.address}, {application.city} - {application.pincode}</span></p>
              <p><span className="text-[#6F7268]">Hours:</span> <span className="font-medium">{application.openingHours}</span></p>
              <p><span className="text-[#6F7268]">Delivery Radius:</span> <span className="font-medium">{application.deliveryRadius || '5 km'}</span></p>
              <p><span className="text-[#6F7268]">Description:</span> <span className="font-medium">{application.description || 'N/A'}</span></p>
            </div>
          </div>
        </div>

        {application.applicationStatus === 'REJECTED' && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm mb-8 border border-red-100">
            <strong>Rejection Reason:</strong> {application.rejectionReason}
          </div>
        )}

        {application.applicationStatus === 'PENDING' && (
          <div className="border-t border-[#E4E4DA] pt-6 mt-6">
            {!showRejectForm ? (
              <div className="flex gap-4">
                <Button variant="primary" onClick={handleApprove} disabled={submitting}>
                  Approve Application
                </Button>
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => setShowRejectForm(true)} disabled={submitting}>
                  Reject
                </Button>
              </div>
            ) : (
              <div className="bg-[#F7F8EF] p-4 rounded-xl border border-[#E4E4DA] space-y-4">
                <Input 
                  label="Rejection Reason" 
                  value={rejectReason} 
                  onChange={(e) => setRejectReason(e.target.value)} 
                  placeholder="Explain why this application is rejected..."
                  required
                />
                <div className="flex gap-3">
                  <Button variant="primary" className="bg-red-600 hover:bg-red-700 text-white" onClick={handleReject} disabled={submitting}>
                    Confirm Rejection
                  </Button>
                  <Button variant="ghost" onClick={() => setShowRejectForm(false)} disabled={submitting}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
