'use client';
import { useState } from 'react';
import { useCreateApplicationMutation } from '@/api/applicationsApi';
import { AnimateIn } from '@/components/layouts/AnimateIn';
import { toast } from 'sonner';
import { careerImage } from '@/lib/config';
export default function CareerPage() {
  const [createApplication, { isLoading: pending }] =
    useCreateApplicationMutation();

  const [fileName, setFileName] = useState('');

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
          minHeight: '70vh',
          height: '70dvh',
          backgroundImage: `url(${careerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      >
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
            Careers
          </h1>

          <div
            style={{
              width: '40px',
              height: '1px',
              backgroundColor: '#d9af61',
              marginTop: '20px',
            }}
          />
        </div>
      </section>
      <section style={{ padding: '100px 48px', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
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
            <form onSubmit={handleSubmit}>
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
                disabled={pending}
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
                {pending ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
