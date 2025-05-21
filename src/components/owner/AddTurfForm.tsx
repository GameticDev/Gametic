// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '@/redux/store';
// import { addTurf, updateTurf } from '@/redux/actions/turfActions';
// import { toast } from 'react-toastify';
// import { FiX } from 'react-icons/fi';
// import TurfBasicInfo from './TurfBasicInfo';
// import TurfDetails from './TurfDetails';
// import TurfAvailability from './TurfAvailability';
// import TurfImageUpload from './TurfImageUpload';

// type Availability = {
//   days: string[];
//   startTime: string;
//   endTime: string;
//   timeSlots?: string[];
//   unavailableSlots?: string[];
// };

// type TurfFormInputs = {
//   name: string;
//   city: string;
//   area: string;
//   address: string;
//   turfType: string;
//   size: string;
//   hourlyRate: number;
//   images: FileList | string[] | null;
//   availability: Availability;
//   _id?: string;
// };

// interface AddTurfFormProps {
//   onClose: () => void;
//   turfToEdit?: TurfFormInputs;
// }

// const AddTurfForm: React.FC<AddTurfFormProps> = ({ onClose, turfToEdit }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { userInfo } = useSelector((state: RootState) => state.user);
//   const [step, setStep] = useState(1);
//   const [previewImages, setPreviewImages] = useState<string[]>([]);
//   const [existingImages, setExistingImages] = useState<string[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const methods = useForm<TurfFormInputs>({
//     defaultValues: {
//       images: null,
//       availability: {
//         days: [],
//         startTime: '08:00',
//         endTime: '20:00',
//         timeSlots: [],
//         unavailableSlots: []
//       }
//     }
//   });

//   const { handleSubmit, reset, setValue } = methods;

//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, []);

//   useEffect(() => {
//     if (turfToEdit) {
//       setValue('name', turfToEdit.name);
//       setValue('city', turfToEdit.city);
//       setValue('area', turfToEdit.area);
//       setValue('address', turfToEdit.address);
//       setValue('turfType', turfToEdit.turfType);
//       setValue('size', turfToEdit.size);
//       setValue('hourlyRate', turfToEdit.hourlyRate);
//       setValue('_id', turfToEdit._id);
      
//       if (turfToEdit.availability) {
//         if (typeof turfToEdit.availability === 'string') {
//           setValue('availability.days', ['Mon', 'Tues', 'Wed', 'Thur', 'Fri']);
//           setValue('availability.startTime', '08:00');
//           setValue('availability.endTime', '20:00');
//         } else {
//           setValue('availability.days', turfToEdit.availability.days || []);
//           setValue('availability.startTime', turfToEdit.availability.startTime || '08:00');
//           setValue('availability.endTime', turfToEdit.availability.endTime || '20:00');
//           setValue('availability.timeSlots', turfToEdit.availability.timeSlots || []);
//           setValue('availability.unavailableSlots', turfToEdit.availability.unavailableSlots || []);
//         }
//       }
      
//      if (turfToEdit.images) {
//   if (Array.isArray(turfToEdit.images)) {
//     setExistingImages(turfToEdit.images as string[]);
//   } else if (typeof turfToEdit.images === 'string') {
//     setExistingImages([turfToEdit.images]);
//   }
// }


//     }
//   }, [turfToEdit, setValue]);

//   const onSubmit: SubmitHandler<TurfFormInputs> = async (data) => {
//     if (isSubmitting) return;
//     setIsSubmitting(true);

//     try {
//       const formData = new FormData();
      
//       formData.append('name', data.name);
//       formData.append('city', data.city);
//       formData.append('area', data.area);
//       formData.append('address', data.address);
//       formData.append('turfType', data.turfType);
//       formData.append('size', data.size);
//       formData.append('hourlyRate', data.hourlyRate.toString());

//       const availabilityFormatted: { [day: string]: { start: string; end: string }[] } = {};
//       data.availability.days.forEach((day: string) => {
//         availabilityFormatted[day] = [{
//           start: data.availability.startTime,
//           end: data.availability.endTime,
//         }];
//       });
//       formData.append('availability', JSON.stringify(availabilityFormatted));
//       formData.append('ownerId', userInfo?._id || '');
//       formData.append('status', 'active');

//      if (data.images instanceof FileList && data.images.length > 0) {
//   Array.from(data.images).forEach((file) => {
//     formData.append('image', file);
//   });
// }


//       if (turfToEdit?._id) {
//         await dispatch(updateTurf({ id: turfToEdit._id, formData })).unwrap();
//         toast.success('Turf updated successfully!');
//       } else {
//         await dispatch(addTurf(formData)).unwrap();
//         toast.success('Turf added successfully!');
//       }
      
//       onClose();
//       reset();
//     } catch (error: any) {
//       console.error('Turf submission error:', error);
//       const errorMessage = error.response?.data?.message || 
//                          error.message || 
//                          'An unexpected error occurred. Please try again.';
//       toast.error(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
//   const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-start overflow-auto pt-10">
//       <div className="relative bg-white rounded-lg p-6 max-w-4xl w-full shadow-lg">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-xl font-semibold">
//             {turfToEdit ? 'Edit Turf' : 'Add New Turf'}
//           </h3>
//           <button 
//             onClick={onClose} 
//             className="text-gray-500 hover:text-gray-700 transition-colors"
//             disabled={isSubmitting}
//           >
//             <FiX size={24} />
//           </button>
//         </div>

//         {/* Progress Steps */}
//         <div className="mb-8">
//           <div className="flex justify-between">
//             {[1, 2, 3, 4].map((stepNumber) => (
//               <div key={stepNumber} className="flex flex-col items-center">
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center 
//                     ${step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
//                 >
//                   {stepNumber}
//                 </div>
//                 <span className="text-xs mt-1">
//                   {stepNumber === 1 && 'Basic Info'}
//                   {stepNumber === 2 && 'Details'}
//                   {stepNumber === 3 && 'Availability'}
//                   {stepNumber === 4 && 'Images'}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <FormProvider {...methods}>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {step === 1 && <TurfBasicInfo />}
//             {step === 2 && <TurfDetails />}
//             {step === 3 && <TurfAvailability />}
//             {step === 4 && (
//               <TurfImageUpload
//                 previewImages={previewImages}
//                 existingImages={existingImages}
//                 setPreviewImages={setPreviewImages}
//               />
//             )}

//             <div className="flex justify-between pt-4">
//               {step > 1 ? (
//                 <button
//                   type="button"
//                   onClick={prevStep}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
//                   disabled={isSubmitting}
//                 >
//                   Back
//                 </button>
//               ) : (
//                 <div></div>
//               )}

//               {step < 4 ? (
//                 <button
//                   type="button"
//                   onClick={nextStep}
//                   className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
//                   disabled={isSubmitting}
//                 >
//                   Next
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     'Processing...'
//                   ) : turfToEdit ? (
//                     'Update Turf'
//                   ) : (
//                     'Add Turf'
//                   )}
//                 </button>
//               )}
//             </div>
//           </form>
//         </FormProvider>
//       </div>
//     </div>
//   );
// };

// export default AddTurfForm;



// // 'use client';
// // import React, { useState, useEffect } from 'react';
// // import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { AppDispatch, RootState } from '@/redux/store';
// // import { addTurf, updateTurf } from '@/redux/actions/turfActions';
// // import { toast } from 'react-toastify';
// // import { FiX } from 'react-icons/fi';
// // import TurfBasicInfo from './TurfBasicInfo';
// // import TurfDetails from './TurfDetails';
// // import TurfAvailability from './TurfAvailability';
// // import TurfImageUpload from './TurfImageUpload';
// // import { TurfFormInputs, AddTurfFormProps, TimeSlot } from '@/types/turf';

// // const AddTurfForm: React.FC<AddTurfFormProps> = ({ onClose, turfToEdit }) => {
// //   const dispatch = useDispatch<AppDispatch>();
// //   const { userInfo } = useSelector((state: RootState) => state.user);
// //   const [step, setStep] = useState(1);
// //   const [previewImages, setPreviewImages] = useState<string[]>([]);
// //   const [existingImages, setExistingImages] = useState<string[]>([]);
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const methods = useForm<TurfFormInputs>({
// //     defaultValues: {
// //       name: '',
// //       city: '',
// //       area: '',
// //       address: '',
// //       turfType: '',
// //       size: '',
// //       hourlyRate: 0,
// //       images: null,
// //       availability: {
// //         days: [],
// //         startTime: '08:00',
// //         endTime: '20:00',
// //         timeSlots: [],
// //         unavailableSlots: []
// //       }
// //     }
// //   });

// //   const { handleSubmit, reset, setValue, watch } = methods;

// //   useEffect(() => {
// //     document.body.style.overflow = 'hidden';
// //     return () => {
// //       document.body.style.overflow = 'auto';
// //     };
// //   }, []);

// //   useEffect(() => {
// //     if (turfToEdit) {
// //       setValue('name', turfToEdit.name);
// //       setValue('city', turfToEdit.city);
// //       setValue('area', turfToEdit.area);
// //       setValue('address', turfToEdit.address);
// //       setValue('turfType', turfToEdit.turfType);
// //       setValue('size', turfToEdit.size);
// //       setValue('hourlyRate', turfToEdit.hourlyRate);
// //       setValue('_id', turfToEdit._id);
      
// //       if (turfToEdit.availability) {
// //         if (typeof turfToEdit.availability === 'string') {
// //           try {
// //             const parsedAvailability = JSON.parse(turfToEdit.availability);
// //             setValue('availability.days', Object.keys(parsedAvailability));
// //             setValue('availability.startTime', '08:00');
// //             setValue('availability.endTime', '20:00');
// //           } catch {
// //             setValue('availability.days', ['Mon', 'Tues', 'Wed', 'Thur', 'Fri']);
// //             setValue('availability.startTime', '08:00');
// //             setValue('availability.endTime', '20:00');
// //           }
// //         } else {
// //           setValue('availability.days', turfToEdit.availability.days || []);
// //           setValue('availability.startTime', turfToEdit.availability.startTime || '08:00');
// //           setValue('availability.endTime', turfToEdit.availability.endTime || '20:00');
// //           setValue('availability.timeSlots', turfToEdit.availability.timeSlots || []);
// //           setValue('availability.unavailableSlots', turfToEdit.availability.unavailableSlots || []);
// //         }
// //       }
      
// //       if (turfToEdit.images) {
// //         if (Array.isArray(turfToEdit.images)) {
// //           setExistingImages(turfToEdit.images);
// //         } else if (typeof turfToEdit.images === 'string') {
// //           setExistingImages([turfToEdit.images]);
// //         }
// //       }
// //     }
// //   }, [turfToEdit, setValue]);

// //   const onSubmit: SubmitHandler<TurfFormInputs> = async (data) => {
// //     if (isSubmitting) return;
// //     setIsSubmitting(true);

// //     try {
// //       const formData = new FormData();
      
// //       // Append basic info
// //       formData.append('name', data.name);
// //       formData.append('city', data.city);
// //       formData.append('area', data.area);
// //       formData.append('address', data.address);
// //       formData.append('turfType', data.turfType);
// //       formData.append('size', data.size);
// //       formData.append('hourlyRate', data.hourlyRate.toString());

// //       // Format availability
// //       const availabilityFormatted: Record<string, TimeSlot[]> = {};
// //       data.availability.days.forEach((day: string) => {
// //         availabilityFormatted[day] = [{
// //           start: data.availability.startTime,
// //           end: data.availability.endTime,
// //         }];
// //       });
// //       formData.append('availability', JSON.stringify(availabilityFormatted));
      
// //       // Append owner and status
// //       if (userInfo?._id) {
// //         formData.append('ownerId', userInfo._id);
// //       }
// //       formData.append('status', 'active');

// //       // Handle images
// //       if (data.images instanceof FileList) {
// //         Array.from(data.images).forEach((file) => {
// //           formData.append('images', file);
// //         });
// //       } else if (Array.isArray(data.images)) {
// //         data.images.forEach((image) => {
// //           formData.append('images', image);
// //         });
// //       }

// //       // Dispatch appropriate action
// //       if (turfToEdit?._id) {
// //         await dispatch(updateTurf({ id: turfToEdit._id, formData })).unwrap();
// //         toast.success('Turf updated successfully!');
// //       } else {
// //         await dispatch(addTurf(formData)).unwrap();
// //         toast.success('Turf added successfully!');
// //       }
      
// //       onClose();
// //       reset();
// //     } catch (error: unknown) {
// //       let errorMessage = 'An unexpected error occurred. Please try again.';
      
// //       if (error instanceof Error) {
// //         errorMessage = error.message;
// //       } else if (typeof error === 'object' && error !== null && 'message' in error) {
// //         errorMessage = String(error.message);
// //       }
      
// //       toast.error(errorMessage);
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
// //   const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

// //   return (
// //     <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-start overflow-auto pt-10">
// //       <div className="relative bg-white rounded-lg p-6 max-w-4xl w-full shadow-lg">
// //         <div className="flex justify-between items-center mb-6">
// //           <h3 className="text-xl font-semibold">
// //             {turfToEdit ? 'Edit Turf' : 'Add New Turf'}
// //           </h3>
// //           <button 
// //             onClick={onClose} 
// //             className="text-gray-500 hover:text-gray-700 transition-colors"
// //             disabled={isSubmitting}
// //             aria-label="Close form"
// //           >
// //             <FiX size={24} />
// //           </button>
// //         </div>

// //         {/* Progress Steps */}
// //         <div className="mb-8">
// //           <div className="flex justify-between">
// //             {[1, 2, 3, 4].map((stepNumber) => (
// //               <div key={stepNumber} className="flex flex-col items-center">
// //                 <div
// //                   className={`w-8 h-8 rounded-full flex items-center justify-center 
// //                     ${step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
// //                 >
// //                   {stepNumber}
// //                 </div>
// //                 <span className="text-xs mt-1">
// //                   {stepNumber === 1 && 'Basic Info'}
// //                   {stepNumber === 2 && 'Details'}
// //                   {stepNumber === 3 && 'Availability'}
// //                   {stepNumber === 4 && 'Images'}
// //                 </span>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <FormProvider {...methods}>
// //           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
// //             {step === 1 && <TurfBasicInfo />}
// //             {step === 2 && <TurfDetails />}
// //             {step === 3 && <TurfAvailability />}
// //             {step === 4 && (
// //               <TurfImageUpload
// //                 previewImages={previewImages}
// //                 existingImages={existingImages}
// //                 setPreviewImages={setPreviewImages}
// //               />
// //             )}

// //             <div className="flex justify-between pt-4">
// //               {step > 1 ? (
// //                 <button
// //                   type="button"
// //                   onClick={prevStep}
// //                   className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
// //                   disabled={isSubmitting}
// //                 >
// //                   Back
// //                 </button>
// //               ) : (
// //                 <div></div>
// //               )}

// //               {step < 4 ? (
// //                 <button
// //                   type="button"
// //                   onClick={nextStep}
// //                   className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
// //                   disabled={isSubmitting}
// //                 >
// //                   Next
// //                 </button>
// //               ) : (
// //                 <button
// //                   type="submit"
// //                   className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
// //                   disabled={isSubmitting}
// //                 >
// //                   {isSubmitting ? (
// //                     'Processing...'
// //                   ) : turfToEdit ? (
// //                     'Update Turf'
// //                   ) : (
// //                     'Add Turf'
// //                   )}
// //                 </button>
// //               )}
// //             </div>
// //           </form>
// //         </FormProvider>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddTurfForm;


// // 'use client';
// // import React, { useState, useEffect } from 'react';
// // import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { AppDispatch, RootState } from '@/redux/store';
// // import { addTurf, updateTurf } from '@/redux/actions/turfActions';
// // import { toast } from 'react-toastify';
// // import { FiX } from 'react-icons/fi';
// // import TurfBasicInfo from './TurfBasicInfo';
// // import TurfDetails from './TurfDetails';
// // import TurfAvailability from './TurfAvailability';
// // import TurfImageUpload from './TurfImageUpload';
// // import { TurfFormInputs, AvailabilityDay } from '@/types/turf';

// // interface AddTurfFormProps {
// //   onClose: () => void;
// //   turfToEdit?: TurfFormInputs;
// // }

// // const AddTurfForm: React.FC<AddTurfFormProps> = ({ onClose, turfToEdit }) => {
// //   const dispatch = useDispatch<AppDispatch>();
// //   const { userInfo } = useSelector((state: RootState) => state.user);
// //   const [step, setStep] = useState(1);
// //   const [previewImages, setPreviewImages] = useState<string[]>([]);
// //   const [existingImages, setExistingImages] = useState<string[]>([]);
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const defaultAvailability = {
// //     days: [] as AvailabilityDay[],
// //     startTime: '08:00',
// //     endTime: '20:00',
// //     timeSlots: [] as string[],
// //     unavailableSlots: [] as string[],
// //   };

// //   const methods = useForm<TurfFormInputs>({
// //     defaultValues: {
// //       name: '',
// //       city: '',
// //       area: '',
// //       address: '',
// //       turfType: '',
// //       size: '',
// //       hourlyRate: 0,
// //       images: null,
// //       availability: defaultAvailability,
// //     },
// //   });

// //   const { handleSubmit, reset, setValue, watch } = methods;

// //   useEffect(() => {
// //     document.body.style.overflow = 'hidden';
// //     return () => {
// //       document.body.style.overflow = 'auto';
// //     };
// //   }, []);

// //   useEffect(() => {
// //     if (turfToEdit) {
// //       const {
// //         name,
// //         city,
// //         area,
// //         address,
// //         turfType,
// //         size,
// //         hourlyRate,
// //         images,
// //         availability,
// //         _id,
// //       } = turfToEdit;

// //       // Set basic fields
// //       setValue('name', name);
// //       setValue('city', city);
// //       setValue('area', area);
// //       setValue('address', address);
// //       setValue('turfType', turfType);
// //       setValue('size', size);
// //       setValue('hourlyRate', hourlyRate);
// //       if (_id) setValue('_id', _id);

// //       // Handle availability
// //       let parsedAvailability = defaultAvailability;
// //       if (availability) {
// //         if (typeof availability === 'string') {
// //           try {
// //             parsedAvailability = {
// //               ...JSON.parse(availability),
// //               timeSlots: [],
// //               unavailableSlots: [],
// //             };
// //           } catch (error) {
// //             console.error('Error parsing availability:', error);
// //             parsedAvailability = {
// //               ...defaultAvailability,
// //               days: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri'] as AvailabilityDay[],
// //             };
// //           }
// //         } else {
// //           parsedAvailability = {
// //             days: availability.days || [],
// //             startTime: availability.startTime || '08:00',
// //             endTime: availability.endTime || '20:00',
// //             timeSlots: availability.timeSlots || [],
// //             unavailableSlots: availability.unavailableSlots || [],
// //           };
// //         }
// //       }
// //       setValue('availability', parsedAvailability);

// //       // Handle images
// //       if (images) {
// //         if (Array.isArray(images)) {
// //           setExistingImages(images);
// //         } else if (typeof images === 'string') {
// //           setExistingImages([images]);
// //         }
// //       }
// //     }
// //   }, [turfToEdit, setValue]);

// //   const onSubmit: SubmitHandler<TurfFormInputs> = async (data) => {
// //     if (isSubmitting) return;
// //     setIsSubmitting(true);

// //     try {
// //       const formData = new FormData();

// //       // Append basic fields
// //       formData.append('name', data.name);
// //       formData.append('city', data.city);
// //       formData.append('area', data.area);
// //       formData.append('address', data.address);
// //       formData.append('turfType', data.turfType);
// //       formData.append('size', data.size);
// //       formData.append('hourlyRate', data.hourlyRate.toString());

// //       // Format availability
// //       const availabilityFormatted: Record<string, { start: string; end: string }[]> = {};
// //       data.availability.days.forEach((day: AvailabilityDay) => {
// //         availabilityFormatted[day] = [
// //           {
// //             start: data.availability.startTime,
// //             end: data.availability.endTime,
// //           },
// //         ];
// //       });
// //       formData.append('availability', JSON.stringify(availabilityFormatted));

// //       // Append owner and status
// //       if (userInfo?._id) {
// //         formData.append('ownerId', userInfo._id);
// //       }
// //       formData.append('status', 'active');

// //       // Handle images
// //       if (data.images instanceof FileList) {
// //         Array.from(data.images).forEach((file) => {
// //           formData.append('images', file);
// //         });
// //       }

// //       // Dispatch appropriate action
// //       if (turfToEdit?._id) {
// //         await dispatch(updateTurf({ id: turfToEdit._id, formData })).unwrap();
// //         toast.success('Turf updated successfully!');
// //       } else {
// //         await dispatch(addTurf(formData)).unwrap();
// //         toast.success('Turf added successfully!');
// //       }

// //       onClose();
// //       reset();
// //     } catch (error: unknown) {
// //       console.error('Turf submission error:', error);
// //       let errorMessage = 'An unexpected error occurred. Please try again.';
      
// //       if (typeof error === 'object' && error !== null) {
// //         const err = error as { response?: { data?: { message?: string } }; message?: string };
// //         errorMessage = err.response?.data?.message || err.message || errorMessage;
// //       }

// //       toast.error(errorMessage);
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
// //   const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

// //   const currentStepContent = () => {
// //     switch (step) {
// //       case 1:
// //         return <TurfBasicInfo />;
// //       case 2:
// //         return <TurfDetails />;
// //       case 3:
// //         return <TurfAvailability />;
// //       case 4:
// //         return (
// //           <TurfImageUpload
// //             previewImages={previewImages}
// //             existingImages={existingImages}
// //             setPreviewImages={setPreviewImages}
// //           />
// //         );
// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-start overflow-auto pt-10">
// //       <div className="relative bg-white rounded-lg p-6 max-w-4xl w-full shadow-lg">
// //         <div className="flex justify-between items-center mb-6">
// //           <h3 className="text-xl font-semibold">
// //             {turfToEdit ? 'Edit Turf' : 'Add New Turf'}
// //           </h3>
// //           <button
// //             onClick={onClose}
// //             className="text-gray-500 hover:text-gray-700 transition-colors"
// //             disabled={isSubmitting}
// //           >
// //             <FiX size={24} />
// //           </button>
// //         </div>

// //         {/* Progress Steps */}
// //         <div className="mb-8">
// //           <div className="flex justify-between">
// //             {[1, 2, 3, 4].map((stepNumber) => (
// //               <div key={stepNumber} className="flex flex-col items-center">
// //                 <div
// //                   className={`w-8 h-8 rounded-full flex items-center justify-center 
// //                     ${step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
// //                 >
// //                   {stepNumber}
// //                 </div>
// //                 <span className="text-xs mt-1">
// //                   {stepNumber === 1 && 'Basic Info'}
// //                   {stepNumber === 2 && 'Details'}
// //                   {stepNumber === 3 && 'Availability'}
// //                   {stepNumber === 4 && 'Images'}
// //                 </span>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <FormProvider {...methods}>
// //           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
// //             {currentStepContent()}

// //             <div className="flex justify-between pt-4">
// //               {step > 1 ? (
// //                 <button
// //                   type="button"
// //                   onClick={prevStep}
// //                   className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
// //                   disabled={isSubmitting}
// //                 >
// //                   Back
// //                 </button>
// //               ) : (
// //                 <div></div>
// //               )}

// //               {step < 4 ? (
// //                 <button
// //                   type="button"
// //                   onClick={nextStep}
// //                   className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
// //                   disabled={isSubmitting}
// //                 >
// //                   Next
// //                 </button>
// //               ) : (
// //                 <button
// //                   type="submit"
// //                   className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
// //                   disabled={isSubmitting}
// //                 >
// //                   {isSubmitting ? (
// //                     'Processing...'
// //                   ) : turfToEdit ? (
// //                     'Update Turf'
// //                   ) : (
// //                     'Add Turf'
// //                   )}
// //                 </button>
// //               )}
// //             </div>
// //           </form>
// //         </FormProvider>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddTurfForm;



'use client';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { addTurf, updateTurf } from '@/redux/actions/turfActions';
import { toast } from 'react-toastify';
import { FiX } from 'react-icons/fi';
import TurfBasicInfo from './TurfBasicInfo';
import TurfDetails from './TurfDetails';
import TurfAvailability from './TurfAvailability';
import TurfImageUpload from './TurfImageUpload';

type TurfFormInputs = {
  name: string;
  city: string;
  area: string;
  address: string;
  turfType: string;
  size: string;
  hourlyRate: number;
  images: FileList;
  availability: {
    days: string[];
    startTime: string;
    endTime: string;
  };
};

interface AddTurfFormProps {
  onClose: () => void;
  turfToEdit?: any;
}

const AddTurfForm: React.FC<AddTurfFormProps> = ({ onClose, turfToEdit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [step, setStep] = useState(1);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
    control,
  } = useForm<TurfFormInputs>();

  useEffect(() => {
    if (turfToEdit) {
      // Initialize form with turf data
      const initializeForm = async () => {
        setValue('name', turfToEdit.name);
        setValue('city', turfToEdit.city);
        setValue('area', turfToEdit.area);
        setValue('address', turfToEdit.address);
        setValue('turfType', turfToEdit.turfType);
        setValue('size', turfToEdit.size);
        setValue('hourlyRate', turfToEdit.hourlyRate);
        
        if (turfToEdit.availability) {
          if (typeof turfToEdit.availability === 'string') {
            setValue('availability.days', ['Mon', 'Tues', 'Wed', 'Thur', 'Fri']);
            setValue('availability.startTime', '08:00');
            setValue('availability.endTime', '20:00');
          } else {
            setValue('availability.days', turfToEdit.availability.days || []);
            setValue('availability.startTime', turfToEdit.availability.startTime || '');
            setValue('availability.endTime', turfToEdit.availability.endTime || '');
          }
        }

        if (turfToEdit.image) {
          setExistingImages(Array.isArray(turfToEdit.image) ? turfToEdit.image : [turfToEdit.image]);
        }
      };
      
      initializeForm();
    }
  }, [turfToEdit, setValue]);

 const onSubmit: SubmitHandler<TurfFormInputs> = async (data) => {
  const formData = new FormData();
  
  // Debug log before creating FormData
  console.log('Form data before conversion:', {
    ...data,
    images: data.images ? Array.from(data.images).map(file => file.name) : [],
  });

  // Append basic fields
  formData.append('name', data.name);
  formData.append('city', data.city);
  formData.append('area', data.area);
  formData.append('address', data.address);
  formData.append('turfType', data.turfType);
  formData.append('size', data.size);
  formData.append('hourlyRate', data.hourlyRate.toString());

  // Handle availability with defaults
  const availability = data.availability || {
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    startTime: '08:00',
    endTime: '20:00'
  };
  formData.append('availability', JSON.stringify(availability));

  // Append owner ID with validation
  if (!userInfo?._id) {
    toast.error('User information is missing');
    return;
  }
  formData.append('ownerId', userInfo._id);
  formData.append('status', 'active');

  // Handle images - ensure field name matches backend expectation
  if (data.images && data.images.length > 0) {
    Array.from(data.images).forEach((file) => {
      formData.append('images', file); // Changed from 'image' to 'images' if backend expects array
    });
  }

  // Debug log FormData contents
  console.log('FormData entries:');
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    if (turfToEdit) {
      await dispatch(updateTurf({ id: turfToEdit._id, formData })).unwrap();
      toast.success('Turf updated successfully!');
    } else {
      await dispatch(addTurf(formData)).unwrap();
      toast.success('Turf added successfully!');
    }
    onClose();
    reset();
  } catch (err: any) {
    const errorMessage = err.message || 
                       err.response?.data?.message || 
                       err.response?.data?.error ||
                       'Failed to save turf';
    console.error('Full error object:', err); // Log full error object
    toast.error(errorMessage);
  }
};

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

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

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                {stepNumber}
              </div>
              <span className="text-xs mt-1">
                {stepNumber === 1 && 'Basic Info'}
                {stepNumber === 2 && 'Details'}
                {stepNumber === 3 && 'Availability'}
                {stepNumber === 4 && 'Images'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <TurfBasicInfo register={register} errors={errors} control={control} />
        )}

        {step === 2 && (
          <TurfDetails register={register} errors={errors} control={control} />
        )}

        {step === 3 && (
          <TurfAvailability register={register} errors={errors} control={control} />
        )}

        {step === 4 && (
          <TurfImageUpload 
            register={register} 
            errors={errors} 
            previewImages={previewImages}
            existingImages={existingImages}
            setPreviewImages={setPreviewImages}
          />
        )}

        <div className="flex justify-between pt-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Back
            </button>
          ) : (
            <div></div>
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
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {turfToEdit ? 'Update Turf' : 'Add Turf'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTurfForm;