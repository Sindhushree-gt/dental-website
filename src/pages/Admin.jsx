import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000';
const TOKEN_KEY = 'adminToken';

function formatDate(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');

  const [tab, setTab] = useState('leads');

  const headers = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  // Leads
  const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(false);

  // Gallery
  const [gallery, setGallery] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('smile-designing');
  const [imageFile, setImageFile] = useState(null);
  const [galleryError, setGalleryError] = useState('');

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken('');
    setAuthError('');
  };

  const login = async (e) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/admin/login`, { username, password });
      const t = res.data?.token;
      if (!t) throw new Error('No token returned');
      localStorage.setItem(TOKEN_KEY, t);
      setToken(t);
      setPassword('');
    } catch (err) {
      setAuthError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async () => {
    setLeadsLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/leads`, { headers });
      setLeads(res.data?.leads || []);
    } catch (e) {
      setLeads([]);
    } finally {
      setLeadsLoading(false);
    }
  };

  const updateLeadStatus = async (id, status) => {
    try {
      await axios.patch(`${API_BASE}/api/leads/${id}`, { status }, { headers });
      await fetchLeads();
    } catch {
      // ignore
    }
  };

  const fetchGallery = async () => {
    setGalleryLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/gallery`);
      setGallery(res.data?.gallery || []);
    } catch (e) {
      setGallery([]);
    } finally {
      setGalleryLoading(false);
    }
  };

  const uploadGallery = async (e) => {
    e.preventDefault();
    setGalleryError('');
    if (!galleryTitle.trim() || !imageFile) {
      setGalleryError('Please provide title + an image.');
      return;
    }
    try {
      const fd = new FormData();
      fd.append('title', galleryTitle.trim());
      fd.append('category', galleryCategory);
      fd.append('image', imageFile);

      await axios.post(`${API_BASE}/api/admin/gallery`, fd, {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' }
      });
      setGalleryTitle('');
      setImageFile(null);
      await fetchGallery();
    } catch (err) {
      setGalleryError('Upload failed. Please try again.');
    }
  };

  const deleteGallery = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/admin/gallery/${id}`, { headers });
      await fetchGallery();
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchLeads();
    fetchGallery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 bg-gradient-to-b from-[color:var(--soft)] to-white">
        <div className="max-w-md mx-auto bg-white border border-black/5 rounded-3xl shadow-2xl p-10">
          <h1 className="text-4xl font-serif font-bold text-[color:var(--dk)] mb-2">Admin Login</h1>
          <p className="text-[color:var(--muted)] mb-8">Enter admin credentials to continue.</p>

          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[color:var(--muted)] mb-2">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[color:var(--bg)] border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[color:var(--teal)]"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[color:var(--muted)] mb-2">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full bg-[color:var(--bg)] border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[color:var(--teal)]"
                autoComplete="current-password"
              />
            </div>

            {authError && <div className="text-sm font-bold text-red-600">{authError}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[color:var(--teal)] text-white py-3 rounded-xl font-bold hover:bg-[color:var(--dk)] transition disabled:opacity-50"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--txt)]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/5">
        <div className="max-w-full mx-auto px-10 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-[color:var(--teal)] tracking-tight">AdminPanel</h1>
          </div>
          <button
            onClick={logout}
            className="px-6 py-2.5 rounded-xl font-bold bg-[color:var(--soft)] text-[color:var(--dk)] hover:bg-[color:var(--teal)] hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-full flex pt-[88px]">
        {/* Sidebar */}
        <aside className="w-80 h-[calc(100vh-88px)] bg-[color:var(--deep)] p-8 sticky top-[88px] hidden lg:block">
          <nav className="space-y-4">
            {[
              { id: 'leads', icon: <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />, label: 'Leads' },
              { id: 'gallery', icon: <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />, label: 'Gallery' },
              { id: 'booking', icon: <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />, label: 'Booking' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-semibold transition-all group ${
                  tab === item.id 
                    ? 'bg-white/10 text-white shadow-lg' 
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <svg className={`w-6 h-6 transition-colors ${tab === item.id ? 'text-emerald-400' : 'text-white/30 group-hover:text-emerald-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {item.icon}
                </svg>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 bg-[color:var(--bg)] min-h-[calc(100vh-88px)] p-12 lg:p-16 text-[color:var(--txt)]">

            {tab === 'leads' && (
          <div className="bg-white border border-black/5 rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 flex items-center justify-between">
              <div>
                <div className="font-bold text-[color:var(--dk)] text-lg">Leads</div>
                <div className="text-sm text-[color:var(--muted)]">Generated from booking submissions.</div>
              </div>
              <button
                onClick={fetchLeads}
                className="px-4 py-2 rounded-xl font-bold bg-[color:var(--soft)] text-[color:var(--dk)] hover:bg-white border border-black/5 transition"
              >
                Refresh
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-[color:var(--soft)] text-[color:var(--dk)]">
                  <tr>
                    <th className="text-left px-6 py-4 font-bold">Name</th>
                    <th className="text-left px-6 py-4 font-bold">Phone</th>
                    <th className="text-left px-6 py-4 font-bold">Email</th>
                    <th className="text-left px-6 py-4 font-bold">Service</th>
                    <th className="text-left px-6 py-4 font-bold">Source</th>
                    <th className="text-left px-6 py-4 font-bold">Created</th>
                    <th className="text-left px-6 py-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leadsLoading ? (
                    <tr>
                      <td className="px-6 py-6 text-[color:var(--muted)]" colSpan={7}>
                        Loading…
                      </td>
                    </tr>
                  ) : leads.length === 0 ? (
                    <tr>
                      <td className="px-6 py-6 text-[color:var(--muted)]" colSpan={7}>
                        No leads yet.
                      </td>
                    </tr>
                  ) : (
                    leads.map((l) => (
                      <tr key={l.id} className="border-t border-black/5">
                        <td className="px-6 py-4 font-bold text-[color:var(--dk)]">{l.name}</td>
                        <td className="px-6 py-4">{l.phone}</td>
                        <td className="px-6 py-4">{l.email || '-'}</td>
                        <td className="px-6 py-4">{l.service || '-'}</td>
                        <td className="px-6 py-4">{l.source}</td>
                        <td className="px-6 py-4">{formatDate(l.createdAt)}</td>
                        <td className="px-6 py-4">
                          <select
                            value={l.status || 'new'}
                            onChange={(e) => updateLeadStatus(l.id, e.target.value)}
                            className="bg-white border border-black/10 rounded-xl px-3 py-2 font-bold text-[color:var(--dk)]"
                          >
                            <option value="new">new</option>
                            <option value="contacted">contacted</option>
                            <option value="won">won</option>
                            <option value="lost">lost</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
            )}

            {tab === 'gallery' && (
              <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white border border-black/5 rounded-3xl shadow-xl p-8">
              <div className="font-bold text-[color:var(--dk)] text-lg mb-1">Upload Gallery Item</div>
              <div className="text-sm text-[color:var(--muted)] mb-6">
                Upload an image and assign a category.
              </div>

              <form onSubmit={uploadGallery} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-[color:var(--muted)] mb-2">
                    Category
                  </label>
                  <select
                    value={galleryCategory}
                    onChange={(e) => setGalleryCategory(e.target.value)}
                    className="w-full bg-[color:var(--bg)] border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[color:var(--teal)] font-bold text-[color:var(--dk)]"
                  >
                    <option value="smile-designing">Smile Designing</option>
                    <option value="aligners">Braces & Aligners</option>
                    <option value="implants">Dental Implants</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-[color:var(--muted)] mb-2">
                    Title
                  </label>
                  <input
                    value={galleryTitle}
                    onChange={(e) => setGalleryTitle(e.target.value)}
                    className="w-full bg-[color:var(--bg)] border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[color:var(--teal)]"
                    placeholder="e.g. Smile Design Transformation"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-[color:var(--muted)] mb-2">
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="w-full"
                  />
                </div>

                {galleryError && <div className="text-sm font-bold text-red-600">{galleryError}</div>}

                <button
                  type="submit"
                  className="w-full bg-[color:var(--teal)] text-white py-3 rounded-xl font-bold hover:bg-[color:var(--dk)] transition"
                >
                  Upload
                </button>
              </form>
            </div>

            <div className="bg-white border border-black/5 rounded-3xl shadow-xl overflow-hidden">
              <div className="p-6 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[color:var(--dk)] text-lg">Gallery Items</div>
                  <div className="text-sm text-[color:var(--muted)]">Shown on the public Results/Gallery views.</div>
                </div>
                <button
                  onClick={fetchGallery}
                  className="px-4 py-2 rounded-xl font-bold bg-[color:var(--soft)] text-[color:var(--dk)] hover:bg-white border border-black/5 transition"
                >
                  Refresh
                </button>
              </div>

              <div className="divide-y divide-black/5">
                {galleryLoading ? (
                  <div className="p-6 text-[color:var(--muted)]">Loading…</div>
                ) : gallery.length === 0 ? (
                  <div className="p-6 text-[color:var(--muted)]">No gallery items yet.</div>
                ) : (
                  gallery.map((g) => (
                    <div key={g.id} className="p-6 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[color:var(--soft)] border border-black/5 flex-shrink-0">
                        <img
                          src={`${API_BASE}${g.image}`}
                          alt={g.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-[color:var(--dk)]">{g.title}</div>
                        <div className="text-sm text-[color:var(--muted)]">{g.category}</div>
                      </div>
                      <button
                        onClick={() => deleteGallery(g.id)}
                        className="px-4 py-2 rounded-xl font-bold bg-white border border-black/10 text-red-600 hover:bg-red-50 transition"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
              </div>
            )}

            {tab === 'booking' && (
              <div className="bg-white border border-black/5 rounded-3xl shadow-xl overflow-hidden">
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[color:var(--dk)] text-lg">Booking</div>
                    <div className="text-sm text-[color:var(--muted)]">Manage appointment bookings.</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[color:var(--muted)]">Booking management coming soon...</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    );
}

