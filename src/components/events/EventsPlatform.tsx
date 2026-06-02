'use client';

import React, { useState, useEffect } from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { eventVenues, pastEvents } from '@/data/eventsData';
import { useDeck } from '@/context/DeckContext';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { FiUsers, FiCheckCircle, FiChevronRight, FiX, FiCalendar, FiSend } from 'react-icons/fi';

export const EventsPlatform: React.FC = () => {
  const { brandName } = useDeck();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState('Grand Atrium');
  const [formData, setFormData] = useState({
    eventType: 'Product Launch',
    expectedAttendance: '500',
    name: '',
    company: '',
    email: '',
    phone: '',
    eventDate: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Pre-fill company name from global context
  useEffect(() => {
    if (brandName && !formData.company) {
      setFormData(prev => ({ ...prev, company: brandName }));
    }
  }, [brandName, formData.company]);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {eventVenues.map((venue, idx) => (
            <ScrollReveal key={venue.id} delay={idx * 0.1}>
              <div className="h-full rounded-lg bg-surface/50 p-8 border border-gold/10 hover:border-gold/35 hover:bg-surface hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-xl font-display font-semibold text-ivory group-hover:text-gold transition-colors duration-300">
                      {venue.name}
                    </h4>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-gold/10 border border-gold/20 text-[9px] uppercase tracking-widest text-gold font-semibold">
                      <FiUsers size={10} />
                      {venue.capacity.toLocaleString()} Capacity
                    </span>
                  </div>

                  {/* Ideal For */}
                  <div className="mb-6">
                    <span className="block text-[9px] uppercase tracking-wider text-text-secondary mb-2 font-medium">
                      Ideal Use Case
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {venue.idealFor.slice(0, 2).map((use, uIdx) => (
                        <span key={uIdx} className="text-[10px] font-sans px-2 py-0.5 rounded bg-white/5 border border-white/10 text-text-secondary font-light">
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Feature Lists */}
                  <div className="space-y-2 mb-8">
                    <span className="block text-[9px] uppercase tracking-wider text-text-secondary mb-2 font-medium">
                      Architectural Features
                    </span>
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
                  className="w-full mt-6 py-3 border border-gold/30 hover:border-gold hover:bg-gold/5 rounded text-[10px] font-sans font-semibold uppercase tracking-widest text-gold transition-all duration-300 focus-ring"
                >
                  Enquire Availability
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

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

