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
    <div className="min-h-screen bg-[color:var(--bg)]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[color:var(--teal)] text-white flex items-center justify-center font-bold">
              S
            </div>
            <div>
              <div className="font-serif text-2xl font-bold text-[color:var(--dk)] leading-none">
                SmileVista <span className="text-[color:var(--teal)]">Admin</span>
              </div>
              <div className="text-xs text-[color:var(--muted)]">Leads & gallery management</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="px-5 py-2 rounded-xl font-bold bg-[color:var(--teal)] text-white hover:bg-[color:var(--dk)] transition shadow-lg shadow-black/10"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="bg-white border border-black/5 rounded-3xl shadow-xl p-4 h-fit">
            <div className="text-xs font-bold tracking-[0.3em] uppercase text-[color:var(--teal)] px-3 py-2">
              Menu
            </div>
            <nav className="mt-2 space-y-2">
              <button
                onClick={() => setTab('leads')}
                className={[
                  'w-full text-left px-4 py-3 rounded-2xl font-bold border transition',
                  tab === 'leads'
                    ? 'bg-[color:var(--teal)] text-white border-transparent'
                    : 'bg-white border-black/10 text-[color:var(--dk)] hover:bg-[color:var(--soft)]'
                ].join(' ')}
              >
                Leads
              </button>
              <button
                onClick={() => setTab('gallery')}
                className={[
                  'w-full text-left px-4 py-3 rounded-2xl font-bold border transition',
                  tab === 'gallery'
                    ? 'bg-[color:var(--teal)] text-white border-transparent'
                    : 'bg-white border-black/10 text-[color:var(--dk)] hover:bg-[color:var(--soft)]'
                ].join(' ')}
              >
                Gallery
              </button>
            </nav>
          </aside>

          {/* Content */}
          <main className="min-w-0">
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
          </main>
        </div>
      </div>
    </div>
  );
}

