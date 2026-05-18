'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateQueryMutation } from '@/api/queriesApi';

export default function ConsultationDialog({ open, onOpenChange, slug = '' }) {
  const [createQuery] = useCreateQueryMutation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const generatedSubject = `DISCOVER ${slug?.replace(/-/g, ' ')?.toUpperCase()} CTA`;

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

  const handleDialogChange = (value) => {
    if (!value) {
      setTimeout(() => {
        setSuccess(false);
        setForm({ name: '', email: '', message: '' });
        setErrors({});
      }, 250);
    }
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="w-[calc(100vw-1.5rem)] sm:max-w-[560px] max-h-[92vh] overflow-y-auto border border-gray-100 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.15)] p-0 rounded-none">
        <div className="grid grid-cols-1">
          {/* Header */}
          <div className="relative border-b border-gray-100 bg-white px-6 sm:px-8 pt-8 pb-6 text-[#1A3C34]">
            <DialogHeader className="relative z-10 space-y-3 text-left">
              <DialogTitle className="text-3xl sm:text-4xl font-light tracking-[-0.04em] text-[#1A3C34]">
                Start your project.
              </DialogTitle>
              <p className="max-w-md text-sm font-light leading-relaxed text-[#1A3C34]/80">
                Share your vision and requirements. We’ll connect with you to
                discuss the next steps.
              </p>
            </DialogHeader>
          </div>

          {/* Success State */}
          {success ? (
            <div className="px-6 sm:px-8 py-12 text-center bg-white">
              <CheckCircle2
                size={52}
                strokeWidth={1.2}
                className="mx-auto text-[#1A3C34]"
              />
              <h3 className="mt-6 text-2xl font-light text-[#1A3C34]">
                Thank you.
              </h3>
              <p className="mt-3 text-[#1A3C34]/80 font-light leading-relaxed">
                Your consultation request has been received successfully.
              </p>

              <button
                type="button"
                onClick={() => handleDialogChange(false)}
                className="mt-8 inline-flex items-center gap-2 rounded-none border border-[#1A3C34]/20 bg-white px-8 py-4 text-sm uppercase tracking-[0.18em] text-[#1A3C34] hover:bg-[#1A3C34] hover:text-white transition-all duration-500"
              >
                Close
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="px-6 sm:px-8 py-7 sm:py-8 space-y-6 bg-white"
            >
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
                  rows={4}
                  value={form.message}
                  onChange={handleChange('message')}
                  placeholder="Plot size, location, requirements..."
                  className="w-full resize-none rounded-none border border-gray-200 bg-white px-4 py-3 text-[#1A3C34] placeholder:text-[#1A3C34]/60 focus:border-[#1A3C34]/40 focus:outline-none transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="group w-full inline-flex items-center justify-center gap-3 rounded-none bg-[#1A3C34] px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white hover:bg-[#D9AF61] hover:text-[#1A3C34] disabled:cursor-not-allowed disabled:opacity-60 transition-all duration-500"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Request Consultation
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-500 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
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
        {label}
        {required && <span className="text-[#D9AF61]"> *</span>}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-none border bg-white px-4 py-3 text-[#1A3C34] placeholder:text-[#1A3C34]/60 transition-all duration-300 focus:outline-none ${
          error
            ? 'border-red-400 focus:border-red-500'
            : 'border-gray-200 focus:border-[#1A3C34]/40'
        }`}
      />

      {error && (
        <span className="mt-2 block text-xs text-red-600">{error}</span>
      )}
    </div>
  );
}
