import { Request, Response } from 'express';
import MeetingDetails from '../models/MeetingDetailsModel';
import moment from 'moment';

export const createMeetingDetails = async (req: Request, res: Response) => {
    try {
        const { meeting_id, date, time, callId } = req.body;
        // Parse the date string into a Date object
       const [day, month, year] = date.split('-');
       const parsedDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
       console.log(parsedDate);
       
        const newMeetingDetails = new MeetingDetails({ meeting_id, date:parsedDate, time, callId });
        const savedMeetingDetails = await newMeetingDetails.save();
        res.status(201).json(savedMeetingDetails);
      } catch (error) {
        res.status(400).json({ message: error });
      }
  };
  
  export const getAllMeetingDetails = async (_req: Request, res: Response) => {
    try {
        const meetingDetails = await MeetingDetails.find();
        res.status(200).json(meetingDetails);
      } catch (error) {
        res.status(500).json({ message: error});
      }
  };
  
  export const getMeetingDetailsById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const meetingDetails = await MeetingDetails.findById(id);
    
        if (!meetingDetails) {
          return res.status(404).json({ message: 'Meeting not found' });
        }
    
        res.status(200).json(meetingDetails);
      } catch (error) {
        res.status(500).json({ message: error });
      }
  };

  export const updateMeetingDetails = async (req: Request, res: Response) => {
    try {
      const { meeting_id, date } = req.params;
      const { time, callId } = req.body;
  
      const [day, month, year] = date.split('-');
      const parsedDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  
      const updatedMeetingDetails = await MeetingDetails.findOneAndUpdate(
        { meeting_id, date: parsedDate },
        { time, callId },
        { new: true, runValidators: true }
      );
  
      if (!updatedMeetingDetails) {
        return res.status(404).json({ message: 'Meeting details not found' });
      }
  
      res.status(200).json(updatedMeetingDetails);
    } catch (error:any) {
      res.status(400).json({ message: error.message || 'An error occurred' });
    }
  };
  
  export const deleteMeetingDetails = async (req: Request, res: Response) => {
    try {
      const { meeting_id, date } = req.params;
  
      const [day, month, year] = date.split('-');
      const parsedDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  
      const deletedMeetingDetails = await MeetingDetails.findOneAndDelete({ meeting_id, date: parsedDate });
  
      if (!deletedMeetingDetails) {
        return res.status(404).json({ message: 'Meeting details not found' });
      }
  
      res.status(200).json({ message: 'Meeting details deleted successfully' });
    } catch (error:any) {
      res.status(500).json({ message: error.message || 'An error occurred' });
    }
  };
  