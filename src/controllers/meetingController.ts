import { Request, Response } from 'express';
import Meeting from '../models/MeetingModel';

export const createMeeting = async (req: Request, res: Response) => {
  try {
    const { name, meeting_id, time } = req.body;
    const newMeeting = new Meeting({ name, meeting_id, time });
    const savedMeeting = await newMeeting.save();
    res.status(201).json(savedMeeting);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getAllMeetings = async (_req: Request, res: Response) => {
  try {
    const meetings = await Meeting.find();
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getMeetingById = async (req: Request, res: Response) => {
  try {
    const { meeting_id } = req.params;
    const meeting = await Meeting.findOne({ meeting_id });

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateMeetingById = async (req: Request, res: Response) => {
  try {
    const { meeting_id } = req.params;
    const { name, time } = req.body;
    const updatedMeeting = await Meeting.findOneAndUpdate(
      { meeting_id },
      { name, time },
      { new: true, runValidators: true }
    );

    if (!updatedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.status(200).json(updatedMeeting);
  } catch (error:any) {
    res.status(400).json({ message: error.message || 'An error occurred' });
  }
};

export const deleteMeetingById = async (req: Request, res: Response) => {
  try {
    const { meeting_id } = req.params;
    const deletedMeeting = await Meeting.findOneAndDelete({ meeting_id });

    if (!deletedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.status(200).json({ message: 'Meeting deleted successfully' });
  } catch (error:any) {
    res.status(500).json({ message: error.message || 'An error occurred' });
  }
};
