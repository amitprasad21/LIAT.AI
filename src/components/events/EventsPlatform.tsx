'use client';

import React, { useState } from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { eventVenues, pastEvents } from '@/data/eventsData';
import { useDeck } from '@/context/DeckContext';
import { supabase } from '@/lib/supabase';
import { FiUsers, FiCheckCircle, FiChevronRight, FiX, FiSend } from 'react-icons/fi';

const VENUE_IMAGES: Record<string, string> = {
  'grand-atrium': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
  'fashion-catwalk': '/images/runway_event_setup.png', // AI-Imagined Catwalk Setup
  'fountain-plaza': 'https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=600&q=80',
  'ice-rink-event': 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=600&q=80',
  'old-town-island': 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?auto=format&fit=crop&w=600&q=80'
};

export const EventsPlatform: React.FC = () => {
  const { brandName } = useDeck();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState('Grand Atrium');
  
  const [formData, setFormData] = useState({
    eventType: 'Product Launch',
    expectedAttendance: '500',
    name: '',
    company: brandName || '',
    email: '',
    phone: '',
    eventDate: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const [prevBrandName, setPrevBrandName] = useState(brandName);

  // Pre-fill company name from global context on post-mount changes
  if (brandName !== prevBrandName) {
    setPrevBrandName(brandName);
    if (brandName) {
      setFormData(prev => ({ ...prev, company: brandName }));
    }
  }

  // Find max capacity for percentage scaling in CSS bar charts
  const maxCapacity = Math.max(...eventVenues.map((v) => v.capacity));

  const handleOpenBooking = (venueName: string) => {
    setSelectedVenue(venueName);
    setModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email || !formData.phone || !formData.eventDate) {
      alert('Please fill in all required fields.');
      return;
    }

    setStatus('loading');

    try {
      const { error } = await supabase.from('venue_enquiries').insert([
        {
          venue_name: selectedVenue,
          event_type: formData.eventType,
          expected_attendance: parseInt(formData.expectedAttendance, 10),
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          event_date: formData.eventDate,
        }
      ]);

      if (error) throw error;

      setStatus('success');
      setFormData({
        eventType: 'Product Launch',
        expectedAttendance: '500',
        name: '',
        company: '',
        email: '',
        phone: '',
        eventDate: ''
      });
      setTimeout(() => {
        setStatus('idle');
        setModalOpen(false);
      }, 3000);
    } catch (err) {
      console.error('Error submitting venue booking enquiry:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section
      id="events"
      className="relative w-full py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-transparent border-t border-white/50 overflow-hidden"
      aria-label="Events and Venues Platform"
    >
      {/* Dynamic Background Accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-crimson/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          badge="06 / GLOBAL ACTIVATIONS"
          title="The Stage for the World's Most Ambitious Brands."
          subtitle="Unmatched architectural scale designed for high-impact commercial launches."
        />

        {/* CSS Capacity Comparison Bar Chart */}
        <ScrollReveal className="mb-24 max-w-4xl mx-auto p-8 rounded-lg bg-surface border border-gold/15">
          <h3 className="text-lg font-display font-medium text-gold-light mb-2 text-center sm:text-left">
            Venue Capacity Benchmarks
          </h3>
          <p className="text-xs text-text-secondary mb-8 text-center sm:text-left">
            Comparative maximum guest capacities per specialized event zone.
          </p>

          <div className="space-y-6">
            {eventVenues.map((venue) => {
              const pct = (venue.capacity / maxCapacity) * 100;
              return (
                <div key={venue.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  {/* Venue Name Label */}
                  <span className="w-full sm:w-48 text-xs font-sans uppercase tracking-wider text-ivory font-medium">
                    {venue.name}
                  </span>

                  {/* Horizontal Bar Area */}
                  <div className="flex-grow bg-[#D1D9E6] neu-inset h-3.5 rounded-full overflow-hidden border border-white/40 relative">
                    <div
                      style={{ width: `${pct}%` }}
                      className="h-full bg-gradient-to-r from-gold/50 via-gold to-gold-light rounded-full transition-all duration-1000 ease-out"
                    />
                  </div>

                  {/* Capacity Count Badge */}
                  <span className="w-24 text-right text-xs font-sans font-semibold text-gold-light">
                    {venue.capacity.toLocaleString()} PAX
                  </span>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Infinite Past Events Marquee Ticker */}
        <div className="mb-24 relative overflow-hidden py-4 border-y border-gold/15 bg-surface/20">
          <div className="flex w-[200%] gap-12 animate-[marquee_25s_linear_infinite]">
            <div className="flex justify-around items-center w-1/2 gap-8 text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] text-gold-light font-medium select-none">
              {pastEvents.map((evt, idx) => (
                <div key={idx} className="flex items-center gap-3 shrink-0">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                  <span>{evt}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-around items-center w-1/2 gap-8 text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] text-gold-light font-medium select-none">
              {pastEvents.map((evt, idx) => (
                <div key={idx + 100} className="flex items-center gap-3 shrink-0">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                  <span>{evt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Custom Venue specification Cards Grid */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {eventVenues.map((venue, idx) => (
            <ScrollReveal key={venue.id} delay={idx * 0.1} className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] max-w-[380px] flex flex-col">
              <div className="h-full rounded-2xl bg-surface border border-slate-200/60 overflow-hidden flex flex-col justify-between group transition-all duration-500 hover:border-gold/30 hover:shadow-[0_15px_45px_rgba(30,58,138,0.04)] min-h-[460px] shadow-sm">
                
                {/* Top Half: Venue Image Preview */}
                <div className="h-48 relative overflow-hidden border-b border-slate-100 shrink-0">
                  <img
                    src={VENUE_IMAGES[venue.id] || '/images/leasing_showroom.png'}
                    alt={venue.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-750 group-hover:scale-105 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                  
                  {/* Capacity badge overlaid on the image */}
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-black/45 backdrop-blur-sm border border-white/10 text-[9px] uppercase tracking-widest text-white font-semibold">
                    <FiUsers size={10} />
                    {venue.capacity.toLocaleString()} Pax
                  </span>
                </div>

                {/* Bottom Half: Spec Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-display font-semibold text-ivory group-hover:text-gold transition-colors duration-300 mb-3">
                      {venue.name}
                    </h4>

                    {/* Ideal Use Case */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1.5">
                        {venue.idealFor.slice(0, 2).map((use, uIdx) => (
                          <span key={uIdx} className="text-[9px] font-sans px-2 py-0.5 rounded bg-slate-50 border border-slate-200/50 text-text-secondary">
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-1.5">
                      {venue.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-text-secondary font-sans font-light">
                          <FiCheckCircle className="text-gold flex-shrink-0" size={12} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenBooking(venue.name)}
                    className="w-full mt-6 py-2.5 bg-gold/5 border border-gold/15 text-gold hover:bg-gold hover:text-background rounded text-[9px] font-sans font-bold uppercase tracking-widest transition-all duration-350 focus-ring"
                  >
                    Enquire Availability
                  </button>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* AI-Imagined Runway Setup Showcase */}
        <ScrollReveal className="mb-16 max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-gold/15 bg-surface h-72 relative group shadow-sm">
            <img
              src="/images/runway_event_setup.png"
              alt="AI-Imagined Runway Event Setup"
              className="absolute inset-0 w-full h-full object-cover opacity-90 hover:scale-[1.02] transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/50 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-8 md:p-12 z-20 max-w-lg text-white">
              <span className="text-[9px] uppercase tracking-[0.3em] text-gold-light font-bold mb-2">
                AI DESIGN PLATFORM
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-semibold mb-3">
                Immersive Catwalk Setup
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                An AI-generated vision of a bespoke runway event setup in the Grand Atrium, showcasing high-density projection structures and custom guest configurations.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom CTA Block */}
        <ScrollReveal className="text-center" delay={0.2}>
          <button
            onClick={() => handleOpenBooking('Grand Atrium')}
            className="inline-flex items-center gap-2 group px-8 py-4 rounded bg-gold text-background text-xs uppercase tracking-[0.2em] font-sans font-bold hover:bg-gold-light transition-all duration-300 shadow-[0_4px_20px_rgba(201,168,76,0.15)] focus-ring"
          >
            Enquire About Venue Availability
            <FiChevronRight className="transform group-hover:translate-x-1.5 transition-transform duration-300" size={16} />
          </button>
        </ScrollReveal>

      </div>

      {/* 2. Interactive Venue Booking Modal Overlay */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 w-full h-screen bg-black/85 backdrop-blur-md flex justify-center items-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="relative w-full max-w-2xl bg-surface border border-gold/20 rounded-lg p-6 md:p-10 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-text-secondary hover:text-gold p-1 rounded focus-ring"
              aria-label="Close Booking Modal"
            >
              <FiX size={20} />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                VENUE BOOKING REGISTRY
              </span>
              <h3 id="modal-title" className="font-display text-2xl font-medium text-ivory">
                Enquire: {selectedVenue}
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                Configure your event specifications to initiate scheduling synchronization.
              </p>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="venue-name" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                    Requested Venue Space
                  </label>
                  <select
                    id="venue-name"
                    value={selectedVenue}
                    onChange={(e) => setSelectedVenue(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring"
                  >
                    <option value="Grand Atrium">Grand Atrium (4,000 Cap)</option>
                    <option value="Fashion Catwalk">Fashion Catwalk (1,200 Cap)</option>
                    <option value="Fountain Plaza">Fountain Plaza (8,000 Cap)</option>
                    <option value="Ice Rink Event Mode">Ice Rink Event Mode (1,800 Cap)</option>
                    <option value="Old Town Island Bridge & Plaza">Old Town Island (5,000 Cap)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="event-type" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                    Event Type / Concept
                  </label>
                  <select
                    id="event-type"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring"
                  >
                    <option value="Product Launch">Global Product Launch</option>
                    <option value="Fashion Show">Haute Couture Runway Show</option>
                    <option value="Corporate Gala">Corporate VIP Banquet</option>
                    <option value="Esports Tournament">Esports / Gaming Arena</option>
                    <option value="Concert">Concert / Musical Event</option>
                    <option value="Exhibition">Art / Heritage Exhibition</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expected-attendance" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                    Expected Attendance (PAX)
                  </label>
                  <input
                    id="expected-attendance"
                    name="expectedAttendance"
                    type="number"
                    required
                    min="1"
                    value={formData.expectedAttendance}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring"
                  />
                </div>

                <div>
                  <label htmlFor="event-date" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                    Requested Event Date
                  </label>
                  <div className="relative">
                    <input
                      id="event-date"
                      name="eventDate"
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-50 neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-name" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                    Your Full Name
                  </label>
                  <input
                    id="booking-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Richard Rogers"
                    className="w-full px-4 py-2.5 bg-slate-50 neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring placeholder-slate-400"
                  />
                </div>

                <div>
                  <label htmlFor="booking-company" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                    Company / Organization
                  </label>
                  <input
                    id="booking-company"
                    name="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g. Rolex Middle East"
                    className="w-full px-4 py-2.5 bg-slate-50 neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring placeholder-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-email" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                    Corporate Email
                  </label>
                  <input
                    id="booking-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. r.rogers@rolex.com"
                    className="w-full px-4 py-2.5 bg-slate-50 neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring placeholder-slate-400"
                  />
                </div>

                <div>
                  <label htmlFor="booking-phone" className="block text-[9px] uppercase tracking-wider text-text-secondary mb-1.5 font-medium">
                    Contact Phone Number
                  </label>
                  <input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +971 50 123 4567"
                    className="w-full px-4 py-2.5 bg-slate-50 neu-inset border border-white/60 rounded text-xs text-text-primary focus:border-gold transition-all duration-300 focus-ring placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Status Notices */}
              {status === 'success' && (
                <div className="p-3 rounded border border-green-500/20 bg-green-500/10 text-xs text-green-400 font-sans text-center">
                  Success! Your venue booking request has been registered in our database.
                </div>
              )}
              {status === 'error' && (
                <div className="p-3 rounded border border-red-500/20 bg-red-500/10 text-xs text-red-400 font-sans text-center">
                  Error syncing venue booking request. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full mt-4 py-3.5 rounded bg-gold text-background text-xs uppercase tracking-[0.25em] font-sans font-bold hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2 focus-ring disabled:opacity-50"
              >
                {status === 'loading' ? (
                  'Filing Booking Request...'
                ) : (
                  <>
                    Request Venue Reservation
                    <FiSend size={12} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Styled Marquee Animation styles inside inline tag for convenience */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

