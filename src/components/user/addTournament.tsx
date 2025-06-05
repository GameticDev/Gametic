import React, { useState } from 'react';

interface TournamentFormData {
  title: string;
  description: string;
  sport: string;
  location: string;
  dateFrom: string;
  dateTo: string;
  maxTeams: number;
  entryFee: number;
  prizePool: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  image: string;
}
interface props{
    onClose:()=>void
}

const AddTournament: React.FC<props> = ({onClose}) => {
  const [data, setData] = useState<TournamentFormData>({
    title: '',
    description: '',
    sport: '',
    location: '',
    dateFrom: '',
    dateTo: '',
    maxTeams: 0,
    entryFee: 0,
    prizePool: 0,
    status: 'upcoming',
    image: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]:
        name === 'maxTeams' || name === 'entryFee' || name === 'prizePool'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Tournament Data:', data);
    // You can add axios post here to submit data
  };

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">         <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
        >
          ×
        </button>
      <h2 className="text-2xl font-bold mb-4">Add New Tournament</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label>Sport:</label>
          <input
            type="text"
            name="sport"
            value={data.sport}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={data.location}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label>From Date:</label>
          <input
            type="date"
            name="dateFrom"
            value={data.dateFrom}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label>To Date:</label>
          <input
            type="date"
            name="dateTo"
            value={data.dateTo}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label>Max Teams:</label>
          <input
            type="number"
            name="maxTeams"
            value={data.maxTeams}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label>Entry Fee (₹):</label>
          <input
            type="number"
            name="entryFee"
            value={data.entryFee}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label>Prize Pool (₹):</label>
          <input
            type="number"
            name="prizePool"
            value={data.prizePool}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label>Status:</label>
          <select
            name="status"
            value={data.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={data.image}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Paste image link here"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Create Tournament
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddTournament;
