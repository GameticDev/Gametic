"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchTurfs } from "@/redux/actions/turfActions";
import { format, parseISO } from "date-fns";
import { Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/owner/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/owner/ui/table";
import { BookingFilters } from "@/components/owner/bookings/BookingFilters";
import { BookingRow } from "@/components/owner/bookings/BookingRow";
import { Booking } from "@/types/turf";

const BookingsPage = () => {
  const dispatch = useAppDispatch();
  const { turfs, loading } = useAppSelector((state) => state.turf);
  const { userInfo } = useAppSelector((state) => state.auth);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Booking['status'] | "all">("all");
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [turfFilter, setTurfFilter] = useState<string>("all");
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

  useEffect(() => {
    if (userInfo?._id) {
      dispatch(fetchTurfs(userInfo._id));
    }
  }, [dispatch, userInfo]);

  // Extract all bookings from all turfs
  const allBookings = turfs.flatMap((turf) => 
    turf.bookings?.map(booking => ({
      ...booking,
      turfName: turf.name,
      turfId: turf._id
    })) || []
  );

  // Filter bookings based on search and filters
  const filteredBookings = allBookings.filter((booking) => {
    // const matchesSearch = 
    //   booking.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   booking.turfName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   booking.userId.phone?.includes(searchTerm);
    
    const matchesSearch =
  (booking.userId?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ?? false) ||
  booking.turfName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  (booking.userId?.phone?.includes(searchTerm) ?? false);

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    const matchesDate = !dateFilter || 
      format(parseISO(booking.date.toString()), "yyyy-MM-dd") === format(dateFilter, "yyyy-MM-dd");
    const matchesTurf = turfFilter === "all" || booking.turfId === turfFilter;
    
    return matchesSearch && matchesStatus && matchesDate && matchesTurf;
  });

  // Sort bookings by date (newest first)
  const sortedBookings = [...filteredBookings].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleStatusChange = async (bookingId: string, newStatus: Booking['status']) => {
    try {
      // Here you would dispatch an action to update the booking status
      // await dispatch(updateBookingStatus({ bookingId, status: newStatus }));
      console.log(`Updating booking ${bookingId} to status ${newStatus}`);
    } catch (error) {
      console.error("Failed to update booking status:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 ml-[300px]">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Bookings Management</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {sortedBookings.length} {sortedBookings.length === 1 ? "booking" : "bookings"} found
            </span>
          </div>
        </div>

        <BookingFilters
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          dateFilter={dateFilter}
          turfFilter={turfFilter}
          turfs={turfs}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
          onDateChange={setDateFilter}
          onTurfChange={setTurfFilter}
        />

        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {sortedBookings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No bookings found matching your criteria</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Turf</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedBookings.map((booking) => (
                    <BookingRow
                      key={booking._id}
                      booking={booking}
                      expanded={expandedBooking === booking._id}
                      onToggleExpand={() => 
                        setExpandedBooking(expandedBooking === booking._id ? null : booking._id)
                      }
                      onStatusChange={(status) => handleStatusChange(booking._id, status)}
                    />
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingsPage;




// "use client";

// import React, { useState, useEffect } from "react";
// import { useAppSelector, useAppDispatch } from "@/redux/hooks";
// import { fetchTurfs } from "@/redux/actions/turfActions";
// import { Booking, TurfData } from "@/types/turf";
// import {
//   Search,
//   Filter,
//   ChevronDown,
//   ChevronUp,
//   Calendar,
//   Clock,
//   User,
//   Phone,
//   DollarSign,
//   CheckCircle2,
//   XCircle,
//   Loader2,
//   MoreVertical
// } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/owner/ui/table";
// import { Button } from "@/components/owner/ui/Button";
// import { Input } from "@/components/owner/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/owner/ui/dropdown-menu";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/owner/ui/select";
// import { DatePicker } from "@/components/owner/ui/date-picker";
// import { Badge } from "@/components/owner/ui/badge";
// import { format, parseISO } from "date-fns";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/owner/ui/card";

// const BookingsPage = () => {
//   const dispatch = useAppDispatch();
//   const { turfs, loading } = useAppSelector((state) => state.turf);
//   const { userInfo } = useAppSelector((state) => state.auth);
  
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState<Booking['status'] | "all">("all");
//   const [dateFilter, setDateFilter] = useState<Date | null>(null);
//   const [turfFilter, setTurfFilter] = useState<string>("all");
//   const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

//   useEffect(() => {
//     if (userInfo?._id) {
//       dispatch(fetchTurfs(userInfo._id));
//     }
//   }, [dispatch, userInfo]);

//   // Extract all bookings from all turfs
//   const allBookings = turfs.flatMap((turf) => 
//     turf.bookings?.map(booking => ({
//       ...booking,
//       turfName: turf.name,
//       turfId: turf._id
//     })) || []
//   );

//   // Filter bookings based on search and filters
//   const filteredBookings = allBookings.filter((booking) => {
//     const matchesSearch = 
//       booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.turfName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.customerPhone?.includes(searchTerm);
    
//     const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
//     const matchesDate = !dateFilter || 
//       format(parseISO(booking.date.toString()), "yyyy-MM-dd") === format(dateFilter, "yyyy-MM-dd");
//     const matchesTurf = turfFilter === "all" || booking.turfId === turfFilter;
    
//     return matchesSearch && matchesStatus && matchesDate && matchesTurf;
//   });

//   // Sort bookings by date (newest first)
//   const sortedBookings = [...filteredBookings].sort((a, b) => 
//     new Date(b.date).getTime() - new Date(a.date).getTime()
//   );

//   const handleStatusChange = async (bookingId: string, newStatus: Booking['status']) => {
//     try {
//       // Here you would dispatch an action to update the booking status
//       // await dispatch(updateBookingStatus({ bookingId, status: newStatus }));
//       console.log(`Updating booking ${bookingId} to status ${newStatus}`);
//     } catch (error) {
//       console.error("Failed to update booking status:", error);
//     }
//   };

//   const toggleExpandBooking = (bookingId: string) => {
//     setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
//   };

//   const getStatusBadge = (status: Booking['status']) => {
//     switch (status) {
//       case "confirmed":
//         return <Badge variant="success">Confirmed</Badge>;
//       case "pending":
//         return <Badge variant="warning">Pending</Badge>;
//       case "cancelled":
//         return <Badge variant="destructive">Cancelled</Badge>;
//       case "completed":
//         return <Badge variant="default">Completed</Badge>;
//       default:
//         return <Badge variant="outline">Unknown</Badge>;
//     }
//   };

//   const getPaymentBadge = (status: Booking['paymentStatus']) => {
//     switch (status) {
//       case "paid":
//         return <Badge variant="success">Paid</Badge>;
//       case "pending":
//         return <Badge variant="warning">Pending</Badge>;
//       case "refunded":
//         return <Badge variant="info">Refunded</Badge>;
//       default:
//         return <Badge variant="outline">Unknown</Badge>;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 ml-[300px]">
//       <div className="flex flex-col space-y-6">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Bookings Management</h1>
//           <div className="flex items-center space-x-2">
//             <span className="text-sm text-gray-500">
//               {sortedBookings.length} {sortedBookings.length === 1 ? "booking" : "bookings"} found
//             </span>
//           </div>
//         </div>

//         {/* Filters Card */}
//         <Card>
//           <CardContent className="pt-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {/* Search Input */}
//               <div className="relative">
//                 <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <Input
//                   placeholder="Search bookings..."
//                   className="pl-9"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>

//               {/* Status Filter */}
//               <Select
//                 value={statusFilter}
//                 onValueChange={(value) => setStatusFilter(value as Booking['status'] | "all")}
//               >
//                 <SelectTrigger className="w-full">
//                   <div className="flex items-center">
//                     <Filter className="h-4 w-4 mr-2 text-gray-400" />
//                     <SelectValue placeholder="Filter by status" />
//                   </div>
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Statuses</SelectItem>
//                   <SelectItem value="pending">Pending</SelectItem>
//                   <SelectItem value="confirmed">Confirmed</SelectItem>
//                   <SelectItem value="cancelled">Cancelled</SelectItem>
//                   <SelectItem value="completed">Completed</SelectItem>
//                 </SelectContent>
//               </Select>

//               {/* Date Filter */}
//               <DatePicker
//                 selected={dateFilter}
//                 onChange={(date) => setDateFilter(date)}
//                 placeholderText="Filter by date"
//                 customInput={
//                   <div className="relative">
//                     <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       className="pl-9"
//                       value={dateFilter ? format(dateFilter, "PPP") : ""}
//                       placeholder="Filter by date"
//                       readOnly
//                     />
//                   </div>
//                 }
//               />

//               {/* Turf Filter */}
//               <Select
//                 value={turfFilter}
//                 onValueChange={(value) => setTurfFilter(value)}
//               >
//                 <SelectTrigger className="w-full">
//                   <div className="flex items-center">
//                     <Filter className="h-4 w-4 mr-2 text-gray-400" />
//                     <SelectValue placeholder="Filter by turf" />
//                   </div>
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Turfs</SelectItem>
//                   {turfs.map((turf) => (
//                     <SelectItem key={turf._id} value={turf._id}>
//                       {turf.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Bookings Table */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Bookings</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {sortedBookings.length === 0 ? (
//               <div className="text-center py-12">
//                 <p className="text-gray-500">No bookings found matching your criteria</p>
//               </div>
//             ) : (
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Customer</TableHead>
//                     <TableHead>Turf</TableHead>
//                     <TableHead>Date & Time</TableHead>
//                     <TableHead>Duration</TableHead>
//                     <TableHead>Amount</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Payment</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {sortedBookings.map((booking) => (
//                     <React.Fragment key={booking._id}>
//                       <TableRow
//                         className="cursor-pointer hover:bg-gray-50"
//                         onClick={() => toggleExpandBooking(booking._id)}
//                       >
//                         <TableCell className="font-medium">
//                           <div className="flex items-center">
//                             <User className="h-4 w-4 mr-2 text-gray-500" />
//                             {booking.customerName}
//                           </div>
//                         </TableCell>
//                         <TableCell>{booking.turfName}</TableCell>
//                         <TableCell>
//                           <div className="flex flex-col">
//                             <span>{format(parseISO(booking.date.toString()), "PPP")}</span>
//                             <span className="text-sm text-gray-500">
//                               {booking.startTime} - {booking.endTime}
//                             </span>
//                           </div>
//                         </TableCell>
//                         <TableCell>{booking.duration} hours</TableCell>
//                         <TableCell>
//                           <div className="flex items-center">
//                             <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
//                             {booking.price}
//                           </div>
//                         </TableCell>
//                         <TableCell>{getStatusBadge(booking.status)}</TableCell>
//                         <TableCell>{getPaymentBadge(booking.paymentStatus)}</TableCell>
//                         <TableCell>
//                           <div className="flex items-center space-x-2">
//                             {expandedBooking === booking._id ? (
//                               <ChevronUp className="h-4 w-4" />
//                             ) : (
//                               <ChevronDown className="h-4 w-4" />
//                             )}
//                             <DropdownMenu>
//                               <DropdownMenuTrigger asChild>
//                                 <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
//                                   <MoreVertical className="h-4 w-4" />
//                                 </Button>
//                               </DropdownMenuTrigger>
//                               <DropdownMenuContent align="end">
//                                 <DropdownMenuItem
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleStatusChange(booking._id, "confirmed");
//                                   }}
//                                   disabled={booking.status === "confirmed"}
//                                 >
//                                   <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
//                                   Confirm
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleStatusChange(booking._id, "cancelled");
//                                   }}
//                                   disabled={booking.status === "cancelled"}
//                                 >
//                                   <XCircle className="h-4 w-4 mr-2 text-red-500" />
//                                   Cancel
//                                 </DropdownMenuItem>
//                               </DropdownMenuContent>
//                             </DropdownMenu>
//                           </div>
//                         </TableCell>
//                       </TableRow>
//                       {expandedBooking === booking._id && (
//                         <TableRow className="bg-gray-50">
//                           <TableCell colSpan={8}>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
//                               <div className="space-y-2">
//                                 <h3 className="font-medium">Booking Details</h3>
//                                 <div className="flex items-center">
//                                   <Calendar className="h-4 w-4 mr-2 text-gray-500" />
//                                   <span>
//                                     {format(parseISO(booking.date.toString()), "PPPP")}
//                                   </span>
//                                 </div>
//                                 <div className="flex items-center">
//                                   <Clock className="h-4 w-4 mr-2 text-gray-500" />
//                                   <span>
//                                     {booking.startTime} - {booking.endTime} ({booking.duration} hours)
//                                   </span>
//                                 </div>
//                                 <div className="flex items-center">
//                                   <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
//                                   <span>Amount: {booking.price}</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                   <span className="w-4 mr-2"></span>
//                                   <span>Created: {format(new Date(booking.createdAt), "PPPp")}</span>
//                                 </div>
//                               </div>
//                               <div className="space-y-2">
//                                 <h3 className="font-medium">Customer Information</h3>
//                                 <div className="flex items-center">
//                                   <User className="h-4 w-4 mr-2 text-gray-500" />
//                                   <span>{booking.customerName}</span>
//                                 </div>
//                                 {booking.customerPhone && (
//                                   <div className="flex items-center">
//                                     <Phone className="h-4 w-4 mr-2 text-gray-500" />
//                                     <span>{booking.customerPhone}</span>
//                                   </div>
//                                 )}
//                                 {booking.userId?.email && (
//                                   <div className="flex items-center">
//                                     <span className="w-4 mr-2"></span>
//                                     <span>{booking.userId.email}</span>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </TableCell>
//                         </TableRow>
//                       )}
//                     </React.Fragment>
//                   ))}
//                 </TableBody>
//               </Table>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default BookingsPage;