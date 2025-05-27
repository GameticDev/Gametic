'use client';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { addTurf, updateTurf } from '@/redux/actions/turfActions';
import { toast } from 'react-toastify';
import { FiX } from 'react-icons/fi';
import TurfBasicInfo from './TurfBasicInfo';
import TurfDetails from './TurfDetails';
import TurfAvailability from './TurfAvailability';
import TurfImageUpload from './TurfImageUpload';
import { TurfFormInputs, Availability } from '../../types/turf';

interface AddTurfFormProps {
  onClose: () => void;
  turfToEdit?: TurfFormInputs | null;
}

const AddTurfForm: React.FC<AddTurfFormProps> = ({ onClose, turfToEdit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [step, setStep] = useState(1);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  // const [isSubmitting, setIsSubmitting] = useState(false);

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
    defaultValues: {
      availability: {
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        startTime: '08:00',
        endTime: '20:00',
      },
      images: null,
    },
  });

  useEffect(() => {
    if (turfToEdit) {
      // Set basic fields
      const fields: (keyof TurfFormInputs)[] = [
        'name',
        'city',
        'area',
        'location',
        'turfType',
        'size',
        'hourlyRate',
      ];
      fields.forEach((field) => setValue(field, turfToEdit[field]));

      // Handle availability
      let availability: Availability;
      if (typeof turfToEdit.availability === 'string') {
        availability = JSON.parse(turfToEdit.availability);
      } else {
        availability =
          turfToEdit.availability || {
            days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            startTime: '08:00',
            endTime: '20:00',
          };
      }
      setValue('availability', availability);

      // Handle images
      if (turfToEdit.images) {

         console.log(" turfToEdit.images setExistingImages=", turfToEdit.images);
console.log(" isArray:", Array.isArray(turfToEdit.images));

        if (Array.isArray(turfToEdit.images)) {
          setExistingImages(turfToEdit.images);
          setPreviewImages(turfToEdit.images);
        } else if (typeof turfToEdit.images === 'string') {
          setExistingImages([turfToEdit.images]);
          setPreviewImages([turfToEdit.images]);
        }
      }
    }
  }, [turfToEdit, setValue]);




//   useEffect(() => {
//   const fetchData = async () => {
//     if (userInfo?._id) {
//       await dispatch(fetchTurfs(userInfo._id));
//     }
//   };
  
//   if (success) {
//     setShowForm(false);
//     setEditingTurf(null);
//     dispatch(resetTurfState());
//     fetchData(); // Explicit fetch
//   }
// }, [success, dispatch, userInfo?._id]);



  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesFromInput = e.target.files;

     console.log("Selected files:", files);

    if (filesFromInput && filesFromInput.length > 0) {
        console.log("No files selected");
      const fileArray = Array.from(filesFromInput);
      const newPreviewUrls = fileArray.map((file) => URL.createObjectURL(file));
       console.log("Preview image URLs:", newPreviewUrls);

      setPreviewImages((prev) => [...prev, ...newPreviewUrls]);
      setFiles((prev) => [...prev, ...fileArray]);
      setValue('images', fileArray);
    }else {
    console.log("No files selected");
  }
  };

  const removeImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<TurfFormInputs> = async (data) => {
  
    console.log('Form submitted on step:', step);
    console.log('Form data:', data);

    if (step !== 4) {
      toast.error('Please complete all steps before submitting');
      return; // Only submit on the final step
    }

  //    if (!userInfo?._id) {
  //   toast.error('User information is missing - please login again');
  //   return;
  // }
    const id = "682ec3f4c961fa99b0555143";
    if (!id) {
      toast.error('User information is missing');
      return;
    }

  //   if (files.length === 0) {
  //   toast.error('Please upload at least one image');
  //   return;
  // }

   // For editing, don't require new images if existing ones are present
  if (!turfToEdit && files.length === 0) {
    toast.error('Please upload at least one image');
    return;
  }
    const formData = new FormData();
    formData.append('ownerId', id);
    formData.append('name', data.name);
    formData.append('city', data.city);
    formData.append('area', data.area);
    formData.append('location', data.location);
      // if (data.location) formData.append('location', data.location);
    formData.append('turfType', data.turfType);
    formData.append('size', data.size);
    formData.append('hourlyRate', data.hourlyRate.toString());
     formData.append('status', 'active');

  const availability = data.availability || {
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    startTime: '08:00',
    endTime: '20:00'
  };
  formData.append('availability', JSON.stringify(availability));
  
   

    files.forEach((file) => {
      formData.append('images', file);
    });

      // For editing, include existing images
  if (turfToEdit && existingImages.length > 0) {
    formData.append('existingImages', JSON.stringify(existingImages));
  }

  try {
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
  }
};

  const nextStep = async () => {
    // Validate current step fields before proceeding
    let isValid = false;
    
    if (step === 1) {
      isValid = await trigger(['name', 'city', 'area']);
    } else if (step === 2) {
      isValid = await trigger(['turfType', 'size', 'hourlyRate']);
    } else if (step === 3) {
      isValid = await trigger(['availability.days', 'availability.startTime', 'availability.endTime']);
    }

    if (isValid) {
      setStep((prev) => Math.min(prev + 1, 4));
    } else {
      toast.error('Please fill all required fields correctly');
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const validateCurrentStep = async () => {
    let isValid = false;
    
    if (step === 1) {
      isValid = await trigger(['name', 'city', 'area']);
    } else if (step === 2) {
      isValid = await trigger(['turfType', 'size', 'hourlyRate']);
    } else if (step === 3) {
      isValid = await trigger(['availability.days', 'availability.startTime', 'availability.endTime']);
    }

    if (!isValid) {
      toast.error('Please fill all required fields correctly');
      return false;
    }
    return true;
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

      <div className="mb-8">
        <div className="flex justify-between">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
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

      {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-6"> */}
       <form onSubmit={step === 4 ? handleSubmit(onSubmit) : (e) => e.preventDefault()} className="space-y-6">
      {/* <div> */}
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
            setValue={setValue}
            onImageChange={handleImageChange}
            removeImage={removeImage}
          />
        )}


        <div className="flex justify-between pt-4">
          {step > 1 ? (
            <button
              type="button"
              // onClick={prevStep}
                onClick={() => setStep(prev => prev - 1)}
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
              // onClick={nextStep}
               onClick={async () => {
                const isValid = await validateCurrentStep();
                if (isValid) {
                  setStep(prev => prev + 1);
                }
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              //  disabled={isSubmitting}
              className="px-6 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              {turfToEdit ? 'Update Turf' : 'Add Turf'}
               {/* {isSubmitting ? 'Processing...' : turfToEdit ? 'Update Turf' : 'Add Turf'} */}
            </button>
          )}
        </div>
      </form>
      </div>
    // </div>
  );
};

export default AddTurfForm;

