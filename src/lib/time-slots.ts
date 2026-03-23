export interface TimeSlot {
  label: string;
  value: string;
  available: boolean;
}

export function generateTimeSlots(date: Date, existingBookings: string[] = []): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  for (let hour = 8; hour < 18; hour++) {
    const label = `${String(hour).padStart(2, "0")}:00 - ${String(hour + 1).padStart(2, "0")}:00`;
    const value = `${String(hour).padStart(2, "0")}:00-${String(hour + 1).padStart(2, "0")}:00`;

    const isPast = isToday && hour <= now.getHours();
    const isBooked = existingBookings.filter((b) => b === value).length >= 2;

    slots.push({ label, value, available: !isPast && !isBooked });
  }

  return slots;
}

export function isBusinessDay(date: Date): boolean {
  const day = date.getDay();
  return day >= 1 && day <= 6; // Lun-Sam
}

export function getNextAvailableDates(count: number): string[] {
  const dates: string[] = [];
  const current = new Date();
  current.setHours(0, 0, 0, 0);

  while (dates.length < count) {
    if (isBusinessDay(current)) {
      dates.push(current.toISOString().split("T")[0]);
    }
    current.setDate(current.getDate() + 1);
  }

  return dates;
}
