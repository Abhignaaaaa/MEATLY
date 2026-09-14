import React, { useEffect, useState } from 'react';
import { adminRepository } from '../../repositories/adminRepository';
import { Search } from 'lucide-react';

export default function AdminUsersView() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ role: 'All', search: '' });

  useEffect(() => {
    loadUsers();
  }, [filters]);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await adminRepository.getUsers(filters);
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#20231B]">Users Directory</h1>

      <div className="bg-white rounded-2xl border border-[#E4E4DA] p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F7268]" />
          <input 
            type="text" placeholder="Search users..." 
            className="w-full pl-9 pr-4 py-2 border border-[#E4E4DA] rounded-lg text-sm focus:outline-none focus:border-indigo-600"
            value={filters.search} onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          />
        </div>
        <select 
          className="border border-[#E4E4DA] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-indigo-600"
          value={filters.role} onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
        >
          <option value="All">All Roles</option>
          <option value="Customers">Customers</option>
          <option value="Shop Owners">Shop Owners</option>
          <option value="Admins">Admins</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-[#E4E4DA] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-[#6F7268] uppercase bg-gray-50 border-b border-[#E4E4DA]">
                <th className="px-6 py-3 font-semibold">Name</th>
                <th className="px-6 py-3 font-semibold">Contact</th>
                <th className="px-6 py-3 font-semibold">Role</th>
                <th className="px-6 py-3 font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4DA]">
              {isLoading ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center">Loading...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center text-[#6F7268]">No users found.</td></tr>
              ) : (
                users.map(user => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-[#20231B]">{user.fullName}</td>
                    <td className="px-6 py-4 text-sm text-[#6F7268]">{user.phone}<br/>{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs uppercase font-bold">
                        {user.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6F7268]">{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
