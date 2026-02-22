import React, { useEffect, useState } from 'react'
import { homeDoctorsStyles, iconSize } from '../assets/dummyStyles'
import { Section } from 'lucide-react';

const HomeDoctors = ({ previewCount = 8 }) => {
    const API_BASE = 'http://localhost:4000';
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // to fetch doctors from the server side

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            setError("");
            try {
                const res = await fetch(`${API_BASE}/api/doctors`);
                const json = await res.json().catch(() => null);

                if (!res.ok) {
                    const msg =
                        (json && json.message) || `Failed to load doctors (${res.status})`;
                    if (!mounted) return;
                    setError(msg);
                    setDoctors([]);
                    setLoading(false);
                    return;
                }
                const items = (json && (json.data || json)) || [];
                const normalized = (Array.isArray(items) ? items : []).map((d) => {
                    const id = d._id || d.id;
                    const image =
                        d.imageUrl || d.image || d.imageSmall || d.imageSrc || "";
                    const available =
                        (typeof d.availability === "string"
                            ? d.availability.toLowerCase() === "available"
                            : typeof d.available === "boolean"
                                ? d.available
                                : d.availability === true) || d.availability === "Available";
                    return {
                        id,
                        name: d.name || "Unknown",
                        specialization: d.specialization || "",
                        image,
                        experience:
                            d.experience || d.experience === 0 ? String(d.experience) : "",
                        fee: d.fee ?? d.price ?? 0,
                        available,
                        raw: d,
                    };
                });

                if (!mounted) return;
                setDoctors(normalized);
            }
            catch (err) {
                if (!mounted) return;
                console.error("load doctors error:", err);
                setError("Network error while loading doctors.");
                setDoctors([]);
            }
            finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => {
            mounted = false;
        };
    }, [API_BASE]);

    const preview = doctors.slice(0, previewCount);

    return (
        <Section className={homeDoctorsStyles.section}>
            <div className={homeDoctorsStyles.container}>
                <div className={homeDoctorsStyles.header}>
                    <h1 className={homeDoctorsStyles.title}>
                        Our{" "}
                        <span className={homeDoctorsStyles.titleSpan}>Medical Team</span>
                    </h1>
                    <p className={homeDoctorsStyles.subtitle}>
                        Book appointments quickly with our verified specialists.
                    </p>
                </div>

                {/* error / retry */}
                {error ? (
                    <div className={homeDoctorsStyles.errorContainer}>
                        <div className={homeDoctorsStyles.errorText}>{error}</div>
                        <button
                            onClick={() => {
                                setLoading(true);
                                setError("");
                                (async () => {
                                    try {
                                        const res = await fetch(`${API_BASE}/api/doctors`);
                                        const json = await res.json().catch(() => null);
                                        const items = (json && (json.data || json)) || [];
                                        const normalized = (Array.isArray(items) ? items : []).map(
                                            (d) => {
                                                const id = d._id || d.id;
                                                const image = d.imageUrl || d.image || "";
                                                const available =
                                                    (typeof d.availability === "string"
                                                        ? d.availability.toLowerCase() === "available"
                                                        : typeof d.available === "boolean"
                                                            ? d.available
                                                            : d.availability === true) ||
                                                    d.availability === "Available";
                                                return {
                                                    id,
                                                    name: d.name || "Unknown",
                                                    specialization: d.specialization || "",
                                                    image,
                                                    experience: d.experience || "",
                                                    fee: d.fee ?? d.price ?? 0,
                                                    available,
                                                    raw: d,
                                                };
                                            },
                                        );
                                        setDoctors(normalized);
                                        setError("");
                                    } catch (err) {
                                        console.error(err);
                                        setError("Network error while loading doctors.");
                                        setDoctors([]);
                                    } finally {
                                        setLoading(false);
                                    }
                                })();
                            }}
                            className={homeDoctorsStyles.retryButton}
                        >
                            Retry
                        </button>
                    </div>
                ) : null}  {/*SO HERE IT WILL RE FETCH THE API TO GET RESPONSE*/}

                {loading ? (
                    <div className={homeDoctorsStyles.skeletonGrid}>

                    </div>
                )}

            </div>

        </Section>
    )
}

export default HomeDoctors
