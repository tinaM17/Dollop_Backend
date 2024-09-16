import { Request, Response } from 'express';
import UserModel from '../models/UserModel';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, meeting_id } = req.body;

    if(!username || !email || !meeting_id) {
      return res.status(400).json({message: 'Username and email id is required'})
    }

    // Check if a user with the same email already exists
    let existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      // Check if the meeting_id already exists in the meeting_ids array
      if (existingUser.meeting_ids.includes(meeting_id)) {
        return res.status(400).json({ message: 'User already registered for this session' });
      }

      // Add the new meeting_id to the meeting_ids array
      existingUser.meeting_ids.push(meeting_id);
    } else {
      // Create a new user if no user with the same email exists
      existingUser = new UserModel({ username, email, meeting_ids: [meeting_id] });
    }

    const savedUser = await existingUser.save();

    res.status(201).json({ message: 'User Registered successfully!', user: savedUser });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'An error occurred' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'An error occurred' });
  }
};

export const updateUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const { username, meeting_ids } = req.body;

    // Find the user by email and update the fields
    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { username, meeting_ids },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'An error occurred' });
  }
};

export const deleteUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    const deletedUser = await UserModel.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'An error occurred' });
  }
};

export const findUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'An error occurred' });
  }
};
