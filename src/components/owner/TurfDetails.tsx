// 'use client';
// import React from 'react';
// import { FiAlertCircle } from 'react-icons/fi';
// import { useFormContext } from 'react-hook-form';
// import { TurfFormInputs } from '@/types/turf';

// const turfTypes = [
//   { value: 'football', label: 'Football' },
//   { value: 'cricket', label: 'Cricket' },
//   { value: 'basketball', label: 'Basketball' },
//   { value: 'badminton', label: 'Badminton' },
//   { value: 'tennis', label: 'Tennis' },
//   { value: 'volleyball', label: 'Volleyball' },
//   { value: 'hockey', label: 'Hockey' },
// ];

// const TurfDetails: React.FC = () => {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext<TurfFormInputs>();

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {/* Turf Type */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Turf Type <span className="text-red-500">*</span>
//         </label>
//         <select
//           {...register('turfType', { required: 'Turf type is required' })}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="">Select turf type</option>
//           {turfTypes.map((type) => (
//             <option key={type.value} value={type.value}>
//               {type.label}
//             </option>
//           ))}
//         </select>
//         {errors.turfType && (
//           <p className="mt-1 text-sm text-red-600 flex items-center">
//             <FiAlertCircle className="mr-1" /> {errors.turfType.message}
//           </p>
//         )}
//       </div>

//       {/* Size */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Size (optional)
//         </label>
//         <input
//           type="text"
//           {...register('size')}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="e.g., 100x50 meters"
//         />
//       </div>

//       {/* Hourly Rate */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Hourly Rate (₹) <span className="text-red-500">*</span>
//         </label>
//         <input
//           type="number"
//           {...register('hourlyRate', {
//             required: 'Hourly rate is required',
//             min: { value: 1, message: 'Rate must be positive' },
//             valueAsNumber: true,
//           })}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           min="1"
//           step="50"
//         />
//         {errors.hourlyRate && (
//           <p className="mt-1 text-sm text-red-600 flex items-center">
//             <FiAlertCircle className="mr-1" /> {errors.hourlyRate.message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TurfDetails;

import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

interface TurfDetailsProps {
  register: any;
  errors: any;
  control: any;
}

const TurfDetails: React.FC<TurfDetailsProps> = ({ register, errors, control }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Turf Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Turf Type <span className="text-red-500">*</span>
        </label>
        <select
          {...register('turfType', { required: 'Turf type is required' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select turf type</option>
          <option value="football">Football</option>
          <option value="cricket">Cricket</option>
          <option value="basketball">Basketball</option>
          <option value="badminton">Badminton</option>
          <option value="tennis">Tennis</option>
          <option value="volleyball">Volleyball</option>
          <option value="hockey">Hockey</option>
        </select>
        {errors.turfType && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <FiAlertCircle className="mr-1" /> {errors.turfType.message}
          </p>
        )}
      </div>

      {/* Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Size (optional)
        </label>
        <input
          type="text"
          {...register('size')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="100x50 meters"
        />
      </div>

      {/* Hourly Rate */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hourly Rate (₹) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          {...register('hourlyRate', { 
            required: 'Hourly rate is required',
            min: { value: 1, message: 'Rate must be positive' }
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.hourlyRate && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <FiAlertCircle className="mr-1" /> {errors.hourlyRate.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default TurfDetails;