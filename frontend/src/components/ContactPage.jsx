import React, { useState } from 'react'
import { contactPageStyles } from '../assets/dummyStyles';


const initial = {
  name: "",
  email: "",
  phone: "",
  department: "",
  service: "",
  message: "",
};

const [form, setForm] = useState(initial);
const [errors, setErrors] = useState({});
const [sent, setSent] = useState(false);

const departments = [
  "General Physician",
  "Cardiology",
  "Orthopedics",
  "Dermatology",
  "Pediatrics",
  "Gynecology",
];

const servicesMapping = {
  "General Physician": [
    "General Consultation",
    "Adult Checkup",
    "Vaccination",
    "Health Screening",
  ],
  Cardiology: [
    "ECG",
    "Echocardiography",
    "Stress Test",
    "Heart Consultation",
  ],
  Orthopedics: ["Fracture Care", "Joint Pain Consultation", "Physiotherapy"],
  Dermatology: ["Skin Consultation", "Allergy Test", "Acne Treatment"],
  Pediatrics: ["Child Checkup", "Vaccination (Child)", "Growth Monitoring"],
  Gynecology: ["Antenatal Care", "Pap Smear", "Ultrasound"],
};

const genericServices = [
  "General Consultation",
  "ECG",
  "Blood Test",
  "X-Ray",
  "Ultrasound",
  "Physiotherapy",
  "Vaccination",
];

function validate() {
  const e = {};
  if (!form.name.trim()) e.name = "Full name is required";
  if (!form.email.trim()) e.email = "Email is required";
  else if (!/^\S+@\S+\.\S+$/.test(form.email))
    e.email = "Enter a valid email";
  if (!form.phone.trim()) e.phone = "Phone number is required";
  else if (!/^[0-9]{10}$/.test(form.phone))
    e.phone = "Phone number must be exactly 10 digits";

  if (!form.department && !form.service) {
    e.department = "Please choose a department or service";
    e.service = "Please choose a department or service";
  }

  if (!form.message.trim()) e.message = "Please write a short message";
  setErrors(e);
  return Object.keys(e).length === 0;
}

function handleChange(e) {
  const { name, value } = e.target;
  if (name === "department") {
    setForm((prev) => ({ ...prev, department: value, service: "" }));
  } else {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  setErrors((prev) => ({ ...prev, [name]: undefined }));

  if (name === "department" || name === "service") {
    setErrors((prev) => {
      const copy = { ...prev };
      if (
        (name === "department" && value) ||
        (name === "service" && value) ||
        form.department ||
        form.service
      ) {
        delete copy.department;
        delete copy.service;
      }
      return copy;
    });
  }
}

function handleSubmit(e) {
  e.preventDefault();
  if (!validate()) return;

  const text = `*Contact Request*\nName: ${form.name}\nEmail: ${form.email
    }\nPhone: ${form.phone}\nDepartment: ${form.department || "N/A"
    }\nService: ${form.service || "N/A"}\nMessage: ${form.message}`;

  const url = `https://wa.me/8299431275?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");

  setForm(initial);
  setErrors({});
  setSent(true);
  setTimeout(() => setSent(false), 4000);
}

const availableServices = form.department
  ? servicesMapping[form.department] || []
  : genericServices;

const ContactPage = () => {
  return (
    <div>

    </div>
  )
}

export default ContactPage
