import { Router } from "express";
import { createMeetingDetails, getAllMeetingDetails, getMeetingDetailsById,updateMeetingDetails,deleteMeetingDetails } from "../controllers/meetingDetailsController";

const router = Router();

router.post('/meeting-details',createMeetingDetails);
router.get('/meeting-details',getAllMeetingDetails);
router.get('/meeting-details/:id',getMeetingDetailsById);
router.put('/meeting-details/:meeting_id/:date', updateMeetingDetails); // Route for updating meeting details by meeting_id and id
router.delete('/meeting-details/:meeting_id/:date', deleteMeetingDetails); // Route for deleting meeting details by meeting_id and id

export default router;