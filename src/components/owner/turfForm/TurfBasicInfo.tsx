import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

interface TurfBasicInfoProps {
  register: any;
  errors: any;
  control: any;
}

const TurfBasicInfo: React.FC<TurfBasicInfoProps> = ({ register, errors, control }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Turf Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('name', { required: 'Turf name is required' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <FiAlertCircle className="mr-1" /> {errors.name.message}
          </p>
        )}
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('city', { required: 'City is required' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.city && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <FiAlertCircle className="mr-1" /> {errors.city.message}
          </p>
        )}
      </div>

      {/* Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Area/Locality <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('area', { required: 'Area is required' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.area && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <FiAlertCircle className="mr-1" /> {errors.area.message}
          </p>
        )}
      </div>

      {/* Address */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Address <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('address', { required: 'Address is required' })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <FiAlertCircle className="mr-1" /> {errors.address.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default TurfBasicInfo;





// import React from 'react';
// import { useFormContext } from 'react-hook-form';
// import { FiAlertCircle } from 'react-icons/fi';

// const TurfBasicInfo: React.FC = () => {
//   const { register, formState: { errors } } = useFormContext();

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {/* Name */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Turf Name <span className="text-red-500">*</span>
//         </label>
//         <input
//           type="text"
//           {...register('name')}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="e.g., Premier Soccer Field"
//         />
//         {errors.name && (
//           <p className="mt-1 text-sm text-red-600 flex items-center">
//             <FiAlertCircle className="mr-1" /> {errors.name.message?.toString()}
//           </p>
//         )}
//       </div>

//       {/* City */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           City <span className="text-red-500">*</span>
//         </label>
//         <input
//           type="text"
//           {...register('city')}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="e.g., Mumbai"
//         />
//         {errors.city && (
//           <p className="mt-1 text-sm text-red-600 flex items-center">
//             <FiAlertCircle className="mr-1" /> {errors.city.message?.toString()}
//           </p>
//         )}
//       </div>

//       {/* Area */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Area/Locality <span className="text-red-500">*</span>
//         </label>
//         <input
//           type="text"
//           {...register('area')}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="e.g., Bandra West"
//         />
//         {errors.area && (
//           <p className="mt-1 text-sm text-red-600 flex items-center">
//             <FiAlertCircle className="mr-1" /> {errors.area.message?.toString()}
//           </p>
//         )}
//       </div>

//       {/* Address */}
//       <div className="md:col-span-2">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Full Address <span className="text-red-500">*</span>
//         </label>
//         <textarea
//           {...register('address')}
//           rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Enter complete address with landmarks"
//         />
//         {errors.address && (
//           <p className="mt-1 text-sm text-red-600 flex items-center">
//             <FiAlertCircle className="mr-1" /> {errors.address.message?.toString()}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TurfBasicInfo;