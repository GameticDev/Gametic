import React from 'react';
import { Modal, Descriptions, Tag, Button } from 'antd';
import { Booking } from '@/types/turf';
import dayjs from 'dayjs';

interface BookingDetailsModalProps {
  visible: boolean;
  booking: Booking | null;
  onClose: () => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({ 
  visible, 
  booking, 
  onClose 
}) => {
  if (!booking) return null;
  
  return (
    <Modal
      title="Booking Details"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
      width={700}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Customer Name">{booking.customerName}</Descriptions.Item>
        <Descriptions.Item label="Turf Name">{booking.turfName}</Descriptions.Item>
        <Descriptions.Item label="Date">
          {dayjs(booking.date).format('DD MMM YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Time Slot">
          {booking.startTime} - {booking.endTime}
        </Descriptions.Item>
        <Descriptions.Item label="Duration">
          {booking.duration} hour{booking.duration > 1 ? 's' : ''}
        </Descriptions.Item>
        <Descriptions.Item label="Price">
          ¥ {booking.price.toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={
            booking.status === 'confirmed' ? 'green' : 
            booking.status === 'pending' ? 'orange' : 'red'
          }>
            {booking.status.toUpperCase()}
          </Tag>
        </Descriptions.Item>
        {booking.customerPhone && (
          <Descriptions.Item label="Customer Phone">
            {booking.customerPhone}
          </Descriptions.Item>
        )}
      </Descriptions>
    </Modal>
  );
};

export default BookingDetailsModal;