import { Router } from 'express';
import { createMeeting, getAllMeetings, getMeetingById,updateMeetingById,deleteMeetingById } from '../controllers/meetingController';

const router = Router();

router.post('/meetings', createMeeting);
router.get('/meetings', getAllMeetings);
router.get('/meetings/:meeting_id', getMeetingById);
router.put('/meetings/:meeting_id', updateMeetingById); // Route for updating meeting by meeting_id
router.delete('/meetings/:meeting_id', deleteMeetingById); // Route for deleting meeting by meeting_id


export default router;
