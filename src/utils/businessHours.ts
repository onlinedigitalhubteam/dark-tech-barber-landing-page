import { businessConfig, DAY_ORDER, type DayKey } from "@/data/businessConfig";

/** Minutes since midnight for an "HH:MM" string. */
const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
};

const pad = (n: number) => String(n).padStart(2, "0");

/** 750 -> "12:30 PM" */
export function minutesToLabel(mins: number): string {
  const m = ((mins % 1440) + 1440) % 1440;
  const h24 = Math.floor(m / 60);
  const mm = m % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${pad(mm)} ${suffix}`;
}

export function hoursLabel(day: DayKey): string {
  const [open, close] = businessConfig.hours[day];
  return `${minutesToLabel(toMin(open))} – ${minutesToLabel(toMin(close))}`;
}

export interface ZoneNow {
  /** Index inside DAY_ORDER (0 = Monday). */
  dayIndex: number;
  /** Minutes since midnight in Africa/Douala. */
  minutes: number;
  /** "14:05" 24h clock in the shop's timezone. */
  clock: string;
  seconds: number;
}

/**
 * Reads the wall clock in the business timezone (Africa/Douala) without
 * assuming the visitor's device is set to it.
 */
export function getZoneNow(date: Date = new Date()): ZoneNow {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: businessConfig.timezone,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).formatToParts(date);

    const get = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find((p) => p.type === type)?.value ?? "";

    const weekdayShort = get("weekday");
    const dayIndex = Math.max(
      0,
      DAY_ORDER.findIndex((d) => d.short === weekdayShort),
    );
    const hour = Number(get("hour")) % 24;
    const minute = Number(get("minute"));
    const second = Number(get("second"));

    return {
      dayIndex,
      minutes: hour * 60 + minute,
      clock: `${pad(hour)}:${pad(minute)}`,
      seconds: Number.isFinite(second) ? second : 0,
    };
  } catch {
    // Extremely defensive fallback: device clock.
    return {
      dayIndex: (date.getDay() + 6) % 7,
      minutes: date.getHours() * 60 + date.getMinutes(),
      clock: `${pad(date.getHours())}:${pad(date.getMinutes())}`,
      seconds: date.getSeconds(),
    };
  }
}

export interface BusinessStatus {
  isOpen: boolean;
  /** "Open now" / "Closed" */
  state: string;
  /** Short line used next to the pill: "Closes at 7:00 PM" */
  detail: string;
  /** Full sentence used in the booking panel. */
  sentence: string;
  dayIndex: number;
  clock: string;
  /** Minutes until the next open/close boundary (null when unknown). */
  minutesToChange: number | null;
}

export function getBusinessStatus(date: Date = new Date()): BusinessStatus {
  const now = getZoneNow(date);
  const today = DAY_ORDER[now.dayIndex];
  const [openStr, closeStr] = businessConfig.hours[today.key];
  const open = toMin(openStr);
  const close = toMin(closeStr);

  const nextOpenDay = (fromIndex: number) => {
    for (let step = 1; step <= 7; step += 1) {
      const idx = (fromIndex + step) % 7;
      const [o] = businessConfig.hours[DAY_ORDER[idx].key];
      if (toMin(o) >= 0) return { idx, minutes: toMin(o) };
    }
    return { idx: (fromIndex + 1) % 7, minutes: 8 * 60 };
  };

  if (now.minutes < open) {
    const next = nextOpenDay(now.dayIndex);
    const sameDay = next.idx === now.dayIndex;
    return {
      isOpen: false,
      state: "Closed",
      detail: sameDay
        ? `Opens at ${minutesToLabel(open)}`
        : `Opens ${DAY_ORDER[next.idx].label} at ${minutesToLabel(next.minutes)}`,
      sentence: `Closed — opens at ${minutesToLabel(open)} ${
        sameDay ? "today" : `on ${DAY_ORDER[next.idx].label}`
      }.`,
      dayIndex: now.dayIndex,
      clock: now.clock,
      minutesToChange: open - now.minutes,
    };
  }

  if (now.minutes >= open && now.minutes < close) {
    return {
      isOpen: true,
      state: "Open now",
      detail: `Closes at ${minutesToLabel(close)}`,
      sentence: `Open now — walk-ins welcome until ${minutesToLabel(close)}.`,
      dayIndex: now.dayIndex,
      clock: now.clock,
      minutesToChange: close - now.minutes,
    };
  }

  const next = nextOpenDay(now.dayIndex);
  return {
    isOpen: false,
    state: "Closed",
    detail: `Opens ${DAY_ORDER[next.idx].label} at ${minutesToLabel(next.minutes)}`,
    sentence: `Closed for today — opens ${DAY_ORDER[next.idx].label} at ${minutesToLabel(
      next.minutes,
    )}.`,
    dayIndex: now.dayIndex,
    clock: now.clock,
    minutesToChange: 1440 - now.minutes + next.minutes,
  };
}

/** Half-hour slots between opening and closing for a given day (shop time). */
export function slotsForDay(dayKey: DayKey, step = 30): string[] {
  const [openStr, closeStr] = businessConfig.hours[dayKey];
  const open = toMin(openStr);
  // Stop taking bookings 30 min before close.
  const close = Math.max(open + step, toMin(closeStr) - step);
  const out: string[] = [];
  for (let m = open; m <= close; m += step) out.push(minutesToLabel(m));
  return out;
}

/** "2026-02-14" -> DAY_ORDER index, parsed as a calendar date (not UTC). */
export function dayIndexOfDateString(dateStr: string): number | null {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return null;
  const jsDay = new Date(y, m - 1, d).getDay();
  return (jsDay + 6) % 7;
}

export function formatDateLong(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return dateStr;
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function todayISOInZone(): string {
  const now = new Date();
  try {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: businessConfig.timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(now);
    const get = (t: Intl.DateTimeFormatPartTypes) =>
      parts.find((p) => p.type === t)?.value ?? "";
    return `${get("year")}-${get("month")}-${get("day")}`;
  } catch {
    return now.toISOString().slice(0, 10);
  }
}
