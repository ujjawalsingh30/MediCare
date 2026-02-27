// import Appointment from "../models/Appointment.js";
// import Doctor from "../models/Doctor.js";
// import dotenv from 'dotenv';
// import Stripe from "stripe";
// import { getAuth } from "@clerk/express";
// import { clerkClient } from "@clerk/clerk-sdk-node";
// dotenv.config();

// const STRIPE_KEY = process.env.STRIPE_SECERET_KEY;
// const FRONTEND_URL = process.env.FRONTEND_URL;
// const MAJOR_ADMIN_ID = process.env.MAJOR_ADMIN_ID || null;
// const stripe = STRIPE_KEY ? new Stripe(STRIPE_KEY, { apiVersion: "2023-10-16" }) : null;

// // HELPERS
// // this function will return a finite number.
// const safeNumber = (v) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? n : null;
// };

// // this functiin will create the frontend url
// const buildFrontendBase = (req) => {
//     if (FRONTEND_URL) return FRONTEND_URL.replace(/\/$/, "");
//     const origin = req.get("origin") || req.get("referer");
//     if (origin) return origin.replace(/\/$/, "");
//     const host = req.get("host");
//     if (host) return `${req.protocol || "http"}://${host}`.replace(/\/$/, "");
//     return null;
// };

// // this function will get the user from clerk and return the user details 
// function resolveClerkUserId(req) {
//     try {
//         const auth = req.auth || {};
//         const fromReq = auth?.userId || auth?.user_id || auth?.user?.id || req.user?.id || null;
//         if (fromReq) return fromReq;
//         try {
//             const serverAuth = getAuth ? getAuth(req) : null;
//             return serverAuth?.userId || null;
//         } catch (e) {
//             return null;
//         }
//     } catch (e) {
//         return null;
//     }
// }

// // to getAppointments
// export const getAppointments = async (req, res) => {
//     try {
//         const { doctorId, mobile, status, search = "", limit: limitRaw = 50, page: pageRaw = 1, patientClerkId, createdBy } = req.query;
//         const limit = Math.min(200, Math.max(1, parseInt(limitRaw, 10) || 50));
//         const page = Math.max(1, parseInt(pageRaw, 10) || 1);
//         const skip = (page - 1) * limit;

//         // to filter
//         const filter = {};
//         if (doctorId) filter.doctorId = doctorId;
//         if (mobile) filter.mobile = mobile;
//         if (status) filter.status = status;
//         if (patientClerkId) filter.createdBy = patientClerkId;
//         if (createdBy) filter.createdBy = createdBy;
//         if (search) {
//             const re = new RegExp(search, "i");
//             filter.$or = [{ patientName: re }, { mobile: re }, { notes: re }];

//         }
//         // const items = (await Appointment.find(filter)).toSorted({ createdAt: -1 }).skip(skip).limit(limit)
//         //     .populate("doctorId", "name specialization owner imageUrl image").lean();
//         const items = await Appointment.find(filter)
//             .sort({ createdAt: -1 })
//             .skip(skip)
//             .limit(limit)
//             .populate("doctorId", "name specialization owner imageUrl image")
//             .lean();





//         const total = await Appointment.countDocuments(filter);
//         return res.json({
//             success: true,
//             appointments: items,
//             meta: { page, limit, total, count: items.length }
//         })

//     }
//     catch (err) {
//         console.error("GetAppointments Error:", err);
//         return res.status(500).json({
//             success: false,
//             message: "Server Error"
//         })
//     }
// }

// // to getAppointments by Patient
// export const getAppointmentsByPatient = async (req, res) => {
//     try {
//         const queryCreatedBy = req.query.createdBy || null;
//         const clerkUserId = req.auth?.userId || null;
//         const resolvedCreatedBy = queryCreatedBy || clerkUserId || null;

//         console.log('resolvedCreatedBy (query or req.auth.userId):', resolvedCreatedBy);

//         if (!resolvedCreatedBy && !req.query.mobile) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Authentication required."
//             });

//             const filter = {};
//             if (resolvedCreatedBy) filter.createdBy = resolvedCreatedBy;
//             if (req.query.mobile) filter.mobile = req.query.mobile;

//             const appointment = (await Appointment.find(filter)).toSorted({ date: 1, time: 1 }).lean();
//             return res.json({ success: true, appointment });

//         }
//     } catch (err) {
//         console.error("GetAppointmentsByPatient Error:", err);
//         return res.status(500).json({
//             success: false,
//             message: "Server Error"
//         })

//     }
// }

// // to create an appointement
// export const createAppointement = async (req, res) => {
//     try {
//         const {
//             doctorId,
//             patientName,
//             mobile,
//             age = "",
//             gender = "",
//             date,
//             time,
//             fee,
//             fees,
//             notes = "",
//             email,
//             paymentMethod,
//             owner: ownerFromBody = null,
//             doctorName: doctorNameFromBody,
//             speciality: specialityFromBody,
//             doctorImageUrl: doctorImageUrlFromBody,
//             doctorImagePublicId: doctorImagePublicIdFromBody,
//         } = req.body || {};

//         const clerkUserId = resolveClerkUserId(req);
//         if (!clerkUserId) return res.status(401).json({
//             success: false,
//             message: "Authentication is required."
//         });

//         if (!doctorId || !patientName || !mobile || !date || !time) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required."
//             });
//         }

//         // const numericFree = safeNumber(fee ?? fees ?? 0);
//         // return res.status(400).json({
//         //     success: false,
//         //     message: "Fee must be a valid number"
//         // });

//         const numericFee = safeNumber(fee ?? fees ?? 0);   // fix typo: numericFree → numericFee

//         if (isNaN(numericFee)) {                            // only return error IF fee is invalid
//             return res.status(400).json({
//                 success: false,
//                 message: "Fee must be a valid number"
//             });
//         }

//         // Duplicate booking prevention
//         const existingBooking = await Appointment.findOne({
//             doctorId,
//             createdBy: clerkUserId,
//             date: String(date),
//             time: String(time),
//             status: { $ne: "Canceled" },
//         }).lean();

//         if (existingBooking) {
//             return res.status(409).json({
//                 success: false,
//                 message: "You already have an appointment with this doctor at the selected slot."
//             });
//         }

//         let doctor = null;
//         try {
//             doctor = await Doctor.findById(doctorId).lean();
//         } catch (e) {
//             console.warn("Doctor lookup failed:", e?.message || e);

//         }
//         if (!doctor) return res.status(404).json({
//             success: false,
//             message: "Doctornot found"
//         });
//         // Resolve owner, names, images, etc.
//         let resolvedOwner = ownerFromBody || doctor.owner || null;
//         if (!resolvedOwner) resolvedOwner = MAJOR_ADMIN_ID || String(doctorId);

//         const doctorName = (doctor.name && String(doctor.name).trim()) || (doctorNameFromBody && String(doctorNameFromBody).trim()) || "";
//         const speciality =
//             (doctor.specialization && String(doctor.specialization).trim()) ||
//             (doctor.speciality && String(doctor.speciality).trim()) ||
//             (specialityFromBody && String(specialityFromBody).trim()) ||
//             "";

//         const doctorImageUrl =
//             (doctor.imageUrl && String(doctor.imageUrl).trim()) ||
//             (doctor.image && String(doctor.image).trim()) ||
//             (doctor.avatarUrl && String(doctor.avatarUrl).trim()) ||
//             (doctor.profileImage && doctor.profileImage.url && String(doctor.profileImage.url).trim()) ||
//             (doctorImageUrlFromBody && String(doctorImageUrlFromBody).trim()) ||
//             "";

//         const doctorImagePublicId =
//             (doctor.imagePublicId && String(doctor.imagePublicId).trim()) ||
//             (doctor.profileImage && doctor.profileImage.publicId && String(doctor.profileImage.publicId).trim()) ||
//             (doctorImagePublicIdFromBody && String(doctorImagePublicIdFromBody).trim()) ||
//             "";

//         const doctorImage = { url: doctorImageUrl, publicId: doctorImagePublicId };

//         const base = {
//             doctorId: String(doctor._id || doctorId),
//             doctorName,
//             speciality,
//             doctorImage,
//             patientName: String(patientName).trim(),
//             mobile: String(mobile).trim(),
//             age: age ? Number(age) : undefined,
//             gender: gender ? String(gender) : "",
//             date: String(date),
//             time: String(time),
//             fees: numericFee,
//             status: "Pending",
//             payment: { method: paymentMethod === "Cash" ? "Cash" : "Online", status: "Pending", amount: numericFee },
//             notes: notes || "",
//             createdBy: clerkUserId, // for a particular id.
//             owner: resolvedOwner,
//             sessionId: null,
//         };

//         // Free appointment
//         if (numericFee === 0) {
//             const created = await Appointment.create({
//                 ...base,
//                 status: "Confirmed",
//                 payment: { method: base.payment.method, status: "Paid", amount: 0 },
//                 paidAt: new Date(),
//             });
//             return res.status(201).json({ success: true, appointment: created, checkoutUrl: null });
//         }

//         // Cash payment
//         if (paymentMethod === "Cash") {
//             const created = await Appointment.create({
//                 ...base,
//                 status: "Pending",
//                 payment: { method: "Cash", status: "Pending", amount: numericFee },
//             });
//             return res.status(201).json({ success: true, appointment: created, checkoutUrl: null });
//         }

//         // Online: Stripe
//         if (!stripe) return res.status(500).json({ success: false, message: "Stripe not configured on server" });

//         const frontBase = buildFrontendBase(req);
//         if (!frontBase) {
//             return res.status(500).json({ success: false, message: "Frontend URL could not be determined. Set FRONTEND_URL or send Origin header." });
//         }

//         const successUrl = `${frontBase}/appointment/success?session_id={CHECKOUT_SESSION_ID}`;
//         const cancelUrl = `${frontBase}/appointment/cancel`;

//         let session;
//         try {
//             session = await stripe.checkout.sessions.create({
//                 payment_method_types: ["card"],
//                 mode: "payment",
//                 customer_email: email || undefined,
//                 line_items: [
//                     {
//                         price_data: {
//                             currency: "inr",
//                             product_data: { name: `Appointment - ${String(patientName).slice(0, 40)}` },
//                             unit_amount: Math.round(numericFee * 100),
//                         },
//                         quantity: 1,
//                     },
//                 ],
//                 success_url: successUrl,
//                 cancel_url: cancelUrl,
//                 metadata: {
//                     doctorId: String(doctorId),
//                     doctorName: doctorName || "",
//                     speciality: speciality || "",
//                     patientName: base.patientName,
//                     mobile: base.mobile,
//                     clerkUserId: clerkUserId || "",
//                 },
//             });
//         } catch (stripeErr) {
//             console.error("Stripe create session error:", stripeErr);
//             const message = stripeErr?.raw?.message || stripeErr?.message || "Stripe error";
//             return res.status(502).json({ success: false, message: `Payment provider error: ${message}` });
//         }

//         try {
//             const created = await Appointment.create({
//                 ...base,
//                 sessionId: session.id,
//                 payment: { ...base.payment, providerId: session.payment_intent || session.paymentIntent || null },
//                 status: "Pending",
//             });
//             return res.status(201).json({ success: true, appointment: created, checkoutUrl: session.url || null });
//         } catch (dbErr) {
//             console.error("DB error saving appointment after stripe session:", dbErr);
//             return res.status(500).json({ success: false, message: "Failed to create appointment record" });
//         }
//     } catch (err) {
//         console.error("createAppointment unexpected:", err);
//         return res.status(500).json({ success: false, message: "Server error" });
//     }
// };


// // to confirm the online payment and make it paid 
// export const confirmPayment = async (req, res) => {
//     try {
//         const { session_id } = req.query;
//         if (!session_id) return res.status(400).json({
//             success: false,
//             message: "Session Id is required"
//         });

//         if (!stripe) return res.status(500).json({
//             success: false,
//             message: "Stripe is not setup"
//         });
//         let session;
//         try {
//             session = await stripe.checkout.sessions.retrieve(session_id);

//         } catch (error) {
//             console.error("Stripe retrieve session error");
//             return res.status(404).json({
//                 success: false,
//                 message: "Stripe session not found"
//             });
//             if (!session) return res.status(404).json({
//                 success: false,
//                 message: "Invalid session"
//             });

//             if (session.payment_status !== "paid") {
//                 return res.status(404).json({
//                     success: false,
//                     message: "Payment not completed"
//                 });
//             }
//             // Try match by sessionId first
//             let appt = await Appointment.findOneAndUpdate(
//                 { sessionId: session_id },
//                 {
//                     "payment.status": "Paid",
//                     "payment.providerId": session.payment_intent || session.payment_intent_id || null,
//                     status: "Confirmed",
//                     paidAt: new Date(),
//                 },
//                 { new: true }
//             );

//             // fallback: try match via metadata (doctorId + mobile + patientName)
//             if (!appt) {
//                 const meta = session.metadata || {};
//                 if (meta.doctorId && meta.mobile && meta.patientName) {
//                     appt = await Appointment.findOneAndUpdate(
//                         {
//                             doctorId: meta.doctorId,
//                             mobile: meta.mobile,
//                             patientName: meta.patientName,
//                             fees: Math.round((session.amount_total || 0) / 100) || undefined,
//                         },
//                         {
//                             "payment.status": "Paid",
//                             "payment.providerId": session.payment_intent || null,
//                             status: "Confirmed",
//                             paidAt: new Date(),
//                             sessionId: session_id,
//                         },
//                         { new: true }
//                     );
//                 }
//             }

//             // last attempt: find appointment created in last 15 minutes with matching amount
//             if (!appt) {
//                 const amount = Math.round((session.amount_total || 0) / 100);
//                 const fifteenAgo = new Date(Date.now() - 1000 * 60 * 15);
//                 appt = await Appointment.findOneAndUpdate(
//                     { fees: amount, createdAt: { $gte: fifteenAgo } },
//                     {
//                         "payment.status": "Paid",
//                         "payment.providerId": session.payment_intent || null,
//                         status: "Confirmed",
//                         paidAt: new Date(),
//                         sessionId: session_id,
//                     },
//                     { new: true }
//                 );
//             }

//             if (!appt) {
//                 return res.status(404).json({ success: false, message: "Appointment not found for this payment session" });
//             }

//             return res.json({ success: true, appointment: appt });

//         }
//     } catch (err) {
//         console.error("ConfirmPayment errorL:", err);
//         return res.status(500).json({ success: false, message: "Server error" });
//     }
// }

// // to update an appointment
// export const updateAppointment = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const body = res.body || {};
//         const appt = await Appointment.findById(id);

//         if (!appt) return res.status(404).json({
//             success: false,
//             message: "Appointment not found"
//         });

//         const terminal = appt.status === "Completed" || appt.status === "Canceled";
//         if (terminal && body.status && body.status !== appt.status) {
//             return res.status(400).json({ success: false, message: "Cannot change status of a completed/canceled appointment" });
//         }

//         const update = {};
//         if (body.status) update.status = body.status;
//         if (body.notes !== undefined) update.notes = body.notes;

//         if (body.date && body.time) {
//             if (appt.status === "Completed" || appt.status === "Canceled") {
//                 return res.status(400).json({ success: false, message: "Cannot reschedule completed/canceled appointment" });
//             }
//             update.date = body.date;
//             update.time = body.time;
//             update.status = "Rescheduled";
//             update.rescheduledTo = { date: body.date, time: body.time };
//         }
//         const updated = await Appointment.findByIdAndUpdate(id, update,
//             { new: true, runValidators: true }
//         ).populate({ path: "doctorId", selecte: "name imageUrl" }).lean();

//         return res.json({ success: true, appointment: updated });
//     }
//     catch (err) {
//         console.error("updateAppointment error:", err);
//         return res.status(500).json({ success: false, message: "Server error" });
//     }
// }

// // to cancleAppointment
// export const cancleAppointment = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const appt = await Appointment.findById(id);

//         if (!appt) return res.status(404).json({
//             success: false,
//             message: "Appointment not found"
//         });
//         appt.staus = "Canceled";
//         await appt.save();
//         returnres.json({ succes: true, appointment: appt });
//     } catch (err) {
//         console.error("cancelAppointment error:", err);
//         return res.status(500).json({ success: false, message: "Server error" });
//     }
// }

// // to get Stats
// export const getStats = async (req, res) => {
//     try {
//         const total = await Appointment.countDocuments();
//         const paidAgg = await Appointment.aggregate([{ $match: { "payment.status": "Paid" } }, { $group: { _id: null, total: { $sum: "$fees" } } }]);
//         const revenue = (paidAgg[0] && paidAgg[0].total) || 0;

//         const sevenDaysAgo = new Date();
//         sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
//         const recent = await Appointment.countDocuments({ createAt: { $gte: sevenDaysAgo } });

//         return res.json({
//             succes: true,
//             stats: { total, revenue, recentLast7Days: recent }
//         });
//     } catch (err) {
//         console.error("getStats error:", err);
//         return res.status(500).json({ succes: false, message: "Server error" });

//     }
// }

// //to getAppointment by doctor
// export const getAppointmentsByDoctor = async (req, res) => {
//     try {
//         const { doctorId } = req.params;
//         if (!doctorId) return res.status(400).json({
//             succes: false,
//             message: "Doctor Id required"
//         });
//         const { mobile, status, search = "", limit: limitRaw = 50, page: pageRaw = 1 } = req.query;
//         const limit = Math.min(200, Math.max(1, parseInt(limitRaw, 10) || 50));
//         const page = Math.max(1, parseInt(pageRaw, 10) || 1);
//         const skip = (page - 1) * limit;
//         // filter
//         const filter = { doctorId };
//         if (mobile) filter.mobile = mobile;
//         if (status) filter.status = status;
//         if (search) {
//             const re = new RegExp(search, "i");
//             filter.$or = [{ patientName: re }, { mobile: re }, { notes: re }];
//         }

//         const items = await Appointment.find(filter).sort({ date: 1, time: 1 }).skip(skip).limit(limit)
//             .populate("doctorId", "naem specialization owner imageUrl image").lean();

//         const total = await Appointment.countDocuments(filter);
//         return res.json({
//             success: true,
//             appointment: items,
//             meta: { page, limit, total, count: items.length }
//         });
//     }
//     catch (err) {
//         console.error("getAppointmentsByDoctor error:", err);
//         return res.status(500).json({ success: false, message: "Server error" });
//     }
// }

// // to get Register user count
// export async function getResisteredUserCount(req, res) {
//     try {
//         const totalUsers = await clerkClient.users.getCount();
//         return res.json({ success: true, totalUsers });
//     }
//     catch (err) {
//         console.error("getResisteredUserCount error:", err);
//         return res.status(500).json({ success: false, message: "Server error" });
//     }
// }


// export default {
//     getAppointments,
//     getAppointmentsByPatient,
//     createAppointement,
//     confirmPayment,
//     updateAppointment,
//     cancleAppointment,
//     getStats,
//     getAppointmentsByDoctor,
//     getResisteredUserCount
// };



import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import dotenv from 'dotenv';
import Stripe from "stripe";
import { getAuth } from "@clerk/express";
import { clerkClient } from "@clerk/clerk-sdk-node";
dotenv.config();

const STRIPE_KEY = process.env.STRIPE_SECERET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL;
const MAJOR_ADMIN_ID = process.env.MAJOR_ADMIN_ID || null;
const stripe = STRIPE_KEY ? new Stripe(STRIPE_KEY, { apiVersion: "2023-10-16" }) : null;

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

const safeNumber = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
};

const buildFrontendBase = (req) => {
    if (FRONTEND_URL) return FRONTEND_URL.replace(/\/$/, "");
    const origin = req.get("origin") || req.get("referer");
    if (origin) return origin.replace(/\/$/, "");
    const host = req.get("host");
    if (host) return `${req.protocol || "http"}://${host}`.replace(/\/$/, "");
    return null;
};

// ✅ KEY FIX: Handles BOTH old Clerk (req.auth object) and new Clerk (req.auth() function)
function getClerkUserId(req) {
    try {
        // New Clerk SDK — req.auth is a function
        if (typeof req.auth === "function") {
            const auth = req.auth();
            if (auth?.userId) return auth.userId;
        }
        // Old Clerk SDK — req.auth is an object
        if (req.auth && typeof req.auth === "object") {
            if (req.auth.userId) return req.auth.userId;
            if (req.auth.user_id) return req.auth.user_id;
            if (req.auth.user?.id) return req.auth.user.id;
        }
        // Fallback: getAuth from @clerk/express
        try {
            const serverAuth = getAuth(req);
            if (serverAuth?.userId) return serverAuth.userId;
        } catch (_) { /* ignore */ }
        // Last resort
        if (req.user?.id) return req.user.id;
        return null;
    } catch (e) {
        console.error("getClerkUserId error:", e?.message);
        return null;
    }
}

// ─────────────────────────────────────────────
// ONE-TIME DB FIX — patches old appointments that have no createdBy
// STEP 1: Add route in appointmentRouter.js:
//   appointementRouter.get("/fix-missing-createdby", fixMissingCreatedBy);
// STEP 2: Visit in browser:
//   http://localhost:4000/api/appointments/fix-missing-createdby?clerkId=user_39JC8he9bti3xcLCl2dZuFTUXoU
// STEP 3: Delete the route and this export after running once
// ─────────────────────────────────────────────
export const fixMissingCreatedBy = async (req, res) => {
    try {
        const { clerkId } = req.query;
        if (!clerkId) {
            return res.status(400).json({
                success: false,
                message: "Pass ?clerkId=user_xxxxx in the query string. Your ID is shown in server logs.",
            });
        }
        const result = await Appointment.updateMany(
            {
                $or: [
                    { createdBy: { $exists: false } },
                    { createdBy: null },
                    { createdBy: "" },
                ],
            },
            { $set: { createdBy: clerkId } }
        );
        return res.json({
            success: true,
            message: `✅ Patched ${result.modifiedCount} appointments with createdBy = "${clerkId}". You can now delete this route.`,
            modifiedCount: result.modifiedCount,
        });
    } catch (err) {
        console.error("fixMissingCreatedBy error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ─────────────────────────────────────────────
// GET ALL APPOINTMENTS (admin / filtered)
// ─────────────────────────────────────────────

export const getAppointments = async (req, res) => {
    try {
        const {
            doctorId, mobile, status,
            search = "",
            limit: limitRaw = 50,
            page: pageRaw = 1,
            patientClerkId,
            createdBy,
        } = req.query;

        const limit = Math.min(200, Math.max(1, parseInt(limitRaw, 10) || 50));
        const page = Math.max(1, parseInt(pageRaw, 10) || 1);
        const skip = (page - 1) * limit;

        const filter = {};
        if (doctorId) filter.doctorId = doctorId;
        if (mobile) filter.mobile = mobile;
        if (status) filter.status = status;
        if (patientClerkId) filter.createdBy = patientClerkId;
        if (createdBy) filter.createdBy = createdBy;
        if (search) {
            const re = new RegExp(search, "i");
            filter.$or = [{ patientName: re }, { mobile: re }, { notes: re }];
        }

        const items = await Appointment.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("doctorId", "name specialization owner imageUrl image")
            .lean();

        const total = await Appointment.countDocuments(filter);

        return res.json({
            success: true,
            appointments: items,
            meta: { page, limit, total, count: items.length },
        });
    } catch (err) {
        console.error("getAppointments error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ─────────────────────────────────────────────
// GET APPOINTMENTS FOR LOGGED-IN PATIENT  ← MAIN FIX
// ─────────────────────────────────────────────

export const getAppointmentsByPatient = async (req, res) => {
    try {
        // ✅ FIX: use safe helper that supports both old and new Clerk SDK
        const clerkUserId = getClerkUserId(req);
        const queryCreatedBy = req.query.createdBy || null;
        const resolvedCreatedBy = queryCreatedBy || clerkUserId || null;

        console.log("=== /me DEBUG ===");
        console.log("clerkUserId:", clerkUserId);
        console.log("resolvedCreatedBy:", resolvedCreatedBy);

        if (!resolvedCreatedBy && !req.query.mobile) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        // ✅ FIX: filter + query is OUTSIDE the if-block so it runs
        const filter = {};
        if (resolvedCreatedBy) filter.createdBy = resolvedCreatedBy;
        if (req.query.mobile) filter.mobile = req.query.mobile;

        console.log("DB filter:", JSON.stringify(filter));

        const appointments = await Appointment.find(filter)
            .sort({ createdAt: -1 })
            .populate("doctorId", "name specialization imageUrl image experience")
            .lean();

        console.log(`Found ${appointments.length} appointments for ${resolvedCreatedBy}`);

        // If still empty, log a sample to diagnose
        if (appointments.length === 0) {
            const sample = await Appointment.find({})
                .select("createdBy patientName status fees")
                .limit(5)
                .lean();
            console.log("Sample DB docs:", JSON.stringify(sample, null, 2));
            console.log(`👆 If createdBy is null/missing, visit:`);
            console.log(`   http://localhost:4000/api/appointments/fix-missing-createdby?clerkId=${resolvedCreatedBy}`);
        }

        res.set("Cache-Control", "no-store");
        return res.json({ success: true, appointments });
    } catch (err) {
        console.error("getAppointmentsByPatient error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ─────────────────────────────────────────────
// CREATE APPOINTMENT
// ─────────────────────────────────────────────

export const createAppointement = async (req, res) => {
    try {
        const {
            doctorId, patientName, mobile,
            age = "", gender = "",
            date, time,
            fee, fees,
            notes = "", email,
            paymentMethod,
            owner: ownerFromBody = null,
            doctorName: doctorNameFromBody,
            speciality: specialityFromBody,
            doctorImageUrl: doctorImageUrlFromBody,
            doctorImagePublicId: doctorImagePublicIdFromBody,
        } = req.body || {};

        const clerkUserId = getClerkUserId(req); // ✅ safe helper
        if (!clerkUserId)
            return res.status(401).json({ success: false, message: "Authentication is required." });

        if (!doctorId || !patientName || !mobile || !date || !time)
            return res.status(400).json({ success: false, message: "All fields are required." });

        const numericFee = safeNumber(fee ?? fees ?? 0);
        if (numericFee === null)
            return res.status(400).json({ success: false, message: "Fee must be a valid number." });

        // Duplicate booking prevention
        const existingBooking = await Appointment.findOne({
            doctorId,
            createdBy: clerkUserId,
            date: String(date),
            time: String(time),
            status: { $ne: "Canceled" },
        }).lean();

        if (existingBooking)
            return res.status(409).json({
                success: false,
                message: "You already have an appointment with this doctor at the selected slot.",
            });

        let doctor = null;
        try {
            doctor = await Doctor.findById(doctorId).lean();
        } catch (e) {
            console.warn("Doctor lookup failed:", e?.message || e);
        }
        if (!doctor)
            return res.status(404).json({ success: false, message: "Doctor not found." });

        const resolvedOwner = ownerFromBody || doctor.owner || MAJOR_ADMIN_ID || String(doctorId);

        const doctorName =
            (doctor.name && String(doctor.name).trim()) ||
            (doctorNameFromBody && String(doctorNameFromBody).trim()) || "";

        const speciality =
            (doctor.specialization && String(doctor.specialization).trim()) ||
            (doctor.speciality && String(doctor.speciality).trim()) ||
            (specialityFromBody && String(specialityFromBody).trim()) || "";

        const doctorImageUrl =
            (doctor.imageUrl && String(doctor.imageUrl).trim()) ||
            (doctor.image && String(doctor.image).trim()) ||
            (doctor.avatarUrl && String(doctor.avatarUrl).trim()) ||
            (doctor.profileImage?.url && String(doctor.profileImage.url).trim()) ||
            (doctorImageUrlFromBody && String(doctorImageUrlFromBody).trim()) || "";

        const doctorImagePublicId =
            (doctor.imagePublicId && String(doctor.imagePublicId).trim()) ||
            (doctor.profileImage?.publicId && String(doctor.profileImage.publicId).trim()) ||
            (doctorImagePublicIdFromBody && String(doctorImagePublicIdFromBody).trim()) || "";

        const base = {
            doctorId: String(doctor._id || doctorId),
            doctorName,
            speciality,
            doctorImage: { url: doctorImageUrl, publicId: doctorImagePublicId },
            patientName: String(patientName).trim(),
            mobile: String(mobile).trim(),
            age: age ? Number(age) : undefined,
            gender: gender ? String(gender) : "",
            date: String(date),
            time: String(time),
            fees: numericFee,
            status: "Pending",
            payment: {
                method: paymentMethod === "Cash" ? "Cash" : "Online",
                status: "Pending",
                amount: numericFee,
            },
            notes: notes || "",
            createdBy: clerkUserId, // ✅ always saved so /me can find it
            owner: resolvedOwner,
            sessionId: null,
        };

        // Free appointment
        if (numericFee === 0) {
            const created = await Appointment.create({
                ...base,
                status: "Confirmed",
                payment: { method: base.payment.method, status: "Paid", amount: 0 },
                paidAt: new Date(),
            });
            return res.status(201).json({ success: true, appointment: created, checkoutUrl: null });
        }

        // Cash payment
        if (paymentMethod === "Cash") {
            const created = await Appointment.create({
                ...base,
                status: "Pending",
                payment: { method: "Cash", status: "Pending", amount: numericFee },
            });
            return res.status(201).json({ success: true, appointment: created, checkoutUrl: null });
        }

        // Online: Stripe
        if (!stripe)
            return res.status(500).json({ success: false, message: "Stripe not configured on server." });

        const frontBase = buildFrontendBase(req);
        if (!frontBase)
            return res.status(500).json({
                success: false,
                message: "Frontend URL could not be determined. Set FRONTEND_URL or send Origin header.",
            });

        const successUrl = `${frontBase}/appointment/success?session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${frontBase}/appointment/cancel`;

        let session;
        try {
            session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                customer_email: email || undefined,
                line_items: [{
                    price_data: {
                        currency: "inr",
                        product_data: { name: `Appointment - ${String(patientName).slice(0, 40)}` },
                        unit_amount: Math.round(numericFee * 100),
                    },
                    quantity: 1,
                }],
                success_url: successUrl,
                cancel_url: cancelUrl,
                metadata: {
                    doctorId: String(doctorId),
                    doctorName: doctorName || "",
                    speciality: speciality || "",
                    patientName: base.patientName,
                    mobile: base.mobile,
                    clerkUserId: clerkUserId || "",
                },
            });
        } catch (stripeErr) {
            console.error("Stripe create session error:", stripeErr);
            const message = stripeErr?.raw?.message || stripeErr?.message || "Stripe error";
            return res.status(502).json({ success: false, message: `Payment provider error: ${message}` });
        }

        try {
            const created = await Appointment.create({
                ...base,
                sessionId: session.id,
                payment: {
                    ...base.payment,
                    providerId: session.payment_intent || session.paymentIntent || null,
                },
                status: "Pending",
            });
            return res.status(201).json({
                success: true,
                appointment: created,
                checkoutUrl: session.url || null,
            });
        } catch (dbErr) {
            console.error("DB error saving appointment after stripe session:", dbErr);
            return res.status(500).json({ success: false, message: "Failed to create appointment record." });
        }
    } catch (err) {
        console.error("createAppointment unexpected error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ─────────────────────────────────────────────
// CONFIRM STRIPE PAYMENT
// ─────────────────────────────────────────────

export const confirmPayment = async (req, res) => {
    try {
        const { session_id } = req.query;
        if (!session_id)
            return res.status(400).json({ success: false, message: "Session ID is required." });

        if (!stripe)
            return res.status(500).json({ success: false, message: "Stripe is not configured." });

        let session;
        try {
            session = await stripe.checkout.sessions.retrieve(session_id);
        } catch (stripeErr) {
            console.error("Stripe retrieve session error:", stripeErr);
            return res.status(404).json({ success: false, message: "Stripe session not found." });
        }

        if (!session)
            return res.status(404).json({ success: false, message: "Invalid session." });

        if (session.payment_status !== "paid")
            return res.status(402).json({ success: false, message: "Payment not completed." });

        // Match by sessionId
        let appt = await Appointment.findOneAndUpdate(
            { sessionId: session_id },
            {
                "payment.status": "Paid",
                "payment.providerId": session.payment_intent || null,
                status: "Confirmed",
                paidAt: new Date(),
            },
            { new: true }
        );

        // Fallback: metadata
        if (!appt) {
            const meta = session.metadata || {};
            if (meta.doctorId && meta.mobile && meta.patientName) {
                appt = await Appointment.findOneAndUpdate(
                    {
                        doctorId: meta.doctorId,
                        mobile: meta.mobile,
                        patientName: meta.patientName,
                        fees: Math.round((session.amount_total || 0) / 100) || undefined,
                    },
                    {
                        "payment.status": "Paid",
                        "payment.providerId": session.payment_intent || null,
                        status: "Confirmed",
                        paidAt: new Date(),
                        sessionId: session_id,
                    },
                    { new: true }
                );
            }
        }

        // Last attempt
        if (!appt) {
            const amount = Math.round((session.amount_total || 0) / 100);
            const fifteenAgo = new Date(Date.now() - 1000 * 60 * 15);
            appt = await Appointment.findOneAndUpdate(
                { fees: amount, createdAt: { $gte: fifteenAgo } },
                {
                    "payment.status": "Paid",
                    "payment.providerId": session.payment_intent || null,
                    status: "Confirmed",
                    paidAt: new Date(),
                    sessionId: session_id,
                },
                { new: true }
            );
        }

        if (!appt)
            return res.status(404).json({
                success: false,
                message: "Appointment not found for this payment session.",
            });

        return res.json({ success: true, appointment: appt });
    } catch (err) {
        console.error("confirmPayment error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ─────────────────────────────────────────────
// UPDATE APPOINTMENT
// ─────────────────────────────────────────────

export const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body || {}; // ✅ FIX: was res.body

        const appt = await Appointment.findById(id);
        if (!appt)
            return res.status(404).json({ success: false, message: "Appointment not found." });

        const terminal = appt.status === "Completed" || appt.status === "Canceled";

        if (terminal && body.status && body.status !== appt.status)
            return res.status(400).json({
                success: false,
                message: "Cannot change status of a completed/canceled appointment.",
            });

        const update = {};
        if (body.status) update.status = body.status;
        if (body.notes !== undefined) update.notes = body.notes;

        if (body.date && body.time) {
            if (terminal)
                return res.status(400).json({
                    success: false,
                    message: "Cannot reschedule a completed/canceled appointment.",
                });
            update.date = body.date;
            update.time = body.time;
            update.status = "Rescheduled";
            update.rescheduledTo = { date: body.date, time: body.time };
        }

        const updated = await Appointment.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true,
        })
            .populate({ path: "doctorId", select: "name imageUrl" })
            .lean();

        return res.json({ success: true, appointment: updated });
    } catch (err) {
        console.error("updateAppointment error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ─────────────────────────────────────────────
// CANCEL APPOINTMENT
// ─────────────────────────────────────────────

export const cancleAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appt = await Appointment.findById(id);

        if (!appt)
            return res.status(404).json({ success: false, message: "Appointment not found." });

        if (appt.status === "Completed")
            return res.status(400).json({
                success: false,
                message: "Cannot cancel a completed appointment.",
            });

        appt.status = "Canceled"; // ✅ FIX: was appt.staus
        await appt.save();

        return res.json({ success: true, appointment: appt }); // ✅ FIX: was returnres + succes
    } catch (err) {
        console.error("cancelAppointment error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ─────────────────────────────────────────────
// GET STATS
// ─────────────────────────────────────────────

export const getStats = async (req, res) => {
    try {
        const total = await Appointment.countDocuments();

        const paidAgg = await Appointment.aggregate([
            { $match: { "payment.status": "Paid" } },
            { $group: { _id: null, total: { $sum: "$fees" } } },
        ]);
        const revenue = (paidAgg[0] && paidAgg[0].total) || 0;

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recent = await Appointment.countDocuments({
            createdAt: { $gte: sevenDaysAgo }, // ✅ FIX: was createAt
        });

        return res.json({
            success: true,
            stats: { total, revenue, recentLast7Days: recent },
        });
    } catch (err) {
        console.error("getStats error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ─────────────────────────────────────────────
// GET APPOINTMENTS BY DOCTOR
// ─────────────────────────────────────────────

export const getAppointmentsByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        if (!doctorId)
            return res.status(400).json({ success: false, message: "Doctor ID required." });

        const {
            mobile, status,
            search = "",
            limit: limitRaw = 50,
            page: pageRaw = 1,
        } = req.query;

        const limit = Math.min(200, Math.max(1, parseInt(limitRaw, 10) || 50));
        const page = Math.max(1, parseInt(pageRaw, 10) || 1);
        const skip = (page - 1) * limit;

        const filter = { doctorId };
        if (mobile) filter.mobile = mobile;
        if (status) filter.status = status;
        if (search) {
            const re = new RegExp(search, "i");
            filter.$or = [{ patientName: re }, { mobile: re }, { notes: re }];
        }

        const items = await Appointment.find(filter)
            .sort({ date: 1, time: 1 })
            .skip(skip)
            .limit(limit)
            .populate("doctorId", "name specialization owner imageUrl image") // ✅ FIX: was "naem"
            .lean();

        const total = await Appointment.countDocuments(filter);

        return res.json({
            success: true,
            appointments: items,
            meta: { page, limit, total, count: items.length },
        });
    } catch (err) {
        console.error("getAppointmentsByDoctor error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ─────────────────────────────────────────────
// GET REGISTERED USER COUNT
// ─────────────────────────────────────────────

export async function getResisteredUserCount(req, res) {
    try {
        const totalUsers = await clerkClient.users.getCount();
        return res.json({ success: true, totalUsers });
    } catch (err) {
        console.error("getRegisteredUserCount error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

export default {
    getAppointments,
    getAppointmentsByPatient,
    createAppointement,
    confirmPayment,
    updateAppointment,
    cancleAppointment,
    getStats,
    getAppointmentsByDoctor,
    getResisteredUserCount,
    fixMissingCreatedBy,
};