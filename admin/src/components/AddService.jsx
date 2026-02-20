import React, { useRef, useState } from 'react'
import { addServiceStyles } from '../assets/dummyStyles'

const AddService = ({ serviceId }) => {
    const API_BASE = "http://localhost:4000";

    const fileRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [hasExistingImage, setHasExistingImage] = useState(false);
    const [removeImage, setRemoveImage] = useState(false);

    const [serviceName, setServiceName] = useState("");
    const [about, setAbout] = useState("");
    const [price, setPrice] = useState("");
    const [availability, setAvailability] = useState("available");

    const [instructions, setInstructions] = useState([""]);
    const [slots, setSlots] = useState([]);

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();

    const years = Array.from({ length: 5 }).map((_, i) => currentYear + i);
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const hours = Array.from({ length: 12 }).map((_, i) =>
        String(i + 1).padStart(2, "0")
    );
    const minutes = Array.from({ length: 12 }).map((_, i) =>
        String(i * 5).padStart(2, "0")
    );
    const ampm = ["AM", "PM"];

    const [slotDay, setSlotDay] = useState(String(currentDate));
    const [slotMonth, setSlotMonth] = useState(String(currentMonth));
    const [slotYear, setSlotYear] = useState(String(currentYear));
    const [slotHour, setSlotHour] = useState("11");
    const [slotMinute, setSlotMinute] = useState("00");
    const [slotAmPm, setSlotAmPm] = useState("AM");

    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState(null);
    const [errors, setErrors] = useState({});

    const selectedYearNum = Number(slotYear);
    const selectedMonthNum = Number(slotMonth);
    const daysInSelectedMonth = new Date(
        selectedYearNum,
        selectedMonthNum + 1,
        0
    ).getDate();
    const days = Array.from({ length: daysInSelectedMonth }).map((_, i) =>
        String(i + 1)
    );

    useEffect(() => {
        if (Number(slotDay) > daysInSelectedMonth) {
            setSlotDay(String(daysInSelectedMonth));
        }
    }, [slotMonth, slotYear, daysInSelectedMonth]);

    return (
        <div>

        </div>
    )
}

export default AddService
