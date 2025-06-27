import React from "react";
import { FaRupeeSign, FaDownload, FaTicketAlt } from "react-icons/fa";
import { IoFootball, IoTimeSharp } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { MdSportsScore, MdPerson } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaLocationDot, FaMapLocationDot } from "react-icons/fa6";
import jsPDF from "jspdf"; // Import jsPDF

interface BookingData {
  _id: string;
  turf: {
    name: string;
    location?: string;
  };
  date: string | Date;
  startTime: string;
  endTime: string;
  amount: number;
  status?: string;
}

interface MatchData {
  _id: string;
  title: string;
  turfId: {
    name: string;
    location?: string;
  };
  date: string | Date;
  maxPlayers: number;
  joinedPlayers: {
    _id: string;
    username: string;
    email: string;
  }[];
  hostId?: {
    username: string;
  };
  description?: string;
}

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BookingData | MatchData | null;
  type: "booking" | "hosted" | "joined";
}

const formatDate = (dateInput: string | Date | null | undefined): string => {
  if (!dateInput) {
    return "N/A";
  }

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const TicketModal: React.FC<TicketModalProps> = ({
  isOpen,
  onClose,
  data,
  type,
}) => {
  const generateInvoiceId = (): string => {
    return `INV-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 5)
      .toUpperCase()}`;
  };

  const downloadInvoice = (): void => {
    if (!data) return;

    const invoiceId = generateInvoiceId();
    const currentDate = new Date().toLocaleDateString();

    // Create a new jsPDF instance
    const doc = new jsPDF();
    doc.setFontSize(12);

    // Define content based on type
    let invoiceContent: string[] = [];
    if (type === "booking") {
      const bookingData = data as BookingData;
      invoiceContent = [
        "INVOICE",
        "=====================================",
        `Invoice ID: ${invoiceId}`,
        `Date: ${currentDate}`,
        "",
        "TURF BOOKING DETAILS",
        "=====================================",
        `Turf: ${bookingData.turf?.name || "N/A"}`,
        `Location: ${bookingData.turf?.location || "N/A"}`,
        `Date: ${formatDate(bookingData.date)}`,
        `Time: ${bookingData.startTime} - ${bookingData.endTime}`,
        `Amount: ₹${bookingData.amount}`,
        `Status: ${bookingData.status || "Confirmed"}`,
        "",
        "Thank you for your booking!",
        "=====================================",
      ];
    } else {
      const matchData = data as MatchData;
      invoiceContent = [
        "MATCH RECEIPT",
        "=====================================",
        `Receipt ID: ${invoiceId}`,
        `Date: ${currentDate}`,
        "",
        "MATCH DETAILS",
        "=====================================",
        `Match: ${matchData.title || "N/A"}`,
        `Venue: ${matchData.turfId?.name || "N/A"}`,
        `Location: ${matchData.turfId?.location || "N/A"}`,
        `Date: ${formatDate(matchData.date)}`,
        `Players: ${matchData.joinedPlayers?.length || 0}/${matchData.maxPlayers}`,
        `Host: ${matchData.hostId?.username || "N/A"}`,
        `Description: ${matchData.description || "No description"}`,
        "",
        "Thank you for participating!",
        "=====================================",
      ];
    }

    // Add content to PDF
    let yPosition = 20;
    invoiceContent.forEach((line) => {
      doc.text(line, 20, yPosition);
      yPosition += 10; // Adjust line spacing
    });

    // Download the PDF
    doc.save(`${type}-invoice-${invoiceId}.pdf`);
  };

  if (!isOpen || !data) return null;

  const isBooking = type === "booking";
  const bookingData = isBooking ? (data as BookingData) : null;
  const matchData = !isBooking ? (data as MatchData) : null;

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box max-w-md p-0 bg-white relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle absolute right-2 top-2 z-10 bg-white border-gray-300 hover:bg-gray-100"
        >
          <IoMdClose className="text-lg" />
        </button>

        {/* Ticket Design */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-2">
              <FaTicketAlt className="text-3xl text-green-700" />
            </div>
            <h2 className="text-xl font-bold text-green-800">
              {isBooking ? "BOOKING TICKET" : "MATCH TICKET"}
            </h2>
            <p className="text-sm text-green-600">
              #{data._id.slice(-8).toUpperCase()}
            </p>
          </div>

          {/* Ticket Content */}
          <div className="bg-white rounded-lg p-4 shadow-sm border-2 border-dashed border-green-300">
            {isBooking && bookingData ? (
              <>
                {/* Booking Details */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {bookingData.turf?.name}
                  </h3>
                  <p className="text-sm text-gray-600">Turf Booking</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CiCalendarDate className="text-green-600" />
                      <span>Date</span>
                    </div>
                    <span className="text-sm font-medium">
                      {formatDate(bookingData.date)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <IoTimeSharp className="text-green-600" />
                      <span>Time</span>
                    </div>
                    <span className="text-sm font-medium">
                      {bookingData.startTime} - {bookingData.endTime}
                    </span>
                  </div>

                  {bookingData.turf?.location && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaMapLocationDot className="text-green-600" />
                        <span>Location</span>
                      </div>
                      <span className="text-sm font-medium">
                        {bookingData.turf.location}
                      </span>
                    </div>
                  )}

                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaRupeeSign className="text-green-600" />
                        <span>Amount</span>
                      </div>
                      <span className="text-lg font-bold text-green-700">
                        ₹{bookingData.amount}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              matchData && (
                <>
                  {/* Match Details */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {matchData.title}
                    </h3>
                    <p className="text-sm text-gray-600">Match Participation</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <IoFootball className="text-green-600" />
                        <span>Venue</span>
                      </div>
                      <span className="text-sm font-medium">
                        {matchData.turfId?.name}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CiCalendarDate className="text-green-600" />
                        <span>Date</span>
                      </div>
                      <span className="text-sm font-medium">
                        {formatDate(matchData.date)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MdSportsScore className="text-green-600" />
                        <span>Players</span>
                      </div>
                      <span className="text-sm font-medium">
                        {matchData.joinedPlayers?.length || 0}/
                        {matchData.maxPlayers}
                      </span>
                    </div>

                    {matchData.hostId?.username && (
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MdPerson className="text-green-600" />
                          <span>Host</span>
                        </div>
                        <span className="text-sm font-medium">
                          {matchData.hostId.username}
                        </span>
                      </div>
                    )}

                    {matchData.turfId?.location && (
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaLocationDot className="text-green-600" />
                          <span>Location</span>
                        </div>
                        <span className="text-sm font-medium">
                          {matchData.turfId.location}
                        </span>
                      </div>
                    )}
                  </div>
                </>
              )
            )}

            {/* Ticket Footer */}
            <div className="border-t pt-3 mt-4 text-center">
              <p className="text-xs text-gray-500">
                Generated on {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Download Button */}
          <div className="mt-6 text-center">
            <button
              onClick={downloadInvoice}
              className="btn bg-green-700 hover:bg-green-800 text-white border-none"
            >
              <FaDownload className="mr-2" />
              Download Invoice
            </button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default TicketModal;