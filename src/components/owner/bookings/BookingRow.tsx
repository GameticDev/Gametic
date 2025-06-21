"use client";

import { format, parseISO } from "date-fns";
import { User } from "lucide-react";
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

// duration calculation
const calculateDuration = (startTime: string, endTime: string): string => {
  const parseTime = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours + minutes / 60;
  };

  const start = parseTime(startTime);
  const end = parseTime(endTime);
  const duration = end - start;

  return duration % 1 === 0 ? duration.toString() : duration.toFixed(1);
};

export const BookingRow = ({
  booking,
  expanded,
  onToggleExpand,
  onStatusChange,
}: BookingRowProps) => {
  const duration = calculateDuration(booking.startTime, booking.endTime);

  const renderUserInfo = () => {
    if (!booking.userId) {
      return <div className="text-gray-400 italic">No user reference</div>;
    }

    if (typeof booking.userId === 'string') {
      return (
        <div className="text-gray-400 italic">
          User ID: {booking.userId}
        </div>
      );
    }

    return (
      <div className="flex items-center">
        <div>
          <div className="font-medium">
            {booking.userId.username || booking.userId.email || `User ${booking.userId._id}`}
          </div>
          {booking.userId.phone && (
            <div className="text-xs text-gray-500">{booking.userId.phone}</div>
          )}
          {booking.userId.role && (
            <div className="text-xs text-gray-500 capitalize">{booking.userId.role}</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <TableRow
        className="cursor-pointer hover:bg-gray-50"
        onClick={onToggleExpand}
      >
        <TableCell className="font-medium">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2 text-gray-500" />
            {renderUserInfo()}
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
        <TableCell>{duration} hours</TableCell>
        {/* <TableCell>{booking.duration} hours</TableCell> */}
        <TableCell>
          <div className="flex items-center">
            <span className="h-4 w-4 mr-2 text-gray-500">₹</span>
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