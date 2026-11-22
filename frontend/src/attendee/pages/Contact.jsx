import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hook to POST /api/contact later if you add a backend contact controller
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className="es-page-wrap">
      <section className="es-contact-grid">
        <div>
          <span className="es-kicker">Contact us</span>
          <h1 style={{ fontSize: 'var(--es-fs-2xl)', fontWeight: 800, margin: '0 0 1rem', lineHeight: 1.1 }}>
            Have a question about an expo?
          </h1>
          <p style={{ color: 'var(--es-grey)', lineHeight: 1.65, margin: 0 }}>
            Reach out for exhibitor booth inquiries, organizer onboarding, or attendee support.
          </p>

          <div className="es-contact-list">
            <div className="es-contact-item">
              <strong>Support Email</strong>
              <span>support@eventsphere.io</span>
            </div>
            <div className="es-contact-item">
              <strong>Exhibitor Desk</strong>
              <span>exhibitors@eventsphere.io</span>
            </div>
            <div className="es-contact-item">
              <strong>Hours</strong>
              <span>Monday – Saturday, 9:00 AM – 6:00 PM</span>
            </div>
          </div>
        </div>

        <div className="es-auth-card" style={{ maxWidth: '100%' }}>
          <form className="es-form" onSubmit={handleSubmit}>
            {submitted && (
              <div className="es-alert es-alert--success">
                Thanks for reaching out—your message has been received and our team will reply shortly.
              </div>
            )}

            <div className="es-field">
              <label htmlFor="c-name">Your name</label>
              <input
                id="c-name"
                type="text"
                required
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="es-field">
              <label htmlFor="c-email">Email address</label>
              <input
                id="c-email"
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="es-field">
              <label htmlFor="c-subject">Topic</label>
              <input
                id="c-subject"
                type="text"
                required
                placeholder="Booth booking, ticketing, partnership..."
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
            </div>

            <div className="es-field">
              <label htmlFor="c-message">Message</label>
              <textarea
                id="c-message"
                rows={4}
                required
                placeholder="Tell us how we can help..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <button type="submit" className="es-btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}