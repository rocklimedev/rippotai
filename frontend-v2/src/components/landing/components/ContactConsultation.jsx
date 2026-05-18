'use client';

import { useState } from 'react';
import { Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateQueryMutation } from '@/api/queriesApi';

export default function ContactConsultation() {
  const [createQuery] = useCreateQueryMutation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const generatedSubject = `DISCOVER CONSULTATION REQUEST`;

  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = () => {
    const e = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      e.name = 'Please enter your name.';
    }

    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) {
      e.email = 'Please enter a valid email.';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      const finalMessage = form.message.trim() || 'Consultation Request';

      await createQuery({
        branch: 'rippotai',
        name: form.name.trim(),
        email: form.email.trim(),
        subject: generatedSubject,
        message: finalMessage,
      }).unwrap();

      setSuccess(true);
      toast.success(
        "Consultation request received. We'll contact you shortly.",
      );
    } catch (err) {
      const msg =
        err?.data?.message || err?.message || 'Failed to submit request.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setForm({ name: '', email: '', message: '' });
    setErrors({});
  };

  return (
    <div className="w-full max-w-2xl mx-auto border border-gray-100 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
      {/* Header */}
      <div className="border-b border-gray-100 px-6 sm:px-8 pt-8 pb-6 text-[#1A3C34]">
        <h2 className="text-3xl sm:text-4xl font-light tracking-[-0.04em]">
          Start your project.
        </h2>
        <p className="mt-3 text-sm font-light leading-relaxed text-[#1A3C34]/80">
          Share your vision and requirements. We’ll connect with you to discuss
          the next steps.
        </p>
      </div>

      {/* Success */}
      {success ? (
        <div className="px-6 sm:px-8 py-12 text-center">
          <CheckCircle2
            size={52}
            strokeWidth={1.2}
            className="mx-auto text-[#1A3C34]"
          />

          <h3 className="mt-6 text-2xl font-light text-[#1A3C34]">
            Thank you.
          </h3>

          <p className="mt-3 text-[#1A3C34]/80 font-light">
            Your consultation request has been received successfully.
          </p>

          <button
            type="button"
            onClick={resetForm}
            className="mt-8 inline-flex items-center gap-2 border border-[#1A3C34]/20 px-8 py-4 text-sm uppercase tracking-[0.18em] text-[#1A3C34] hover:bg-[#1A3C34] hover:text-white transition-all"
          >
            Submit another response
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-8 space-y-6">
          <Field
            label="Name"
            value={form.name}
            onChange={handleChange('name')}
            placeholder="Your full name"
            error={errors.name}
            required
          />

          <Field
            label="Email"
            value={form.email}
            onChange={handleChange('email')}
            placeholder="you@email.com"
            error={errors.email}
            type="email"
          />

          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A3C34]">
              About your project
            </label>

            <textarea
              rows={5}
              value={form.message}
              onChange={handleChange('message')}
              placeholder="Plot size, location, requirements..."
              className="w-full resize-none border border-gray-200 px-4 py-3 text-[#1A3C34] placeholder:text-[#1A3C34]/60 focus:border-[#1A3C34]/40 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-3 bg-[#1A3C34] px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white hover:bg-[#D9AF61] hover:text-[#1A3C34] disabled:opacity-60 transition-all"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending
              </>
            ) : (
              <>
                Request Consultation
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  required,
  type = 'text',
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A3C34]">
        {label} {required && <span className="text-[#D9AF61]">*</span>}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border px-4 py-3 text-[#1A3C34] placeholder:text-[#1A3C34]/60 focus:outline-none transition-all ${
          error ? 'border-red-400' : 'border-gray-200 focus:border-[#1A3C34]/40'
        }`}
      />

      {error && (
        <span className="mt-2 block text-xs text-red-600">{error}</span>
      )}
    </div>
  );
}
