import { waNumber } from "@/data/businessConfig";
import { formatDateLong } from "@/utils/businessHours";

export interface BookingInput {
  name: string;
  service: string;
  date: string; // yyyy-mm-dd
  time: string; // label, e.g. "4:30 PM"
  message?: string;
}

/**
 * Builds the exact conversational message the shop receives on WhatsApp.
 * Everything is trimmed and falls back to "Flexible" so no field ever sends
 * an empty, confusing line.
 */
export function buildBookingMessage(input: BookingInput): string {
  const name = input.name.trim() || "—";
  const service = input.service.trim() || "Classic Haircut";
  const date = input.date ? formatDateLong(input.date) : "Flexible";
  const time = input.time.trim() || "Flexible";
  const note = input.message?.trim();

  const lines = [
    "Hello Apex Fade Barber Studio 👋",
    "",
    `My name is ${name}.`,
    "",
    "I'd like to book:",
    "",
    service,
    "",
    "Preferred date:",
    "",
    date,
    "",
    "Preferred time:",
    "",
    time,
    "",
    "Additional message:",
    "",
    note && note.length > 0 ? note : "None",
    "",
    "Thank you.",
  ];

  return lines.join("\n");
}

export function whatsappUrl(text: string): string {
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
}

export function openWhatsApp(text: string): void {
  const url = whatsappUrl(text);
  const win = window.open(url, "_blank", "noopener,noreferrer");
  // Some in-app browsers block window.open — fall back to a location change.
  if (!win) window.location.href = url;
}
