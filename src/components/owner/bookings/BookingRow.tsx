"use client";

import { format, parseISO } from "date-fns";
import { ChevronDown, ChevronUp, Clock, Calendar, DollarSign, User, Phone } from "lucide-react";
import { Booking } from "@/types/turf";
import { BookingStatusBadge } from "./BookingStatusBadge";
import { BookingPaymentBadge } from "./BookingPaymentBadge";
import { TableCell, TableRow } from "../ui/table";
import { BookingActions } from "./BookingActions";
import { BookingDetails } from "./BookingDetails";

interface BookingRowProps {
  booking: Booking & { turfName: string };
  expanded: boolean;
  onToggleExpand: () => void;
  onStatusChange: (status: Booking['status']) => void;
}

export const BookingRow = ({
  booking,
  expanded,
  onToggleExpand,
  onStatusChange,
}: BookingRowProps) => {
  return (
    <>
      <TableRow
        className="cursor-pointer hover:bg-gray-50"
        onClick={onToggleExpand}
      >
        <TableCell className="font-medium">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2 text-gray-500" />
            {booking.userId.name}
          </div>
        </TableCell>
        <TableCell>{booking.turfName}</TableCell>
        <TableCell>
          <div className="flex flex-col">
            <span>{format(parseISO(booking.date.toString()), "PPP")}</span>
            <span className="text-sm text-gray-500">
              {booking.startTime} - {booking.endTime}
            </span>
          </div>
        </TableCell>
        <TableCell>{booking.duration} hours</TableCell>
        <TableCell>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
            {booking.amount}
          </div>
        </TableCell>
        <TableCell>
          <BookingStatusBadge status={booking.status} />
        </TableCell>
        <TableCell>
          <BookingPaymentBadge status={booking.paymentStatus} />
        </TableCell>
        <TableCell>
          <BookingActions 
            booking={booking} 
            expanded={expanded}
            onStatusChange={onStatusChange}
            onToggleExpand={onToggleExpand}
          />
        </TableCell>
      </TableRow>
      {expanded && <BookingDetails booking={booking} />}
    </>
  );
};