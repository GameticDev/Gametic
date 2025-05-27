// import { Availability } from './turf.d';
// export interface Booking {
//   _id: string;
//   userId: {
//     _id: string;
//     name: string;
//     email: string;
//   };
//   customerName: string;
//   turfName: string;
//   date: Date;
//   startTime: string;
//   endTime: string;
//   status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
//   paymentStatus: 'pending' | 'paid' | 'refunded';
//   price: number;
//   customerPhone?: string;
//   duration: number;
//   createdAt: Date;
// }
// export interface Rating {
//   _id: string;
//   userId: {
//     _id: string;
//     name: string;
//   };
//   rating: number;
//   review?: string;
//   createdAt: Date;
// }


// export interface TurfData {
//   _id: string;
//   ownerId?: string;
//   name: string;
//   city: string;
//   area: string;
//   location: string;
//   turfType: string;
//   size: string;
//   images: string[];
//   hourlyRate: number;
//   status?: 'active' | 'inactive';
//   bookings?: Booking[];
//   ratings?: Rating[];
//   averageRating?: number;
//   description?:string;
//   availability:Availability
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// export interface TurfFormValues {
//   name: string;
//   city: string;
//   area: string;
//   location: string;
//   turfType: string;
//   size: string;
//   hourlyRate: number;
//   images: FileList;
// }

// export type Availability = {
//   days: string[];
//   startTime: string;
//   endTime: string;
//   timeSlots?: string[];
//   unavailableSlots?: string[];
//   isAvailable?: boolean;
// };

// export type TurfFormInputs = {
//   ownerId: string;
//   name: string;
//   city: string;
//   area: string;
//   location: string;
//   turfType: string;
//   size: string;
//   hourlyRate: number;
//   // images: FileList | string[] | null;
//   images: File[] | string[] | null;
//   //  images: string[];

//   availability: Availability;
//   _id?: string;
// };

// export interface AddTurfFormProps {
//   onClose: () => void;
//   turfToEdit?: TurfFormInputs;
// }

// export type TimeSlot = {
//   start: string;
//   end: string;
// };

// export type DayAvailability = {
//   [day: string]: TimeSlot[];
// };

// interface FilterOptions {
//   dateRange?: {
//     start: Date;
//     end: Date;
//   };
//   turfName?: string;
//   status?: Booking['status'];
//   customerName?: string;
// }




import { Availability } from './turf.d';
export interface Booking {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };

  turfId: string;

  date: Date;
  startTime: string;
  endTime: string;

   duration: number;  // Added duration in hours

  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  amount: number;

   paymentMethod?: 'cash' | 'card' | 'online'; // Added payment method
  notes?: string;    // Added for admin/turf owner notes
  createdAt: Date;
  updatedAt?: Date;  // Added for tracking updates
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
  // address: {       
  //   city: string;
  //   area: string;
  //   street?: string;
  //   landmark?: string;
  //   postalCode?: string;
  // };

  coordinates?: {    // For map integration
    lat: number;
    lng: number;
  };
  city: string;
  area: string;
  location: string;

  turfType: string;
  size: string;
  images: string[];
  hourlyRate: number;
  status?: 'active' | 'inactive';
  bookings?: Booking[];
  ratings?: Rating[];
  averageRating?: number;
  description?:string;

  amenities?: string[]; // Added amenities
  rules?: string[];  // Added rules
  cancellationPolicy?: string;


  availability:Availability
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TurfFormValues {
  name: string;
  city: string;
  area: string;
  location: string;
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
  
  // unavailableSlots?: {
  //   date: Date;
  //   slots: string[];
  // }[];
  isAvailable?: boolean;
  exceptions?: {    // For special days/holidays
    date: Date;
    available: boolean;
    slots?: string[];
  }[];
};

export type TurfFormInputs = {
  ownerId: string;
  name: string;

  address: {
    city: string;
    area: string;
    street?: string;
    landmark?: string;
    postalCode?: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };

  city: string;
  area: string;
  location: string;


  turfType: string;
  size: string;
  hourlyRate: number;
  // images: FileList | string[] | null;
  images: File[] | string[] | null;
  //  images: string[];

  amenities?: string[];
  description?: string;
  rules?: string[];
  cancellationPolicy?: string;

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




export type TimeSlot = {
  start: string;
  end: string;
  available: boolean;
  price?: number; // For dynamic pricing
};

export type DayAvailability = {
  [day: string]: {
    available: boolean;
    slots: TimeSlot[];
  };
};

export type BookingSearchParams = {
  date?: Date;
  turfId?: string;
  status?: Booking['status'];
  paymentStatus?: Booking['paymentStatus'];
  userId?: string;
};

export type TurfSearchParams = {
  city?: string;
  area?: string;
  turfType?: string;
  date?: Date;
  timeSlot?: string;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
};