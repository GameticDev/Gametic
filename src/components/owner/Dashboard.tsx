'use client';

import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import AddTurfForm from './AddTurfForm';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { resetTurfState } from '@/redux/slices/turfSlice';
import { deleteTurf, fetchTurfs } from '@/redux/actions/turfActions';
import Skeleton from './ui/Skeleton';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import TurfCard from './ui/TurfCard';
import { TurfData, TurfFormInputs } from '@/types/turf';
import Image from 'next/image';
import Pagination from './ui/Pagination';

const Dashboard: React.FC = () => {
  console.log("dashboard,habeeeeba......")
  const [showForm, setShowForm] = useState(false);
  const [editingTurf, setEditingTurf] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { success, loading, error, turfs, totalCount } = useSelector((state: RootState) => state.turf);

console.log('Redux State in dashboard after pagination:', { turfs, totalCount, loading, error });

  const convertTurfDataToFormInputs = (turf?: TurfData): TurfFormInputs | undefined => {
   
    if (!turf) return undefined;
    return {
      _id: turf._id,
      ownerId: turf.ownerId || '',
      name: turf.name,
      city: turf.city,
      area: turf.area,
      location: turf.location,
      address: turf.address,
      turfType: turf.turfType,
      size: turf.size,
      hourlyRate: turf.hourlyRate,
      images: turf.images ?? [],
      availability:
        typeof turf.availability === 'string'
          ? JSON.parse(turf.availability)
          : turf.availability,
    };
  };

  useEffect(() => {
    if (user?.id) {
      console.log("user?._id........here,,,,,",user?.id)
      dispatch(fetchTurfs({ ownerId: user.id, page: currentPage, limit: itemsPerPage }));
    }
  }, [dispatch, user?.id, currentPage, itemsPerPage]);

  useEffect(() => {
    if (success) {
      setShowForm(false);
      setEditingTurf(null);
      dispatch(resetTurfState());
      if (user?.id) {
        dispatch(fetchTurfs({ ownerId: user.id, page: currentPage, limit: itemsPerPage }));
      }
    }
  }, [success, dispatch, user?.id, currentPage, itemsPerPage]);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil((totalCount || 0) / itemsPerPage);
console.log('Total Pages:', totalPages); 
console.log({
  turfsLength: turfs.length,
  totalCount,
  itemsPerPage,
  calculatedPages: Math.ceil(totalCount / itemsPerPage)
});

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  
  if (!user.id) {
    console.log("user in dash :",user)
    console.log(user.id)
    console.log(user.id)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm text-center max-w-md">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Authentication Required</h3>
          <p className="text-gray-500 mb-6">You need to be logged in to access this page</p>
        </div>
      </div>
    );
  }

  return turfs && turfs.length === 0 ? (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/no-turf back.webp" 
          alt="Empty turf background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 text-center">
        <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
          <div className="relative w-48 h-48 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full opacity-20 blur-xl"></div>
            <Image
              src="/turf back.avif"
              alt="No turfs illustration"
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Ready to List Your Turf?
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Your dashboard is currently empty. Add your first turf to start managing bookings, 
            availability, and connect with sports enthusiasts in your area.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="relative overflow-hidden group inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <FiPlus className="mr-2 text-xl relative z-10" />
            <span className="relative z-10">Add Your First Turf</span>
          </button>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-md mx-auto">
            {[
              { icon: '🏟️', text: 'Showcase Venue', bg: 'bg-emerald-100/80', textColor: 'text-emerald-800' },
              { icon: '⏰', text: 'Manage Bookings', bg: 'bg-cyan-100/80', textColor: 'text-cyan-800' },
              { icon: '📈', text: 'Track Revenue', bg: 'bg-blue-100/80', textColor: 'text-blue-800' },
              { icon: '⭐', text: 'Get Ratings', bg: 'bg-amber-100/80', textColor: 'text-amber-800' },
              { icon: '📱', text: 'Mobile Friendly', bg: 'bg-violet-100/80', textColor: 'text-violet-800' },
              { icon: '🔄', text: 'Easy Updates', bg: 'bg-teal-100/80', textColor: 'text-teal-800' }
            ].map((item, index) => (
              <div key={index} className={`${item.bg} ${item.textColor} p-4 rounded-xl shadow-sm border border-white/50 backdrop-blur-sm hover:shadow-md transition-all`}>
                <span className="text-3xl block mb-2">{item.icon}</span>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-slideUp border border-gray-100">
            <AddTurfForm
              onClose={() => {
                setShowForm(false);
                setEditingTurf(null);
              }}
              turfToEdit={undefined}
            />
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            My Turfs
          </h1>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingTurf(null);
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FiPlus className="mr-2" />
            Add New Turf
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col flex-grow">
        {error && (
          <div className="p-4 mb-6 bg-red-50/90 backdrop-blur-sm text-red-700 rounded-lg border border-red-100 shadow-sm">
            Error: {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: itemsPerPage }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

            {totalPages > 1 && (
              <div className="mt-auto pt-6 border-t border-gray-200">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  className="px-4 py-3 bg-white rounded-xl shadow-sm"
                />
              </div>
            )}
          </>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-100">
              <AddTurfForm
                onClose={() => {
                  setShowForm(false);
                  setEditingTurf(null);
                }}
                turfToEdit={
                  editingTurf
                    ? convertTurfDataToFormInputs(turfs.find((t) => t._id === editingTurf))
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

// export default OwnerDashboard;
export default Dashboard;
