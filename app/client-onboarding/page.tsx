'use client';

import { useState } from 'react';
import { Pen, CheckCircle, Shield } from 'lucide-react';

export default function ClientOnboarding() {
  const [view, setView] = useState<'client' | 'admin'>('client');
  const [signedIn, setSignedIn] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    contact: '',
    alternate: '',
    email: '',
    password: '',
    newDomainEmail: false,
    ecommerce: false,
    requirements: '',
  });
  const [docs, setDocs] = useState<{ aadhaarFront?: string; aadhaarBack?: string; panFront?: string; panBack?: string }>({});
  const [signature, setSignature] = useState('');
  const [adminAuth, setAdminAuth] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submitOnboarding = async () => {
    setSubmitting(true);
    try {
      await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, docs, signature }),
      });
      alert('Submitted successfully');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFile = (key: keyof typeof docs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setDocs((p) => ({ ...p, [key]: file.name }));
  };

  if (view === 'admin' && !adminAuth) {
    return (
      <main className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b1728] p-8">
          <h1 className="text-2xl font-bold text-cyan-300 mb-6">Admin Login</h1>
          <input placeholder="Admin username" className="w-full mb-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3" />
          <input type="password" placeholder="Admin password" className="w-full mb-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3" />
          <button onClick={() => setAdminAuth(true)} className="w-full rounded-full bg-cyan-400 py-3 font-semibold text-slate-950">Sign In</button>
          <button onClick={() => setView('client')} className="mt-3 w-full text-sm text-slate-400">Back to client portal</button>
        </div>
      </main>
    );
  }

  if (view === 'admin') {
    return (
      <main className="min-h-screen bg-[#0f172a] text-white p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-cyan-300">Admin Panel</h1>
            <button onClick={() => { setAdminAuth(false); setView('client'); }} className="rounded-full border border-white/10 px-4 py-2 text-sm">Logout</button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {['Manage Users', 'Generate Credentials', 'Manage Documents', 'Terms & Clauses', 'Edit Sections', 'Manage Profiles'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-[#0b1728] p-6">
                <h3 className="font-semibold text-lg">{item}</h3>
                <p className="mt-2 text-sm text-slate-400">Configure and manage {item.toLowerCase()}.</p>
                <button className="mt-4 rounded-full bg-cyan-400/20 px-4 py-2 text-sm text-cyan-200">Open</button>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-white/10 bg-[#0b1728] p-6">
            <h2 className="text-xl font-semibold mb-4">Generate Client Credentials</h2>
            <div className="grid gap-3 md:grid-cols-3">
              <input placeholder="Client name" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3" />
              <input placeholder="Email ID" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3" />
              <input placeholder="Password" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3" />
            </div>
            <button className="mt-4 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950">Create Credentials</button>
          </div>
        </div>
      </main>
    );
  }

  if (!signedIn) {
    return (
      <main className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b1728] p-8">
          <h1 className="text-2xl font-bold text-cyan-300 mb-2">Client Onboarding Portal</h1>
          <p className="text-sm text-slate-400 mb-6">Sign in with credentials provided by Pulseon Solutions.</p>
          <input placeholder="Email ID" className="w-full mb-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3" />
          <input type="password" placeholder="Password" className="w-full mb-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3" />
          <button onClick={() => setSignedIn(true)} className="w-full rounded-full bg-cyan-400 py-3 font-semibold text-slate-950">Sign In</button>
          <button onClick={() => setView('admin')} className="mt-4 w-full text-sm text-slate-400">Admin access</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold text-cyan-300">Welcome to Pulseon Onboarding</h1>

        <section className="rounded-2xl border border-white/10 bg-[#0b1728] p-6 space-y-4">
          <h2 className="text-xl font-semibold">Your Details</h2>
          <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" />
          <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact Number" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" />
          <input name="alternate" value={form.alternate} onChange={handleChange} placeholder="Alternate Number" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" />
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Email Password" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="newDomainEmail" checked={form.newDomainEmail} onChange={handleChange} />
            Create a new domain email instead
          </label>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#0b1728] p-6 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2"><Shield size={18} /> Documents (Ecommerce / Domain Verification)</h2>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="ecommerce" checked={form.ecommerce} onChange={handleChange} /> Developing ecommerce website with payment gateway</label>
          {['aadhaarFront', 'aadhaarBack', 'panFront', 'panBack'].map((k) => (
            <div key={k}>
              <label className="block text-sm mb-1">{k}</label>
              <input type="file" onChange={handleFile(k as any)} className="w-full text-sm" />
              {docs[k as keyof typeof docs] && <p className="text-xs text-cyan-300 mt-1">{docs[k as keyof typeof docs]}</p>}
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#0b1728] p-6 space-y-4">
          <h2 className="text-xl font-semibold">Requirements</h2>
          <textarea name="requirements" value={form.requirements} onChange={handleChange} rows={5} placeholder="Describe what you need" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" />
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#0b1728] p-6 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2"><Pen size={18} /> Digital Signature</h2>
          <p className="text-sm text-slate-400">Review terms, rates and conditions, then sign below.</p>
          <textarea value={signature} onChange={(e) => setSignature(e.target.value)} rows={3} placeholder="Type your signature" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" />
          <button onClick={submitOnboarding} disabled={submitting} className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 flex items-center gap-2"><CheckCircle size={16} /> {submitting ? 'Submitting...' : 'Sign & Submit'}</button>
        </section>
      </div>
    </main>
  );
}
