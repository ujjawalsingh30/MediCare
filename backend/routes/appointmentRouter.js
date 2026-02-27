import express from 'express';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import { cancleAppointment, confirmPayment, createAppointement, getAppointments, getAppointmentsByDoctor, getAppointmentsByPatient, getResisteredUserCount, getStats, updateAppointment } from '../controllers/appointmentController.js';

const appointementRouter = express.Router();

appointementRouter.get("/", getAppointments);
appointementRouter.get("/confirm", confirmPayment);
appointementRouter.get("/stats/summary", getStats);

// authentic router
appointementRouter.post('/', clerkMiddleware(), requireAuth(), createAppointement);
appointementRouter.get('/me', clerkMiddleware(), requireAuth(), getAppointmentsByPatient);

appointementRouter.get("/doctor/:doctorId", getAppointmentsByDoctor);

appointementRouter.post("/:id/cancel", cancleAppointment);
// appointementRouter.post("/paitents/count", getResisteredUserCount);
// appointementRouter.get("/patients/count", getResisteredUserCount);
appointementRouter.get("/patients/count", getResisteredUserCount);
appointementRouter.post("/:id", updateAppointment);

export default appointementRouter;