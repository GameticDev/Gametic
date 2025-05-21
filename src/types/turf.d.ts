export interface Booking {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  date: Date;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  amount: number;
  createdAt: Date;
}
export interface Rating {
  _id: string;
  userId: {
    _id: string;
    name: string;
  };
  rating: number;
  review?: string;
  createdAt: Date;
}

export interface TurfData {
  _id: string;
  ownerId?: string;
  name: string;
  city: string;
  area: string;
  address: string;
  turfType: string;
  size: string;
  image: string[];
  hourlyRate: number;
  status?: 'active' | 'inactive';
  bookings?: Booking[];
  ratings?: Rating[];
  averageRating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TurfFormValues {
  name: string;
  city: string;
  area: string;
  address: string;
  turfType: string;
  size: string;
  hourlyRate: number;
  images: FileList;
}

export type Availability = {
  days: string[];
  startTime: string;
  endTime: string;
  timeSlots?: string[];
  unavailableSlots?: string[];
};

export type TurfFormInputs = {
  name: string;
  city: string;
  area: string;
  address: string;
  turfType: string;
  size: string;
  hourlyRate: number;
  images: FileList | string[] | null;
  availability: Availability;
  _id?: string;
};

export interface AddTurfFormProps {
  onClose: () => void;
  turfToEdit?: TurfFormInputs;
}

export type TimeSlot = {
  start: string;
  end: string;
};

export type DayAvailability = {
  [day: string]: TimeSlot[];
};

// export type AvailabilityDay = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

// export type TimeSlot = {
//   start: string;
//   end: string;
//   isAvailable: boolean;
// };

// export type DayAvailability = {
//   [key in AvailabilityDay]?: TimeSlot[];
// };

// export type UnavailableSlot = {
//   date: string;
//   slot: string;
//   reason: string;
//   _id?: string;
// };

// export type TurfAvailability = {
//   days: AvailabilityDay[];
//   startTime: string;
//   endTime: string;
//   timeSlots: string[];
//   unavailableSlots: UnavailableSlot[];
// };

// export type TurfType = 
//   | 'football' | 'cricket' | 'multi-sport' 
//   | 'swimming' | 'basketball' | 'badminton' 
//   | 'tennis' | 'volleyball' | 'hockey';

// export type TurfStatus = 'active' | 'inactive';

// export type TurfRating = {
//   userId: string;
//   user?: {
//     name: string;
//     avatar?: string;
//   };
//   rating: number;
//   review?: string;
//   createdAt: string;
// };

// export type TurfBooking = {
//   _id: string;
//   userId: string;
//   user?: {
//     name: string;
//     email: string;
//   };
//   date: string;
//   startTime: string;
//   endTime: string;
//   status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
//   paymentStatus: 'pending' | 'paid' | 'refunded';
//   amount: number;
//   createdAt: string;
// };

// export type TurfFormData = {
//   name: string;
//   city: string;
//   area: string;
//   address: string;
//   turfType: TurfType;
//   size?: string;
//   hourlyRate: number;
//   images: File[] | string[];
//   availability: TurfAvailability;
//   status?: TurfStatus;
// };

// export type Turf = {
//   _id: string;
//   ownerId: string;
//   owner?: {
//     name: string;
//     email: string;
//   };
//   name: string;
//   city: string;
//   area: string;
//   address: string;
//   turfType: TurfType;
//   size?: string;
//   images: string[];
//   availability: TurfAvailability;
//   hourlyRate: number;
//   status: TurfStatus;
//   isDeleted?: boolean;
//   ratings: TurfRating[];
//   bookings: TurfBooking[];
//   averageRating?: number;
//   createdAt: string;
//   updatedAt: string;
// };

// export type TurfState = {
//   turfs: Turf[];
//   loading: boolean;
//   error: string | null;
//   success: boolean;
//   selectedTurf: Turf | null;
// };