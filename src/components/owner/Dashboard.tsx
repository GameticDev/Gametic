'use client';

import React, { useState, useEffect } from 'react';
import { FiPlus, FiX, FiHome } from 'react-icons/fi';
import AddTurfForm from './AddTurfForm';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { resetTurfState } from '@/redux/slices/turfSlice';
import { deleteTurf, fetchTurfs } from '@/redux/actions/turfActions';
import Skeleton from './ui/Skeleton';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import TurfCard from './ui/TurfCard';
import { TurfData,TurfFormInputs } from '@/types/turf';

const Dashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTurf, setEditingTurf] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { success, loading, error } = useSelector((state: RootState) => state.turf);
  const turfs: TurfData[] = useSelector((state: RootState) => state.turf.turfs);

  const convertTurfDataToFormInputs = (turf?: TurfData): TurfFormInputs | undefined => {
  if (!turf) return undefined;

  return {

    _id: turf._id,
    ownerId: turf.ownerId || '',
    name: turf.name,
    city: turf.city,
    area: turf.area,
    location: turf.location,
    turfType: turf.turfType,
    size: turf.size,
    hourlyRate: turf.hourlyRate,
    //  images: turf.image ?? null,
    images: turf.images ?? [],
    availability:
      typeof turf.availability === 'string'
        ? JSON.parse(turf.availability)
        : turf.availability,
  };
};
  // useEffect(() => {
  //   console.log(userInfo?._id)
  //   if (userInfo?._id) {
  //     dispatch(fetchTurfs(userInfo._id));
  //   }
  // }, [dispatch, userInfo?._id]);

   useEffect(() => {
    const id = "682ec3f4c961fa99b0555143"; 
    if (id) {
      dispatch(fetchTurfs(id));
    }
  }, [dispatch]);

  // useEffect(() => {
  //   if (success) {
  //     setShowForm(false);
  //     setEditingTurf(null);
  //     dispatch(resetTurfState());
  //     if (userInfo?._id) {
  //       dispatch(fetchTurfs(userInfo._id));
  //     }
  //   }
  // }, [success, dispatch, userInfo?._id]);

  useEffect(() => {
  if (success) {
    setShowForm(false);
    setEditingTurf(null);
    dispatch(resetTurfState());
    const id = "682ec3f4c961fa99b0555143"; 
    dispatch(fetchTurfs(id));
  }
}, [success, dispatch]);

  const handleDelete = (turfId: string) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this turf?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => dispatch(deleteTurf(turfId))
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Turfs</h1>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingTurf(null);
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus className="mr-2" />
            Add New Turf
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="p-4 mb-6 bg-red-50 text-red-700 rounded-lg">
            Error: {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Skeleton loaders */}
          </div>
        ) : turfs && turfs.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <div className="mx-auto h-40 w-40 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FiHome className="text-5xl text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No turfs added yet</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first turf</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Your First Turf
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {turfs?.map((turf: TurfData) => (
              <TurfCard
                key={turf._id}
                turf={turf}
                onEdit={(id) => {
                  setEditingTurf(id);
                  setShowForm(true);
                }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <AddTurfForm 
                onClose={() => {
                  setShowForm(false);
                  setEditingTurf(null);
                }}
                turfToEdit={
                  editingTurf
                    ? convertTurfDataToFormInputs(turfs.find(t => t._id === editingTurf))
                    : undefined
                }
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default Dashboard;

