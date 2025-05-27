import React, { useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, TimePicker, Button, message } from 'antd';
import { Booking, TurfData } from '@/types/turf';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { addBooking } from '@/redux/slices/bookingSlice';

interface AddEditBookingModalProps {
  visible: boolean;
  onClose: () => void;
  turfs: TurfData[];
}

const AddEditBookingModal: React.FC<AddEditBookingModalProps> = ({ 
  visible, 
  onClose, 
  turfs 
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      const selectedTurf = turfs.find(t => t.name === values.turfName);
      if (!selectedTurf) {
        throw new Error('Selected turf not found');
      }
      
      const duration = dayjs(values.endTime, 'HH:mm').diff(
        dayjs(values.startTime, 'HH:mm'),
        'hour',
        true
      );
      
      
      const newBooking: Booking = {
        _id: `booking-${Date.now()}`,
        customerName: values.customerName,
        turfName: values.turfName,
        date: values.date.toDate(),
        startTime: values.startTime.format('HH:mm'),
        endTime: values.endTime.format('HH:mm'),
        duration,
        price: duration * selectedTurf.price,
        customerPhone: values.customerPhone,
        status: 'confirmed',
      };
      
      // Dispatch action to add booking
      dispatch(addBooking(newBooking));
      
      message.success('Booking added successfully');
      form.resetFields();
      onClose();
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Modal
      title="Add New Booking"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          loading={loading}
          onClick={handleSubmit}
        >
          Submit
        </Button>,
      ]}
      width={600}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="customerName"
          label="Customer Name"
          rules={[{ required: true, message: 'Please enter customer name' }]}
        >
          <Input placeholder="Enter customer name" />
        </Form.Item>
        
        <Form.Item
          name="customerPhone"
          label="Customer Phone"
          rules={[
            { required: true, message: 'Please enter customer phone' },
            { pattern: /^[0-9]+$/, message: 'Please enter valid phone number' },
          ]}
        >
          <Input placeholder="Enter customer phone" />
        </Form.Item>
        
        <Form.Item
          name="turfName"
          label="Turf"
          rules={[{ required: true, message: 'Please select turf' }]}
        >
          <Select placeholder="Select turf">
            {turfs.map(turf => (
              <Select.Option key={turf._id} value={turf.name}>
                {turf.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Please select date' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        
        <Form.Item
          name="startTime"
          label="Start Time"
          rules={[{ required: true, message: 'Please select start time' }]}
        >
          <TimePicker format="HH:mm" minuteStep={15} style={{ width: '100%' }} />
        </Form.Item>
        
        <Form.Item
          name="endTime"
          label="End Time"
          rules={[
            { required: true, message: 'Please select end time' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || !getFieldValue('startTime')) {
                  return Promise.resolve();
                }
                
                const start = dayjs(getFieldValue('startTime'), 'HH:mm');
                const end = dayjs(value, 'HH:mm');
                
                if (end.isAfter(start)) {
                  return Promise.resolve();
                }
                
                return Promise.reject(new Error('End time must be after start time'));
              },
            }),
          ]}
        >
          <TimePicker format="HH:mm" minuteStep={15} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditBookingModal;