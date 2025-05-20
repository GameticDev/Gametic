// "use client"
// import { fetchAllVenues } from "@/redux/actions/admin/venuesAction";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import {
//   ArrowUp,
//   Ban,
//   ChevronLeft,
//   ChevronRight,
//   EllipsisVertical,
//   Eye,
//   Trash2,
// } from "lucide-react";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// interface VenuesListProps {
//   search: string;
// }

// const VenueList:React.FC<VenuesListProps> = ({search}) => {
//   const dispatch = useAppDispatch();
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const { loading,venues,totalVenues } = useAppSelector(
//     (state) => state.adminVenues
//   );

//   console.log(venues)

//   useEffect(() => {
//       dispatch(fetchAllVenues({ page: currentPage, limit: 5, search}));
//     }, [dispatch, currentPage, search]);
  
//   return (
//     <div className="w-full">
//       <table className="w-full">
//         <thead>
//           <tr className="font-medium text-[#637381] bg-[#f4f5f6]">
//             <td className="text-black p-4 flex items-center">
//               Name{" "}
//               <span>
//                 <ArrowUp className="text-[#637381] ml-1" size={20} />
//               </span>
//             </td>
//             <td className="p-4">Owner</td>
//             <td className="p-4">Type</td>
//             <td className="p-4">Size</td>
//             <td className="p-4">Status</td>
//             <td className="p-4"></td>
//           </tr>
//         </thead>
//         <tbody>
//           {venues?.map((item) => (
//             <tr className="hover:bg-[#f4f5f6]" key={item._id}>
//               <td className="text-black p-4 flex items-center">
//                 <span className="mr-2">
//                   <div className="w-8 h-8 bg-gray-500 flex items-center justify-center relative">
//                         <Image
//                         src={item?.image?.[0]}
//                         fill
//                         alt={item.name}/>
//                   </div>
//                 </span>
//                 <span className="flex flex-col">
//                     <span>{item?.name}</span>
//                     <span className="text-[12px] text-gray-700">{item?.address}</span>
//                 </span>
//               </td>
//               <td className="p-4">{"Aginaspk"}</td>
//               <td className="p-4">{item?.turfType}</td>
//               <td className="p-4">{item?.size}</td>
//               <td className="p-4">
//                 <span className="text-[#118D57] bg-[#DBF6E5] py-1 px-2 rounded-lg">
//                   Active
//                 </span>
//                 {/* <span
//                     className={`${
//                       item.isBlocked
//                         ? "text-[#B91D18] bg-[#FFE4DE]"
//                         : "text-[#118D57] bg-[#DBF6E5]"
//                     } py-1 px-2 rounded-lg`}
//                   >
//                     {item.isBlocked ? "Banned" : "Active"}
//                   </span> */}
//               </td>
//               <td className="p-4 flex text-[#637381] justify-evenly">
//                 <Eye size={22} />
//                 <div className="dropdown dropdown-left">
//                   <div tabIndex={0} role="button">
//                     <EllipsisVertical size={25} />
//                   </div>
//                   <ul
//                     tabIndex={0}
//                     className="dropdown-content menu bg-gray-50 w-[100px] rounded-2xl p-1"
//                   >
//                     <li className="p-1 w-full flex hover:bg-[#f4f5f6] rounded-xl">
//                       <h1 className="flex justify-between">
//                         <span>Ban</span>
//                         <Ban size={20} className="text-[#B91D18]" />
//                       </h1>
//                     </li>
//                     <li className="p-1 w-full flex hover:bg-[#f4f5f6] rounded-xl">
//                       <h1 className="flex justify-between">
//                         <span>Delete</span>
//                         <Trash2 size={20} className="text-[#B91D18]" />
//                       </h1>
//                     </li>
//                   </ul>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="w-full flex justify-end px-2">
//         <div className="p-4 text-[15px]">1 - 5 of {totalVenues}</div>
//         <button
//           disabled={currentPage <= 1}
//           className={`p-4 ${
//             currentPage <= 1 ? "text-[#637381]" : "cursor-pointer"
//           }`}
//           onClick={() => setCurrentPage(currentPage - 1)}
//         >
//           <ChevronLeft size={20} />
//         </button>
//         <button
//           className="p-4 cursor-pointer"
//           onClick={() => setCurrentPage(currentPage + 1)}
//         >
//           <ChevronRight size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VenueList;
"use client"
import { fetchAllVenues } from "@/redux/actions/admin/venuesAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  ArrowUpDown,
  Ban,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Eye,
  Search,
  Trash2,
  Filter,
  Download,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface VenuesListProps {
  search: string;
}

const VenueList: React.FC<VenuesListProps> = ({ search }) => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, venues, totalVenues } = useAppSelector(
    (state) => state.adminVenues
  );

  useEffect(() => {
    dispatch(fetchAllVenues({ page: currentPage, limit: 10, search }));
  }, [dispatch, currentPage, search]);

  // Calculate pagination details
  const itemsPerPage = 10;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, totalVenues || 0);
  const totalPages = Math.ceil((totalVenues || 0) / itemsPerPage);

  return (
    <div className="w-full rounded-lg bg-white shadow-sm border border-gray-100">
      {/* Table header with actions */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Venues</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search venues..."
              className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium text-gray-700">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium text-gray-700">
            <Download size={16} />
            <span>Export</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium text-white">
            <Plus size={16} />
            <span>Add Venue</span>
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="w-full p-8 flex justify-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading venues...</p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && venues?.length === 0 && (
        <div className="w-full p-12 flex justify-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Search size={24} className="text-gray-400" />
            </div>
            <p className="mt-4 text-gray-600 font-medium">No venues found</p>
            <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
          </div>
        </div>
      )}

      {/* Table content */}
      {!loading && venues?.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-medium">
                  <div className="flex items-center cursor-pointer hover:text-gray-700">
                    Venue Name
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="p-4 font-medium">
                  <div className="flex items-center cursor-pointer hover:text-gray-700">
                    Owner
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="p-4 font-medium">
                  <div className="flex items-center cursor-pointer hover:text-gray-700">
                    Type
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="p-4 font-medium">
                  <div className="flex items-center cursor-pointer hover:text-gray-700">
                    Size
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="p-4 font-medium">
                  <div className="flex items-center cursor-pointer hover:text-gray-700">
                    Status
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {venues?.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                        {item?.image?.[0] ? (
                          <Image
                            src={item.image[0]}
                            fill
                            alt={item.name}
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                            <span className="text-xs">No Img</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-800">{item?.name}</div>
                        <div className="text-xs text-gray-500">{item?.address}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{"Aginaspk"}</td>
                  <td className="p-4">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {item?.turfType}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{item?.size}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-1.5"></span>
                      Active
                    </span>
                    {/* Conditional rendering for status */}
                    {/* {item.isBlocked ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-1.5"></span>
                        Banned
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-1.5"></span>
                        Active
                      </span>
                    )} */}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        title="View details"
                      >
                        <Eye size={18} className="text-gray-500 hover:text-blue-600" />
                      </button>
                      <div className="dropdown dropdown-left">
                        <button 
                          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                          title="More options"
                        >
                          <EllipsisVertical size={18} className="text-gray-500" />
                        </button>
                        <ul tabIndex={0} className="dropdown-content menu shadow-lg bg-white rounded-lg p-2 w-48 border border-gray-100">
                          <li>
                            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                              <Ban size={16} />
                              <span>Ban Venue</span>
                            </button>
                          </li>
                          <li>
                            <button className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                              <Trash2 size={16} />
                              <span>Delete Venue</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
        <div className="flex-1 text-sm text-gray-500">
          Showing <span className="font-medium">{startItem}</span> to{" "}
          <span className="font-medium">{endItem}</span> of{" "}
          <span className="font-medium">{totalVenues}</span> venues
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage <= 1}
            className={`p-2 rounded-md ${
              currentPage <= 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span className="sr-only">First page</span>
            <div className="flex items-center">
              <ChevronLeft size={16} />
              <ChevronLeft size={16} className="-ml-2" />
            </div>
          </button>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className={`p-2 rounded-md ${
              currentPage <= 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span className="sr-only">Previous page</span>
            <ChevronLeft size={16} />
          </button>
          
          {/* Page numbers */}
          <div className="flex items-center mx-2">
            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
              const pageNumber = currentPage <= 3 
                ? i + 1 
                : currentPage >= totalPages - 2 
                  ? totalPages - 4 + i 
                  : currentPage - 2 + i;
              
              if (pageNumber <= 0 || pageNumber > totalPages) return null;
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md mx-0.5 ${
                    currentPage === pageNumber
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={`p-2 rounded-md ${
              currentPage >= totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span className="sr-only">Next page</span>
            <ChevronRight size={16} />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage >= totalPages}
            className={`p-2 rounded-md ${
              currentPage >= totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span className="sr-only">Last page</span>
            <div className="flex items-center">
              <ChevronRight size={16} />
              <ChevronRight size={16} className="-ml-2" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenueList;