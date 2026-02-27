// import express from 'express';
// import { clerkMiddleware, requireAuth } from '@clerk/express';
// import { cancleAppointment, confirmPayment, createAppointement, getAppointments, getAppointmentsByDoctor, getAppointmentsByPatient, getResisteredUserCount, getStats, updateAppointment } from '../controllers/appointmentController.js';

// const appointementRouter = express.Router();

// appointementRouter.get("/", getAppointments);
// appointementRouter.get("/confirm", confirmPayment);
// appointementRouter.get("/stats/summary", getStats);

// // authentic router
// appointementRouter.post('/', clerkMiddleware(), requireAuth(), createAppointement);
// appointementRouter.get('/me', clerkMiddleware(), requireAuth(), getAppointmentsByPatient);

// appointementRouter.get("/doctor/:doctorId", getAppointmentsByDoctor);

// appointementRouter.post("/:id/cancel", cancleAppointment);
// // appointementRouter.post("/paitents/count", getResisteredUserCount);
// // appointementRouter.get("/patients/count", getResisteredUserCount);
// appointementRouter.get("/patients/count", getResisteredUserCount);
// appointementRouter.post("/:id", updateAppointment);

// export default appointementRouter;


import express from 'express';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import {
    cancleAppointment,
    confirmPayment,
    createAppointement,
    fixMissingCreatedBy,
    getAppointments,
    getAppointmentsByDoctor,
    getAppointmentsByPatient,
    getResisteredUserCount,
    getStats,
    updateAppointment
} from '../controllers/appointmentController.js';

const appointementRouter = express.Router();

// ── Public routes ──────────────────────────────────────────
appointementRouter.get("/", getAppointments);
appointementRouter.get("/confirm", confirmPayment);
appointementRouter.get("/stats/summary", getStats);
appointementRouter.get("/patients/count", getResisteredUserCount);

// ── ONE-TIME FIX ROUTE — delete after running once ─────────
// Visit: http://localhost:4000/api/appointments/fix-missing-createdby?clerkId=user_39JC8he9bti3xcLCl2dZuFTUXoU
appointementRouter.get("/fix-missing-createdby", fixMissingCreatedBy);

// ── Authenticated routes ───────────────────────────────────
// IMPORTANT: /me must come BEFORE /:id to avoid route conflict
appointementRouter.get('/me', clerkMiddleware(), requireAuth(), getAppointmentsByPatient);
appointementRouter.post('/', clerkMiddleware(), requireAuth(), createAppointement);

// ── Doctor route ───────────────────────────────────────────
appointementRouter.get("/doctor/:doctorId", getAppointmentsByDoctor);

// ── ID-based routes ────────────────────────────────────────
appointementRouter.post("/:id/cancel", cancleAppointment);
appointementRouter.post("/:id", updateAppointment);

export default appointementRouter;