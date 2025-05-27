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



// import React from 'react';
// import { useFormContext } from 'react-hook-form';
// import { FiAlertCircle } from 'react-icons/fi';

// const turfTypes = [
//   'Football',
//   'Cricket',
//   'Basketball',
//   'Badminton',
//   'Tennis',
//   'Volleyball',
//   'Hockey',
//   'Multi-sport'
// ];

// const TurfDetails: React.FC = () => {
//   const { register, formState: { errors } } = useFormContext();

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {/* Turf Type */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Turf Type <span className="text-red-500">*</span>
//         </label>
//         <select
//           {...register('turfType')}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="">Select turf type</option>
//           {turfTypes.map(type => (
//             <option key={type} value={type}>{type}</option>
//           ))}
//         </select>
//         {errors.turfType && (
//           <p className="mt-1 text-sm text-red-600 flex items-center">
//             <FiAlertCircle className="mr-1" /> {errors.turfType.message?.toString()}
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
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <span className="text-gray-500">₹</span>
//           </div>
//           <input
//             type="number"
//             {...register('hourlyRate', { valueAsNumber: true })}
//             className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             min="1"
//             step="50"
//           />
//         </div>
//         {errors.hourlyRate && (
//           <p className="mt-1 text-sm text-red-600 flex items-center">
//             <FiAlertCircle className="mr-1" /> {errors.hourlyRate.message?.toString()}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TurfDetails;
