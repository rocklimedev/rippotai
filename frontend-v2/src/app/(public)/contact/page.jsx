'use client';
import { useState } from 'react';
import { AnimateIn } from '@/components/layouts/AnimateIn';
import { toast } from 'sonner';
import { MapPin, Mail, Phone } from 'lucide-react';
import { useCreateQueryMutation } from '@/api/queriesApi';
import { contactImage, contactInfo, googleMapsLink } from '@/lib/config';
import { useCreateApplicationMutation } from '@/api/applicationsApi';
export default function ContactPage() {
  const [createQuery, { isLoading: contactPending }] = useCreateQueryMutation();
  const [createApplication, { isLoading: applicationPending }] =
    useCreateApplicationMutation();

  const [fileName, setFileName] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    fontFamily: "'Lato', sans-serif",
    fontSize: '15px',
    fontWeight: 300,
    color: '#1a3c34',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(26, 60, 52, 0.2)',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    fontFamily: "'Lato', sans-serif",
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#1a3c34',
    marginBottom: '8px',
    display: 'block',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      toast.error('Please fill in all required fields');
      return;
    }

    let finalMessage = message;
    if (phone) {
      finalMessage = `Phone: ${phone}\n\n${message}`;
    }

    try {
      await createQuery({
        branch: 'rippotai', // ✅ Fixed: Now sending branch
        name,
        email,
        subject,
        message: finalMessage,
      }).unwrap();

      toast.success("Message sent successfully! We'll get back to you soon.");

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      const errorMsg =
        err?.data?.message || err?.message || 'Failed to send message.';
      toast.error(errorMsg);
    }
  };
  const handleCareerSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Get the file from input
    const fileInput = e.currentTarget.querySelector('input[name="portfolio"]');
    const resumeFile = fileInput?.files?.[0];

    try {
      // Call RTK Query mutation with a plain object; the mutation will construct FormData
      await createApplication({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        designation: formData.get('designation'),
        interestedIn: formData.get('interestedIn'),
        coverLetter: formData.get('coverLetter') || '', // optional
        resume: resumeFile,
      }).unwrap();

      toast.success("Application submitted successfully! We'll be in touch.");
      e.target.reset();
      setFileName('');
    } catch (err) {
      const errorMsg =
        err?.data?.message || err?.message || 'Failed to submit application.';
      console.log(err);
      toast.error(errorMsg);
    }
  };
  return (
    <>
      {/* Banner */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '80vh', // reduced from 100vh to 70vh
          overflow: 'hidden',
          backgroundColor: '#0a0a0a',
        }}
      >
        <img
          src={contactImage}
          alt="Contact Rippotai"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
        />

        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
        />

        {/* Text */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '48px',
            zIndex: 2,
          }}
        >
          <h1
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 300,
              color: '#ffffff',
              margin: 0,
            }}
          >
            Contact Us
          </h1>
        </div>
      </section>

      {/* Contact Content */}
      <section
        style={{
          padding: '100px 24px',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
          }}
        >
          {/* Left - Form */}
          <div>
            <AnimateIn delay={0.2} distance={50} duration={1.2}>
              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '24px',
                    marginBottom: '24px',
                  }}
                >
                  <div>
                    <label style={labelStyle}>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '24px',
                    marginBottom: '24px',
                  }}
                >
                  <div>
                    <label style={labelStyle}>Phone (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactPending}
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: '#ffffff',
                    backgroundColor: '#1a3c34',
                    border: 'none',
                    padding: '16px 48px',
                    cursor: 'pointer',
                    opacity: contactPending ? 0.8 : 1,
                  }}
                >
                  {contactPending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </AnimateIn>
          </div>

          {/* Right - Info + Map */}
          <div>
            <AnimateIn delay={0.1} distance={50} duration={1.2}>
              <div style={{ marginBottom: '48px' }}>
                <div
                  style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'start',
                    marginBottom: '24px',
                  }}
                >
                  <MapPin
                    size={18}
                    color="#d9af61"
                    style={{ marginTop: '3px', flexShrink: 0 }}
                  />
                  <p
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '15px',
                      fontWeight: 300,
                      color: '#444444',
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {contactInfo.address}
                  </p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center',
                    marginBottom: '24px',
                  }}
                >
                  <Mail size={18} color="#d9af61" style={{ flexShrink: 0 }} />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '15px',
                      fontWeight: 300,
                      color: '#444444',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#d9af61')}
                    onMouseLeave={(e) => (e.target.style.color = '#444444')}
                  >
                    {contactInfo.email}
                  </a>
                </div>
                <div
                  style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
                >
                  <Phone size={18} color="#d9af61" style={{ flexShrink: 0 }} />
                  <a
                    href={`tel:${contactInfo.phone}`}
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '15px',
                      fontWeight: 300,
                      color: '#444444',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#d9af61')}
                    onMouseLeave={(e) => (e.target.style.color = '#444444')}
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
            </AnimateIn>

            {/* Google Maps */}
            <AnimateIn delay={0.3} distance={40} duration={1.2}>
              <div
                style={{ width: '100%', height: '350px', overflow: 'hidden' }}
              >
                <iframe
                  src="https://maps.google.com/maps?q=Rippotai+Architecture,+487/64,+National+Market,+Peeragarhi,+Paschim+Vihar,+New+Delhi,+Delhi+110087&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="350"
                  style={{ border: 0, filter: 'grayscale(0.5)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Rippotai Location"
                />
              </div>
              <a
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: '16px',
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#1a3c34',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#d9af61')}
                onMouseLeave={(e) => (e.target.style.color = '#1a3c34')}
              >
                Get Directions
              </a>
            </AnimateIn>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: '100px 24px',
          backgroundColor: '#fff',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
          }}
        >
          <AnimateIn delay={0} distance={30} duration={1}>
            <h2
              style={{
                fontSize: 'clamp(42px, 6vw, 72px)',
                fontWeight: 300,
                color: '#1a3c34',
                marginBottom: '24px',
                lineHeight: 1,
              }}
            >
              Career
            </h2>
          </AnimateIn>
          <AnimateIn delay={0} distance={40} duration={1}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '16px',
                fontWeight: 300,
                color: '#666666',
                lineHeight: 1.8,
                marginBottom: '60px',
              }}
            >
              We are always looking for talented individuals who share our
              passion for design and architecture. Fill out the form below and
              we will get back to you.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.2} distance={50} duration={1.2}>
            <form onSubmit={handleCareerSubmit}>
              {/* Full Name */}
              <div style={{ marginBottom: '32px' }}>
                <label style={labelStyle}>Full Name</label>
                <input type="text" name="name" required style={inputStyle} />
              </div>

              {/* Phone */}
              <div style={{ marginBottom: '32px' }}>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" name="phone" style={inputStyle} />
              </div>

              {/* Email */}
              <div style={{ marginBottom: '32px' }}>
                <label style={labelStyle}>Email</label>
                <input type="email" name="email" required style={inputStyle} />
              </div>

              {/* Designation */}
              <div style={{ marginBottom: '32px' }}>
                <label style={labelStyle}>Current Designation</label>
                <input type="text" name="designation" style={inputStyle} />
              </div>

              {/* Interested In */}
              <div style={{ marginBottom: '32px' }}>
                <label style={labelStyle}>Interested In</label>
                <select
                  name="interestedIn"
                  required
                  style={{ ...inputStyle, appearance: 'none' }}
                >
                  <option value="">Select a department</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Interior Design">Interior Design</option>
                  <option value="Furniture Design">Furniture Design</option>
                  <option value="Project Management">Project Management</option>
                  <option value="3D Visualization">3D Visualization</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Portfolio / Resume */}
              <div style={{ marginBottom: '48px' }}>
                <label style={labelStyle}>Upload Portfolio / Resume</label>
                <label
                  style={{
                    ...inputStyle,
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: fileName ? '#1a3c34' : '#999999',
                  }}
                >
                  {fileName || 'Choose a file (PDF, ZIP, max 5MB recommended)'}
                  <input
                    type="file"
                    name="portfolio"
                    accept=".pdf,.zip,.doc,.docx"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setFileName(file.name);
                    }}
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={applicationPending}
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  backgroundColor: '#1a3c34',
                  border: 'none',
                  padding: '16px 48px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
              >
                {applicationPending ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
