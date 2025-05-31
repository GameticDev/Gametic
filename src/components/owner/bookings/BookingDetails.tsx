"use client";

import { format, parseISO } from "date-fns";
import { Calendar, Clock, DollarSign, Phone, User } from "lucide-react";
import { TableCell, TableRow } from "@/components/owner/ui/table";
import { Booking } from "@/types/turf";

interface BookingDetailsProps {
  booking: Booking & { turfName: string };
}

export const BookingDetails = ({ booking }: BookingDetailsProps) => (
  <TableRow className="bg-gray-50">
    <TableCell colSpan={8}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="space-y-2">
          <h3 className="font-medium">Booking Details</h3>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>
              {format(parseISO(booking.date.toString()), "PPPP")}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span>
              {booking.startTime} - {booking.endTime} ({booking.duration} hours)
            </span>
          </div>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
            <span>Amount: {booking.amount}</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 mr-2"></span>
            <span>Created: {format(new Date(booking.createdAt), "PPPp")}</span>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">Customer Information</h3>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2 text-gray-500" />
            <span>{booking.userId.name}</span>
          </div>
          {booking.userId.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-500" />
              <span>{booking.userId.phone}</span>
            </div>
          )}
          <div className="flex items-center">
            <span className="w-4 mr-2"></span>
            <span>{booking.userId.email}</span>
          </div>
        </div>
      </div>
    </TableCell>
  </TableRow>
);