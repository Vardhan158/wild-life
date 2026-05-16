import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus, FaTimes, FaTrash, FaSignOutAlt, FaSync, FaLeaf, FaHotel, FaCalendarCheck, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const tabs = ['safaris', 'resorts', 'bookings'];

const tabIcons = {
  safaris: <FaLeaf />,
  resorts: <FaHotel />,
  bookings: <FaCalendarCheck />,
};

const AdminDashboard = () => {
  const { user, token, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('safaris');
  const [showForm, setShowForm] = useState(false);
  const [safaris, setSafaris] = useState([]);
  const [resorts, setResorts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bookingError, setBookingError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '',
    difficulty: '',
    type: '',
    location: '',
    image: '',
    description: '',
  });

  useEffect(() => {
    if (activeTab === 'safaris') fetchSafaris();
    if (activeTab === 'resorts') fetchResorts();
    if (activeTab === 'bookings') fetchBookings();
  }, [activeTab]);

  const resetForm = () => {
    setFormData({ name: '', price: '', duration: '', difficulty: '', type: '', location: '', image: '', description: '' });
  };

  const fetchSafaris = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/safari');
      setSafaris(response.data.safaris || []);
    } catch (error) {
      console.error('Error fetching safaris:', error);
    }
  };

  const fetchResorts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/resort');
      setResorts(response.data.resorts || []);
    } catch (error) {
      console.error('Error fetching resorts:', error);
    }
  };

  const fetchBookings = async () => {
    if (!token) { setBookingError('Admin token not found. Please log in again.'); return; }
    try {
      setBookingError('');
      const response = await axios.get('http://localhost:5000/admin/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
      setBookingError(error.response?.data?.message || 'Unable to load bookings right now.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = activeTab === 'safaris'
        ? { name: formData.name, duration: formData.duration || 'N/A', price: formData.price || 'N/A', difficulty: formData.difficulty || 'N/A', image: formData.image, description: formData.description }
        : { name: formData.name, type: formData.type || 'N/A', price: formData.price || 'N/A', location: formData.location || 'N/A', image: formData.image, description: formData.description };

      const url = activeTab === 'safaris' ? 'http://localhost:5000/admin/safari' : 'http://localhost:5000/admin/resort';
      await axios.post(url, data, { headers: { Authorization: `Bearer ${token}` } });
      setShowForm(false);
      resetForm();
      if (activeTab === 'safaris') fetchSafaris();
      if (activeTab === 'resorts') fetchResorts();
    } catch (error) {
      console.error('Error adding item:', error);
      alert(error.response?.data?.message || 'Error adding item. Check console.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const url = activeTab === 'safaris' ? `http://localhost:5000/admin/safari/${id}` : `http://localhost:5000/admin/resort/${id}`;
      await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
      if (activeTab === 'safaris') fetchSafaris();
      if (activeTab === 'resorts') fetchResorts();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item');
    }
  };

  const handleStatusUpdate = async (bookingId, adminStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/admin/bookings/${bookingId}/status`,
        { adminStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
      alert(error.response?.data?.message || 'Unable to update booking');
    }
  };

  const StatusBadge = ({ status, tone }) => {
    const colors = {
      green: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
      red: 'bg-red-50 text-red-700 ring-1 ring-red-200',
      yellow: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
    };
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${colors[tone] || colors.yellow}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
        <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${tone === 'green' ? 'bg-emerald-500' : tone === 'red' ? 'bg-red-500' : 'bg-amber-500'}`} />
        {status}
      </span>
    );
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
          <FaLeaf className="mx-auto mb-4 text-4xl text-emerald-600" />
          <p className="text-lg font-semibold text-stone-700">Please log in to access the admin panel.</p>
        </div>
      </div>
    );
  }

  const inputClass = "w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100";

  return (
    <div className="min-h-screen bg-stone-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Google Fonts import via style tag */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');`}</style>

      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 shadow-sm">
              <FaLeaf className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight text-stone-900 sm:text-lg">SafariAdmin</h1>
              <p className="hidden text-xs font-medium text-stone-400 sm:block">Management Console</p>
            </div>
          </div>

          {/* User + Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden flex-col items-end sm:flex">
              <span className="text-sm font-semibold text-stone-800">{user?.userName}</span>
              <span className="text-xs text-stone-400">Administrator</span>
            </div>
            <div className="h-8 w-8 overflow-hidden rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-sm font-bold text-emerald-700">{user?.userName?.charAt(0)?.toUpperCase()}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 hover:text-red-700"
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 pb-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); if (tab === 'bookings') setShowForm(false); }}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-stone-500 hover:border-stone-300 hover:text-stone-700'
                }`}
              >
                <span className="text-xs">{tabIcons[tab]}</span>
                <span className="capitalize">{tab}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Page Title + Action Button */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-stone-900 sm:text-2xl">
              Manage {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <p className="mt-0.5 text-sm text-stone-500">
              {activeTab === 'bookings' ? 'Review and update customer booking statuses' : `Add, view, and remove ${activeTab}`}
            </p>
          </div>

          {activeTab === 'bookings' ? (
            <button
              onClick={fetchBookings}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-95"
            >
              <FaSync className="text-xs" /> Refresh
            </button>
          ) : (
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-95"
            >
              {showForm ? <FaTimes className="text-xs" /> : <FaPlus className="text-xs" />}
              {showForm ? 'Close Form' : `Add ${activeTab.slice(0, -1)}`}
            </button>
          )}
        </div>

        {/* Add Form */}
        {showForm && activeTab !== 'bookings' && (
          <div className="mb-6 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50 px-6 py-4">
              <div>
                <h3 className="text-base font-bold text-stone-900">Add New {activeTab.slice(0, -1).charAt(0).toUpperCase() + activeTab.slice(0, -1).slice(1)}</h3>
                <p className="text-xs text-stone-500 mt-0.5">Fill in the details below to add a new listing</p>
              </div>
              <button onClick={() => setShowForm(false)} className="rounded-lg p-1.5 text-stone-400 transition hover:bg-stone-200 hover:text-stone-700">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500">Name *</label>
                  <input type="text" placeholder="Enter name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} required />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500">Price *</label>
                  <input type="text" placeholder="e.g. ₹2,999" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className={inputClass} required />
                </div>

                {activeTab === 'safaris' && (
                  <>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500">Duration *</label>
                      <input type="text" placeholder="e.g. 3 Days" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className={inputClass} required />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500">Difficulty *</label>
                      <input type="text" placeholder="e.g. Moderate" value={formData.difficulty} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })} className={inputClass} required />
                    </div>
                  </>
                )}

                {activeTab === 'resorts' && (
                  <>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500">Type *</label>
                      <input type="text" placeholder="e.g. Luxury" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className={inputClass} required />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500">Location *</label>
                      <input type="text" placeholder="e.g. Nairobi, Kenya" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className={inputClass} required />
                    </div>
                  </>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500">Image Upload *</label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const uploadData = new FormData();
                      uploadData.append('image', file);
                      setLoading(true);
                      try {
                        const res = await axios.post('http://localhost:5000/upload', uploadData);
                        setFormData((prev) => ({ ...prev, image: res.data.url }));
                      } catch (error) {
                        console.error('Upload error:', error);
                        alert(error.response?.data?.message || 'Error uploading image');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="flex-1 rounded-xl border border-dashed border-stone-300 bg-stone-50 px-4 py-2.5 text-sm text-stone-600 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
                    required={!formData.image}
                  />
                  {formData.image && (
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2">
                      <img src={formData.image} alt="Preview" className="h-10 w-10 rounded-lg object-cover" />
                      <span className="text-xs font-semibold text-emerald-700">Uploaded ✓</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500">Description *</label>
                <textarea
                  placeholder="Enter a detailed description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`${inputClass} h-24 resize-none`}
                  required
                />
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                <button type="button" onClick={() => { setShowForm(false); resetForm(); }} className="rounded-xl border border-stone-200 px-6 py-2.5 text-sm font-semibold text-stone-600 transition hover:bg-stone-100">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60">
                  {loading ? 'Saving...' : `Add ${activeTab.slice(0, -1)}`}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Bookings Table */}
        {activeTab === 'bookings' ? (
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            {bookingError && (
              <div className="border-b border-red-100 bg-red-50 px-6 py-3 text-sm font-medium text-red-700">
                ⚠ {bookingError}
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-stone-100 bg-stone-50">
                    {['Service', 'Customer', 'Type', 'Schedule', 'Guests', 'Amount', 'Payment', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-stone-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="transition hover:bg-stone-50/60">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {booking.serviceImage ? (
                            <img src={booking.serviceImage} alt={booking.serviceName} className="h-11 w-11 rounded-xl object-cover shadow-sm" />
                          ) : (
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-100">
                              {booking.serviceType === 'resort' ? <FaHotel className="text-stone-400" /> : <FaLeaf className="text-stone-400" />}
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-semibold text-stone-900">{booking.serviceName}</p>
                            <p className="text-xs capitalize text-stone-400">{booking.serviceType}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-stone-800">{booking.user?.userName}</p>
                        <p className="text-xs text-stone-400">{booking.user?.email}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-stone-100 px-2 py-0.5 text-xs font-medium capitalize text-stone-600">{booking.serviceType}</span>
                      </td>
                      <td className="px-5 py-4 text-sm text-stone-600">
                        {booking.bookingDate || `${booking.checkInDate || '-'} → ${booking.checkOutDate || '-'}`}
                      </td>
                      <td className="px-5 py-4 text-sm text-stone-600">
                        {booking.serviceType === 'resort'
                          ? `${booking.guests || 0}g / ${booking.rooms || 0}r`
                          : `${booking.groupSize || 0} pax`}
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm font-bold text-stone-900">₹{Number(booking.totalAmount || 0).toLocaleString()}</span>
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge
                          status={booking.paymentStatus}
                          tone={booking.paymentStatus === 'paid' || booking.paymentStatus === 'not_required' ? 'green' : booking.paymentStatus === 'failed' ? 'red' : 'yellow'}
                        />
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge
                          status={booking.adminStatus}
                          tone={booking.adminStatus === 'confirmed' ? 'green' : booking.adminStatus === 'rejected' ? 'red' : 'yellow'}
                        />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700 active:scale-95"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                            className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-600 active:scale-95"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan="9" className="px-6 py-16 text-center">
                        <FaCalendarCheck className="mx-auto mb-3 text-3xl text-stone-300" />
                        <p className="text-sm font-medium text-stone-400">No bookings yet</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Safaris / Resorts Table */
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px]">
                <thead>
                  <tr className="border-b border-stone-100 bg-stone-50">
                    {(activeTab === 'safaris'
                      ? ['', 'Name', 'Duration', 'Price', 'Difficulty', 'Description', 'Added By', '']
                      : ['', 'Name', 'Type', 'Price', 'Location', 'Description', 'Added By', '']
                    ).map((h, i) => (
                      <th key={i} className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-stone-500 ${i === 7 ? 'text-center' : ''}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {(activeTab === 'safaris' ? safaris : resorts).map((item) => (
                    <tr key={item._id} className="group transition hover:bg-stone-50/60">
                      <td className="px-5 py-4">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="h-12 w-12 rounded-xl object-cover shadow-sm" />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100">
                            {activeTab === 'safaris' ? <FaLeaf className="text-stone-300" /> : <FaHotel className="text-stone-300" />}
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-stone-900">{item.name}</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-stone-600">{activeTab === 'safaris' ? item.duration : item.type}</td>
                      <td className="px-5 py-4">
                        <span className="text-sm font-bold text-stone-900">{item.price}</span>
                      </td>
                      <td className="px-5 py-4 text-sm text-stone-600">{activeTab === 'safaris' ? item.difficulty : item.location}</td>
                      <td className="max-w-[180px] px-5 py-4">
                        <p className="truncate text-sm text-stone-500" title={item.description}>{item.description}</p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                            {item.createdBy?.userName?.charAt(0)?.toUpperCase()}
                          </div>
                          <span className="text-sm text-stone-600">{item.createdBy?.userName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="rounded-lg p-2 text-stone-400 transition hover:bg-red-50 hover:text-red-600 group-hover:text-stone-500"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {(activeTab === 'safaris' ? safaris : resorts).length === 0 && (
                    <tr>
                      <td colSpan="8" className="px-6 py-16 text-center">
                        {activeTab === 'safaris' ? <FaLeaf className="mx-auto mb-3 text-3xl text-stone-300" /> : <FaHotel className="mx-auto mb-3 text-3xl text-stone-300" />}
                        <p className="text-sm font-medium text-stone-400">No {activeTab} added yet</p>
                        <button onClick={() => setShowForm(true)} className="mt-3 text-xs font-semibold text-emerald-600 hover:underline">
                          + Add your first {activeTab.slice(0, -1)}
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;