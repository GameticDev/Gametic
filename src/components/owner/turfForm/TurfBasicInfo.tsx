import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

interface TurfBasicInfoProps {
  register: any;
  errors: any;
  control: any;
   watch?: any; // Add watch if you need to track field values
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
          {...register('name', { 
            required: 'Turf name is required',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters'
            }
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter turf name"
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
          {...register('city', { 
            required: 'City is required', 
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: 'City should contain only letters'
            }
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter city"
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
          {...register('area', { 
            required: 'Area is required',
            minLength: {
              value: 3,
              message: 'Area must be at least 3 characters'
            }
           })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter area/locality"
        />
        {errors.area && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <FiAlertCircle className="mr-1" /> {errors.area.message}
          </p>
        )}
      </div>

     {/* Location */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Location <span className="text-red-500">*</span>
  </label>
  <input
    type="text"
    {...register('location', { 
      required: 'Location is required',
    minLength: {
              value: 3,
              message: 'Location must be at least 3 characters'
            }
           })}
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Enter location"
  />
  {errors.location && (
    <p className="mt-1 text-sm text-red-600 flex items-center">
      <FiAlertCircle className="mr-1" /> {errors.location.message}
    </p>
  )}
</div>

      {/* Address */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Address <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('address', { 
            required: 'Address is required' ,
          minLength: {
              value: 10,
              message: 'Address must be at least 10 characters'
            }
          })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter complete address"
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
// import { FiAlertCircle } from 'react-icons/fi';

// interface TurfBasicInfoProps {
//   register: any;
//   errors: any;
//   control: any;
//   watch?: any;
// }

// const TurfBasicInfo: React.FC<TurfBasicInfoProps> = ({ register, errors, control, watch }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//        {/* Name */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Turf Name <span className="text-red-500">*</span>
//         </label>
//         <input
//           type="text"
//           {...register('name', { 
//             required: 'Turf name is required',
//             minLength: {
//               value: 3,
//               message: 'Name must be at least 3 characters'
//             }
//           })}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Enter turf name"
//         />
//         {errors.name && (
//           <p className="mt-1 text-sm text-red-600 flex items-center">
//             <FiAlertCircle className="mr-1" /> {errors.name.message}
//           </p>
//         )}
//       </div>

//       {/* Structured Address Fields */}
//       <div className="md:col-span-2">
//         <h3 className="text-lg font-medium text-gray-700 mb-2">Address Details</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Street */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Street <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               {...register('address.street', { required: 'Street is required' })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.address?.street && (
//               <p className="mt-1 text-sm text-red-600 flex items-center">
//                 <FiAlertCircle className="mr-1" /> {errors.address.street.message}
//               </p>
//             )}
//           </div>

//           {/* Landmark */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Landmark
//             </label>
//             <input
//               type="text"
//               {...register('address.landmark')}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Postal Code */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Postal Code
//             </label>
//             <input
//               type="text"
//               {...register('address.postalCode', {
//                 pattern: {
//                   value: /^[0-9]{6}$/,
//                   message: 'Invalid postal code (6 digits required)'
//                 }
//               })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.address?.postalCode && (
//               <p className="mt-1 text-sm text-red-600 flex items-center">
//                 <FiAlertCircle className="mr-1" /> {errors.address.postalCode.message}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TurfBasicInfo;


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