// // import React from 'react';
// // import { FiAlertCircle } from 'react-icons/fi';

// // interface TurfAvailabilityProps {
// //   register: any;
// //   errors: any;
// //   control: any;
// // }

// // const TurfAvailability: React.FC<TurfAvailabilityProps> = ({ register, errors, control }) => {
// //   return (
// //     <div className="space-y-6">
// //       <div className="space-y-4">
// //         {/* Days selection */}
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">
// //             Select Available Days <span className="text-red-500">*</span>
// //           </label>
// //           <div className="flex flex-wrap gap-3">
// //             {['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'].map((day) => (
// //               <div key={day} className="flex items-center">
// //                 <input
// //                   type="checkbox"
// //                   id={`day-${day}`}
// //                   value={day}
// //                   {...register('availability.days', { required: 'At least one day is required' })}
// //                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
// //                 />
// //                 <label htmlFor={`day-${day}`} className="ml-2 text-sm text-gray-700">
// //                   {day}
// //                 </label>
// //               </div>
// //             ))}
// //           </div>
// //           {errors.availability?.days && (
// //             <p className="mt-1 text-sm text-red-600 flex items-center">
// //               <FiAlertCircle className="mr-1" /> {errors.availability.days.message}
// //             </p>
// //           )}
// //         </div>

// //         {/* Time selection */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           <div>
// //             <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
// //               Opening Time <span className="text-red-500">*</span>
// //             </label>
// //             <input
// //               type="time"
// //               id="startTime"
// //               {...register('availability.startTime', { required: 'Opening time is required' })}
// //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             {errors.availability?.startTime && (
// //               <p className="mt-1 text-sm text-red-600 flex items-center">
// //                 <FiAlertCircle className="mr-1" /> {errors.availability.startTime.message}
// //               </p>
// //             )}
// //           </div>
// //           <div>
// //             <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
// //               Closing Time <span className="text-red-500">*</span>
// //             </label>
// //             <input
// //               type="time"
// //               id="endTime"
// //               {...register('availability.endTime', { required: 'Closing time is required' })}
// //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             {errors.availability?.endTime && (
// //               <p className="mt-1 text-sm text-red-600 flex items-center">
// //                 <FiAlertCircle className="mr-1" /> {errors.availability.endTime.message}
// //               </p>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TurfAvailability;



// // import React from 'react';
// // import { FiAlertCircle, FiInfo } from 'react-icons/fi';

// // interface TurfAvailabilityProps {
// //   register: any;
// //   errors: any;
// //   control: any;
// //   watch: any;
// //   setValue: any;
// // }

// // const predefinedTimeSlots = [
// //   '06:00 AM - 07:00 AM',
// //   '07:00 AM - 08:00 AM',
// //   '08:00 AM - 09:00 AM',
// //   '09:00 AM - 10:00 AM',
// //   '10:00 AM - 11:00 AM',
// //   '11:00 AM - 12:00 PM',
// //   '12:00 PM - 01:00 PM',
// //   '01:00 PM - 02:00 PM',
// //   '02:00 PM - 03:00 PM',
// //   '03:00 PM - 04:00 PM',
// //   '04:00 PM - 05:00 PM',
// //   '05:00 PM - 06:00 PM',
// //   '06:00 PM - 07:00 PM',
// //   '07:00 PM - 08:00 PM',
// // ];

// // const TurfAvailability: React.FC<TurfAvailabilityProps> = ({ 
// //   register, 
// //   errors, 
// //   control,
// //   watch,
// //   setValue
// // }) => {
// //   const selectedDays = watch('availability.days') || [];
// //   const selectedSlots = watch('availability.timeSlots') || [];

// //   // Function to handle slot selection with validation
// //   const handleSlotSelection = (slot: string, isChecked: boolean) => {
// //     let updatedSlots = [...selectedSlots];
    
// //     if (isChecked) {
// //       updatedSlots.push(slot);
// //     } else {
// //       updatedSlots = updatedSlots.filter(s => s !== slot);
// //     }
    
// //     setValue('availability.timeSlots', updatedSlots);
// //   };

// //   // Function to mark slot as unavailable (offline booked)
// //   const markAsUnavailable = (slot: string) => {
// //     const unavailableSlots = watch('availability.unavailableSlots') || [];
    
// //     if (unavailableSlots.includes(slot)) {
// //       setValue('availability.unavailableSlots', unavailableSlots.filter(s => s !== slot));
// //     } else {
// //       setValue('availability.unavailableSlots', [...unavailableSlots, slot]);
// //     }
// //   };

// //   return (
// //     <div className="space-y-6">
// //       <div className="space-y-4">
// //         {/* Days selection */}
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">
// //             Select Available Days <span className="text-red-500">*</span>
// //           </label>
// //           <div className="flex flex-wrap gap-3">
// //             {['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'].map((day) => (
// //               <div key={day} className="flex items-center">
// //                 <input
// //                   type="checkbox"
// //                   id={`day-${day}`}
// //                   value={day}
// //                   {...register('availability.days', { required: 'At least one day is required' })}
// //                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
// //                 />
// //                 <label htmlFor={`day-${day}`} className="ml-2 text-sm text-gray-700">
// //                   {day}
// //                 </label>
// //               </div>
// //             ))}
// //           </div>
// //           {errors.availability?.days && (
// //             <p className="mt-1 text-sm text-red-600 flex items-center">
// //               <FiAlertCircle className="mr-1" /> {errors.availability.days.message}
// //             </p>
// //           )}
// //         </div>

// //         {/* Time selection */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           <div>
// //             <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
// //               Opening Time <span className="text-red-500">*</span>
// //             </label>
// //             <input
// //               type="time"
// //               id="startTime"
// //               {...register('availability.startTime', { required: 'Opening time is required' })}
// //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             {errors.availability?.startTime && (
// //               <p className="mt-1 text-sm text-red-600 flex items-center">
// //                 <FiAlertCircle className="mr-1" /> {errors.availability.startTime.message}
// //               </p>
// //             )}
// //           </div>
// //           <div>
// //             <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
// //               Closing Time <span className="text-red-500">*</span>
// //             </label>
// //             <input
// //               type="time"
// //               id="endTime"
// //               {...register('availability.endTime', { required: 'Closing time is required' })}
// //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             {errors.availability?.endTime && (
// //               <p className="mt-1 text-sm text-red-600 flex items-center">
// //                 <FiAlertCircle className="mr-1" /> {errors.availability.endTime.message}
// //               </p>
// //             )}
// //           </div>
// //         </div>


// // 'use client';'use client';
// // import React from 'react';
// // import { FiAlertCircle, FiInfo } from 'react-icons/fi';
// // import { useFormContext, useWatch } from 'react-hook-form';
// // import { useAppDispatch } from '@/redux/hook';
// // import { removeUnavailableSlot, markSlotUnavailable } from '@/redux/actions/turfActions';
// // import { AvailabilityDay, TurfFormInputs } from '@/types/turf';

// // const predefinedTimeSlots = [
// //   '06:00 AM - 07:00 AM',
// //   '07:00 AM - 08:00 AM',
// //   '08:00 AM - 09:00 AM',
// //   '09:00 AM - 10:00 AM',
// //   '10:00 AM - 11:00 AM',
// //   '11:00 AM - 12:00 PM',
// //   '12:00 PM - 01:00 PM',
// //   '01:00 PM - 02:00 PM',
// //   '02:00 PM - 03:00 PM',
// //   '03:00 PM - 04:00 PM',
// //   '04:00 PM - 05:00 PM',
// //   '05:00 PM - 06:00 PM',
// //   '06:00 PM - 07:00 PM',
// //   '07:00 PM - 08:00 PM',
// // ] as const;

// // const TurfAvailability: React.FC = () => {
// //   const {
// //     register,
// //     setValue,
// //     formState: { errors },
// //     control,
// //   } = useFormContext<TurfFormInputs>();
// //   const dispatch = useAppDispatch();

// //   const selectedDays = useWatch({ control, name: 'availability.days' }) || [];
// //   const selectedSlots = useWatch({ control, name: 'availability.timeSlots' }) || [];
// //   const unavailableSlots = useWatch({ control, name: 'availability.unavailableSlots' }) || [];
// //   const turfId = useWatch({ control, name: '_id' });

// //   const handleSlotSelection = (slot: string, isChecked: boolean) => {
// //     const currentSlots = Array.isArray(selectedSlots) ? [...selectedSlots] : [];
// //     const updatedSlots = isChecked
// //       ? [...currentSlots, slot]
// //       : currentSlots.filter((s) => s !== slot);

// //     setValue('availability.timeSlots', updatedSlots);
// //   };

// //   const markAsUnavailable = async (slot: string) => {
// //     try {
// //       const date = new Date().toISOString().split('T')[0];

// //       if (!turfId) {
// //         const currentUnavailableSlots = Array.isArray(unavailableSlots) ? unavailableSlots : [];
// //         const newUnavailableSlots = currentUnavailableSlots.includes(slot)
// //           ? currentUnavailableSlots.filter((s) => s !== slot)
// //           : [...currentUnavailableSlots, slot];

// //         setValue('availability.unavailableSlots', newUnavailableSlots);
// //         return;
// //       }

// //       if (unavailableSlots.includes(slot)) {
// //         await dispatch(removeUnavailableSlot({ turfId, date, slot })).unwrap();
// //         setValue(
// //           'availability.unavailableSlots',
// //           unavailableSlots.filter((s) => s !== slot)
// //         );
// //       } else {
// //         await dispatch(
// //           markSlotUnavailable({ turfId, date, slot, reason: 'Offline booking' })
// //         ).unwrap();
// //         setValue('availability.unavailableSlots', [...unavailableSlots, slot]);
// //       }
// //     } catch (error) {
// //       console.error('Error updating slot availability:', error);
// //       toast.error('Failed to update slot availability. Please try again.');
// //     }
// //   };

// //   return (
// //     <div className="space-y-6">
// //       <div className="space-y-4">
// //         {/* Days selection */}
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">
// //             Select Available Days <span className="text-red-500">*</span>
// //           </label>
// //           <div className="flex flex-wrap gap-3">
// //             {(['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'] as AvailabilityDay[]).map(
// //               (day) => (
// //                 <div key={day} className="flex items-center">
// //                   <input
// //                     type="checkbox"
// //                     id={`day-${day}`}
// //                     value={day}
// //                     {...register('availability.days', {
// //                       required: 'At least one day is required',
// //                     })}
// //                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
// //                   />
// //                   <label htmlFor={`day-${day}`} className="ml-2 text-sm text-gray-700">
// //                     {day}
// //                   </label>
// //                 </div>
// //               )
// //             )}
// //           </div>
// //           {errors?.availability?.days && (
// //             <p className="mt-1 text-sm text-red-600 flex items-center">
// //               <FiAlertCircle className="mr-1" /> {errors.availability.days.message}
// //             </p>
// //           )}
// //         </div>

// //         {/* Time selection */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           <div>
// //             <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
// //               Opening Time <span className="text-red-500">*</span>
// //             </label>
// //             <input
// //               type="time"
// //               id="startTime"
// //               {...register('availability.startTime', {
// //                 required: 'Opening time is required',
// //               })}
// //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             {errors.availability?.startTime && (
// //               <p className="mt-1 text-sm text-red-600 flex items-center">
// //                 <FiAlertCircle className="mr-1" /> {errors.availability.startTime.message}
// //               </p>
// //             )}
// //           </div>
// //           <div>
// //             <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
// //               Closing Time <span className="text-red-500">*</span>
// //             </label>
// //             <input
// //               type="time"
// //               id="endTime"
// //               {...register('availability.endTime', {
// //                 required: 'Closing time is required',
// //               })}
// //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             {errors.availability?.endTime && (
// //               <p className="mt-1 text-sm text-red-600 flex items-center">
// //                 <FiAlertCircle className="mr-1" /> {errors.availability.endTime.message}
// //               </p>
// //             )}
// //           </div>
// //         </div>

// //         {/* Time Slots selection */}
// //         <div>
// //           <div className="flex items-center justify-between mb-2">
// //             <label className="block text-sm font-medium text-gray-700">
// //               Manage Time Slots <span className="text-red-500">*</span>
// //             </label>
// //             <div className="flex items-center text-xs text-gray-500">
// //               <FiInfo className="mr-1" />
// //               <span>Right-click to mark as unavailable</span>
// //             </div>
// //           </div>

// //           <div className="flex flex-wrap gap-3 max-h-48 overflow-y-auto border border-gray-300 rounded p-3">
// //             {predefinedTimeSlots.map((slot, idx) => {
// //               const isUnavailable = unavailableSlots.includes(slot);
// //               const isSelected = selectedSlots.includes(slot);

// //               return (
// //                 <div
// //                   key={idx}
// //                   className="flex items-center w-1/2 md:w-1/3 relative"
// //                   onContextMenu={(e) => {
// //                     e.preventDefault();
// //                     markAsUnavailable(slot);
// //                   }}
// //                 >
// //                   <input
// //                     type="checkbox"
// //                     id={`slot-${idx}`}
// //                     value={slot}
// //                     checked={isSelected && !isUnavailable}
// //                     disabled={isUnavailable}
// //                     onChange={(e) => handleSlotSelection(slot, e.target.checked)}
// //                     className={`h-4 w-4 ${
// //                       isUnavailable ? 'text-gray-400' : 'text-blue-600'
// //                     } focus:ring-blue-500 border-gray-300 rounded`}
// //                   />
// //                   <label
// //                     htmlFor={`slot-${idx}`}
// //                     className={`ml-2 text-sm ${
// //                       isUnavailable ? 'text-gray-400 line-through' : 'text-gray-700'
// //                     }`}
// //                   >
// //                     {slot}
// //                   </label>
// //                   {isUnavailable && (
// //                     <span className="ml-2 text-xs text-red-500">(Offline Booked)</span>
// //                   )}
// //                 </div>
// //               );
// //             })}
// //           </div>

// //           {errors.availability?.timeSlots && (
// //             <p className="mt-1 text-sm text-red-600 flex items-center">
// //               <FiAlertCircle className="mr-1" /> {errors.availability.timeSlots.message}
// //             </p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TurfAvailability;




















// // export default TurfAvailability;




// import React from 'react';
// import { FiAlertCircle } from 'react-icons/fi';

// interface TurfAvailabilityProps {
//   register: any;
//   errors: any;
//   control: any;
// }

// const predefinedTimeSlots = [
//   '06:00 AM - 07:00 AM',
//   '07:00 AM - 08:00 AM',
//   '08:00 AM - 09:00 AM',
//   '09:00 AM - 10:00 AM',
//   '10:00 AM - 11:00 AM',
//   '11:00 AM - 12:00 PM',
//   '12:00 PM - 01:00 PM',
//   '01:00 PM - 02:00 PM',
//   '02:00 PM - 03:00 PM',
//   '03:00 PM - 04:00 PM',
//   '04:00 PM - 05:00 PM',
//   '05:00 PM - 06:00 PM',
//   '06:00 PM - 07:00 PM',
//   '07:00 PM - 08:00 PM',
// ];

// const TurfAvailability: React.FC<TurfAvailabilityProps> = ({ register, errors, control }) => {
//   return (
//     <div className="space-y-6">
//       <div className="space-y-4">
//         {/* Days selection */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Select Available Days <span className="text-red-500">*</span>
//           </label>
//           <div className="flex flex-wrap gap-3">
//             {['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'].map((day) => (
//               <div key={day} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id={`day-${day}`}
//                   value={day}
//                   {...register('availability.days', { required: 'At least one day is required' })}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor={`day-${day}`} className="ml-2 text-sm text-gray-700">
//                   {day}
//                 </label>
//               </div>
//             ))}
//           </div>
//           {errors.availability?.days && (
//             <p className="mt-1 text-sm text-red-600 flex items-center">
//               <FiAlertCircle className="mr-1" /> {errors.availability.days.message}
//             </p>
//           )}
//         </div>

//         {/* Time selection */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
//               Opening Time <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="time"
//               id="startTime"
//               {...register('availability.startTime', { required: 'Opening time is required' })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.availability?.startTime && (
//               <p className="mt-1 text-sm text-red-600 flex items-center">
//                 <FiAlertCircle className="mr-1" /> {errors.availability.startTime.message}
//               </p>
//             )}
//           </div>
//           <div>
//             <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
//               Closing Time <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="time"
//               id="endTime"
//               {...register('availability.endTime', { required: 'Closing time is required' })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.availability?.endTime && (
//               <p className="mt-1 text-sm text-red-600 flex items-center">
//                 <FiAlertCircle className="mr-1" /> {errors.availability.endTime.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Time Slots selection */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Select Time Slots <span className="text-red-500">*</span>
//           </label>
//           <div className="flex flex-wrap gap-3 max-h-48 overflow-y-auto border border-gray-300 rounded p-3">
//             {predefinedTimeSlots.map((slot, idx) => (
//               <div key={idx} className="flex items-center w-1/2 md:w-1/3">
//                 <input
//                   type="checkbox"
//                   id={`slot-${idx}`}
//                   value={slot}
//                   {...register('availability.timeSlots', { required: 'At least one time slot is required' })}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor={`slot-${idx}`} className="ml-2 text-sm text-gray-700">
//                   {slot}
//                 </label>
//               </div>
//             ))}
//           </div>
//           {errors.availability?.timeSlots && (
//             <p className="mt-1 text-sm text-red-600 flex items-center">
//               <FiAlertCircle className="mr-1" /> {errors.availability.timeSlots.message}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TurfAvailability;


import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

interface TurfAvailabilityProps {
  register: any;
  errors: any;
  control: any;
}

const TurfAvailability: React.FC<TurfAvailabilityProps> = ({ register, errors, control }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Days selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Available Days <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="flex items-center">
                <input
                  type="checkbox"
                  id={`day-${day}`}
                  value={day}
                  {...register('availability.days', { required: 'At least one day is required' })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`day-${day}`} className="ml-2 text-sm text-gray-700">
                  {day}
                </label>
              </div>
            ))}
          </div>
          {errors.availability?.days && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <FiAlertCircle className="mr-1" /> {errors.availability.days.message}
            </p>
          )}
        </div>

        {/* Time selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
              Opening Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="startTime"
              {...register('availability.startTime', { required: 'Opening time is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.availability?.startTime && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <FiAlertCircle className="mr-1" /> {errors.availability.startTime.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
              Closing Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="endTime"
              {...register('availability.endTime', { required: 'Closing time is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.availability?.endTime && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <FiAlertCircle className="mr-1" /> {errors.availability.endTime.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurfAvailability;
