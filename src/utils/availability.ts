import { TimeSlot, TurfData } from "@/types/turf";

// utils/availability.ts
export const isTurfAvailable = (
  turf: TurfData, 
  date: Date, 
  startTime: string, 
  endTime: string
): { available: boolean; reason?: string } => {
  const dateStr = date.toISOString().split('T')[0];
  const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
  
  // Check if date is completely unavailable
  if (turf.availability.unavailableDates.includes(dateStr)) {
    return { available: false, reason: 'Turf is closed on this date' };
  }
  
  // Check for specific date exception
  const exception = turf.availability.exceptions.find(ex => ex.date === dateStr);
  if (exception) {
    if (!exception.isAvailable) {
      return { available: false, reason: exception.note || 'Turf is closed for special event' };
    }
    return checkTimeSlotAvailability(exception.slots, startTime, endTime);
  }
  
  // Check standard schedule
  const standardDay = turf.availability.standardSchedule.find(d => d.dayOfWeek === dayOfWeek);
  if (!standardDay || !standardDay.isAvailable) {
    return { available: false, reason: 'Turf is normally closed on this day' };
  }
  
  return checkTimeSlotAvailability(standardDay.slots, startTime, endTime);
};

const checkTimeSlotAvailability = (
  slots: TimeSlot[], 
  startTime: string, 
  endTime: string
): { available: boolean; reason?: string } => {
  const requestedStart = convertTimeToMinutes(startTime);
  const requestedEnd = convertTimeToMinutes(endTime);
  
  for (const slot of slots) {
    const slotStart = convertTimeToMinutes(slot.start);
    const slotEnd = convertTimeToMinutes(slot.end);
    
    if (requestedStart >= slotStart && requestedEnd <= slotEnd) {
      if (!slot.available) {
        return { available: false, reason: slot.reason || 'Time slot is unavailable' };
      }
      return { available: true };
    }
  }
  
  return { available: false, reason: 'Requested time is outside operating hours' };
};

const convertTimeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};