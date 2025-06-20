import React, { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { FiAlertCircle, FiCalendar } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TurfAvailabilityProps } from '@/types/turf';

const predefinedTimeSlots = [
  '06:00 AM - 07:00 AM',
  '07:00 AM - 08:00 AM',
  '08:00 AM - 09:00 AM',
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 01:00 PM',
  '01:00 PM - 02:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
  '05:00 PM - 06:00 PM',
  '06:00 PM - 07:00 PM',
  '07:00 PM - 08:00 PM',
];

const TurfAvailability: React.FC<TurfAvailabilityProps> = ({
  register,
  errors,
  control,
  setValue,
  watch,
  bookedSlot = []
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newException, setNewException] = useState({
    startTime: '06:00',
    endTime: '07:00',
    reason: 'offline-booking'
  });

  const { isUnderMaintenance = false } = watch('availability') || {};

  const regularDays = useWatch({ control, name: 'availability.regular.days' }) ||
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const regularUnavailableSlots = useWatch({
    control,
    name: 'availability.regular.unavailableSlots'
  }) || [];

  const exceptions = useWatch({
    control,
    name: 'availability.exceptions'
  }) || [];

  const isSlotUnavailable = (slot: string) => {
    return regularUnavailableSlots.includes(slot);
  };

  const formatTime = (time: string) => {
    if (!time) return '';
    if (time.includes('AM') || time.includes('PM')) return time;

    const [hours, minutes] = time.split(':');
    const hourNum = parseInt(hours, 10);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  };

  const formatTimeSlot = (slot: { start: string; end: string }) => {
    return `${formatTime(slot.start)} - ${formatTime(slot.end)}`;
  };

  const addException = () => {
    if (!selectedDate) return;

    const dateStr = selectedDate.toISOString().split('T')[0];
    const newExceptionSlot = {
      date: dateStr,
      startTime: newException.startTime,
      endTime: newException.endTime,
      reason: newException.reason
    };

    setValue('availability.exceptions', [...exceptions, newExceptionSlot]);
    setSelectedDate(null);
  };

  const removeException = (index: number) => {
    const updatedExceptions = [...exceptions];
    updatedExceptions.splice(index, 1);
    setValue('availability.exceptions', updatedExceptions);
  };

  const toggleMaintenance = () => {
    const currentStatus = watch('availability.isUnderMaintenance') || false;
    setValue('availability.isUnderMaintenance', !currentStatus);
  };

  return (
    <div className="space-y-6">

      <div className="flex items-center">
        <input
          type="checkbox"
          id="maintenanceToggle"
          checked={isUnderMaintenance}
          onChange={toggleMaintenance}
          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
        />
        <label htmlFor="maintenanceToggle" className="ml-2 text-sm font-medium text-gray-700">
          Mark as Under Maintenance
        </label>
      </div>

      {isUnderMaintenance && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Maintenance Message
          </label>
          <input
            type="text"
            {...register('availability.maintenanceMessage')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="E.g., 'Closed for renovations until June 30'"
          />
        </div>
      )}

      {!isUnderMaintenance && (
        <>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Regular Available Days <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`day-${day}`}
                      value={day}
                      {...register('availability.regular.days', {
                        required: 'At least one day is required',
                        validate: (val) => val.length > 0 || 'Select at least one day'
                      })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked={regularDays.includes(day)}
                    />
                    <label htmlFor={`day-${day}`} className="ml-2 text-sm text-gray-700">
                      {day}
                    </label>
                  </div>
                ))}
              </div>
              {errors.availability?.regular?.days && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <FiAlertCircle className="mr-1" />
                  {errors.availability.regular.days.message}
                </p>
              )}
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Opening Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  {...register('availability.regular.startTime', {
                    required: 'Opening time is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  defaultValue="06:00"
                />
                {errors.availability?.regular?.startTime && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    {errors.availability.regular.startTime.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Closing Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  {...register('availability.regular.endTime', {
                    required: 'Closing time is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  defaultValue="20:00"
                />
                {errors.availability?.regular?.endTime && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    {errors.availability.regular.endTime.message}
                  </p>
                )}
              </div>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weekly Unavailable Time Slots
                <span className="ml-1 text-xs text-gray-500">
                  (Recurring weekly unavailability)
                </span>
              </label>
              <div className="flex flex-wrap gap-3 max-h-48 overflow-y-auto border border-gray-300 rounded p-3">
                {predefinedTimeSlots.map((slot, idx) => (
                  <div key={idx} className="flex items-center w-1/2 md:w-1/3">
                    <input
                      type="checkbox"
                      id={`slot-${idx}`}
                      value={slot}
                      {...register('availability.regular.unavailableSlots')}
                      defaultChecked={isSlotUnavailable(slot)}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`slot-${idx}`} className={`ml-2 text-sm ${isSlotUnavailable(slot) ? 'text-red-600' : 'text-gray-700'
                      }`}>
                      {slot}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <FiCalendar className="mr-2" />
              Date-Specific Unavailability
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Add specific dates when the turf is unavailable (holidays, events, etc.)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  minDate={new Date()}
                  placeholderText="Select date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  value={newException.startTime}
                  onChange={(e) => setNewException({ ...newException, startTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  value={newException.endTime}
                  onChange={(e) => setNewException({ ...newException, endTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason
                </label>
                <select
                  value={newException.reason}
                  onChange={(e) => setNewException({ ...newException, reason: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="offline-booking">Offline Booking</option>
                  <option value="holiday">Holiday</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={addException}
              disabled={!selectedDate}
              className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add Exception
            </button>


            {exceptions.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Current Exceptions:
                </h4>
                <ul className="space-y-2">
                  {exceptions.map((exception, index) => (
                    <li key={index} className="flex justify-between items-center p-2 border rounded">
                      <div>
                        <span className="font-medium">{exception.date}</span>:
                        {formatTime(exception.startTime)} - {formatTime(exception.endTime)}
                        <span className="ml-2 text-sm text-gray-500">({exception.reason})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeException(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>


          {bookedSlot.length > 0 && (
            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FiCalendar className="mr-2" />
                Existing Booked Slots
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  {bookedSlot.map((daySlot, index) => (
                    <div key={index} className="border-b pb-2 last:border-b-0">
                      <div className="font-medium">{daySlot.date}</div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {daySlot.slots.map((slot, slotIndex) => (
                          <span
                            key={slotIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                          >
                            {formatTimeSlot(slot)}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TurfAvailability;