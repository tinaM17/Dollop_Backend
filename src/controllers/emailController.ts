import { Request, Response } from 'express';
import { sendEmail } from '../utils/emailService';

export const sendEmailController = async (req: Request, res: Response) => {
  const { to, subject, htmlFilePath, joinLink, title, username } = req.body;

  if (!to || !subject || !htmlFilePath || !joinLink || !title || !username) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await sendEmail(to, subject, htmlFilePath, joinLink,title,username);
    res.status(200).json({ message: 'Email sent successfully', response });
  } catch (error:any) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: error.message });
  }
};
