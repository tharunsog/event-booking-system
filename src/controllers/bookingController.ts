import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Event,{ IEvent } from '../models/Event';
import Booking from '../models/Booking';

export const createBooking = async (req: Request, res: Response) => {
    try {
      const { userId, quantity, eventId } = req.body;
  
      // Validate quantity
      if (quantity > 15) {
        return res.status(400).json({ message: 'Cannot book more than 15 tickets' });
      }
  
      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ message: 'Invalid event ID' });
      }
  
      // Find event by ObjectId
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Check available tickets
      if (event.totalTickets - event.bookedTickets < quantity) {
        return res.status(400).json({ message: 'Not enough tickets available' });
      }
  
      // Create booking
      event.bookedTickets += quantity;
      await event.save();
  
      const booking = new Booking({ userId, eventId, quantity });
      await booking.save();
  
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const cancelBooking = async (req: Request, res: Response) => {
    try {
      const bookingId = req.params.id;
      
      // Find the booking
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      // Find the associated event
      const event = await Event.findById(booking.eventId);
      if (event) {
        event.bookedTickets -= booking.quantity;
        await event.save();
      }
  
      // Delete the booking
      await Booking.deleteOne({ _id: bookingId });
  
      res.status(200).json({ message: 'Booking cancelled' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

export const printTicket = async (req: Request, res: Response) => {
    try {
      const { bookingId } = req.body;
      const booking = await Booking.findById(bookingId).populate<{ eventId: IEvent }>('eventId');
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      // Check if the eventId is populated correctly
      const event = booking.eventId as IEvent;
      if (!event) {
        return res.status(500).json({ message: 'Event details not found' });
      }
  
      // Ensure the event object has the expected properties
      if (typeof event.name !== 'string' || !(event.date instanceof Date)) {
        return res.status(500).json({ message: 'Invalid event data' });
      }
  
      const ticket = {
        event: event.name,
        date: event.date,
        quantity: booking.quantity,
        userId: booking.userId,
      };
  
      res.status(200).json(ticket);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred.' });
      }
    }
  };