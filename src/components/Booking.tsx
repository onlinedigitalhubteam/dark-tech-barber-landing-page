import { useMemo, useRef, useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, Check, Clock, Phone, ShieldCheck } from "lucide-react";
import {
  businessConfig,
  DAY_ORDER,
  telHref,
} from "@/data/businessConfig";
import { bookingServiceOptions, services, signaturePackage } from "@/data/services";
import { track } from "@/utils/analytics";
import { buildBookingMessage, openWhatsApp } from "@/utils/whatsapp";
import {
  dayIndexOfDateString,
  getZoneNow,
  hoursLabel,
  slotsForDay,
  todayISOInZone,
} from "@/utils/businessHours";
import { useBusinessStatus } from "@/hooks";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, Hi } from "@/components/ui/SectionHeading";
import { FaWhatsapp } from "@/components/ui/Icons";
import { cn } from "@/utils/cn";

interface FormState {
  name: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

const allServices = [...services, signaturePackage];

export function Booking() {
  const today = useMemo(() => todayISOInZone(), []);
  const status = useBusinessStatus();
  const [form, setForm] = useState<FormState>({
    name: "",
    service: bookingServiceOptions[0],
    date: today,
    time: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const dayIndex = dayIndexOfDateString(form.date) ?? getZoneNow().dayIndex;
  const dayKey = DAY_ORDER[dayIndex].key;
  const slots = useMemo(() => slotsForDay(dayKey), [dayKey]);
  const selected = allServices.find((s) => s.name === form.service);

  const preview = useMemo(() => buildBookingMessage(form), [form]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setSent(false);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (form.name.trim().length < 2) {
      nextErrors.name = "Tell us the name to book under (at least 2 letters).";
    }
    if (!form.date) {
      nextErrors.date = "Pick a day that works for you.";
    } else if (form.date < today) {
      nextErrors.date = "That date has passed — choose today or a later day.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      if (nextErrors.name) nameRef.current?.focus();
      return;
    }

    setErrors({});
    setSent(true);
    track("booking_form_submit", {
      service: form.service,
      date: form.date,
      time: form.time || "flexible",
      hasMessage: form.message.trim().length > 0,
    });
    openWhatsApp(preview);
  };

  return (
    <section id="booking" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_55%_at_50%_0%,rgba(255,85,0,0.09),transparent_70%)]"
      />
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="Booking"
          title={
            <>
              Ready for a <Hi>Fresh Cut?</Hi>
            </>
          }
          text="Tell us what you need and send your booking directly through WhatsApp. No account. No complicated process. Just a quick message."
          aside={
            <div className="card flex items-center gap-3 px-4 py-3">
              <ShieldCheck size={18} className="shrink-0 text-accent" aria-hidden />
              <p className="text-[0.8rem] leading-snug text-muted">
                No payment, no sign-up, no email verification.
                <br />
                You confirm the time with the barber directly.
              </p>
            </div>
          }
        />

        <div className="mt-11 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {/* ---------------- Form ---------------- */}
          <Reveal>
            <form
              onSubmit={onSubmit}
              noValidate
              className="card p-5 sm:p-7"
              aria-describedby="booking-status-line"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="booking-name"
                  label="Your name"
                  error={errors.name}
                  required
                  className="sm:col-span-1"
                >
                  <input
                    id="booking-name"
                    ref={nameRef}
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "booking-name-error" : undefined}
                    className={inputClass(Boolean(errors.name))}
                  />
                </Field>

                <Field id="booking-service" label="Service" required>
                  <div className="relative">
                    <select
                      id="booking-service"
                      name="service"
                      value={form.service}
                      onChange={(e) => update("service", e.target.value)}
                      className={cn(inputClass(false), "appearance-none pr-10")}
                    >
                      {bookingServiceOptions.map((option) => (
                        <option key={option} value={option} className="bg-surface">
                          {option}
                        </option>
                      ))}
                    </select>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-accent"
                    >
                      ▾
                    </span>
                  </div>
                  <p className="mt-2 flex flex-wrap items-center gap-2 text-[0.75rem] text-muted/75">
                    <span className="num font-semibold text-ink">
                      {selected?.priceLabel ?? "Price on request"}
                    </span>
                    {selected ? (
                      <>
                        <span aria-hidden className="h-1 w-1 rotate-45 bg-accent/70" />
                        <span className="inline-flex items-center gap-1">
                          <Clock size={12} aria-hidden /> {selected.duration}
                        </span>
                      </>
                    ) : null}
                  </p>
                </Field>

                <Field id="booking-date" label="Preferred date" error={errors.date} required>
                  <input
                    id="booking-date"
                    name="date"
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby={errors.date ? "booking-date-error" : undefined}
                    className={cn(inputClass(Boolean(errors.date)), "[color-scheme:dark]")}
                  />
                  <p className="mt-2 text-[0.75rem] text-muted/70">
                    {DAY_ORDER[dayIndex].label} hours · {hoursLabel(dayKey)}
                  </p>
                </Field>

                <Field id="booking-time" label="Preferred time">
                  <div className="flex flex-wrap gap-1.5" role="group" aria-label="Preferred time">
                    {slots.slice(0, 12).map((slot) => {
                      const isActive = form.time === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          aria-pressed={isActive}
                          onClick={() => update("time", slot)}
                          className={cn(
                            "num rounded-full border px-2.5 py-1.5 text-[0.72rem] font-semibold transition-all duration-150",
                            isActive
                              ? "border-accent bg-accent text-white shadow-glow"
                              : "border-white/10 bg-canvas text-muted hover:border-accent/50 hover:text-ink",
                          )}
                        >
                          {slot}
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      aria-pressed={form.time === "Flexible"}
                      onClick={() => update("time", "Flexible")}
                      className={cn(
                        "rounded-full border px-2.5 py-1.5 text-[0.72rem] font-semibold transition-all duration-150",
                        form.time === "Flexible"
                          ? "border-accent/70 bg-accent/15 text-ink"
                          : "border-dashed border-white/15 text-muted hover:text-ink",
                      )}
                    >
                      Any time
                    </button>
                  </div>
                </Field>

                <Field id="booking-message" label="Anything we should know?" className="sm:col-span-2">
                  <textarea
                    id="booking-message"
                    name="message"
                    rows={3}
                    placeholder="Anything you'd like us to know?"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className={cn(inputClass(false), "min-h-[84px] resize-y")}
                  />
                </Field>
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2.5">
                  <button type="submit" className="btn btn-primary group px-5 py-3.5">
                    <FaWhatsapp size={17} aria-hidden />
                    Book via WhatsApp
                    <ArrowRight
                      size={16}
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </button>
                  <a
                    href={telHref}
                    onClick={() => track("phone_click", { source: "booking_form" })}
                    className="btn btn-secondary py-3"
                  >
                    <Phone size={15} aria-hidden className="text-accent" />
                    Call now
                  </a>
                </div>
                <p
                  id="booking-status-line"
                  className="flex items-center gap-2 text-[0.78rem] text-muted/80"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "h-2 w-2 rounded-full",
                      status.isOpen ? "bg-accent animate-pulse-dot" : "bg-muted/60",
                    )}
                  />
                  {status.sentence}
                </p>
              </div>

              <div
                aria-live="polite"
                className={cn(
                  "mt-4 flex items-start gap-2.5 rounded-[10px] border border-accent/30 bg-accent/8 px-4 py-3 text-[0.83rem] text-ink transition-all duration-200",
                  sent ? "opacity-100" : "hidden opacity-0",
                )}
              >
                <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <p>
                  Your message is prepared. WhatsApp should be opening in a new tab — if nothing
                  happened,{" "}
                  <a
                    href={`https://wa.me/${businessConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(preview)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-accent underline underline-offset-2"
                  >
                    tap here to send it
                  </a>
                  .
                </p>
              </div>
            </form>
          </Reveal>

          {/* ---------------- Live preview ---------------- */}
          <Reveal delay={120}>
            <div className="flex h-full flex-col gap-4">
              <div className="card relative overflow-hidden p-5 sm:p-6">
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
                />
                <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-accent uppercase">
                  Message preview
                </p>
                <p className="mt-2 text-[0.84rem] leading-relaxed text-muted">
                  This is exactly what lands in the shop's WhatsApp. Edit the form and watch it
                  update.
                </p>

                <div className="mt-5 rounded-[12px] border border-white/8 bg-canvas p-4">
                  <div className="flex items-center gap-2 border-b border-white/8 pb-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <FaWhatsapp size={14} aria-hidden />
                    </span>
                    <p className="text-[0.8rem] font-semibold text-ink">
                      {businessConfig.name}
                    </p>
                    <span className="ml-auto text-[0.66rem] tracking-[0.14em] text-muted/60 uppercase">
                      To you
                    </span>
                  </div>
                  <pre className="mt-3 max-h-64 overflow-auto text-[0.8rem] leading-relaxed whitespace-pre-wrap font-sans text-muted">
                    {preview}
                  </pre>
                </div>
              </div>

              <div className="card flex items-center gap-3 p-4">
                <AlertCircle size={18} className="shrink-0 text-accent" aria-hidden />
                <p className="text-[0.8rem] leading-snug text-muted">
                  Sending a message doesn't reserve a chair for a fixed minute — the barber replies
                  to confirm your slot. On busy days, call ahead.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- helpers ---------------- */

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-[10px] border bg-canvas px-3.5 py-3 text-[0.92rem] text-ink outline-none transition-all duration-200",
    "placeholder:text-muted/50 focus:border-accent/70 focus:ring-2 focus:ring-accent/18",
    hasError ? "border-red-400/70" : "border-white/8 hover:border-white/16",
  );
}

function Field({
  id,
  label,
  error,
  required,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 flex items-center gap-1.5 text-[0.72rem] font-semibold tracking-[0.16em] text-muted/85 uppercase"
      >
        {label}
        {required ? (
          <span aria-hidden className="text-accent">
            *
          </span>
        ) : (
          <span className="text-muted/45 normal-case">(optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-2 flex items-center gap-1.5 text-[0.76rem] font-medium text-red-300"
        >
          <AlertCircle size={13} aria-hidden />
          {error}
        </p>
      ) : null}
    </div>
  );
}
