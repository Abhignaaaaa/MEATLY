import React, { useState, useEffect } from 'react';
import { adminRepository } from '../../repositories/adminRepository';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function AdminShopApplicationsView({ onNavigate }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const data = await adminRepository.getShopApplications();
        setApplications(data || []);
      } catch (error) {
        console.error('Failed to fetch applications', error);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#20231B]">Shop Applications</h2>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-100 rounded-xl" />)}
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-[#E4E4DA] text-center">
          <p className="text-[#6F7268]">No shop applications found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E4E4DA] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FAF8F1] border-b border-[#E4E4DA]">
                <tr>
                  <th className="px-6 py-4 font-bold text-[#46552A]">Shop Name</th>
                  <th className="px-6 py-4 font-bold text-[#46552A]">Owner</th>
                  <th className="px-6 py-4 font-bold text-[#46552A]">Type</th>
                  <th className="px-6 py-4 font-bold text-[#46552A]">Status</th>
                  <th className="px-6 py-4 font-bold text-[#46552A] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E4DA]">
                {applications.map(app => (
                  <tr key={app._id} className="hover:bg-[#F7F8EF]/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-[#20231B]">{app.name}</td>
                    <td className="px-6 py-4 text-[#6F7268]">{app.ownerName}<br/><span className="text-xs">{app.phone}</span></td>
                    <td className="px-6 py-4 text-[#6F7268]">{app.categories?.[0] || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <Badge variant={app.applicationStatus === 'APPROVED' ? 'success' : app.applicationStatus === 'REJECTED' ? 'error' : 'warning'}>
                        {app.applicationStatus}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm" onClick={() => onNavigate(`admin-application-details:${app._id}`)}>
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
