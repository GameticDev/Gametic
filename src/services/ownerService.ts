

// import { UnavailableSlot } from "@/types/turf";
// import axiosInstance from "@/utils/axiosInstance";

// // import axiosInstance from 'axios';

// export const getBookedSlots = async (turfId: string): Promise<UnavailableSlot[]> => {
//   try {
//     const response = await axiosInstance.get(`/api/owner/turf/${turfId}/booked-slots`);
//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching booked slots:', error);
//     throw new Error('Failed to fetch booked slots');
//   }
// };