'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import {
  Globe,
  Smartphone,
  Settings,
  Zap,
  Palette,
  Menu,
  X,
  Sparkles,
  MonitorSmartphone,
} from 'lucide-react';

type FormState = {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
};

const services = [
  {
    title: 'Web Development',
    description:
      'Fast, responsive business websites and custom web platforms built for growth.',
    icon: <Globe size={28} />,
  },
  {
    title: 'Application Development',
    description:
      'We build modern, fast, and user-friendly applications tailored to your business needs. From idea to launch, our focus is on performance, scalability, and seamless user experience.',
    icon: <Smartphone size={28} />,
  },
  {
    title: 'Custom Software Development',
    description:
      'We develop customized software solutions designed specifically for your business processes. Our solutions help improve efficiency, automate tasks, and support long-term growth.',
    icon: <Settings size={28} />,
  },
  {
    title: 'Automation',
    description:
      'Workflow and process automation to save time and reduce manual effort.',
    icon: <Zap size={28} />,
  },
  {
    title: 'Graphic Design',
    description:
      'With a focus on creativity, innovation, and precision, we help transform your ideas into impactful visual experiences that drive engagement and growth.',
    icon: <Palette size={28} />,
  },
];

const highlights = [
  { value: '99%', label: 'Client-first delivery' },
  { value: '24/7', label: 'Support mindset' },
  { value: '3x', label: 'Faster execution process' },
];

const processSteps = [
  'Understand your business goals and technical requirements',
  'Design a clean solution architecture and implementation roadmap',
  'Build, test, launch, and support the final solution',
];

const initialFormState: FormState = {
  name: '',
  email: '',
  company: '',
  service: 'Web Development',
  message: '',
};

export default function Home() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setStatusMessage(
        'Your message has been sent successfully. We will contact you soon.'
      );
      setFormData(initialFormState);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to submit the form right now.';
      setStatusMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a
            href="#home"
            className="flex items-center gap-2 sm:gap-3"
            onClick={closeMobileMenu}
            >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/10 shadow-md overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.7)]">
  <Image
    src="/pulseonlogo.jpeg"
    alt="Pulseon Logo"
    width={140}
    height={100}
    className="object-contain transition-transform duration-300 hover:scale-110"
  />
</div>

            <div className="pl-2 sm:pl-3">
              <p className="text-base font-semibold tracking-wide sm:text-lg">
                Pulseon Solutions
              </p>
              <p className="text-[11px] text-slate-400 sm:text-xs">
                Build smarter. Scale faster
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#home" className="transition hover:text-white">
              Home
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#services" className="transition hover:text-white">
              Services
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20 md:inline-flex"
            >
              Let&apos;s Connect
            </a>

            <button
              type="button"
              aria-label="Toggle Menu"
              className="inline-flex items-center justify-center rounded-full border border-white/10 p-2 text-white md:hidden"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#07111f] px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-4 text-sm text-slate-300">
              <a href="#home" onClick={closeMobileMenu} className="hover:text-white">
                Home
              </a>
              <a href="#about" onClick={closeMobileMenu} className="hover:text-white">
                About
              </a>
              <a href="#services" onClick={closeMobileMenu} className="hover:text-white">
                Services
              </a>
              <a href="#contact" onClick={closeMobileMenu} className="hover:text-white">
                Contact
              </a>
              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20"
              >
                Let&apos;s Connect
              </a>
            </nav>
          </div>
        )}
      </header>
<section id="home" className="relative overflow-hidden">
  <div className="absolute inset-0 pointer-events-none">
    <Image
      src="/images/heroimg.webp"
      alt="Pulseon hero"
      fill
      priority
      className="object-cover opacity-20"
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_25%),linear-gradient(180deg,rgba(7,17,31,0.78),rgba(7,17,31,0.98))]" />
  </div>

  <div className="relative">
    {/* Mobile Hero */}
    <div className="block px-4 pb-10 pt-3 sm:px-6 md:hidden">
      <div className="mx-auto max-w-7xl">
        {/* Hero Image first under navbar */}
        <div className="relative mt-5 mb-6">
          <div className="relative h-[170px] w-full overflow-hidden rounded-[1rem] border border-white/10 shadow-2xl shadow-cyan-950/40">
            <Image
              src="/images/heroimage.jpg"
              alt="Pulseon Solutions Hero"
              fill
              priority
              className="object-cover animate-[pulse_6s_ease-in-out_infinite]"
            />
          </div>

          {/* Floating small card 1 */}
          <div className="absolute -left-1 top-3 rounded-2xl border border-cyan-400/20 bg-[#07111f]/80 px-3 py-2 backdrop-blur-md animate-[bounce_4s_ease-in-out_infinite]">
            <div className="flex items-center gap-2 text-cyan-300">
              <Sparkles size={16} />
              <span className="text-[11px] font-medium">Creative Design</span>
            </div>
          </div>

          {/* Floating small card 2 */}
          <div className="absolute -right-1 bottom-3 rounded-2xl border border-cyan-400/20 bg-[#07111f]/80 px-3 py-2 backdrop-blur-md animate-[bounce_5s_ease-in-out_infinite]">
            <div className="flex items-center gap-2 text-cyan-300">
              <MonitorSmartphone size={16} />
              <span className="text-[11px] font-medium">Web + App Solutions</span>
            </div>
          </div>
        </div>

        <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
          Professional digital solutions for startups and growing businesses
        </span>

        <h1 className="mt-4 text-[1.3rem] font-bold leading-tight tracking-tight text-white">
          Modern websites, cloud-ready systems, and dependable tech support.
        </h1>

        <p className="mt-4 text-sm leading-7 text-slate-300">
          Pulseon Solutions helps businesses build a strong digital presence with
          clean design, reliable development, and practical technology services
          that create real results.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <a
            href="#contact"
            className="rounded-full bg-cyan-400 px-6 py-3 text-center font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5"
          >
            Start Your Project
          </a>
          <a
            href="#services"
            className="rounded-full border border-white/15 px-6 py-3 text-center font-semibold text-white transition duration-300 hover:bg-white/5"
          >
            Explore Services
          </a>
        </div>

        <div className="mt-8 grid gap-4">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/10 backdrop-blur-sm"
            >
              <p className="text-2xl font-bold text-cyan-300">{item.value}</p>
              <p className="mt-1 text-sm text-slate-300">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Desktop / Tablet Hero */}
    <div className="hidden md:block">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-200">
            Professional digital solutions for startups and growing businesses
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl xl:text-5x1">
            Modern websites, cloud-ready systems, and dependable tech support.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Pulseon Solutions helps businesses build a strong digital presence with
            clean design, reliable development, and practical technology services
            that create real results.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5"
            >
              Start Your Project
            </a>
            <a
              href="#services"
              className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-white/5"
            >
              Explore Services
            </a>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/10 backdrop-blur-sm"
              >
                <p className="text-2xl font-bold text-cyan-300">{item.value}</p>
                <p className="mt-1 text-sm text-slate-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <div className="relative h-[380px] w-full md:h-[500px] lg:h-[650px] xl:h-[720px] lg:w-[120%] xl:w-[130%]">
            <div className="absolute -left-6 top-10 rounded-2xl border border-cyan-400/20 bg-[#07111f]/80 px-4 py-3 backdrop-blur-md animate-[bounce_4s_ease-in-out_infinite]">
              <div className="flex items-center gap-2 text-cyan-300">
                <Sparkles size={18} />
                <span className="text-sm font-medium">Creative Design</span>
              </div>
            </div>

            <div className="absolute -right-6 bottom-10 rounded-2xl border border-cyan-400/20 bg-[#07111f]/80 px-4 py-3 backdrop-blur-md animate-[bounce_5s_ease-in-out_infinite]">
              <div className="flex items-center gap-2 text-cyan-300">
                <MonitorSmartphone size={18} />
                <span className="text-sm font-medium">Web + App Solutions</span>
              </div>
            </div>

            <Image
              src="/images/heroimage.jpg"
              alt="Pulseon Solutions Hero"
              fill
              priority
              className="rounded-4xl border border-white/10 object-cover shadow-2xl shadow-cyan-950/40 transition duration-700 hover:scale-110 animate-[floatY_6s_ease-in-out_infinite]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      <section id="about" className="animate-[fadeInUp_0.8s_ease-out] mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-4xl border border-white/10 bg-[#0b1728] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              About Pulseon
            </p>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
              A growing technology partner for businesses that want clarity and
              quality.
            </h2>
            <p className="mt-6 text-sm text-slate-300 sm:text-base">
              We focus on delivering practical and professional digital solutions.
              From business websites and support systems to cloud guidance and
              automation, our goal is to make technology simple, useful, and scalable
              for every client.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              [
                'Professional Design',
                'Modern layouts, clear typography, and premium section structure.',
              ],
              [
                'Reliable Development',
                'Clean implementation using Next.js for performance and scalability.',
              ],
              [
                'Database Integration',
                'Ready to collect real customer inquiries and store them securely.',
              ],
              [
                'Long-Term Support',
                'A flexible foundation that can grow with your business needs.',
              ],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 sm:p-6"
              >
                <h3 className="text-lg font-semibold sm:text-xl">{title}</h3>
                <p className="mt-3 text-sm text-slate-300 sm:text-base">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#0b1728] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Services
            </p>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
              Solutions designed to make your brand stronger and operations smoother.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-[1.75rem] border border-white/10 bg-[#07111f] p-5 transition hover:-translate-y-1 hover:border-cyan-400/30 sm:p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
                  {service.icon}
                </div>
                <h3 className="mt-6 text-lg font-semibold sm:text-xl">{service.title}</h3>
                <p className="mt-3 text-sm text-slate-300 sm:text-base">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Our Process
            </p>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
              A simple workflow that keeps projects organized and transparent.
            </h2>
            <p className="mt-4 text-sm text-slate-300 sm:text-base">
              We keep the process clear from planning to delivery so clients always
              understand what is being built, why it matters, and what comes next.
            </p>
          </div>

          <div className="space-y-5">
            {processSteps.map((step, index) => (
              <div
                key={step}
                className="flex gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 sm:gap-5 sm:p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-base font-bold text-slate-950 sm:h-12 sm:w-12 sm:text-lg">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-base font-semibold sm:text-lg">Step {index + 1}</h3>
                  <p className="mt-2 text-sm text-slate-300 sm:text-base">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#0b1728] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Contact
            </p>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
              Let&apos;s discuss your next technology project.
            </h2>
            <p className="mt-4 text-sm text-slate-300 sm:text-base">
              The contact form below is connected to a database-ready backend, so
              inquiries can be stored properly instead of showing only a browser
              alert.
            </p>
            <div className="mt-8 space-y-4 text-sm text-slate-300 sm:text-base">
              <p>
                <span className="font-semibold text-white">Email:</span>{' '}
                <a
                  href="mailto:info@pulseonsolutions.in"
                  className="break-all text-blue-400 hover:underline"
                >
                  info@pulseonsolutions.in
                </a>
              </p>
            </div>

            <p className="text-sm text-slate-300 sm:text-base">
              <span className="font-semibold text-white">Support:</span> Business
              websites, Application development, Custom software, and graphic design
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-4xl border border-white/10 bg-[#07111f] p-5 shadow-2xl shadow-black/20 sm:p-6 lg:p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Company Name
                </label>
                <input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your company"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
                />
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Service Needed
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
                >
                  {services.map((service) => (
                    <option
                      key={service.title}
                      value={service.title}
                      className="bg-slate-900"
                    >
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Project Details
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                placeholder="Tell us about your requirement"
                required
                className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </button>

            {statusMessage ? (
              <p className="mt-4 text-sm text-slate-300">{statusMessage}</p>
            ) : null}
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#07111f] py-9">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-center text-sm text-slate-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:text-left">
          <p>© 2026 Pulseon Solutions. All rights reserved</p>

          <p className="font-semibold text-white">Proudly Built in India.</p>

          <div className="flex items-center justify-center gap-5">
            <h1 className="text-base font-bold text-white">Socials</h1>

            <a
              href="https://www.instagram.com/pulseonsolutions?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-pink-500 sm:h-14 sm:w-14"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.75 2C4.68 2 2 4.68 2 7.75v8.5C2 19.32 4.68 22 7.75 22h8.5C19.32 22 22 19.32 22 16.25v-8.5C22 4.68 19.32 2 16.25 2h-8.5zm0 2h8.5C18.21 4 20 5.79 20 7.75v8.5c0 1.96-1.79 3.75-3.75 3.75h-8.5C5.79 20 4 18.21 4 16.25v-8.5C4 5.79 5.79 4 7.75 4zm4.25 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.25-2.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/company/pulseon-solutions-pvt/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 text-blue-500 sm:h-11 sm:w-11"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zM7.12 20H3.56V9h3.56v11zM5.34 7.5c-1.14 0-2.06-.93-2.06-2.07 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.07-2.06 2.07zM20.44 20h-3.56v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V20h-3.56V9h3.42v1.5h.05c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.49V20z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
