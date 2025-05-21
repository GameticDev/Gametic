
'use client';

import React, { useState } from 'react';
import { FiX, FiStar } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface RatingModalProps {
  turfId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const RatingModal: React.FC<RatingModalProps> = ({ turfId, onClose, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const turf = useSelector((state: RootState) => 
    state.turf.turfs?.find(t => t._id === turfId)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    try {
      setLoading(true);
      // Here you would call your API to submit the rating
      // await submitRating(turfId, { rating, review });
      onSuccess();
      onClose();
    } catch (err) {
      setError('Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Rate Turf</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>

        {turf && (
          <div className="mb-6">
            <h4 className="font-semibold text-lg">{turf.name}</h4>
            <p className="text-gray-600">{turf.address}, {turf.city}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Your Rating</label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <FiStar
                    size={32}
                    className={
                      (hoverRating || rating) >= star 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
              Review (Optional)
            </label>
            <textarea
              id="review"
              rows={3}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || rating === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Rating'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingModal;