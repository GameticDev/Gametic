// 'use client';
// import React, { useCallback } from 'react';
// import { FiAlertCircle, FiUpload, FiX } from 'react-icons/fi';
// import { useFormContext } from 'react-hook-form';
// import { TurfFormInputs } from '@/types/turf';
// import { toast } from 'react-toastify';

// interface TurfImageUploadProps {
//   previewImages: string[];
//   existingImages: string[];
//   setPreviewImages: (images: string[]) => void;
// }

// const TurfImageUpload: React.FC<TurfImageUploadProps> = ({
//   previewImages,
//   existingImages,
//   setPreviewImages,
// }) => {
//   const {
//     register,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useFormContext<TurfFormInputs>();

//   const handleFileChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const files = e.target.files;
//       if (!files) return;

//       const newPreviewImages: string[] = [];
//       const fileArray = Array.from(files);

//       if (fileArray.length + previewImages.length > 5) {
//         toast.error('Maximum 5 images allowed');
//         return;
//       }

//       fileArray.forEach((file) => {
//         if (file.size > 2 * 1024 * 1024) {
//           toast.error(`File ${file.name} is too large (max 2MB)`);
//           return;
//         }

//         const reader = new FileReader();
//         reader.onload = (event) => {
//           if (event.target?.result) {
//             newPreviewImages.push(event.target.result as string);
//             if (newPreviewImages.length === fileArray.length) {
//               setPreviewImages([...previewImages, ...newPreviewImages]);
//             }
//           }
//         };
//         reader.readAsDataURL(file);
//       });

//       // Update form value
//       const currentImages = watch('images');
//       if (currentImages instanceof FileList) {
//         const dt = new DataTransfer();
//         Array.from(currentImages).forEach((file) => dt.items.add(file));
//         fileArray.forEach((file) => dt.items.add(file));
//         setValue('images', dt.files);
//       } else {
//         setValue('images', fileArray);
//       }
//     },
//     [previewImages, setPreviewImages, setValue, watch]
//   );

//   const handleRemoveImage = useCallback(
//     (index: number) => {
//       const newPreviewImages = [...previewImages];
//       newPreviewImages.splice(index, 1);
//       setPreviewImages(newPreviewImages);

//       // Update form value
//       const currentImages = watch('images');
//       if (currentImages instanceof FileList) {
//         const dt = new DataTransfer();
//         Array.from(currentImages)
//           .filter((_, i) => i !== index)
//           .forEach((file) => dt.items.add(file));
//         setValue('images', dt.files);
//       } else if (Array.isArray(currentImages)) {
//         setValue(
//           'images',
//           currentImages.filter((_, i) => i !== index)
//         );
//       }
//     },
//     [previewImages, setPreviewImages, setValue, watch]
//   );

//   return (
//     <div className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Images <span className="text-red-500">*</span>
//         </label>
//         <div className="flex items-center">
//           <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 border-gray-300">
//             <input
//               type="file"
//               multiple
//               accept="image/jpeg, image/png, image/webp"
//               {...register('images', {
//                 required: 'At least one image is required',
//                 validate: {
//                   fileSize: (files) => {
//                     if (!files) return true;
//                     if (Array.isArray(files)) return true;
//                     for (let i = 0; i < files.length; i++) {
//                       if (files[i].size > 2 * 1024 * 1024) {
//                         return 'File size should be less than 2MB';
//                       }
//                     }
//                     return true;
//                   },
//                   fileType: (files) => {
//                     if (!files) return true;
//                     if (Array.isArray(files)) return true;
//                     const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
//                     for (let i = 0; i < files.length; i++) {
//                       if (!allowedTypes.includes(files[i].type)) {
//                         return 'Only JPEG, PNG, and WEBP images are allowed';
//                       }
//                     }
//                     return true;
//                   },
//                   maxFiles: (files) => {
//                     if (!files) return true;
//                     if (Array.isArray(files)) return files.length <= 5 || 'Maximum 5 images allowed';
//                     return files.length <= 5 || 'Maximum 5 images allowed';
//                   },
//                 },
//               })}
//               onChange={handleFileChange}
//               className="hidden"
//             />
//             <div className="flex flex-col items-center">
//               <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
//               <p className="text-sm text-gray-500 text-center">
//                 <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
//               </p>
//               <p className="text-xs text-gray-500 mt-1">JPEG, PNG, or WEBP (Max 2MB each)</p>
//             </div>
//           </label>
//         </div>
//         {errors.images && (
//           <p className="mt-2 text-sm text-red-600 flex items-center">
//             <FiAlertCircle className="mr-1" /> {errors.images.message}
//           </p>
//         )}
//       </div>

//       {(previewImages.length > 0 || existingImages.length > 0) && (
//         <div>
//           <p className="text-sm text-gray-500 mb-2">Selected Images:</p>
//           <div className="flex flex-wrap gap-4">
//             {existingImages.map((img, idx) => (
//               <div key={`existing-${idx}`} className="relative group">
//                 <img
//                   src={img}
//                   alt={`Existing ${idx + 1}`}
//                   className="w-24 h-24 object-cover rounded border border-gray-200"
//                 />
//               </div>
//             ))}
//             {previewImages.map((img, idx) => (
//               <div key={`new-${idx}`} className="relative group">
//                 <img
//                   src={img}
//                   alt={`Preview ${idx + 1}`}
//                   className="w-24 h-24 object-cover rounded border border-blue-200"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveImage(idx)}
//                   className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                 >
//                   <FiX size={14} />
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





import React, { useEffect } from 'react';
import { FiAlertCircle, FiUpload, FiX } from 'react-icons/fi';

interface TurfImageUploadProps {
  register: any;
  errors: any;
  previewImages: string[];
  existingImages: string[];
  setPreviewImages: (images: string[]) => void;
}

const TurfImageUpload: React.FC<TurfImageUploadProps> = ({
  register,
  errors,
  previewImages,
  existingImages,
  setPreviewImages,
}) => {
  const handleRemoveImage = (index: number) => {
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Images <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center">
          <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 border-gray-300">
            <input
              type="file"
              multiple
              accept="image/jpeg, image/png, image/webp"
              {...register('images', {
                required: 'At least one image is required',
                validate: {
                  fileSize: (files: FileList) => {
                    if (!files) return true;
                    for (let i = 0; i < files.length; i++) {
                      if (files[i].size > 2 * 1024 * 1024) {
                        return 'File size should be less than 2MB';
                      }
                    }
                    return true;
                  },
                  fileType: (files: FileList) => {
                    if (!files) return true;
                    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
                    for (let i = 0; i < files.length; i++) {
                      if (!allowedTypes.includes(files[i].type)) {
                        return 'Only JPEG, PNG, and WEBP images are allowed';
                      }
                    }
                    return true;
                  },
                  maxFiles: (files: FileList) => {
                    if (!files) return true;
                    return files.length <= 5 || 'Maximum 5 images allowed';
                  }
                }
              })}
              className="hidden"
            />
            <div className="flex flex-col items-center">
              <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 text-center">
                <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">JPEG, PNG, or WEBP (Max 2MB each)</p>
            </div>
          </label>
        </div>
        {errors.images && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <FiAlertCircle className="mr-1" /> {errors.images.message}
          </p>
        )}
      </div>

      {(previewImages.length > 0 || existingImages.length > 0) && (
        <div>
          <p className="text-sm text-gray-500 mb-2">Selected Images:</p>
          <div className="flex flex-wrap gap-4">
            {existingImages.map((img, idx) => (
              <div key={`existing-${idx}`} className="relative group">
                <img
                  src={img}
                  alt={`Existing ${idx + 1}`}
                  className="w-24 h-24 object-cover rounded border border-gray-200"
                />
              </div>
            ))}
            {previewImages.map((img, idx) => (
              <div key={`new-${idx}`} className="relative group">
                <img
                  src={img}
                  alt={`Preview ${idx + 1}`}
                  className="w-24 h-24 object-cover rounded border border-blue-200"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FiX size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TurfImageUpload;