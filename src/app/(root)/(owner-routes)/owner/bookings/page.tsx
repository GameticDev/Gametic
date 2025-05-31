"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchTurfs } from "@/redux/actions/turfActions";
import { format, parseISO } from "date-fns";
import { Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/owner/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/owner/ui/table";
import { BookingFilters } from "@/components/owner/bookings/BookingFilters";
import { BookingRow } from "@/components/owner/bookings/BookingRow";
import { Booking } from "@/types/turf";

const BookingsPage = () => {
  const dispatch = useAppDispatch();
  const { turfs, loading } = useAppSelector((state) => state.turf);
  // const { userInfo } = useAppSelector((state) => state.auth);
  const user = useAppSelector(state => state.auth.user);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Booking['status'] | "all">("all");
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [turfFilter, setTurfFilter] = useState<string>("all");
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTurfs(user.id));
    }
  }, [dispatch, user]);

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
    // <div className="container mx-auto px-4 py-8 ml-[300px]">
    <div className="max-w-6xl mx-auto px-4 py-8">

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