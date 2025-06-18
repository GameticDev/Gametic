// import { Availability } from './turf.d';
// export interface Booking {
//   _id: string;
//   // userId: User;
//   userId: {
//     _id: string;
//     username: string;
//     email: string;
//     phone?: string;
//     picture?: string; 
//     role?: string;
//   }| string | null;
  
//   turfId: string;
//   date: Date;
//   startTime: string;
//   endTime: string;
//   duration: number;
//   status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
//   paymentStatus: 'pending' | 'paid' | 'refunded';
//   paymentMethod?: 'cash' | 'card' | 'online';
//   amount: number;
//   notes?: string;
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
//   address: string;
//   coordinates?: {    // For map integration
//     lat: number;
//     lng: number;
//   };
//   turfType: string;
//   size: string;
//   images: string[];
//   amenities?: string[]; 
//   hourlyRate: number;
//   status: 'active' | 'inactive' | 'maintenance'; 
//   bookings?: Booking[];
//   ratings?: Rating[];
//   averageRating?: number;
//   description?:string;
 
//   rules?: string[];
//   cancellationPolicy?: string;

//   availability:Availability
//   status: 'active' | 'inactive' | 'maintenance'; 
//   bookings?: Booking[];
//   ratings?: Rating[];
//   averageRating?: number;
//   description?:string;
//   bookings: Booking[];
 
//   rules?: string[];
//   cancellationPolicy?: string;

//   availability:Availability
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// export interface TurfFormValues {
//   name: string;
//   city: string;
//   area: string;
//   location: string;
//   address: string;
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

//   // unavailableSlots?: {
//   //   date: Date;
//   //   slots: string[];
//   // }[];

//   isAvailable?: boolean;

//   // exceptions?: {    // For special days/holidays
//   //   date: Date;
//   //   available: boolean;
//   //   slots?: string[];
//   // }[];

// };


// // export interface TurfFormInputs extends TurfFormValues {
// //   ownerId: string;
// //   amenities?: string[];
// //   description?: string;
// //   rules?: string[];
// //   cancellationPolicy?: string;
// //   availability: Availability;
// //   _id?: string;
// //   images: File[] | string[] | null;
// // }
// export type TurfFormInputs = {
//   ownerId: string;
//   name: string;
//   city: string;
//   area: string;
//   location: string;
//   address: string;

//   turfType: string;
//   size: string;
//   hourlyRate: number;
//   images: File[] | string[] | null;
// // images: (File | string)[];

//    amenities?: string[];
//    description?: string;
//    rules?: string[];
//   cancellationPolicy?: string;
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
//   available: boolean;
//   price?: number;
// };

// export type DayAvailability = {
//   [day: string]: TimeSlot[];
// };
// // export type DayAvailability = {
// //   [day: string]: {
// //     available: boolean;
// //     slots: TimeSlot[];
// //   };
// // };

// export type BookingSearchParams = {
//   date?: Date;
//   turfId?: string;
//   status?: Booking['status'];
//   paymentStatus?: Booking['paymentStatus'];
//   userId?: string;
// };

// export type TurfSearchParams = {
//   city?: string;
//   area?: string;
//   turfType?: string;
//   date?: Date;
//   timeSlot?: string;
//   minPrice?: number;
//   maxPrice?: number;
//   amenities?: string[];
// };





// import { Availability } from './turf.d';
// import { UseFormRegister, FieldErrors, Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';

// export interface BookingSlot {
//   date: string; // ISO format date (YYYY-MM-DD)
//   startTime: string;
//   endTime: string;
//   reason?: string; // 'maintenance' | 'holiday' | 'offline-booking'
// }

// export interface Availability {
//   regular: {
//     days: string[]; // ['Mon', 'Tue', etc.]
//     startTime: string;
//     endTime: string;
//     unavailableSlots?: string[]; // For recurring weekly unavailability
//   };
//   exceptions?: BookingSlot[]; // For date-specific unavailability
//   isUnderMaintenance?: boolean;
//   maintenanceMessage?: string;
// }

// export interface Booking {
//   _id: string;
//   // userId: User;
//   userId: {
//     _id: string;
//     username: string;
//     email: string;
//     phone?: string;
//     picture?: string; 
//     role?: string;
//   }| string | null;
  
//   turfId: string;
//   date: Date;
//   startTime: string;
//   endTime: string;
//   duration: number;
//   status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
//   paymentStatus: 'pending' | 'paid' | 'refunded';
//   paymentMethod?: 'cash' | 'card' | 'online';
//   amount: number;
//   notes?: string;
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
//   address: string;
//   coordinates?: {    // For map integration
//     lat: number;
//     lng: number;
//   };
//   turfType: string;
//   size: string;
//   images: string[];
//   amenities?: string[]; 
//   hourlyRate: number;
//   status: 'active' | 'inactive' | 'maintenance'; 
//   bookings?: Booking[];
//   ratings?: Rating[];
//   averageRating?: number;
//   description?:string;
 
//   rules?: string[];
//   cancellationPolicy?: string;

//   availability:Availability
//   status: 'active' | 'inactive' | 'maintenance'; 
//   bookings?: Booking[];
//   ratings?: Rating[];
//   averageRating?: number;
//   description?:string;
//   bookings: Booking[];
 
//   rules?: string[];
//   cancellationPolicy?: string;

//   availability:Availability
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// export interface TurfFormValues {
//   name: string;
//   city: string;
//   area: string;
//   location: string;
//   address: string;
//   turfType: string;
//   size: string;
//   hourlyRate: number;
//   images: FileList;
// }

// // export type Availability = {
// //   days: string[];
// //   startTime: string;
// //   endTime: string;
// //   timeSlots?: string[];
// //   unavailableSlots?: string[];

// //   // unavailableSlots?: {
// //   //   date: Date;
// //   //   slots: string[];
// //   // }[];

// //   isAvailable?: boolean;

//   // exceptions?: {    // For special days/holidays
//   //   date: Date;
//   //   available: boolean;
//   //   slots?: string[];
//   // }[];

// // };


// // export interface TurfFormInputs extends TurfFormValues {
// //   ownerId: string;
// //   amenities?: string[];
// //   description?: string;
// //   rules?: string[];
// //   cancellationPolicy?: string;
// //   availability: Availability;
// //   _id?: string;
// //   images: File[] | string[] | null;
// // }
// export type TurfFormInputs = {
//   _id?: string;

//   ownerId: string;
//   name: string;
//   city: string;
//   area: string;
//   location: string;
//   address: string;

//   turfType: string;
//   size: string;
//   hourlyRate: number;
//   images: File[] | string[] | null;
// // images: (File | string)[];

//    amenities?: string[];
//    description?: string;
//    rules?: string[];
//   cancellationPolicy?: string;
//   availability: Availability;
//   status?: 'active' | 'inactive' | 'maintenance';
// };

// export interface TurfAvailabilityProps {
//   register: UseFormRegister<TurfFormInputs>;
//   errors: FieldErrors<TurfFormInputs>;
//   control: Control<TurfFormInputs>;
//   setValue: UseFormSetValue<TurfFormInputs>;
//   watch: UseFormWatch<TurfFormInputs>;
// }

// export interface AddTurfFormProps {
//   onClose: () => void;
//   turfToEdit?: TurfFormInputs|null;
// }

// export type TimeSlot = {
//   start: string;
//   end: string;
//   available: boolean;
//   price?: number;
// };

// export type DayAvailability = {
//   [day: string]: TimeSlot[];
// };
// // export type DayAvailability = {
// //   [day: string]: {
// //     available: boolean;
// //     slots: TimeSlot[];
// //   };
// // };

// export type BookingSearchParams = {
//   date?: Date;
//   turfId?: string;
//   status?: Booking['status'];
//   paymentStatus?: Booking['paymentStatus'];
//   userId?: string;
// };

// export type TurfSearchParams = {
//   city?: string;
//   area?: string;
//   turfType?: string;
//   date?: Date;
//   timeSlot?: string;
//   minPrice?: number;
//   maxPrice?: number;
//   amenities?: string[];
//   status?: 'active' | 'inactive' | 'maintenance';
// };





import { Availability } from './turf.d';
import { UseFormRegister, FieldErrors, Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';

export interface BookingSlot {
  date: string; // ISO format date (YYYY-MM-DD)
  startTime: string;
  endTime: string;
  reason?: string; // 'maintenance' | 'holiday' | 'offline-booking'
}

export interface Availability {
  regular: {
    days: string[]; // ['Mon', 'Tue', etc.]
    startTime: string;
    endTime: string;
    unavailableSlots?: string[]; // For recurring weekly unavailability
  };
  exceptions?: BookingSlot[]; // For date-specific unavailability
  isUnderMaintenance?: boolean;
  maintenanceMessage?: string;
}

export interface Booking {
  _id: string;
  // userId: User;
  userId: {
    _id: string;
    username: string;
    email: string;
    phone?: string;
    picture?: string; 
    role?: string;
  }| string | null;
  
  turfId: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod?: 'cash' | 'card' | 'online';
  amount: number;
  notes?: string;
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
  location: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  turfType: string;
  size: string;
  images: string[];
  amenities?: string[]; 
  hourlyRate: number;
  status: 'active' | 'inactive' | 'maintenance';
  bookings?: Booking[];
  ratings?: Rating[];
  averageRating?: number;
  description?: string;
  rules?: string[];
  cancellationPolicy?: string;
  availability: Availability;
  bookedSlot?: {
    date: string;
    slots: { start: string; end: string }[];
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TurfFormValues {
  name: string;
  city: string;
  area: string;
  location: string;
  address: string;
  turfType: string;
  size: string;
  hourlyRate: number;
  images: FileList;
}

// export type Availability = {
//   days: string[];
//   startTime: string;
//   endTime: string;
//   timeSlots?: string[];
//   unavailableSlots?: string[];

//   // unavailableSlots?: {
//   //   date: Date;
//   //   slots: string[];
//   // }[];

//   isAvailable?: boolean;

  // exceptions?: {    // For special days/holidays
  //   date: Date;
  //   available: boolean;
  //   slots?: string[];
  // }[];

// };


// export interface TurfFormInputs extends TurfFormValues {
//   ownerId: string;
//   amenities?: string[];
//   description?: string;
//   rules?: string[];
//   cancellationPolicy?: string;
//   availability: Availability;
//   _id?: string;
//   images: File[] | string[] | null;
// }
export type TurfFormInputs = {
  _id?: string;

  ownerId: string;
  name: string;
  city: string;
  area: string;
  location: string;
  address: string;

  turfType: string;
  size: string;
  hourlyRate: number;
  images: File[] | string[] | null;
// images: (File | string)[];

   amenities?: string[];
   description?: string;
   rules?: string[];
  cancellationPolicy?: string;
  availability: Availability;
  bookedSlot?: {
    date: string;
    slots: { start: string; end: string }[];
  }[];
  status?: 'active' | 'inactive' | 'maintenance';
};

export interface TurfAvailabilityProps {
  register: UseFormRegister<TurfFormInputs>;
  errors: FieldErrors<TurfFormInputs>;
  control: Control<TurfFormInputs>;
  setValue: UseFormSetValue<TurfFormInputs>;
  watch: UseFormWatch<TurfFormInputs>;
  bookedSlot?: {
    date: string;
    slots: { start: string; end: string }[];
  }[];
}

export interface AddTurfFormProps {
  onClose: () => void;
  turfToEdit?: TurfFormInputs|null;
}

export type TimeSlot = {
  start: string;
  end: string;
  available: boolean;
  price?: number;
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
  status?: 'active' | 'inactive' | 'maintenance';
};




