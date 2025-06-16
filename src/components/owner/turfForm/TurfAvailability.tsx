// import React from 'react';
// import { useWatch } from 'react-hook-form';
// import { FiAlertCircle } from 'react-icons/fi';
// import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
// import { TurfFormInputs } from '@/types/turf';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// interface TurfAvailabilityProps {
//   register: UseFormRegister<TurfFormInputs>;
//   errors: FieldErrors<TurfFormInputs>;
//   control: Control<TurfFormInputs>;
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
//   const selectedDays = useWatch({ control, name: 'availability.days' }) || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//   const unavailableSlots = useWatch({ control, name: 'availability.unavailableSlots' }) || [];
//   const dateSpecificUnavailable = useWatch({ control, name: 'availability.dateSpecificUnavailable' }) || [];
//   const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
//   const [currentTab, setCurrentTab] = React.useState<'permanent' | 'dateSpecific'>('permanent');

//   // Check if a slot is marked as unavailable
//   const isSlotUnavailable = (slot: string, date?: Date) => {
//     if (date) {
//       const dateStr = date.toISOString().split('T')[0];
//       return dateSpecificUnavailable.some((item: any) => 
//         item.date === dateStr && item.slots.includes(slot)
//       );
//     }
//     return unavailableSlots.includes(slot);
//   };

//   const handleDateSpecificUnavailable = (slot: string, date: Date) => {
//     const dateStr = date.toISOString().split('T')[0];
//     const existingEntryIndex = dateSpecificUnavailable.findIndex((item: any) => item.date === dateStr);
    
//     let updatedEntries = [...dateSpecificUnavailable];
    
//     if (existingEntryIndex >= 0) {
//       const existingSlots = [...updatedEntries[existingEntryIndex].slots];
//       const slotIndex = existingSlots.indexOf(slot);
      
//       if (slotIndex >= 0) {
//         existingSlots.splice(slotIndex, 1);
//       } else {
//         existingSlots.push(slot);
//       }
      
//       updatedEntries[existingEntryIndex] = {
//         ...updatedEntries[existingEntryIndex],
//         slots: existingSlots
//       };
//     } else {
//       updatedEntries.push({
//         date: dateStr,
//         slots: [slot]
//       });
//     }
    
//     // Remove entries with no slots
//     updatedEntries = updatedEntries.filter(entry => entry.slots.length > 0);
    
//     control.setValue('availability.dateSpecificUnavailable', updatedEntries);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="space-y-4">
//         {/* Days selection */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Select Available Days <span className="text-red-500">*</span>
//           </label>
//           <div className="flex flex-wrap gap-3">
//             {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
//               <div key={day} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id={`day-${day}`}
//                   value={day}
//                   {...register('availability.days', {
//                     required: 'At least one day is required',
//                   })}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   defaultChecked
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
//               {...register('availability.startTime', {
//                 required: 'Opening time is required',
//               })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               defaultValue="06:00"
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
//               {...register('availability.endTime', {
//                 required: 'Closing time is required',
//               })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               defaultValue="20:00"
//             />
//             {errors.availability?.endTime && (
//               <p className="mt-1 text-sm text-red-600 flex items-center">
//                 <FiAlertCircle className="mr-1" /> {errors.availability.endTime.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Unavailable slots selection */}
//         <div className="flex space-x-4 mb-4">
//           <button
//             type="button"
//             onClick={() => setCurrentTab('permanent')}
//             className={`px-4 py-2 rounded-md ${currentTab === 'permanent' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//           >
//             Permanent Unavailability
//           </button>
//           <button
//             type="button"
//             onClick={() => setCurrentTab('dateSpecific')}
//             className={`px-4 py-2 rounded-md ${currentTab === 'dateSpecific' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//           >
//             Date-Specific Unavailability
//           </button>
//         </div>

//         {currentTab === 'permanent' ? (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Mark Permanently Unavailable Time Slots
//               <span className="ml-1 text-xs text-gray-500">(These slots will be unavailable every day)</span>
//             </label>
//             <div className={`flex flex-wrap gap-3 max-h-48 overflow-y-auto border border-gray-300 rounded p-3 ${(!selectedDays || selectedDays.length === 0) ? 'bg-gray-100 cursor-not-allowed' : ''}`}>
//               {predefinedTimeSlots.map((slot, idx) => (
//                 <div key={idx} className="flex items-center w-1/2 md:w-1/3">
//                   <input
//                     type="checkbox"
//                     id={`perm-slot-${idx}`}
//                     value={slot}
//                     disabled={!selectedDays || selectedDays.length === 0}
//                     {...register('availability.unavailableSlots')}
//                     defaultChecked={isSlotUnavailable(slot)}
//                     className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded disabled:opacity-50"
//                   />
//                   <label htmlFor={`perm-slot-${idx}`} className={`ml-2 text-sm ${isSlotUnavailable(slot) ? 'text-red-600' : 'text-gray-700'}`}>
//                     {slot}
//                   </label>
//                 </div>
//               ))}
//             </div>
//             <p className="mt-1 text-sm text-gray-500">
//               Check the boxes to mark time slots as permanently unavailable (e.g., for maintenance)
//             </p>
//           </div>
//         ) : (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Mark Date-Specific Unavailable Time Slots
//               <span className="ml-1 text-xs text-gray-500">(These slots will be unavailable only on selected dates)</span>
//             </label>
            
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Select Date
//               </label>
//               <DatePicker
//                 selected={selectedDate}
//                 onChange={(date) => setSelectedDate(date)}
//                 minDate={new Date()}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
            
//             <div className={`flex flex-wrap gap-3 max-h-48 overflow-y-auto border border-gray-300 rounded p-3 ${(!selectedDays || selectedDays.length === 0) ? 'bg-gray-100 cursor-not-allowed' : ''}`}>
//               {selectedDate && predefinedTimeSlots.map((slot, idx) => (
//                 <div key={idx} className="flex items-center w-1/2 md:w-1/3">
//                   <input
//                     type="checkbox"
//                     id={`date-slot-${idx}`}
//                     disabled={!selectedDays || selectedDays.length === 0 || !selectedDate}
//                     checked={isSlotUnavailable(slot, selectedDate)}
//                     onChange={() => selectedDate && handleDateSpecificUnavailable(slot, selectedDate)}
//                     className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded disabled:opacity-50"
//                   />
//                   <label htmlFor={`date-slot-${idx}`} className={`ml-2 text-sm ${isSlotUnavailable(slot, selectedDate) ? 'text-red-600' : 'text-gray-700'}`}>
//                     {slot}
//                   </label>
//                 </div>
//               ))}
//             </div>
//             <p className="mt-1 text-sm text-gray-500">
//               Check the boxes to mark time slots as unavailable on the selected date
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TurfAvailability;


// import React from 'react';
// import { useWatch } from 'react-hook-form';
// import { FiAlertCircle } from 'react-icons/fi';
// import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
// import { TurfFormInputs } from '@/types/turf';

// interface TurfAvailabilityProps {
//   register: UseFormRegister<TurfFormInputs>;
//   errors: FieldErrors<TurfFormInputs>;
//   control: Control<TurfFormInputs>;
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
//   const selectedDays = useWatch({ control, name: 'availability.days' }) || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//   const unavailableSlots = useWatch({ control, name: 'availability.unavailableSlots' }) || [];

//   // Check if a slot is marked as unavailable
//   const isSlotUnavailable = (slot: string) => {
//     return unavailableSlots.includes(slot);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="space-y-4">
//         {/* Days selection */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Select Available Days <span className="text-red-500">*</span>
//           </label>
//           <div className="flex flex-wrap gap-3">
//             {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
//               <div key={day} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id={`day-${day}`}
//                   value={day}
//                   {...register('availability.days', {
//                     required: 'At least one day is required',
//                   })}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   defaultChecked
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
//               {...register('availability.startTime', {
//                 required: 'Opening time is required',
//               })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               defaultValue="06:00"
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
//               {...register('availability.endTime', {
//                 required: 'Closing time is required',
//               })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               defaultValue="20:00"
//             />
//             {errors.availability?.endTime && (
//               <p className="mt-1 text-sm text-red-600 flex items-center">
//                 <FiAlertCircle className="mr-1" /> {errors.availability.endTime.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Time Slots selection - now for marking UNAVAILABLE slots */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Mark Unavailable Time Slots
//             <span className="ml-1 text-xs text-gray-500">(All slots are available by default)</span>
//           </label>
//           <div className={`flex flex-wrap gap-3 max-h-48 overflow-y-auto border border-gray-300 rounded p-3 ${(!selectedDays || selectedDays.length === 0) ? 'bg-gray-100 cursor-not-allowed' : ''}`}>
//             {predefinedTimeSlots.map((slot, idx) => (
//               <div key={idx} className="flex items-center w-1/2 md:w-1/3">
//                 <input
//                   type="checkbox"
//                   id={`slot-${idx}`}
//                   value={slot}
//                   disabled={!selectedDays || selectedDays.length === 0}
//                   {...register('availability.unavailableSlots')}
//                   defaultChecked={isSlotUnavailable(slot)}
//                   className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded disabled:opacity-50"
//                 />
//                 <label htmlFor={`slot-${idx}`} className={`ml-2 text-sm ${isSlotUnavailable(slot) ? 'text-red-600' : 'text-gray-700'}`}>
//                   {slot}
//                 </label>
//               </div>
//             ))}
//           </div>
//           <p className="mt-1 text-sm text-gray-500">
//             Check the boxes to mark time slots as unavailable (already booked or not available)
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TurfAvailability;








import React, { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { FiAlertCircle, FiCalendar } from 'react-icons/fi';
// import { Control, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
// import { TurfFormInputs } from '@/types/turf';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BookingSlot, TurfAvailabilityProps } from '@/types/turf';


const predefinedTimeSlots = [
  '06:00 AM - 07:00 AM',
  '07:00 AM - 08:00 AM',
  '08:00 AM - 09:00 AM',
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 01:00 PM',
  '01:00 PM - 02:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
  '05:00 PM - 06:00 PM',
  '06:00 PM - 07:00 PM',
  '07:00 PM - 08:00 PM',
];

const TurfAvailability: React.FC<TurfAvailabilityProps> = ({ 
  register, 
  errors, 
  control, 
  setValue,
  watch 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newException, setNewException] = useState<{
    startTime: string;
    endTime: string;
    reason: string;
  }>({ startTime: '06:00', endTime: '07:00', reason: 'offline-booking' });

 const { isUnderMaintenance = false } = watch('availability') || {};

  const regularDays = useWatch({ control, name: 'availability.regular.days' }) || 
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const regularUnavailableSlots = useWatch({ 
    control, 
    name: 'availability.regular.unavailableSlots' 
  }) || [];

  const exceptions = useWatch({
    control,
    name: 'availability.exceptions'
  }) || [];

  const isSlotUnavailable = (slot: string) => {
    return regularUnavailableSlots.includes(slot);
  };

  const addException = () => {
    if (!selectedDate) return;

    const dateStr = selectedDate.toISOString().split('T')[0];
    const newSlot: BookingSlot = {
      date: dateStr,
      startTime: newException.startTime,
      endTime: newException.endTime,
      reason: newException.reason
    };

    setValue('availability.exceptions', [...exceptions, newSlot]);
    setSelectedDate(null);
  };

  const removeException = (index: number) => {
    const updatedExceptions = [...exceptions];
    updatedExceptions.splice(index, 1);
    setValue('availability.exceptions', updatedExceptions);
  };

  const toggleMaintenance = () => {
    setValue('availability.isUnderMaintenance', !isUnderMaintenance);
  };

  return (
    <div className="space-y-6">
      {/* Maintenance Toggle */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="maintenanceToggle"
          checked={isUnderMaintenance}
          onChange={toggleMaintenance}
          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
        />
        <label htmlFor="maintenanceToggle" className="ml-2 text-sm font-medium text-gray-700">
          Mark as Under Maintenance
        </label>
      </div>
 {isUnderMaintenance && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Maintenance Message
          </label>
          <input
            type="text"
            {...register('availability.maintenanceMessage')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="E.g., 'Closed for renovations until June 30'"
          />
        </div>
      )}

      {!isUnderMaintenance && (
        <>
          {/* Regular Availability */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Regular Available Days <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`day-${day}`}
                      value={day}
                      {...register('availability.regular.days', {
                        required: 'At least one day is required',
                        validate: (val) => val.length > 0 || 'Select at least one day'
                      })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked={regularDays.includes(day)}
                    />
                    <label htmlFor={`day-${day}`} className="ml-2 text-sm text-gray-700">
                      {day}
                    </label>
                  </div>
                ))}
              </div>
              {errors.availability?.regular?.days && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <FiAlertCircle className="mr-1" /> 
                  {errors.availability.regular.days.message}
                </p>
              )}
            </div>

            {/* Regular Time Slots */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Opening Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  {...register('availability.regular.startTime', {
                    required: 'Opening time is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  defaultValue="06:00"
                />
                {errors.availability?.regular?.startTime && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <FiAlertCircle className="mr-1" /> 
                    {errors.availability.regular.startTime.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Closing Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  {...register('availability.regular.endTime', {
                    required: 'Closing time is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  defaultValue="20:00"
                />
                {errors.availability?.regular?.endTime && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <FiAlertCircle className="mr-1" /> 
                    {errors.availability.regular.endTime.message}
                  </p>
                )}
              </div>
            </div>

            {/* Weekly Unavailable Slots */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weekly Unavailable Time Slots
                <span className="ml-1 text-xs text-gray-500">
                  (Recurring weekly unavailability)
                </span>
              </label>
              <div className="flex flex-wrap gap-3 max-h-48 overflow-y-auto border border-gray-300 rounded p-3">
                {predefinedTimeSlots.map((slot, idx) => (
                  <div key={idx} className="flex items-center w-1/2 md:w-1/3">
                    <input
                      type="checkbox"
                      id={`slot-${idx}`}
                      value={slot}
                      {...register('availability.regular.unavailableSlots')}
                      defaultChecked={isSlotUnavailable(slot)}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`slot-${idx}`} className={`ml-2 text-sm ${
                      isSlotUnavailable(slot) ? 'text-red-600' : 'text-gray-700'
                    }`}>
                      {slot}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Date-Specific Exceptions */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <FiCalendar className="mr-2" />
              Date-Specific Unavailability
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Add specific dates when the turf is unavailable (holidays, events, etc.)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  minDate={new Date()}
                  placeholderText="Select date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  value={newException.startTime}
                  onChange={(e) => setNewException({...newException, startTime: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  value={newException.endTime}
                  onChange={(e) => setNewException({...newException, endTime: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason
                </label>
                <select
                  value={newException.reason}
                  onChange={(e) => setNewException({...newException, reason: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="offline-booking">Offline Booking</option>
                  <option value="holiday">Holiday</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={addException}
              disabled={!selectedDate}
              className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add Exception
            </button>

            {/* List of exceptions */}
            {exceptions.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Current Exceptions:
                </h4>
                <ul className="space-y-2">
                  {exceptions.map((exception, index) => (
                    <li key={index} className="flex justify-between items-center p-2 border rounded">
                      <div>
                        <span className="font-medium">{exception.date}</span>: 
                        {exception.startTime} - {exception.endTime} 
                        <span className="ml-2 text-sm text-gray-500">({exception.reason})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeException(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TurfAvailability;