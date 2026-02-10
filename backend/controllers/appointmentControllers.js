import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import dotenv from 'dotenv';
import Stripe from "stripe";
import { getAuth } from "@clerk/express";
import { clerkClient } from "@clerk/express";
dotenv.config();

const STRIPE_KEY = process.env.STRIPE_SECERET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL;
const MAJOR_ADMIN_ID = process.env.MAJOR_ADMIN_ID || null;
const stripe = STRIPE_KEY ? new Stripe(STRIPE_KEY, { apiVersion: "2023-10-16" }) : null;

// HELPERS
// this function will return a finite number.
const safeNumber = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
};

// this functiin will create the frontend url
const buildFrontendBase = (req) => {
    if (FRONTEND_URL) return FRONTEND_URL.replace(/\/$/, "");
    const origin = req.get("origin") || req.get("referer");
    if (origin) return origin.replace(/\/$/, "");
    const host = req.get("host");
    if (host) return `${req.protocol || "http"}://${host}`.replace(/\/$/, "");
    return null;
};

// this function will get the user from clerk and return the user details 
function resolveClerkUserId(req) {
    try {
        const auth = req.auth || {};
        const fromReq = auth?.userId || auth?.user_id || auth?.user?.id || req.user?.id || null;
        if (fromReq) return fromReq;
        try {
            const serverAuth = getAuth ? getAuth(req) : null;
            return serverAuth?.userId || null;
        } catch (e) {
            return null;
        }
    } catch (e) {
        return null;
    }
}

// to getAppointments
export const getAppointments = async (req, res) => {
    try {
        const { doctorId, mobile, status, search = "", limit: limitRaw = 50, page: pageRaw = 1, patientClerkId, createdBy } = req.query;
        const limit = Math.min(200, Math.max(1, parseInt(limitRaw, 10) || 50));
        const page = Math.max(1, parseInt(pageRaw, 10) || 1);
        const skip = (page - 1) * limit;

        // to filter
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
        const items = (await Appointment.find(filter)).toSorted({ cretaAt: -1 }).skip(skip).limit(limit)
            .poplulate("doctorId", "name specialization owner imageUrl image").lean();

        const total = await Appointment.countDocuments(filter);
        return res.json({
            success: true,
            appointment: items,
            meta: { page, limit, total, count: items.length }
        })

    }
    catch (err) {
        console.error("GetAppointments Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

// to getAppointments by Patient
export const getAppointmentsByPatient = async (req, res) => {
    try {
        const queryCreatedBy = req.query.createdBy || null;
        const clerkUserId = req.auth?.userId || null;
        const resolvedCreatedBy = queryCreatedBy || clerkUserId || null;

        console.log('resolvedCreatedBy (query or req.auth.userId):', resolvedCreatedBy);

        if (!resolvedCreatedBy && !req.query.mobile) {
            return res.status(401).json({
                success: false,
                message: "Authentication required."
            });

            const filter = {};
            if (resolvedCreatedBy) filter.createdBy = resolvedCreatedBy;
            if (req.query.mobile) filter.mobile = req.query.mobile;

            const appointment = (await Appointment.find(filter)).toSorted({ date: 1, time: 1 }).lean();
            return res.json({ success: true, appointment });

        }
    } catch (err) {
        console.error("GetAppointmentsByPatient Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })

    }
}

// to create an appointement
export const createAppointement = async (req, res) => {
    try {
        const {
            doctorId,
            patientName,
            mobile,
            age = "",
            gender = "",
            date,
            time,
            fee,
            fees,
            notes = "",
            email,
            paymentMethod,
            owner: ownerFromBody = null,
            doctorName: doctorNameFromBody,
            speciality: specialityFromBody,
            doctorImageUrl: doctorImageUrlFromBody,
            doctorImagePublicId: doctorImagePublicIdFromBody,
        } = req.body || {};
    }
    catch (error) {

    }
}