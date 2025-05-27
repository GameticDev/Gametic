import React from 'react';

interface TurfImageUploadProps {
  register: any;
  errors: any;
  previewImages: string[];
  existingImages: string[];
  setPreviewImages: React.Dispatch<React.SetStateAction<string[]>>;
  setValue: any;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
}

const TurfImageUpload: React.FC<TurfImageUploadProps> = ({
  register,
  errors,
  previewImages,
  existingImages,
  setPreviewImages,
  setValue,
  onImageChange,
  removeImage,
}) => {
  return (
    <div>
      <label className="block mb-2 font-semibold text-gray-700">
        Upload Images
      </label>
      <input
        type="file"
        multiple
        accept="image/*"
        {...register('images')}
        onChange={onImageChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      {errors.images && (
        <p className="text-red-600 text-sm mt-1">{errors.images.message}</p>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        {previewImages.map((src, index) => (
          <div key={index} className="relative w-24 h-24 rounded overflow-hidden border border-gray-300">
            <img
              src={src}
              alt={`Preview ${index + 1}`}
              className="object-cover w-full h-full"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TurfImageUpload;



// import React from 'react';
// import {
//   UseFormRegister,
//   FieldErrors,
//   UseFormSetValue,
// } from 'react-hook-form';

// // Define the shape of your form
// interface FormData {
//   images: FileList;
// }

// interface TurfImageUploadProps {
//   register: UseFormRegister<FormData>;
//   errors: FieldErrors<FormData>;
//   previewImages: string[];
//   existingImages: string[];
//   setPreviewImages: React.Dispatch<React.SetStateAction<string[]>>;
//   setValue: UseFormSetValue<FormData>;
//   onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   removeImage: (index: number) => void;
// }

// const TurfImageUpload: React.FC<TurfImageUploadProps> = ({
//   register,
//   errors,
//   previewImages,
//   existingImages,
//   setPreviewImages,
//   setValue,
//   onImageChange,
//   removeImage,
// }) => {
//   return (
//     <div>
//       <label className="block mb-2 font-semibold text-gray-700">
//         Upload Images
//       </label>

//       <input
//         type="file"
//         multiple
//         accept="image/*"
//         {...register('images')}
//         onChange={onImageChange}
//         className="block w-full text-sm text-gray-500
//           file:mr-4 file:py-2 file:px-4
//           file:rounded file:border-0
//           file:text-sm file:font-semibold
//           file:bg-blue-50 file:text-blue-700
//           hover:file:bg-blue-100"
//       />

//       {errors.images && (
//         <p className="text-red-600 text-sm mt-1">
//           {errors.images.message}
//         </p>
//       )}

//       {/* Existing Images */}
//       {existingImages.length > 0 && (
//         <div className="mt-4">
//           <h3 className="text-gray-700 font-medium mb-2">Existing Images</h3>
//           <div className="flex flex-wrap gap-3">
//             {existingImages.map((src, index) => (
//               <div
//                 key={`existing-${index}`}
//                 className="relative w-24 h-24 rounded overflow-hidden border border-gray-300"
//               >
//                 <img
//                   src={src}
//                   alt={`Existing ${index + 1}`}
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* New Image Previews */}
//       {previewImages.length > 0 && (
//         <div className="mt-4">
//           <h3 className="text-gray-700 font-medium mb-2">Selected Images</h3>
//           <div className="flex flex-wrap gap-3">
//             {previewImages.map((src, index) => (
//               <div
//                 key={`preview-${index}`}
//                 className="relative w-24 h-24 rounded overflow-hidden border border-gray-300"
//               >
//                 <img
//                   src={src}
//                   alt={`Preview ${index + 1}`}
//                   className="object-cover w-full h-full"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeImage(index)}
//                   className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
//                 >
//                   &times;
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TurfImageUpload;








// import React from 'react';
// import { useFormContext } from 'react-hook-form';
// import { FiAlertCircle, FiTrash2 } from 'react-icons/fi';

// interface TurfImageUploadProps {
//   previewImages: (string | ArrayBuffer)[];
//   onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   removeImage: (index: number) => void;
// }

// const TurfImageUpload: React.FC<TurfImageUploadProps> = ({ 
//   previewImages, 
//   onImageChange, 
//   removeImage 
// }) => {
//   const { formState: { errors } } = useFormContext();

//   return (
//     <div className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Upload Images <span className="text-red-500">*</span>
//         </label>
//         <div className="flex items-center justify-center w-full">
//           <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
//             <div className="flex flex-col items-center justify-center pt-5 pb-6">
//               <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
//               </svg>
//               <p className="mb-2 text-sm text-gray-500">
//                 <span className="font-semibold">Click to upload</span> or drag and drop
//               </p>
//               <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB each)</p>
//             </div>
//             <input 
//               id="dropzone-file" 
//               type="file" 
//               multiple 
//               accept="image/*"
//               className="hidden"
//               onChange={onImageChange}
//             />
//           </label>
//         </div>
//         {errors.images && (
//           <p className="mt-1 text-sm text-red-600 flex items-center">
//             <FiAlertCircle className="mr-1" /> {errors.images.message?.toString()}
//           </p>
//         )}
//       </div>

//       {previewImages.length > 0 && (
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Selected Images
//           </label>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//             {previewImages.map((src, index) => (
//               <div key={index} className="relative group">
//                 <img
//                   src={typeof src === 'string' ? src : src.toString()}
//                   alt={`Preview ${index + 1}`}
//                   className="w-full h-32 object-cover rounded-lg border border-gray-200"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeImage(index)}
//                   className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                 >
//                   <FiTrash2 size={14} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TurfImageUpload;