import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FiPlus, FiHome, FiList, FiSettings, FiUser, FiEdit2, FiTrash2, FiMapPin, FiDollarSign, FiCalendar,FiStar } from 'react-icons/fi';
import { TurfData } from '@/types/turf';

// const TurfCard = ({ turf, onEdit, onDelete }: { turf: any; onEdit: (id: string) => void; onDelete: (id: string) => void }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//       {/* Image Gallery */}
//       <div className="relative h-48 w-full">
//         {turf.image && turf.image.length > 0 ? (
//           <Carousel
//             showArrows={true}
//             showThumbs={false}
//             showStatus={false}
//             infiniteLoop
//             className="h-full"
//             renderIndicator={(onClickHandler, isSelected, index, label) => (
//               <li
//                 className={`inline-block w-2 h-2 mx-1 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-gray-300'}`}
//                 onClick={onClickHandler}
//                 onKeyDown={onClickHandler}
//                 value={index}
//                 key={index}
//                 role="button"
//                 tabIndex={0}
//                 aria-label={`${label} ${index + 1}`}
//               />
//             )}
//           >
//             {turf.image.map((img: string, idx: number) => (
//               <div key={idx} className="h-48">
//                 <img
//                   src={img}
//                   alt={`${turf.name} image ${idx + 1}`}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ))}
//           </Carousel>
//         ) : (
//           <div className="w-full h-full bg-gradient-to-r from-green-100 to-blue-100 flex items-center justify-center text-gray-400">
//             <FiHome className="text-5xl" />
//           </div>
//         )}
//         <span className={`absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full ${
//           turf.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//         }`}>
//           {turf.status || 'active'}
//         </span>
//       </div>

//       {/* Turf Details */}
//       <div className="p-5">
//         <div className="flex justify-between items-start mb-3">
//           <h3 className="text-xl font-bold text-gray-800">{turf.name}</h3>
//           <p className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
//             {turf.turfType}
//           </p>
//         </div>

//         <div className="flex items-center text-gray-600 mb-4">
//           <FiMapPin className="mr-1" />
//           <span className="text-sm">{turf.area}, {turf.city}</span>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-5">
//           <div className="flex items-center">
//             <div className="p-2 rounded-full bg-gray-100 mr-3">
//               <FiDollarSign className="text-gray-600" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Hourly Rate</p>
//               <p className="font-semibold">₹{turf.hourlyRate}</p>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <div className="p-2 rounded-full bg-gray-100 mr-3">
//               <FiCalendar className="text-gray-600" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Size</p>
//               <p className="font-semibold">{turf.size}</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-between border-t pt-4">
//           <button
//             onClick={() => onEdit(turf._id)}
//             className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <FiEdit2 className="mr-2" /> Edit
//           </button>
//           <button
//             onClick={() => onDelete(turf._id)}
//             className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
//           >
//             <FiTrash2 className="mr-2" /> Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };





// const TurfCard = ({
//   turf,
//   onEdit,
//   onDelete,
//   // onBook,
//   onRate
// }: {
//   turf: TurfData;
//   onEdit: (id: string) => void;
//   onDelete: (id: string) => void;
//   // onBook: (id: string) => void;
//   onRate: (id: string, rating: number) => void;  
// }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//       {/* Image Gallery */}
//       <div className="relative h-48 w-full">
//         {turf.image && turf.image.length > 0 ? (
//           <Carousel
//             showArrows={true}
//             showThumbs={false}
//             showStatus={false}
//             infiniteLoop
//             className="h-full"
//             renderIndicator={(onClickHandler, isSelected, index, label) => (
//               <li
//                 className={`inline-block w-2 h-2 mx-1 rounded-full ${isSelected ? 'bg-[#415c41]' : 'bg-gray-300'}`}
//                 onClick={onClickHandler}
//                 onKeyDown={onClickHandler}
//                 value={index}
//                 key={index}
//                 role="button"
//                 tabIndex={0}
//                 aria-label={`${label} ${index + 1}`}
//               />
//             )}
//           >
//             {turf.image.map((img: string, idx: number) => (
//               <div key={idx} className="h-48">
//                 <img
//                   src={img}
//                   alt={`${turf.name} image ${idx + 1}`}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ))}
//           </Carousel>
//         ) : (
//           <div className="w-full h-full bg-gradient-to-r from-[#698866] to-[#98916D] flex items-center justify-center text-gray-400">
//             <FiStar className="text-5xl text-[#415c41]" />
//           </div>
//         )}
//         <div className="absolute top-3 right-3 flex flex-col items-end space-y-2">
//           <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//             turf.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//           }`}>
//             {turf.status || 'active'}
//           </span>

//           {turf.averageRating !== undefined && turf.averageRating > 0 && (
//             <div className="flex items-center bg-white/90 px-2 py-1 rounded-full">
//               <FiStar className="text-yellow-400 mr-1" />
//               <span className="text-sm font-medium">
//                 {turf.averageRating.toFixed(1)} ★ ({turf.ratings?.length || 0} reviews)
//               </span>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Turf Details */}
//       <div className="p-5">
//         <div className="flex justify-between items-start mb-3">
//           <h3 className="text-xl font-bold text-gray-800">{turf.name}</h3>
//           {/* turfType badge in your theme colors */}
//           <p className="text-sm font-medium px-2 py-1 rounded" style={{backgroundColor: '#00423D', color: '#ffffff'}}>
//             {turf.turfType}
//           </p>
//         </div>

//         <div className="flex items-center text-gray-600 mb-4">
//           <FiMapPin className="mr-1" />
//           <span className="text-sm">{turf.area}, {turf.city}</span>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-5">
//           <div className="flex items-center">
//             <div className="p-2 rounded-full bg-gray-100 mr-3">
//               <FiDollarSign className="text-gray-600" /> {/* keep as is */}
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Hourly Rate</p>
//               <p className="font-semibold">₹{turf.hourlyRate}</p>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <div className="p-2 rounded-full bg-gray-100 mr-3">
//               <FiCalendar className="text-gray-600" /> {/* keep as is */}
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Bookings</p>
//               <p className="font-semibold">{turf.bookings?.length || 0}</p>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons for Owner */}
//         <div className="flex justify-between mt-3 border-t pt-4">
//           {/* Rate button with #415c41 */}
//           <button
//             onClick={() => onRate(turf._id, 5)}
//             className="px-3 py-1 text-sm transition-colors"
//             style={{ color: '#415c41' }}
//             onMouseEnter={e => (e.currentTarget.style.color = '#698866')}
//             onMouseLeave={e => (e.currentTarget.style.color = '#415c41')}
//           >
//             Rate 5 ★
//           </button>

//           {/* Edit button with #00423D */}
//           <button
//             onClick={() => onEdit(turf._id)}
//             className="flex items-center px-3 py-1 text-sm transition-colors"
//             style={{ color: '#00423D' }}
//             onMouseEnter={e => (e.currentTarget.style.color = '#698866')}
//             onMouseLeave={e => (e.currentTarget.style.color = '#00423D')}
//           >
//             <FiEdit2 className="mr-1" /> Edit
//           </button>

//           {/* Delete button remains same */}
//           <button
//             onClick={() => onDelete(turf._id)}
//             className="flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors"
//           >
//             <FiTrash2 className="mr-2" /> Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default TurfCard;




const TurfCard = ({
  turf,
  onEdit,
  onDelete,
  onRate = () => {} // Make onRate optional with default empty function
}: {
  turf: TurfData;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onRate?: (id: string, rating: number) => void; // Make optional
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Gallery */}
      <div className="relative h-48 w-full">
        {turf.image && turf.image.length > 0 ? (
          <Carousel
            showArrows={true}
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            className="h-full"
            renderIndicator={(onClickHandler, isSelected, index, label) => (
              <li
                className={`inline-block w-2 h-2 mx-1 rounded-full ${isSelected ? 'bg-[#415c41]' : 'bg-gray-300'}`}
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                aria-label={`${label} ${index + 1}`}
              />
            )}
          >
            {turf.image.map((img: string, idx: number) => (
              <div key={idx} className="h-48">
                <img
                  src={img}
                  alt={`${turf.name} image ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-[#698866] to-[#98916D] flex items-center justify-center text-gray-400">
            <FiStar className="text-5xl text-[#415c41]" />
          </div>
        )}
        <div className="absolute top-3 right-3 flex flex-col items-end space-y-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            turf.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {turf.status || 'active'}
          </span>

          {(turf.averageRating || 0) > 0 && (
            <div className="flex items-center bg-white/90 px-2 py-1 rounded-full">
              <FiStar className="text-yellow-400 mr-1" />
              <span className="text-sm font-medium">
                {(turf.averageRating || 0).toFixed(1)} ★ ({turf.ratings?.length || 0} reviews)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Turf Details */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800">{turf.name}</h3>
          <p className="text-sm font-medium px-2 py-1 rounded" style={{backgroundColor: '#00423D', color: '#ffffff'}}>
            {turf.turfType}
          </p>
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <FiMapPin className="mr-1" />
          <span className="text-sm">{turf.area}, {turf.city}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-gray-100 mr-3">
              <FiDollarSign className="text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Hourly Rate</p>
              <p className="font-semibold">₹{turf.hourlyRate}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-gray-100 mr-3">
              <FiCalendar className="text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Bookings</p>
              <p className="font-semibold">{turf.bookings?.length || 0}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons for Owner */}
        <div className="flex justify-between mt-3 border-t pt-4">
          <button
            onClick={() => onRate(turf._id, 5)}
            className="px-3 py-1 text-sm transition-colors"
            style={{ color: '#415c41' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#698866')}
            onMouseLeave={e => (e.currentTarget.style.color = '#415c41')}
          >
            Rate 5 ★
          </button>

          <button
            onClick={() => onEdit(turf._id)}
            className="flex items-center px-3 py-1 text-sm transition-colors"
            style={{ color: '#00423D' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#698866')}
            onMouseLeave={e => (e.currentTarget.style.color = '#00423D')}
          >
            <FiEdit2 className="mr-1" /> Edit
          </button>

          <button
            onClick={() => onDelete(turf._id)}
            className="flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors"
          >
            <FiTrash2 className="mr-2" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TurfCard;
