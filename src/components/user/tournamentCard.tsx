"use client";
import { FaCalendarAlt, FaMapMarkerAlt, FaTrophy } from "react-icons/fa";
import moment from "moment";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { TournamentDetail } from "@/app/(root)/(user-routes)/home/tournament/[id]/page";

interface Props {
  data: TournamentDetail;
}

export default function TournamentCard({ data }: Props) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/home/tournament/${data._id}`);
  };

  return (
    <div
      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 w-full max-w-sm relative overflow-hidden group cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 transform rotate-12 translate-x-8 -translate-y-8">
        <FaTrophy className="w-full h-full" style={{ color: "#415C41" }} />
      </div>

      {/* Tournament Image */}
      <div className="relative w-full h-32 mb-5">
        <Image
          src={data.image}
          alt="Tournament image"
          fill
          className="object-cover rounded-t-3xl"
        />
      </div>

      <div className="p-5">
        {/* Header Section */}
        <div className="flex items-center mb-2 relative z-10">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs text-gray-500 font-medium">
                <span className="font-bold">{data.sport.toUpperCase()}</span>{" "}
                Tournament
              </p>
            </div>
          </div>
        </div>

        {/* Entry Fee Section */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span
              className="text-2xl font-extrabold"
              style={{ color: "#415C41" }}
            >
              ₹{data.entryFee}
            </span>
            <span className="text-sm font-medium text-gray-500">/entry</span>
          </div>
        </div>

        {/* Tournament Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
          {data.title}
        </h3>
        {/* <p className="text-sm text-gray-600 mb-4">{data.subtitle}</p> */}

        {/* Divider */}
        <div className="my-5 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Location & Date */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center text-sm text-gray-700 gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#998869" }}
            >
              <FaMapMarkerAlt className="text-white text-xs" />
            </div>
            <div>
              <span className="font-semibold truncate block">
                {data.turf.name}
              </span>
              <span className="text-xs text-gray-500">
                {data.turf.city},{data.turf.location}
              </span>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-700 gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#00423D" }}
            >
              <FaCalendarAlt className="text-white text-xs" />
            </div>
            <div>
              <span className="font-semibold truncate block">
                {moment(data.dateFrom).format("MMM D")} -{" "}
                {moment(data.dateTo).format("MMM D, YYYY")}
              </span>
              <span className="text-xs text-gray-500">Tournament Duration</span>
            </div>
          </div>
        </div>

        {/* Bottom Section with Prize Pool Only */}
        <div
          className="rounded-2xl p-4 border-2"
          style={{
            backgroundColor: "#f8f9fa",
            borderColor: "#998869",
          }}
        >
          {/* Prize Pool */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaTrophy className="text-yellow-500 text-sm" />
              <span className="text-sm font-medium text-gray-600">
                Prize Pool
              </span>
            </div>
            <span className="text-lg font-bold" style={{ color: "#415C41" }}>
              ₹{data.prizePool}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
