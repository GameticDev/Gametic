'use client';

import React, { useState, useEffect } from 'react';
import AddTurfForm from './AddTurfForm';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { resetTurfState } from '@/redux/slices/turfSlice';


const Dashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { success } = useSelector((state: RootState) => state.turf);

  useEffect(() => {
    if (success) {
      setShowForm(false); // Close the form after successful submission
       dispatch(resetTurfState());// Reset success state
    }
  }, [success, dispatch]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Owner Dashboard</h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Close Add Turf Form' : 'Add New Turf'}
      </button>

      {showForm && (
        <div className="mt-4">
          <AddTurfForm />
        </div>
      )}

      {/* Later, you can add a list of turfs or dashboard stats here */}
    </div>
  );
};

export default Dashboard;

