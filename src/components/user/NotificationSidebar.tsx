"use client";
import React, { useState, useEffect, useCallback } from "react";
import { X, Bell, Trophy, CalendarIcon } from "lucide-react";
import socket from "@/app/socket/soket";
import axiosInstance from "@/utils/axiosInstance";

interface Notification {
  _id: string;
  type: "booking" | "tournament" | "system" | "match";
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  matchId?: string;
  tournamentId?: string;
}

interface NotificationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
  onUnreadCountChange?: (count: number) => void;
}

const NotificationSidebar: React.FC<NotificationSidebarProps> = ({
  isOpen,
  onClose,
  userId,
  onUnreadCountChange
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const formatTimeAgo = useCallback((dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return diffInMinutes <= 1 ? "Just now" : `${diffInMinutes} minutes ago`;
    }
    if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    }
    if (diffInDays < 7) {
      return `${Math.floor(diffInDays)} days ago`;
    }
    return date.toLocaleDateString();
  }, []);

  const fetchNotifications = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get("/allNotification");

      if (response.data?.notifications) {
        setNotifications(response.data.notifications as Notification[]);
      }
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to fetch notifications";
      console.error("Error fetching notifications:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (isOpen && userId) {
      fetchNotifications();
    }
  }, [isOpen, userId, fetchNotifications]);

  useEffect(() => {
    if (userId) {
      socket.io.opts.query = { userId };
      if (!socket.connected) {
        socket.connect();
      }
    }

    const handleNewNotification = (data: {
      _id?: string;
      type?: string;
      title: string;
      message: string;
      matchId?: string;
      tournamentId?: string;
    }) => {
      console.log("New notification received:", data);

      const newNotification: Notification = {
        _id: data._id || Date.now().toString(),
        type: (data.type as Notification["type"]) || "system",
        title: data.title,
        message: data.message,
        createdAt: new Date().toISOString(),
        isRead: false,
        matchId: data.matchId,
        tournamentId: data.tournamentId,
      };

      setNotifications((prev) => [newNotification, ...prev]);

      if (Notification.permission === "granted") {
        new Notification(data.title, {
          body: data.message,
          icon: "/favicon.ico",
        });
      }
    };

    socket.on("newNotification", handleNewNotification);

    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    return () => {
      socket.off("newNotification", handleNewNotification);
    };
  }, [userId]);

  const getNotificationIcon = useCallback((type: string) => {
    switch (type) {
      case "booking":
        return <CalendarIcon className="h-5 w-5 text-[#00423d]" />;
      case "tournament":
        return <Trophy className="h-5 w-5 text-[#00423d]" />;
      case "match":
        return <Trophy className="h-5 w-5 text-[#00423d]" />;
      case "system":
      default:
        return <Bell className="h-5 w-5 text-[#00423d]" />;
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    setNotifications(prev => {
      const updated = prev.map(notification =>
        notification._id === notificationId
          ? { ...notification, isRead: true }
          : notification
      );
      // Update unread count in navbar
      const unreadCount = updated.filter(n => !n.isRead).length;
      onUnreadCountChange?.(unreadCount);
      return updated;
    });

    try {
      await axiosInstance.patch('/markRead', { notificationId });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      // Revert optimistic update on error
      setNotifications(prev => {
        const reverted = prev.map(notification =>
          notification._id === notificationId
            ? { ...notification, isRead: false }
            : notification
        );
        // Update unread count in navbar
        const unreadCount = reverted.filter(n => !n.isRead).length;
        onUnreadCountChange?.(unreadCount);
        return reverted;
      });
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    const originalNotifications = [...notifications];
    setNotifications(prev => {
      const updated = prev.map(notification => ({ ...notification, isRead: true }));
      // Update unread count in navbar to 0
      onUnreadCountChange?.(0);
      return updated;
    });

    try {
      await axiosInstance.patch('/markAllRead');
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      // Revert optimistic update on error
      setNotifications(originalNotifications);
      // Update unread count in navbar
      const unreadCount = originalNotifications.filter(n => !n.isRead).length;
      onUnreadCountChange?.(unreadCount);
    }
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
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
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold text-[#FEFFFA]">
              Notifications
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#FEFFFA] hover:text-[#998869] transition-colors duration-200"
            aria-label="Close notifications"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto h-[calc(100%-8rem)]">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00423d]" />
              <span className="ml-2 text-[#00423d]">
                Loading notifications...
              </span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 text-red-600 p-4">
              <Bell className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">Error loading notifications</p>
              <p className="text-sm text-center">{error}</p>
              <button
                type="button"
                onClick={fetchNotifications}
                className="mt-4 px-4 py-2 bg-[#00423d] text-white rounded-md hover:bg-[#003832] transition-colors duration-200"
              >
                Retry
              </button>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-[#998869]">
              <Bell className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">No notifications</p>
              <p className="text-sm">You&apos;re all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-[#415C41]">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`p-4 hover:bg-white transition-colors duration-200 cursor-pointer ${
                    !notification.isRead ? "bg-[#F0EFEB]" : ""
                  }`}
                  onClick={() => markAsRead(notification._id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Mark notification ${notification.title} as read`}
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
                        {formatTimeAgo(notification.createdAt)}
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
              type="button"
              onClick={markAllAsRead}
              disabled={loading || unreadCount === 0}
              className="flex-1 px-4 py-2 text-sm font-medium text-[#00423d] bg-transparent border border-[#00423d] rounded-md hover:bg-[#00423d] hover:text-[#FEFFFA] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Mark All Read
            </button>
            <button
              type="button"
              onClick={fetchNotifications}
              disabled={loading}
              className="flex-1 px-4 py-2 text-sm font-medium text-[#FEFFFA] bg-[#00423d] rounded-md hover:bg-[#003832] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationSidebar;
