'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { addTurf } from '@/redux/actions/turfActions';
import { FormInput } from './ui/FormInput';
import { FileUpload } from './ui/FileUpload';
import Button from './ui/Button';
import { toast } from 'react-toastify';


type TurfFormInputs = {
  name: string;
  city: string;
  area: string;
  address: string;
  turfType: string;
  size: string;
  hourlyRate: number;
  images: FileList;
};

const AddTurfForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector((state: RootState) => state.turf);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TurfFormInputs>();

  const onSubmit: SubmitHandler<TurfFormInputs> = async (data) => {
  const formData = new FormData();

    // Append all form data
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'images') {
        Array.from(value as FileList).forEach((file) => {
          formData.append('image', file);
        });
      } else {
        formData.append(key, value.toString());
      }
    });

    // Append default values
    formData.append('status', 'active');

   try {
    await dispatch(addTurf(formData)).unwrap();
    toast.success('Turf added successfully!');
    setStep(1); // reset form step
  } catch (err) {
    toast.error(`Failed to add turf: ${err}`);
  }
};


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Turf</h2>

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Turf added successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {step === 1 && (
          <>
            <FormInput
              label="Turf Name"
              name="name"
              register={register}
              error={errors.name}
              required
            />

            <FormInput
              label="City"
              name="city"
              register={register}
              error={errors.city}
              required
            />

            <FormInput
              label="Area"
              name="area"
              register={register}
              error={errors.area}
              required
            />

            <FormInput
              label="Address"
              name="address"
              register={register}
              error={errors.address}
              required
            />


            <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Turf Type <span className="text-red-500">*</span>
  </label>
  <select
    {...register('turfType', { required: 'Turf Type is required' })}
    className={`w-full px-3 py-2 border rounded-md ${
      errors.turfType ? 'border-red-500' : 'border-gray-300'
    }`}
  >
    <option value="">Select Turf Type</option>
   <option value="football">Football</option>
<option value="cricket">Cricket</option>
<option value="multi-sport">Multi-sport</option>
  </select>
  {errors.turfType && (
    <p className="mt-1 text-sm text-red-600">{errors.turfType.message}</p>
  )}
</div>

            <FormInput
              label="Size"
              name="size"
              register={register}
              error={errors.size}
              required
            />

            <FormInput
              label="Hourly Rate"
              name="hourlyRate"
              type="number"
              register={register}
              error={errors.hourlyRate}
              required
            />

            <FileUpload
              label="Images"
              name="images"
              register={register}
              error={errors.images}
              required
              multiple
            />

            <div className="flex justify-end pt-4">
              <Button
                type="button"
                onClick={() => setStep(2)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-gray-700">Review your turf information before submitting.</p>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                onClick={() => setStep(1)}
                className="bg-gray-400 hover:bg-gray-500"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddTurfForm;