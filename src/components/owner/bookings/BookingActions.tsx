
"use client";

import { useState } from "react";
import { Button } from "@/components/owner/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/owner/ui/dropdown-menu";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  XCircle,
} from "lucide-react";
import { Booking } from "@/types/turf";
import { Dialog } from "@headlessui/react";

interface BookingActionsProps {
  booking: Booking;
  expanded: boolean;
  onStatusChange: (status: Booking["status"]) => void;
  onToggleExpand: (e: React.MouseEvent) => void;
}

export const BookingActions = ({
  booking,
  expanded,
  onStatusChange,
  onToggleExpand,
}: BookingActionsProps) => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Example condition: allow cancel only if status is not already cancelled or confirmed
  const canCancel = booking.status !== "cancelled" && booking.status !== "confirmed";

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCancelConfirm(true);
  };

  const confirmCancel = () => {
    onStatusChange("cancelled");
    setShowCancelConfirm(false);
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        {expanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onToggleExpand}>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white shadow-md border border-gray-200 rounded-md z-50"
          >
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange("confirmed");
              }}
              disabled={booking.status === "confirmed"}
            >
              <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
              Confirm
            </DropdownMenuItem>

            {canCancel && (
              <DropdownMenuItem onClick={handleCancel}>
                <XCircle className="h-4 w-4 mr-2 text-red-500" />
                Cancel
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Cancel Confirmation Modal */}
      <Dialog open={showCancelConfirm} onClose={() => setShowCancelConfirm(false)} className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-black bg-opacity-30 fixed inset-0" />
        <div className="bg-white p-6 rounded-md z-50 max-w-sm w-full relative">
          <h3 className="text-lg font-semibold text-red-600">Confirm Cancellation</h3>
          <p className="mt-2 text-sm text-gray-700">
            Are you sure you want to cancel this booking? This may affect user experience.
          </p>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowCancelConfirm(false)}>
              No
            </Button>
            <Button variant="danger" onClick={confirmCancel}>
              Yes, Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
