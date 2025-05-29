
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../redux/store';
// import { addTurf, updateTurf } from '@/redux/actions/turfActions';
// import { toast } from 'react-toastify';
// import { FiX } from 'react-icons/fi';
// import TurfBasicInfo from './turfForm/TurfBasicInfo';
// import TurfDetails from './turfForm/TurfDetails';
// import TurfAvailability from './turfForm/TurfAvailability';
// import TurfImageUpload from './turfForm/TurfImageUpload';
// import { TurfFormInputs, Availability } from '../../types/turf';
// import { useAppSelector } from '@/redux/hook';

// interface AddTurfFormProps {
//   onClose: () => void;
//   turfToEdit?: TurfFormInputs | null;
// }

// const AddTurfForm: React.FC<AddTurfFormProps> = ({ onClose, turfToEdit }) => {
//   console.log("Turf data passed to AddTurfForm:", turfToEdit);

//   const dispatch = useDispatch<AppDispatch>();
//   const user = useAppSelector(state => state.auth.user);
//   const [step, setStep] = useState(1);
//   const [previewImages, setPreviewImages] = useState<(string | File)[]>([]);
// const [existingImages, setExistingImages] = useState<(string | File)[]>([]);

//   const [files, setFiles] = useState<File[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//     control,
//     watch,
//     trigger,
//   } = useForm<TurfFormInputs>({
//     mode: 'onChange',
//     defaultValues: {
//       availability: {
//         days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//         startTime: '06:00',
//         endTime: '20:00',
//       },
//       images: null,
//     },
//   });

//      useEffect(() => {
//   if (turfToEdit) {
//     console.log('turfToEdit.location:', turfToEdit.location);
//     // ...
//   }
// }, [turfToEdit]);

//   useEffect(() => {
//     if (turfToEdit) {
//       // Set basic fields
//       const fields: (keyof TurfFormInputs)[] = [
//         'name',
//         'city',
//         'area',
//         'location',
//         'address',
//         'turfType',
//         'size',
//         'hourlyRate',
//       ];
//       fields.forEach((field) => setValue(field, turfToEdit[field]));

//       if (turfToEdit.address) {
//       setValue('address', turfToEdit.address);
//     }


//       // Handle availability
//       let availability: Availability;
//       if (typeof turfToEdit.availability === 'string') {
//         try {
//           availability = JSON.parse(turfToEdit.availability);
//         } catch (error) {
//           console.error('Error parsing availability:', error);
//           availability = {
//             days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'],
//             startTime: '06:00',
//             endTime: '20:00',
//           };
//         }
//       } else {
//         availability = turfToEdit.availability || {
//           days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//           startTime: '06:00',
//           endTime: '20:00',
//         };
//       }
//       setValue('availability', availability);

//       // Handle images
//       if (turfToEdit.images) {
//         if (Array.isArray(turfToEdit.images)) {
//   setExistingImages(turfToEdit.images);
//   setPreviewImages(turfToEdit.images);
// }
//       }
//     }
//   }, [turfToEdit, setValue]);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files || e.target.files.length === 0) return;

//     const newFiles = Array.from(e.target.files);
//     const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));

//     setPreviewImages((prev) => [...prev, ...newPreviewUrls]);
//     setFiles((prev) => [...prev, ...newFiles]);
//     setValue('images', [...files, ...newFiles]);
//   };

//   const removeImage = (index: number) => {
//     const isExistingImage = index < existingImages.length;
    
//     if (isExistingImage) {
//       // Remove from existing images
//       const updatedExisting = [...existingImages];
//       updatedExisting.splice(index, 1);
//       setExistingImages(updatedExisting);
//     } else {
//       // Remove from new files
//       const adjustedIndex = index - existingImages.length;
//       const updatedFiles = [...files];
//       updatedFiles.splice(adjustedIndex, 1);
//       setFiles(updatedFiles);
//       setValue('images', updatedFiles);
//     }

//     // Remove from preview
//     const updatedPreview = [...previewImages];
//     updatedPreview.splice(index, 1);
//     setPreviewImages(updatedPreview);
//   };

//   const onSubmit: SubmitHandler<TurfFormInputs> = async (data) => {
//     if (step !== 4) {
//       toast.error('Please complete all steps before submitting');
//       return;
//     }

//     // if (!user?._id) {
//     //   toast.error('User information is missing - please login again');
//     //   return;
//     // }

//     const id = "682ec3f4c961fa99b0555143";
//     if (!id) {
//       toast.error('User information is missing');
//       return;
//     }

//     // For new turf, require at least one image

//     if (!turfToEdit && files.length === 0 && existingImages.length === 0) {
//       toast.error('Please upload at leasty one image');
//       return;
//     }

//     setIsSubmitting(true);
    
//     try {
//       const formData = new FormData();
//       // formData.append('ownerId', user._id);
//       formData.append('ownerId',id);
//       formData.append('name', data.name);
//       formData.append('city', data.city);
//       formData.append('area', data.area);
//       formData.append('location', data.location);
//       //  formData.append('location', data.location ?? '');
//       formData.append('turfType', data.turfType);
//       formData.append('size', data.size);
//       formData.append('hourlyRate', data.hourlyRate.toString());
//       formData.append('status', 'active');

//       const availability = data.availability || {
//         days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri','Sat', 'Sun'],
//         startTime: '06:00',
//         endTime: '20:00'
//       };
//       formData.append('availability', JSON.stringify(availability));

//       // Add new files
//       files.forEach((file) => {
//         formData.append('images', file);
//       });

//       // For editing, include existing images that haven't been removed
//       if (turfToEdit && existingImages.length > 0) {
//         existingImages.forEach((image) => {
//           formData.append('existingImages', image);
//         });
//       }

//       if (turfToEdit?._id) {
//         await dispatch(updateTurf({ id: turfToEdit._id, formData })).unwrap();
//         toast.success('Turf updated successfully!');
//       } else {
//         await dispatch(addTurf(formData)).unwrap();
//         toast.success('Turf added successfully!');
//       }
//       onClose();
//     } catch (error: any) {
//       console.error('Submission error:', error);
//       toast.error(error.message || 'Failed to save turf');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const nextStep = async () => {
//     const isValid = await validateCurrentStep();
//     if (isValid) {
//       setStep((prev) => Math.min(prev + 1, 4));
//     }
//   };

//   const prevStep = () => {
//     setStep((prev) => Math.max(prev - 1, 1));
//   };

//   const validateCurrentStep = async () => {
//     let fieldsToValidate: string[] = [];
    
//     switch (step) {
//       case 1:
//         fieldsToValidate = ['name', 'city', 'area', 'location'];
//         break;
//       case 2:
//         fieldsToValidate = ['turfType', 'size', 'hourlyRate'];
//         break;
//       case 3:
//         fieldsToValidate = ['availability.days', 'availability.startTime', 'availability.endTime'];
//         break;
//       default:
//         return true;
//     }

//     const isValid = await trigger(fieldsToValidate as any);
//     if (!isValid) {
//       toast.error('Please fill all required fields correctly');
//     }
//     return isValid;
//   };

//   return (
//     <div className="relative bg-white rounded-lg p-6 max-w-4xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-xl font-semibold">
//           {turfToEdit ? 'Edit Turf' : 'Add New Turf'}
//         </h3>
//         <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//           <FiX size={24} />
//         </button>
//       </div>

//       <div className="mb-8">
//   <div className="flex justify-between relative">
//     {/* Progress line */}
//     <div 
//       className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10"
//       style={{ width: 'calc(100% - 32px)', margin: '0 16px' }}
//     >
//       <div 
//         className="h-full bg-blue-600 transition-all duration-300" 
//         style={{ width: `${((step - 1) / 3) * 100}%` }}
//       ></div>
//     </div>
    
//     {[1, 2, 3, 4].map((stepNumber) => (
//       <div key={stepNumber} className="flex flex-col items-center relative z-10">
//         <button
//           type="button"
//           onClick={() => step > stepNumber && setStep(stepNumber)}
//           className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
//             step >= stepNumber
//               ? 'bg-blue-600 text-white border-2 border-blue-600'
//               : 'bg-white text-gray-600 border-2 border-gray-300'
//           } ${step > stepNumber ? 'cursor-pointer hover:bg-blue-500' : 'cursor-default'}`}
//         >
//           {stepNumber}
//         </button>
//         <span className={`text-xs mt-2 font-medium ${
//           step >= stepNumber ? 'text-blue-600' : 'text-gray-500'
//         }`}>
//           {stepNumber === 1 && 'Basic Info'}
//           {stepNumber === 2 && 'Details'}
//           {stepNumber === 3 && 'Availability'}
//           {stepNumber === 4 && 'Images'}
//         </span>
//       </div>
//     ))}
//   </div>
// </div>

//       <form onSubmit={step === 4 ? handleSubmit(onSubmit) : (e) => e.preventDefault()} className="space-y-6">
//         {step === 1 && (
//           <TurfBasicInfo register={register} errors={errors} control={control} />
//         )}

//         {step === 2 && (
//           <TurfDetails register={register} errors={errors} control={control} />
//         )}

//         {step === 3 && (
//           <TurfAvailability register={register} errors={errors} control={control} />
//         )}

// {/* {step === 4 && (
//           <TurfImageUpload
//             register={register}
//             errors={errors}
//             previewImages={previewImages}
//             existingImages={existingImages}
//             setPreviewImages={setPreviewImages}
//             setValue={setValue}
//             onImageChange={handleImageChange}
//             removeImage={removeImage}
//           />
//         )} */}

//         {step === 4 && (
//           <TurfImageUpload
//             register={register}
//             errors={errors}
//             previewImages={previewImages}
//             existingImages={existingImages}
//             onImageChange={handleImageChange}
//             removeImage={removeImage}
//           />
//         )}

//         <div className="flex justify-between pt-4">
//           {step > 1 ? (
//             <button
//               type="button"
//               onClick={prevStep}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 border border-gray-700 rounded-md hover:bg-gray-50"
//             >
//               Back
//             </button>
//           ) : (
//             <div />
//           )}

//           {step < 4 ? (
//             <button
//               type="button"
//               onClick={nextStep}
//               className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
//             >
//               Next
//             </button>
//           ) : (
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="px-6 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400"
//             >
//               {isSubmitting ? 'Processing...' : turfToEdit ? 'Update Turf' : 'Add Turf'}
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddTurfForm;






// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../redux/store';
// import { addTurf, updateTurf } from '@/redux/actions/turfActions';
// import { toast } from 'react-toastify';
// import { FiX } from 'react-icons/fi';
// import TurfBasicInfo from './turfForm/TurfBasicInfo';
// import TurfDetails from './turfForm/TurfDetails';
// import TurfAvailability from './turfForm/TurfAvailability';
// import TurfImageUpload from './turfForm/TurfImageUpload';
// import { TurfFormInputs, Availability } from '../../types/turf';
// import { useAppSelector } from '@/redux/hook';

// interface AddTurfFormProps {
//   onClose: () => void;
//   turfToEdit?: TurfFormInputs | null;
// }

// const AddTurfForm: React.FC<AddTurfFormProps> = ({ onClose, turfToEdit }) => {
//   console.log("Turf data passed to AddTurfForm:", turfToEdit);

//   const dispatch = useDispatch<AppDispatch>();
//   const user = useAppSelector(state => state.auth.user);
//   const [step, setStep] = useState(1);
//   const [previewImages, setPreviewImages] = useState<(string | File)[]>([]);
// const [existingImages, setExistingImages] = useState<(string | File)[]>([]);

//   const [files, setFiles] = useState<File[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//     const DEFAULT_AVAILABILITY: Availability = {
//     days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     startTime: '06:00',
//     endTime: '20:00',
//   };


//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//     control,
//     watch,
//     trigger,
//   } = useForm<TurfFormInputs>({
//     mode: 'onChange',
//     defaultValues: {
//      availability: DEFAULT_AVAILABILITY,
//       images: [],
//     },
//   });

//      useEffect(() => {
//   if (turfToEdit) {
//     console.log('turfToEdit.location:', turfToEdit.location);
//     console.log('turfToEdit.address:', turfToEdit.address);
//     // ...
//   }
// }, [turfToEdit]);

//   useEffect(() => {
//     if (turfToEdit) {
//        console.log('turfToEdit:', turfToEdit);
//       // Set basic fields
//       const fields: (keyof TurfFormInputs)[] = [
//         'name',
//         'city',
//         'area',
//         'location',
//         'address',
//         'turfType',
//         'size',
//         'hourlyRate',
//       ];

//       fields.forEach((field) => {
//       // Use nullish coalescing to handle undefined values
//       const value = turfToEdit[field] ?? '';
//       setValue(field, value);
//     });

//     //  fields.forEach((field) => {
//     //   if (turfToEdit[field]) {
//     //     setValue(field, turfToEdit[field]);
//     //   }
//     // });
    

//       // Handle availability
//       let availability: Availability;
//       if (typeof turfToEdit.availability === 'string') {
//         try {
//           availability = JSON.parse(turfToEdit.availability);
//         } catch (error) {
//           console.error('Error parsing availability:', error);
//          availability = DEFAULT_AVAILABILITY;
//         }
//       } else {
//         availability = turfToEdit.availability || DEFAULT_AVAILABILITY;
//       }
//       setValue('availability', availability);

//       // Handle images
//      if (turfToEdit.images && Array.isArray(turfToEdit.images)) {
//       setExistingImages(turfToEdit.images);
//       setPreviewImages(turfToEdit.images);
//     }
//   } else {
//     // Reset form for new turf
//     reset({
//       availability: DEFAULT_AVAILABILITY,
//       images: [],
//       address: '' // Ensure address is initialized
//     });
//   }
// }, [turfToEdit, setValue, reset]);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files || e.target.files.length === 0) return;

//     const newFiles = Array.from(e.target.files);
//     const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));

//     setPreviewImages((prev) => [...prev, ...newPreviewUrls]);
//     setFiles((prev) => [...prev, ...newFiles]);
//     setValue('images', [...files, ...newFiles]);
//   };

//   const removeImage = (index: number) => {
//     const isExistingImage = index < existingImages.length;
    
//     if (isExistingImage) {
//       // Remove from existing images
//       const updatedExisting = [...existingImages];
//       updatedExisting.splice(index, 1);
//       setExistingImages(updatedExisting);
//     } else {
//       // Remove from new files
//       const adjustedIndex = index - existingImages.length;
//       const updatedFiles = [...files];
//       updatedFiles.splice(adjustedIndex, 1);
//       setFiles(updatedFiles);
//       setValue('images', updatedFiles);
//     }

//     // Remove from preview
//     const updatedPreview = [...previewImages];
//     updatedPreview.splice(index, 1);
//     setPreviewImages(updatedPreview);
//   };

//   const onSubmit: SubmitHandler<TurfFormInputs> = async (data) => {
//     if (step !== 4) {
//       toast.error('Please complete all steps before submitting');
//       return;
//     }

//     // if (!user?._id) {
//     //   toast.error('User information is missing - please login again');
//     //   return;
//     // }

//     const id = "682ec3f4c961fa99b0555143";
//     if (!id) {
//       toast.error('User information is missing');
//       return;
//     }

//     // For new turf, require at least one image

//     if (!turfToEdit && files.length === 0 && existingImages.length === 0) {
//       toast.error('Please upload at leasty one image');
//       return;
//     }

//     setIsSubmitting(true);
    
//     try {
//       const formData = new FormData();
//       // formData.append('ownerId', user._id);
//       formData.append('ownerId',id);
//       formData.append('name', data.name);
//       formData.append('city', data.city);
//       formData.append('area', data.area);
//       formData.append('location', data.location);
//       //  formData.append('location', data.location ?? '');
//       formData.append('turfType', data.turfType);
//       formData.append('size', data.size);
//       formData.append('hourlyRate', data.hourlyRate.toString());
//       formData.append('status', 'active');

//       const availability = data.availability || DEFAULT_AVAILABILITY;
//       formData.append('availability', JSON.stringify(availability));

//       // Add new files
//       files.forEach((file) => {
//         formData.append('images', file);
//       });

//       // For editing, include existing images that haven't been removed
//       if (turfToEdit && existingImages.length > 0) {
//         existingImages.forEach((image) => {
//           formData.append('existingImages', image);
//         });
//       }

//       if (turfToEdit?._id) {
//         await dispatch(updateTurf({ id: turfToEdit._id, formData })).unwrap();
//         toast.success('Turf updated successfully!');
//       } else {
//         await dispatch(addTurf(formData)).unwrap();
//         toast.success('Turf added successfully!');
//       }
//       onClose();
//     } catch (error: any) {
//       console.error('Submission error:', error);
//       toast.error(error.message || 'Failed to save turf');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const nextStep = async () => {
//     const isValid = await validateCurrentStep();
//     if (isValid) {
//       setStep((prev) => Math.min(prev + 1, 4));
//     }
//   };

//   const prevStep = () => {
//     setStep((prev) => Math.max(prev - 1, 1));
//   };

//   const validateCurrentStep = async () => {
//     let fieldsToValidate: string[] = [];
    
//     switch (step) {
//       case 1:
//         fieldsToValidate = ['name', 'city', 'area', 'location','address'];
//         break;
//       case 2:
//         fieldsToValidate = ['turfType', 'size', 'hourlyRate'];
//         break;
//       case 3:
//         fieldsToValidate = ['availability.days', 'availability.startTime', 'availability.endTime'];
//         break;
//       default:
//         return true;
//     }

//     const isValid = await trigger(fieldsToValidate as any);
//     if (!isValid) {
//       toast.error('Please fill all required fields correctly');
//     }
//     return isValid;
//   };

//   return (
//     <div className="relative bg-white rounded-lg p-6 max-w-4xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-xl font-semibold">
//           {turfToEdit ? 'Edit Turf' : 'Add New Turf'}
//         </h3>
//         <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//           <FiX size={24} />
//         </button>
//       </div>

//  {/* Progress line */}
//       {/* <div className="mb-8">
//   <div className="flex justify-between relative">
   
//     <div 
//       className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10"
//       style={{ width: 'calc(100% - 32px)', margin: '0 16px' }}
//     >
//       <div 
//         className="h-full bg-blue-600 transition-all duration-300" 
//         style={{ width: `${((step - 1) / 3) * 100}%` }}
//       ></div>
//     </div>
    
//     {[1, 2, 3, 4].map((stepNumber) => (
//       <div key={stepNumber} className="flex flex-col items-center relative z-10">
//         <button
//           type="button"
//           onClick={() => step > stepNumber && setStep(stepNumber)}
//           className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
//             step >= stepNumber
//               ? 'bg-blue-600 text-white border-2 border-blue-600'
//               : 'bg-white text-gray-600 border-2 border-gray-300'
//           } ${step > stepNumber ? 'cursor-pointer hover:bg-blue-500' : 'cursor-default'}`}
//         >
//           {stepNumber}
//         </button>
//         <span className={`text-xs mt-2 font-medium ${
//           step >= stepNumber ? 'text-blue-600' : 'text-gray-500'
//         }`}>
//           {stepNumber === 1 && 'Basic Info'}
//           {stepNumber === 2 && 'Details'}
//           {stepNumber === 3 && 'Availability'}
//           {stepNumber === 4 && 'Images'}
//         </span>
//       </div>
//     ))}
//   </div>
// </div> */}

//       {/* <form onSubmit={step === 4 ? handleSubmit(onSubmit) : (e) => e.preventDefault()} className="space-y-6"> */}

//       <form onSubmit={handleSubmit(onSubmit)} className="p-6">
//           {/* Step Indicator */}
//           <div className="flex justify-center mb-8">
//             {[1, 2, 3, 4].map((stepNumber) => (
//               <React.Fragment key={stepNumber}>
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center 
//                     ${step === stepNumber ? 'bg-blue-600 text-white' : 
//                       step > stepNumber ? 'bg-green-500 text-white' : 'bg-gray-200'}
//                   `}
//                 >
//                   {stepNumber}
//                 </div>
//                 {stepNumber < 4 && (
//                   <div className={`h-1 w-12 mt-3 ${step > stepNumber ? 'bg-green-500' : 'bg-gray-200'}`}></div>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>

//           {/* Step 1: Basic Info */}
//         {step === 1 && (
//           <TurfBasicInfo 
//           register={register} 
//           errors={errors} 
//           control={control} />
//         )}

//  {/* Step 2: Details */}
//         {step === 2 && (
//           <TurfDetails 
//           register={register} 
//           errors={errors} 
//           control={control} />
//         )}

// {/* Step 3: Availability */}
//         {step === 3 && (
//           <TurfAvailability 
//           register={register} 
//           errors={errors} 
//           control={control} />
//         )}

// {/* {step === 4 && (
//           <TurfImageUpload
//             register={register}
//             errors={errors}
//             previewImages={previewImages}
//             existingImages={existingImages}
//             setPreviewImages={setPreviewImages}
//             setValue={setValue}
//             onImageChange={handleImageChange}
//             removeImage={removeImage}
//           />
//         )} */}

//  {/* Step 4: Images */}
//         {step === 4 && (
//           <TurfImageUpload
//             register={register}
//             errors={errors}
//             previewImages={previewImages}
//             existingImages={existingImages}
//             onImageChange={handleImageChange}
//             removeImage={removeImage}
//           />
//         )}

//         <div className="flex justify-between pt-4">
//           {step > 1 ? (
//             <button
//               type="button"
//               onClick={prevStep}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 border border-gray-700 rounded-md hover:bg-gray-50"
//             >
//               Back
//             </button>
//           ) : (
//             <div />
//           )}

//           {step < 4 ? (
//             <button
//               type="button"
//               onClick={nextStep}
//               className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
//             >
//               Next
//             </button>
//           ) : (
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="px-6 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400"
//             >
//               {isSubmitting ? 'Submitting...' : turfToEdit ? 'Update Turf' : 'Add Turf'}
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddTurfForm;




'use client';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { addTurf, updateTurf } from '@/redux/actions/turfActions';
import { toast } from 'react-toastify';
import { FiX } from 'react-icons/fi';
import TurfBasicInfo from './turfForm/TurfBasicInfo';
import TurfDetails from './turfForm/TurfDetails';
import TurfAvailability from './turfForm/TurfAvailability';
import TurfImageUpload from './turfForm/TurfImageUpload';
import { TurfFormInputs, Availability } from '../../types/turf';
import { useAppSelector } from '@/redux/hook';

interface AddTurfFormProps {
  onClose: () => void;
  turfToEdit?: TurfFormInputs | null;
}

const AddTurfForm: React.FC<AddTurfFormProps> = ({ onClose, turfToEdit }) => {
  console.log("Turf data passed to AddTurfForm:", turfToEdit);

  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector(state => state.auth.user);
  const [step, setStep] = useState(1);
  const [previewImages, setPreviewImages] = useState<(string | File)[]>([]);
  const [existingImages, setExistingImages] = useState<(string | File)[]>([]);

  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const DEFAULT_AVAILABILITY: Availability = {
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    startTime: '06:00',
    endTime: '20:00',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
    watch,
    trigger,
  } = useForm<TurfFormInputs>({
    mode: 'onChange',
    defaultValues: {
      availability: DEFAULT_AVAILABILITY,
      images: [],
    },
  });

  useEffect(() => {
    if (turfToEdit) {
      console.log('turfToEdit.location:', turfToEdit.location);
      console.log('turfToEdit.address:', turfToEdit.address);
    }
  }, [turfToEdit]);

  useEffect(() => {
    if (turfToEdit) {
      console.log('turfToEdit:', turfToEdit);
    
      const fields: (keyof TurfFormInputs)[] = [
        'name',
        'city',
        'area',
        'location',
        'address',
        'turfType',
        'size',
        'hourlyRate',
      ];

      fields.forEach((field) => {
        const value = turfToEdit[field] ?? '';
        setValue(field, value);
      });

      // Handle availability
      let availability: Availability;
      if (typeof turfToEdit.availability === 'string') {
        try {
          availability = JSON.parse(turfToEdit.availability);
        } catch (error) {
          console.error('Error parsing availability:', error);
          availability = DEFAULT_AVAILABILITY;
        }
      } else {
        availability = turfToEdit.availability || DEFAULT_AVAILABILITY;
      }
      setValue('availability', availability);

      // Handle images
      if (turfToEdit.images && Array.isArray(turfToEdit.images)) {
        setExistingImages(turfToEdit.images);
        setPreviewImages(turfToEdit.images);
      }
    } else {
      // Reset form for new turf
      reset({
        availability: DEFAULT_AVAILABILITY,
        images: [],
        address: ''
      });
    }
  }, [turfToEdit, setValue, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const newFiles = Array.from(e.target.files);
    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));

    setPreviewImages((prev) => [...prev, ...newPreviewUrls]);
    setFiles((prev) => [...prev, ...newFiles]);
    setValue('images', [...files, ...newFiles]);
  };

  const removeImage = (index: number) => {
    const isExistingImage = index < existingImages.length;

    if (isExistingImage) {
      // Remove from existing images
      const updatedExisting = [...existingImages];
      updatedExisting.splice(index, 1);
      setExistingImages(updatedExisting);
    } else {
      // Remove from new files
      const adjustedIndex = index - existingImages.length;
      const updatedFiles = [...files];
      updatedFiles.splice(adjustedIndex, 1);
      setFiles(updatedFiles);
      setValue('images', updatedFiles);
    }

    // Remove from preview
    const updatedPreview = [...previewImages];
    updatedPreview.splice(index, 1);
    setPreviewImages(updatedPreview);
  };

  const nextStep = async () => {
  const isValid = await validateCurrentStep();
  if (!isValid) return;

  // For all cases, just move to next step
  // We'll handle image validation only during final submission
  setStep((prev) => Math.min(prev + 1, 4));
};

  const onSubmit: SubmitHandler<TurfFormInputs> = async (data) => {
  // Only validate images on final submission
  if (!turfToEdit && files.length === 0 && existingImages.length === 0) {
    // toast.error('Please upload at least one image');
    return;
  }

  if (turfToEdit && files.length === 0 && existingImages.length === 0) {
    toast.error('Please keep or upload at least one image');
    return;
  }

    setIsSubmitting(true);
    // if (!user?._id) {
    //   toast.error('User information is missing - please login again');
    //   return;
    // }

    const id = "682ec3f4c961fa99b0555143";
    if (!id) {
      toast.error('User information is missing');
      return;
    }

    try {
      const formData = new FormData();
      // formData.append('ownerId', user._id);
      formData.append('ownerId', id);
      formData.append('name', data.name);
      formData.append('city', data.city);
      formData.append('area', data.area);
      formData.append('location', data.location);
      formData.append('turfType', data.turfType);
      formData.append('size', data.size);
      formData.append('hourlyRate', data.hourlyRate.toString());
      formData.append('status', 'active');

      const availability = data.availability || DEFAULT_AVAILABILITY;
      formData.append('availability', JSON.stringify(availability));

      // Add new files
      files.forEach((file) => {
        formData.append('images', file);
      });

      // For editing, include existing images that haven't been removed
      if (turfToEdit && existingImages.length > 0) {
        existingImages.forEach((image) => {
          formData.append('existingImages', image);
        });
      }

      if (turfToEdit?._id) {
        await dispatch(updateTurf({ id: turfToEdit._id, formData })).unwrap();
        toast.success('Turf updated successfully!');
      } else {
        await dispatch(addTurf(formData)).unwrap();
        toast.success('Turf added successfully!');
      }
      onClose();
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(error.message || 'Failed to save turf');
    } finally {
      setIsSubmitting(false);
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const validateCurrentStep = async () => {
    let fieldsToValidate: string[] = [];

    switch (step) {
      case 1:
        fieldsToValidate = ['name', 'city', 'area', 'location', 'address'];
        break;
      case 2:
        fieldsToValidate = ['turfType', 'size', 'hourlyRate'];
        break;
      case 3:
        fieldsToValidate = ['availability.days', 'availability.startTime', 'availability.endTime'];
        break;
      case 4:
        return true;
      default:
        return true;
    }

    const isValid = await trigger(fieldsToValidate as any);
    if (!isValid) {
      toast.error('Please fill all required fields correctly');
    }
    return isValid;
  };

  return (
    <div className="relative bg-white rounded-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">
          {turfToEdit ? 'Edit Turf' : 'Add New Turf'}
        </h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FiX size={24} />
        </button>
      </div>

      {/* Progress line */}

      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          {[1, 2, 3, 4].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                    ${step === stepNumber ? 'bg-blue-600 text-white' :
                    step > stepNumber ? 'bg-green-500 text-white' : 'bg-gray-200'}
                  `}
              >
                {stepNumber}
              </div>
              {stepNumber < 4 && (
                <div className={`h-1 w-12 mt-3 ${step > stepNumber ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <TurfBasicInfo
            register={register}
            errors={errors}
            control={control} />
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <TurfDetails
            register={register}
            errors={errors}
            control={control} />
        )}

        {/* Step 3: Availability */}
        {step === 3 && (
          <TurfAvailability
            register={register}
            errors={errors}
            control={control} />
        )}

        {/* Step 4: Images */}
        {step === 4 && (
          <TurfImageUpload
            register={register}
            errors={errors}
            previewImages={previewImages}
            existingImages={existingImages}
            onImageChange={handleImageChange}
            removeImage={removeImage}
          />
        )}

        <div className="flex justify-between pt-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 border border-gray-700 rounded-md hover:bg-gray-50"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Submitting...' : turfToEdit ? 'Update Turf' : 'Add Turf'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTurfForm;

