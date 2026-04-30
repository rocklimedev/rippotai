import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { submitLead } from "@/lib/api";
import { toast } from "sonner";

export default function ConsultationDialog({ open, onOpenChange }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (k) => (e) => {
    setForm((s) => ({ ...s, [k]: e.target.value }));
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = "Please enter your name.";
    if (!form.phone.trim() || !/^[+\d][\d\s\-()]{5,}$/.test(form.phone.trim()))
      e.phone = "Please enter a valid phone number.";
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim()))
      e.email = "Please enter a valid email.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await submitLead({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        message: form.message.trim() || undefined,
      });
      setSuccess(true);
      toast.success("Consultation request received.");
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        "Could not submit. Please try again in a moment.";
      toast.error(typeof msg === "string" ? msg : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenChange = (v) => {
    if (!v) {
      // Reset on close
      setTimeout(() => {
        setSuccess(false);
        setForm({ name: "", phone: "", email: "", message: "" });
        setErrors({});
      }, 250);
    }
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        data-testid="consultation-dialog"
        className="w-[calc(100vw-1.5rem)] sm:w-auto sm:max-w-[560px] max-h-[92vh] overflow-y-auto bg-white p-0 border border-[#1A3C34]/15 rounded-none"
      >
        <div className="grid grid-cols-1">
          {/* Header strip */}
          <div className="bg-[#1A3C34] text-white px-6 sm:px-8 pt-7 sm:pt-8 pb-5 sm:pb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#D9AF61]" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#D9AF61]">
                Consultation
              </span>
            </div>
            <DialogHeader className="space-y-2 text-left">
              <DialogTitle
                data-testid="consultation-dialog-title"
                className="font-heading text-2xl md:text-3xl font-light tracking-tight text-white"
              >
                Start with clarity.
              </DialogTitle>
              <DialogDescription className="text-white/80 text-sm font-light">
                Share a few details. We will reach out within 24 hours.
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Body */}
          {success ? (
            <div
              data-testid="consultation-success"
              className="px-6 sm:px-8 py-10 sm:py-12 text-center"
            >
              <CheckCircle2
                size={44}
                className="mx-auto text-[#1A3C34]"
                strokeWidth={1.2}
              />
              <h3 className="mt-6 font-heading text-2xl text-[#1A3C34] font-light">
                Thank you.
              </h3>
              <p className="mt-3 text-[#4A6B63] font-light">
                Your consultation request has been received. We will be in touch
                within 24 hours.
              </p>
              <button
                type="button"
                data-testid="consultation-close"
                onClick={() => handleOpenChange(false)}
                className="mt-8 inline-flex items-center gap-2 px-8 py-4 border border-[#1A3C34] text-[#1A3C34] text-sm font-bold tracking-[0.18em] uppercase hover:bg-[#1A3C34] hover:text-white transition-colors duration-500 premium-ease"
              >
                Close
              </button>
            </div>
          ) : (
            <form
              data-testid="consultation-form"
              onSubmit={handleSubmit}
              className="px-6 sm:px-8 py-6 sm:py-8 space-y-4 sm:space-y-5"
            >
              <Field
                label="Name"
                testId="consult-name"
                value={form.name}
                onChange={handleChange("name")}
                placeholder="Your full name"
                error={errors.name}
                required
              />
              <Field
                label="Phone"
                testId="consult-phone"
                value={form.phone}
                onChange={handleChange("phone")}
                placeholder="+91 ____ ____ __"
                error={errors.phone}
                required
              />
              <Field
                label="Email (optional)"
                testId="consult-email"
                value={form.email}
                onChange={handleChange("email")}
                placeholder="you@email.com"
                error={errors.email}
                type="email"
              />
              <div>
                <label className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#4A6B63] block mb-2">
                  About your project (optional)
                </label>
                <textarea
                  data-testid="consult-message"
                  value={form.message}
                  onChange={handleChange("message")}
                  rows={3}
                  placeholder="Plot size, location, intent..."
                  className="w-full bg-white border border-[#1A3C34]/20 px-4 py-3 text-[#1A3C34] font-body focus:outline-none focus:border-[#1A3C34] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                data-testid="consult-submit"
                className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1A3C34] text-white text-sm font-bold tracking-[0.18em] uppercase hover:bg-[#D9AF61] hover:text-[#1A3C34] transition-colors duration-500 premium-ease disabled:opacity-60 disabled:cursor-not-allowed"
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

              <p className="text-[10px] tracking-[0.2em] uppercase text-[#9CA3AF] text-center">
                Limited consultations · Focused attention on every project
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, testId, value, onChange, placeholder, error, required, type = "text" }) {
  return (
    <div>
      <label className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#4A6B63] block mb-2">
        {label} {required && <span className="text-[#D9AF61]">*</span>}
      </label>
      <input
        data-testid={testId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-white border px-4 py-3 text-[#1A3C34] font-body focus:outline-none transition-colors ${
          error
            ? "border-red-500 focus:border-red-600"
            : "border-[#1A3C34]/20 focus:border-[#1A3C34]"
        }`}
      />
      {error && (
        <span
          data-testid={`${testId}-error`}
          className="mt-2 block text-xs text-red-600"
        >
          {error}
        </span>
      )}
    </div>
  );
}
