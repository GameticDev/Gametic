import { TurfData } from './../../types/turf.d';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '@/utils/axiosInstance';
// import { TurfData } from '@/types/turf';

// export const addTurf = createAsyncThunk(
//   'turf/addTurf',
//   async (formData: FormData, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post('/owner/addTurf', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       return response.data.Turf;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// export const fetchTurfs = createAsyncThunk(
//   'turf/fetchTurfs',
//   async (ownerId: string, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get('/owner/getAllturf');
//       console.log("Fetched turfs:", response.data);
//       return response.data.allTurf; // Access the allTurf property
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );


// export const updateTurf = createAsyncThunk(
//   'turf/updateTurf',
//   async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.put(`/owner/turfs/${id}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// export const deleteTurf = createAsyncThunk(
//   'turf/deleteTurf',
//   async (turfId: string, { rejectWithValue }) => {
//     try {
//       await axiosInstance.delete(`/owner/turfs/${turfId}`);
//       return turfId;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // Add this to your turfActions.ts
// export const markSlotUnavailable = createAsyncThunk(
//   'turf/markSlotUnavailable',
//   async ({ turfId, date, slot, reason }: { turfId: string; date: string; slot: string; reason?: string }, 
//   { rejectWithValue }
// ) => {
//   try {
//     const response = await axiosInstance.post(`/owner/${turfId}/mark-unavailable`, { date, slot, reason });
//     return response.data.turf;
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data?.message || error.message);
//   }
// });

// export const removeUnavailableSlot = createAsyncThunk(
//   'turf/removeUnavailableSlot',
//   async ({ turfId, date, slot }: { turfId: string; date: string; slot: string }, 
//   { rejectWithValue }
// ) => {
//   try {
//     const response = await axiosInstance.delete(`/owner/${turfId}/unavailable-slots`, {
//       data: { date, slot }
//     });
//     return response.data.turf;
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data?.message || error.message);
//   }
// });

// // interface TurfData {
// //   name: string;
// //   location: string;
// //   type: string;
// //   size: string;
// //   city: string;
// //   area: string;
// //   address: string;
// //   hourlyRate: number;
// //   images: File[];
// //   amenities: string[];
// //   availability: { day: string; startTime: string; endTime: string }[];
// //   pricing: { slot: string; price: number }[];
// //   paymentOptions: { online: boolean; cash: boolean };
// //   status: 'active' | 'inactive';
// // }




// // import { createAsyncThunk } from '@reduxjs/toolkit';
// // import axios from 'axios';
// // import { TurfData } from '@/types/turf';

// // const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + '/owner';


// // // turfActions.ts
// // export const addTurf = createAsyncThunk(
// //   'turf/addTurf',
// //   async ({ formData }: { formData: FormData }, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.post(`${API_BASE_URL}/addTurf`, formData, {
// //         // headers: {
// //         //   'Content-Type': 'multipart/form-data',
// //         // },
// //       });
// //     //   return response.data.Turf;
// //     // } catch (error: any) {
// //     //   if (error.response) {
// //     //     return rejectWithValue(
// //     //       error.response.data.message || 
// //     //       error.response.data.error || 
// //     //       'Failed to add turf'
// //     //     );
// //     //   }
// //     //   return rejectWithValue(error.message || 'Failed to add turf');
// //     // }

// //      return response.data;
// //     } catch (error: any) {
// //       return rejectWithValue(error.response.data.message || error.message);
// //     }
// //   }
// // );

// // export const fetchTurfs = createAsyncThunk(
// //   'turf/fetchTurfs',
// //   async (ownerId: string, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.get(`${API_BASE_URL}/getAllturf`);
// //       // Filter turfs by ownerId if needed
// //       const ownerTurfs = response.data.allTurf.filter((turf: TurfData) => turf.ownerId === ownerId);
// //       return ownerTurfs;
// //     } catch (error: any) {
// //       return rejectWithValue(error.response?.data?.message || 'Failed to fetch turfs');
// //     }
// //   }
// // );

// // export const updateTurf = createAsyncThunk(
// //   'turf/updateTurf',
// //   async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.patch(`${API_BASE_URL}/editTurf/${id}`, formData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });
// //       return response.data.turf;
// //     } catch (error: any) {
// //       return rejectWithValue(error.response?.data?.message || 'Failed to update turf');
// //     }
// //   }
// // );

// // export const deleteTurf = createAsyncThunk(
// //   'turf/deleteTurf',
// //   async (id: string, { rejectWithValue }) => {
// //     try {
// //       await axios.delete(`${API_BASE_URL}/deleteTurf/${id}`);
// //       return id;
// //     } catch (error: any) {
// //       return rejectWithValue(error.response?.data?.message || 'Failed to delete turf');
// //     }
// //   }
// // );



import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';
// import { TurfData } from '@/types/turf';

export const addTurf = createAsyncThunk(
  'turf/addTurf',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      console.log('Sending form data to server...'); // Debug log
      const response = await axiosInstance.post('/owner/addTurf', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Server response:', response.data); // Debug log
      return response.data.Turf;
    } catch (error: any) {
      console.error('Error in addTurf:', error.response?.data || error.message); // Detailed error log
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const fetchTurfs = createAsyncThunk(
  'turf/fetchTurfs',
  async (ownerId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/owner/getAllturf');
      console.log("Fetched turfs:", response.data);
      return response.data.allTurf; // Access the allTurf property
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const updateTurf = createAsyncThunk(
  'turf/updateTurf',
  async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/owner/turfs/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteTurf = createAsyncThunk(
  'turf/deleteTurf',
  async (turfId: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/owner/turfs/${turfId}`);
      return turfId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);