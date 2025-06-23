// "use client";
// import React from "react";
// import { X, Bell, Calendar, User, Trophy } from "lucide-react";

// interface Notification {
//   id: string;
//   type: "booking" | "tournament" | "system" | "social";
//   title: string;
//   message: string;
//   time: string;
//   isRead: boolean;
// }

// interface NotificationSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const NotificationSidebar: React.FC<NotificationSidebarProps> = ({
//   isOpen,
//   onClose,
// }) => {
//   // Mock notification data - replace with your actual data
//   const notifications: Notification[] = [
//     {
//       id: "1",
//       type: "booking",
//       title: "Booking Confirmed",
//       message: "Your badminton court booking at Sports Complex has been confirmed for tomorrow at 6:00 PM.",
//       time: "2 hours ago",
//       isRead: false,
//     },
//     {
//       id: "2",
//       type: "tournament",
//       title: "Tournament Registration",
//       message: "Registration is now open for the Monthly Tennis Championship. Early bird discount available!",
//       time: "5 hours ago",
//       isRead: false,
//     },
//     {
//       id: "3",
//       type: "social",
//       title: "New Player Joined",
//       message: "Alex Chen has joined your regular Friday football group.",
//       time: "1 day ago",
//       isRead: true,
//     },
//     {
//       id: "4",
//       type: "system",
//       title: "Payment Successful",
//       message: "Your payment of ₹500 for court booking has been processed successfully.",
//       time: "2 days ago",
//       isRead: true,
//     },
//     {
//       id: "5",
//       type: "tournament",
//       title: "Tournament Results",
//       message: "Congratulations! You finished 2nd in the Weekly Badminton Tournament.",
//       time: "3 days ago",
//       isRead: true,
//     },
//   ];

//   const getNotificationIcon = (type: string) => {
//     switch (type) {
//       case "booking":
//         return <Calendar className="h-5 w-5 text-[#00423d]" />;
//       case "tournament":
//         return <Trophy className="h-5 w-5 text-[#00423d]" />;
//       case "social":
//         return <User className="h-5 w-5 text-[#00423d]" />;
//       case "system":
//         return <Bell className="h-5 w-5 text-[#00423d]" />;
//       default:
//         return <Bell className="h-5 w-5 text-[#00423d]" />;
//     }
//   };


//   return (
//     <>
//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-opacity-50 z-40 transition-opacity duration-300"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 bg-[#FEFFFA] shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-[#415C41] bg-[#00423D]">
//           <div className="flex items-center space-x-2">
//             <Bell className="h-6 w-6 text-[#FEFFFA]" />
//             <h2 className="text-lg font-semibold text-[#FEFFFA]">
//               Notifications
//             </h2>
            
//           </div>
//           <button
//             onClick={onClose}
//             className="text-[#FEFFFA] hover:text-[#998869] transition-colors duration-200"
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>

//         {/* Notifications List */}
//         <div className="overflow-y-auto h-full pb-20">
//           {notifications.length === 0 ? (
//             <div className="flex flex-col items-center justify-center h-64 text-[#998869]">
//               <Bell className="h-12 w-12 mb-4 opacity-50" />
//               <p className="text-lg font-medium">No notifications</p>
//               <p className="text-sm">You&apos;re all caught up!</p>
//             </div>
//           ) : (
//             <div className="divide-y divide-[#415C41] mb-18">
//               {notifications.map((notification) => (
//                 <div
//                   key={notification.id}
//                   className={`p-4 hover:bg-white transition-colors duration-200 cursor-pointer ${
//                     !notification.isRead ? "bg-[#F0EFEB]" : ""
//                   }`}
//                 >
//                   <div className="flex items-start space-x-3">
//                     <div className="flex-shrink-0 mt-1">
//                       {getNotificationIcon(notification.type)}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between mb-1">
//                         <h3 className="text-sm font-semibold text-[#00423d] truncate">
//                           {notification.title}
//                         </h3>
//                         {!notification.isRead && (
//                           <div className="w-2 h-2 bg-[#98916d] rounded-full flex-shrink-0 ml-2" />
//                         )}
//                       </div>
//                       <p className="text-sm text-[#666] leading-relaxed mb-2">
//                         {notification.message}
//                       </p>
//                       <p className="text-xs text-[#998869]">
//                         {notification.time}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer Actions */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#FEFFFA] border-t border-[#415C41]">
//           <div className="flex space-x-2">
//             <button className="flex-1 px-4 py-2 text-sm font-medium text-[#00423d] bg-transparent border border-[#00423d] rounded-md hover:bg-[#00423d] hover:text-[#FEFFFA] transition-colors duration-200">
//               Mark All Read
//             </button>
//             <button className="flex-1 px-4 py-2 text-sm font-medium text-[#FEFFFA] bg-[#00423d] rounded-md hover:bg-[#003832] transition-colors duration-200">
//               View All
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NotificationSidebar;









"use client";
import React, { useState, useEffect } from "react";
import { X, Bell, Calendar, User, Trophy } from "lucide-react";
import socket from "@/app/socket/soket";

interface Notification {
  id: string;
  type: "booking" | "tournament" | "system" | "social" | "match";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  matchId?: string;
}

interface NotificationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string; // Add userId prop
}

const NotificationSidebar: React.FC<NotificationSidebarProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    // Your existing dummy data
    {
      id: "1",
      type: "booking",
      title: "Booking Confirmed",
      message: "Your badminton court booking at Sports Complex has been confirmed for tomorrow at 6:00 PM.",
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: "2",
      type: "tournament",
      title: "Tournament Registration",
      message: "Registration is now open for the Monthly Tennis Championship. Early bird discount available!",
      time: "5 hours ago",
      isRead: false,
    },
    {
      id: "3",
      type: "social",
      title: "New Player Joined",
      message: "Alex Chen has joined your regular Friday football group.",
      time: "1 day ago",
      isRead: true,
    },
    {
      id: "4",
      type: "system",
      title: "Payment Successful",
      message: "Your payment of ₹500 for court booking has been processed successfully.",
      time: "2 days ago",
      isRead: true,
    },
    {
      id: "5",
      type: "tournament",
      title: "Tournament Results",
      message: "Congratulations! You finished 2nd in the Weekly Badminton Tournament.",
      time: "3 days ago",
      isRead: true,
    },
  ]);

  useEffect(() => {
    // Connect socket with userId when component mounts
    if (userId) {
      socket.io.opts.query = { userId };
      if (!socket.connected) {
        socket.connect();
      }
    }

    // Listen for new notifications
    const handleNewNotification = (data: any) => {
      console.log("New notification received:", data);
      
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: data.type || "system",
        title: data.title,
        message: data.message,
        time: "Just now",
        isRead: false,
        matchId: data.matchId,
      };

      setNotifications(prev => [newNotification, ...prev]);
      
      // Show browser notification if permission granted
      if (Notification.permission === "granted") {
        new Notification(data.title, {
          body: data.message,
          icon: "/favicon.ico", // Update with your app icon
        });
      }
    };

    socket.on("newNotification", handleNewNotification);

    // Request notification permission
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Cleanup
    return () => {
      socket.off("newNotification", handleNewNotification);
    };
  }, [userId]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <Calendar className="h-5 w-5 text-[#00423d]" />;
      case "tournament":
        return <Trophy className="h-5 w-5 text-[#00423d]" />;
      case "social":
        return <User className="h-5 w-5 text-[#00423d]" />;
      case "system":
        return <Bell className="h-5 w-5 text-[#00423d]" />;
      case "match":
        return <Trophy className="h-5 w-5 text-[#00423d]" />;
      default:
        return <Bell className="h-5 w-5 text-[#00423d]" />;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 bg-[#FEFFFA] shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#415C41] bg-[#00423D]">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Bell className="h-6 w-6 text-[#FEFFFA]" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold text-[#FEFFFA]">
              Notifications
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#FEFFFA] hover:text-[#998869] transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto h-full pb-20">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-[#998869]">
              <Bell className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">No notifications</p>
              <p className="text-sm">You&apos;re all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-[#415C41] mb-18">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-white transition-colors duration-200 cursor-pointer ${
                    !notification.isRead ? "bg-[#F0EFEB]" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-[#00423d] truncate">
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-[#98916d] rounded-full flex-shrink-0 ml-2" />
                        )}
                      </div>
                      <p className="text-sm text-[#666] leading-relaxed mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-[#998869]">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#FEFFFA] border-t border-[#415C41]">
          <div className="flex space-x-2">
            <button 
              onClick={markAllAsRead}
              className="flex-1 px-4 py-2 text-sm font-medium text-[#00423d] bg-transparent border border-[#00423d] rounded-md hover:bg-[#00423d] hover:text-[#FEFFFA] transition-colors duration-200"
            >
              Mark All Read
            </button>
            <button className="flex-1 px-4 py-2 text-sm font-medium text-[#FEFFFA] bg-[#00423d] rounded-md hover:bg-[#003832] transition-colors duration-200">
              View All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationSidebar;