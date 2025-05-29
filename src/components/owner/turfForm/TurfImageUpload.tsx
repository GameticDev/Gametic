// import React from 'react';

// interface TurfImageUploadProps {
//   register: any;
//   errors: any;
//    previewImages: (string | File)[];
//   existingImages: (string | File)[];
//   onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   removeImage: (index: number) => void;
// }

// const TurfImageUpload: React.FC<TurfImageUploadProps> = ({
//   register,
//   errors,
//   previewImages,
//   existingImages,
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
//         <p className="text-red-600 text-sm mt-1">{errors.images.message}</p>
//       )}

//       <div className="mt-4 flex flex-wrap gap-3">
//         {previewImages.map((src, index) => (
//           <div key={index} className="relative w-24 h-24 rounded overflow-hidden border border-gray-300">
//             <img
//               src={src}
//               alt={`Preview ${index + 1}`}
//               className="object-cover w-full h-full"
//             />
//             <button
//               type="button"
//               onClick={() => removeImage(index)}
//               className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
//             >
//               &times;
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TurfImageUpload;



import React from 'react';

interface TurfImageUploadProps {
  register: any;
  errors: any;
  previewImages: (string | File)[];
  existingImages: (string | File)[];
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
}

const TurfImageUpload: React.FC<TurfImageUploadProps> = ({
  register,
  errors,
  previewImages,
  existingImages,
  onImageChange,
  removeImage,
}) => {
const getImageSrc = (image: string | File) => {
    if (typeof image === 'string') return image;
    return URL.createObjectURL(image);
  };

  return (
    <div className="space-y-4">
      <div>
        {/* <label className="block mb-2 font-semibold text-gray-700">
          Turf Images *
        </label> */}
         <h3 className="text-lg font-bold text-gray-800 mb-4">Upload Turf Images</h3>
        {/* <p className="text-sm text-gray-500 mb-3">
          Upload at least one image. Maximum 5 images allowed.
        </p> */}
        <div className="mb-4 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
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
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {previewImages.map((image, index) => (
          <div key={index} className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-300">
            <img
              src={getImageSrc(image)}
              alt={`Preview ${index + 1}`}
              className="object-cover w-full h-full"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
            >
              ×
            </button>
            {index < existingImages.length && (
              <span className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                Existing
              </span>
            )}
          </div>
        ))}
      </div>

      {previewImages.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No images uploaded yet
        </div>
      )}

      {errors.images && (
        <p className="text-red-600 text-sm mt-1">{errors.images.message}</p>
      )}
    </div>
  );
};

export default TurfImageUpload;

