"use client"
import React, { useState, useRef } from 'react';
import { Heading3, RichParagraph, SpanTag, SecondaryButton } from '../Common/Common';
import { ShowerHead, Armchair } from "lucide-react"

const OPTIONS = {
    use_case: [
        { value: 'solo', label: 'Solo / Couple', icon: '🧑‍🚀', desc: 'Layouts optimized for 1-2 travelers' },
        { value: 'family', label: 'Family Trip', icon: '👨‍👩‍👧‍👦', desc: 'Spacious builds for families' },
        { value: 'adventure', label: 'Extreme Adventure', icon: '🏔️', desc: 'Built for tough off-grid terrains' },
        { value: 'business', label: 'Business / Commercial', icon: '💼', desc: 'Mobile offices & utility work spaces' },
    ],
    bathroom_type: [
        { value: 'full_aluminum', label: 'Full Aluminum', desc: 'Heavy-duty engineered full aluminum enclosure' },
        { value: 'full_acrylic', label: 'Full Acrylic', desc: 'Sleek, modern water-tight acrylic finish' },
        { value: 'full_real_tile', label: 'Full Real Tile', desc: 'Premium, high-end residential luxury tilework' },
        { value: 'rear_shower', label: 'Rear Shower', desc: 'Outdoor/rear door wash down system' },
        { value: 'shower_in_a_bench', label: 'Shower in a Bench', desc: 'Space-saving flip-top hidden bench shower' },
        { value: 'folding_shower', label: 'Folding Shower', desc: 'Collapsible integrated stow-away footprint' },
        { value: 'rear_bathroom', label: 'Rear Bathroom', desc: 'Dedicated layout partitioned at the back' }
    ],
    vehicle_chassis: [
        { value: 'sprinter', label: 'Mercedes Sprinter', desc: 'Premium precision chassis setup' },
        { value: 'transit', label: 'Ford Transit', desc: 'High serviceability & capable AWD options' },
        { value: 'no_preference', label: 'No Preference', desc: 'Prioritize layout build specifications' }
    ],
    wheelbase: [
        { value: '144', label: '144" Wheelbase', desc: 'Compact, agile, fits standard parking spots' },
        { value: '170', label: '170" Wheelbase', desc: 'Extended platform maximum interior space' },
        { value: '148', label: '148" Wheelbase', desc: 'Standard highly versatile length footprint' },
        { value: '130', label: '130" Wheelbase', desc: 'Ultra-compact nimble custom build setup' },
        { value: 'no_preference', label: 'No Preference', desc: 'Open to any chassis build length standard' }
    ],
    style: [
        { value: 'luxury', label: 'Luxury', desc: 'Sleek, high-end, premium material look' },
        { value: 'rugged', label: 'Rugged / 4x4', desc: 'Heavy duty, built for tough terrains' },
        { value: 'minimal', label: 'Minimalist', desc: 'Clean, efficient space saving' }
    ],
    priority: [
        { value: 'comfort', label: 'Comfort & Climate', desc: 'AC, robust heaters, premium insulation' },
        { value: 'adventure', label: 'Off-Grid Power', desc: 'Solar arrays, massive lithium systems' },
        { value: 'space', label: 'Storage & Garage', desc: 'Large gear moto-garage, smart cabinets' }
    ],
};

const STEP_LABELS = ['Travel Vibe', 'Seating Capacity', 'Amenities Funnel', 'Platform & Aesthetic'];

export default function VanRecommendation() {
    const [formData, setFormData] = useState({
        use_case: 'solo',
        seats_required: 2,
        bathroom_required: false,
        bathroom_type: '',
        vehicle_chassis: 'no_preference',
        wheelbase: 'no_preference',
        style: 'luxury',
        priority: 'comfort',
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [recommendation, setRecommendation] = useState(null);
    const [error, setError] = useState('');
    const resultsRef = useRef(null);
    const totalSteps = 4;

    const handleInputChange = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

    const handleCounter = (key, type) => {
        setFormData((prev) => {
            const newVal = type === 'inc' ? prev[key] + 1 : Math.max(1, prev[key] - 1);
            return { ...prev, [key]: newVal };
        });
    };

    const handleNext = () => { if (currentStep < totalSteps) setCurrentStep(currentStep + 1); };
    const handlePrev = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/recommend`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.success) {
                setRecommendation(data);
                setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 150);
            } else {
                setError(data.message || 'No matching configurations found.');
            }
        } catch (err) {
            setError('Something went wrong. Please check your backend connection.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setRecommendation(null);
        setCurrentStep(1);
        setFormData({
            use_case: 'solo',
            seats_required: 2,
            bathroom_required: false,
            bathroom_type: '',
            vehicle_chassis: 'no_preference',
            wheelbase: 'no_preference',
            style: 'luxury',
            priority: 'comfort'
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="w-full max-w-6xl mx-auto md:px-4 py-12" style={{ fontFamily: 'var(--font-heading)' }}>

            {/* ===== FORM CARD ===== */}
            <div className="overflow-hidden shadow-2xl mb-12 bg-primary rounded-lg">

                {/* Header Strip */}
                <div className="px-4 pt-8 pb-6 border-b">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <SpanTag text="BBV Matchmaker Engine" className="mb-1" />
                            <Heading3 text='Find Your Perfect Build' className='text-secondary' />
                        </div>
                        <SpanTag text={`${currentStep} / ${totalSteps}`} />
                    </div>

                    {/* Step indicators */}
                    <div className="flex items-center gap-1 mb-5 w-full">
                        {STEP_LABELS.map((label, i) => {
                            const step = i + 1;
                            const isActive = step === currentStep;
                            const isDone = step < currentStep;
                            return (
                                <React.Fragment key={step}>
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`w-6 h-6 rounded-full flex items-center justify-center  font-black transition-all duration-300
                                                ${isActive
                                                    ? 'bg-[#ED985F] text-secondary scale-110 shadow-md shadow-[#ED985F]/20'
                                                    : isDone
                                                        ? 'bg-[#ED985F]/30 text-[#ED985F]'
                                                        : 'bg-secondary/5 text-secondary/30'
                                                }`}
                                        >
                                            {isDone ? '✓' : step}
                                        </div>
                                        <SpanTag
                                            text={label}
                                            className={`!text-[12px] mt-1 hidden md:block transition-colors duration-300
                                                ${isActive ? 'text-hover' : 'text-secondary/30'}`}
                                        />
                                    </div>
                                    {i < STEP_LABELS.length - 1 && (
                                        <div
                                            className={`flex-1 h-px mb-3 transition-colors duration-300
                                                ${isDone ? 'bg-[#ED985F]/40' : 'bg-secondary/5'}`}
                                        />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-0.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                        <div
                            className="h-full transition-all duration-500"
                            style={{ width: `${(currentStep / totalSteps) * 100}%`, backgroundColor: '#ED985F' }}
                        />
                    </div>
                </div>

                {/* Form body */}
                <form onSubmit={handleSubmit} className="px-4 py-8">
                    <div className="min-h-[260px] flex flex-col justify-between">

                        {/* STEP 1: TRAVEL VIBE */}
                        {currentStep === 1 && (
                            <div>
                                <RichParagraph className="font-bold text-secondary tracking-widest uppercase mb-5" inlineStyle={{ color: 'rgba(255,255,255,0.4)' }}>
                                    What is your primary travel vibe?
                                </RichParagraph>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                    {OPTIONS.use_case.map((opt) => {
                                        const active = formData.use_case === opt.value;
                                        return (
                                            <button
                                                key={opt.value}
                                                type="button"
                                                onClick={() => handleInputChange('use_case', opt.value)}
                                                className="p-5 flex flex-col text-left justify-between h-40 transition-all"
                                                style={{
                                                    borderRadius: '6px',
                                                    border: `1px solid ${active ? '#ED985F' : 'rgba(255,255,255,0.08)'}`,
                                                    backgroundColor: active ? 'rgba(237,152,95,0.12)' : 'rgba(255,255,255,0.03)',
                                                }}
                                            >
                                                <SpanTag
                                                    text={opt.icon}
                                                    className="!text-3xl font-normal !text-primary"
                                                />                                                <div>
                                                    <SpanTag text={opt.label} className={`!text-sm font-black uppercase ${active ? '!text-[#ED985F]' : '!text-secondary'}`} />
                                                    <SpanTag text={opt.desc} className="! !text-secondary/30 mt-1" />
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* STEP 2: SEATING CAPACITY */}
                        {currentStep === 2 && (
                            <div className="max-w-md mx-auto text-center w-full">
                                <RichParagraph className=" font-bold tracking-widest uppercase mb-6" inlineStyle={{ color: 'rgba(255,255,255,0.4)' }}>
                                    How many belted seats do you strictly require?
                                </RichParagraph>
                                <div
                                    className="flex items-center justify-between p-6 bg-secondary/5 border border-secondary/10 rounded-lg max-w-sm mx-auto"
                                >
                                    <div className="text-left">
                                        <SpanTag text="Seats Required" className="!text-secondary font-black text-sm tracking-wide" />
                                        <SpanTag text="Number of seatbelts needed" className="!text-secondary/35 " />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button
                                            type="button"
                                            onClick={() => handleCounter('seats_required', 'dec')}
                                            className="w-10 h-10 flex items-center justify-center font-black text-base transition-all"
                                            style={{ borderRadius: '4px', border: '1px solid rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#FBFBF9' }}
                                        >−</button>
                                        <SpanTag
                                            text={formData.seats_required}
                                            className="!text-2xl font-black w-6 text-center"
                                            inlineStyle={{ color: 'var(--color-hover)' }}
                                        />                                        <button
                                            type="button"
                                            onClick={() => handleCounter('seats_required', 'inc')}
                                            className="w-10 h-10 flex items-center justify-center font-black text-base transition-all"
                                            style={{ borderRadius: '4px', border: '1px solid rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#FBFBF9' }}
                                        >+</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: AMENITIES FUNNEL (BATHROOM SELECTION MATRIX) */}
                        {currentStep === 3 && (
                            <div className="space-y-8 max-w-3xl mx-auto w-full">
                                <div>
                                    <RichParagraph className="text-center  font-bold tracking-widest uppercase mb-4" inlineStyle={{ color: 'rgba(255,255,255,0.4)' }}>
                                        Do you need an Indoor Bathroom / Shower Setup?
                                    </RichParagraph>
                                    <div className="flex justify-center gap-4 mb-4">
                                        {[
                                            { val: false, label: 'Not Needed' },
                                            { val: true, label: 'Must Have 🚿' },
                                        ].map(({ val, label }) => {
                                            const active = formData.bathroom_required === val;
                                            return (
                                                <button
                                                    key={String(val)}
                                                    type="button"
                                                    onClick={() => { handleInputChange('bathroom_required', val); if (!val) handleInputChange('bathroom_type', ''); }}
                                                    className="px-6 py-3 font-black  uppercase tracking-wider border rounded-md transition-all w-40"
                                                    style={{
                                                        border: active ? '1px solid #ED985F' : '1px solid rgba(255,255,255,0.1)',
                                                        backgroundColor: active ? 'rgba(237,152,95,0.15)' : 'rgba(255,255,255,0.03)',
                                                        color: active ? '#ED985F' : 'rgba(255,255,255,0.45)',
                                                    }}
                                                >
                                                    {label}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Conditional BBV Bathroom Variant Grid */}
                                    {formData.bathroom_required && (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-6 transition-all duration-300">
                                            {OPTIONS.bathroom_type.map((type) => {
                                                const active = formData.bathroom_type === type.value;
                                                return (
                                                    <div
                                                        key={type.value}
                                                        onClick={() => handleInputChange('bathroom_type', type.value)}
                                                        className="p-3 cursor-pointer border rounded-md transition-all text-left"
                                                        style={{
                                                            border: active ? '1px solid #ED985F' : '1px solid rgba(255,255,255,0.05)',
                                                            backgroundColor: active ? 'rgba(237,152,95,0.08)' : 'transparent',
                                                        }}
                                                    >
                                                        <SpanTag text={type.label} className={`! font-black ${active ? '!text-[#ED985F]' : '!text-secondary'}`} />
                                                        <SpanTag text={type.desc} className="!text-[10px] !text-secondary/30 mt-0.5 leading-tight" />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* STEP 4: CHASSIS, WHEELBASE LENGTH, STYLE & PRIORITY */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <RichParagraph className=" font-bold tracking-widest uppercase mb-3" inlineStyle={{ color: 'rgba(255,255,255,0.4)' }}>
                                            Preferred Vehicle Chassis
                                        </RichParagraph>
                                        <div className="space-y-2">
                                            {OPTIONS.vehicle_chassis.map((opt) => {
                                                const active = formData.vehicle_chassis === opt.value;
                                                return (
                                                    <div
                                                        key={opt.value}
                                                        onClick={() => handleInputChange('vehicle_chassis', opt.value)}
                                                        className="p-3 cursor-pointer border rounded-md transition-all text-left"
                                                        style={{
                                                            border: active ? '1px solid #ED985F' : '1px solid rgba(255,255,255,0.07)',
                                                            backgroundColor: active ? 'rgba(237,152,95,0.1)' : 'rgba(255,255,255,0.02)',
                                                        }}
                                                    >
                                                        <SpanTag text={opt.label} className={`! font-black uppercase ${active ? '!text-[#ED985F]' : '!text-secondary'}`} />
                                                        <SpanTag text={opt.desc} className="!text-[11px] mt-0.5 !text-secondary/30" />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <RichParagraph className=" font-bold tracking-widest uppercase mb-3" inlineStyle={{ color: 'rgba(255,255,255,0.4)' }}>
                                            Target Wheelbase Length
                                        </RichParagraph>
                                        <div className="space-y-2">
                                            {OPTIONS.wheelbase.map((opt) => {
                                                const active = formData.wheelbase === opt.value;
                                                return (
                                                    <div
                                                        key={opt.value}
                                                        onClick={() => handleInputChange('wheelbase', opt.value)}
                                                        className="p-3 cursor-pointer border rounded-md transition-all text-left"
                                                        style={{
                                                            border: active ? '1px solid #ED985F' : '1px solid rgba(255,255,255,0.07)',
                                                            backgroundColor: active ? 'rgba(237,152,95,0.1)' : 'rgba(255,255,255,0.02)',
                                                        }}
                                                    >
                                                        <SpanTag text={opt.label} className={`! font-black uppercase ${active ? '!text-[#ED985F]' : '!text-secondary'}`} />
                                                        <SpanTag text={opt.desc} className="!text-[11px] mt-0.5 !text-secondary/30" />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-secondary/5">
                                    {[
                                        { field: 'style', label: 'Build Style Interior', items: OPTIONS.style },
                                        { field: 'priority', label: 'Top Priority Focus', items: OPTIONS.priority },
                                    ].map(({ field, label, items }) => (
                                        <div key={field}>
                                            <RichParagraph className=" font-bold tracking-widest uppercase mb-3" inlineStyle={{ color: 'rgba(255,255,255,0.4)' }}>
                                                {label}
                                            </RichParagraph>
                                            <div className="space-y-2">
                                                {items.map((opt) => {
                                                    const active = formData[field] === opt.value;
                                                    return (
                                                        <div
                                                            key={opt.value}
                                                            onClick={() => handleInputChange(field, opt.value)}
                                                            className="p-4 cursor-pointer transition-all flex items-center justify-between gap-3"
                                                            style={{
                                                                borderRadius: '6px',
                                                                border: `1px solid ${active ? '#ED985F' : 'rgba(255,255,255,0.07)'}`,
                                                                backgroundColor: active ? 'rgba(237,152,95,0.1)' : 'rgba(255,255,255,0.02)',
                                                            }}
                                                        >
                                                            <div>
                                                                <SpanTag text={opt.label} className={`! font-black tracking-wide uppercase ${active ? '!text-[#ED985F]' : '!text-secondary'}`} />
                                                                <SpanTag text={opt.desc} className="! mt-0.5 !text-secondary/30" />
                                                            </div>
                                                            <div
                                                                className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center transition-all"
                                                                style={{
                                                                    border: `2px solid ${active ? '#ED985F' : 'rgba(255,255,255,0.2)'}`,
                                                                    backgroundColor: active ? '#ED985F' : 'transparent',
                                                                }}
                                                            >
                                                                {active && <div className="w-1.5 h-1.5 rounded-full bg-secondary" />}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Navigation Actions */}
                        <div
                            className="flex items-center justify-between mt-8 pt-6"
                            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                        >
                            <SecondaryButton
                                label="Back"
                                onClick={handlePrev}
                                disabled={currentStep === 1 || loading}
                                type="button"
                            />

                            {currentStep < totalSteps ? (
                                <SecondaryButton
                                    label="Continue →"
                                    onClick={handleNext}
                                    type="button"
                                />
                            ) : (
                                <SecondaryButton
                                    label={loading ? 'BBV Cluster Syncing...' : 'Match Build Architecture →'}
                                    disabled={loading}
                                    type="submit"
                                />
                            )}
                        </div>
                    </div>

                    {error && (
                        <RichParagraph
                            className="mt-4  font-bold text-center p-3 tracking-wide"
                            inlineStyle={{ borderRadius: '6px', backgroundColor: 'rgba(255,59,48,0.1)', color: '#ff6b6b', border: '1px solid rgba(255,59,48,0.2)' }}
                        >
                            {error}
                        </RichParagraph>
                    )}
                </form>
            </div>

            {/* ===== RESULTS ACCORDION ===== */}
            <div ref={resultsRef} id="results-section" className="scroll-mt-6">
                {recommendation && (
                    <div className="space-y-8">

                        <div className="text-center max-w-xl mx-auto">
                            <RichParagraph className=" font-bold tracking-widest uppercase mb-2" inlineStyle={{ color: '#ED985F' }}>
                                Matching Sequence Complete
                            </RichParagraph>
                            <h3 className="text-3xl font-black tracking-tight" style={{ color: '#001F3D' }}>
                                BBV Matchmaker Engineering Profile
                            </h3>
                        </div>

                        {/* CONDITION 1: NO BUILD MATCHES HARD CAP SEATS AT ALL */}
                        {recommendation.no_match_found ? (
                            <div className="max-w-3xl mx-auto overflow-hidden shadow-2xl bg-[#001F3D] border border-orange-400/20 text-center p-12 rounded-lg">
                                <div className="w-16 h-16 bg-orange-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <SpanTag
                                        text="📐"
                                        className="!text-3xl font-normal"
                                        inlineStyle={{ color: 'var(--color-primary)' }}
                                    />                                </div>
                                <h3 className="text-3xl font-black tracking-tight text-secondary mb-3">
                                    Fabricate a Custom Blueprint Concept!
                                </h3>
                                <RichParagraph className="text-base text-secondary/70 max-w-xl mx-auto mb-8">
                                    {recommendation.message}
                                </RichParagraph>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <a
                                        href={`https://wa.me/19514419719?text=${encodeURIComponent(
                                            `Hi BBV Team! I ran the Matchmaker Quiz. I need a custom structure build setup: Vibe: ${formData.use_case.toUpperCase()}, Strict Belted Seats: ${formData.seats_required}, Wheelbase Target: ${formData.wheelbase}. Let's discuss custom blueprint routing.`
                                        )}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full sm:w-auto text-center  font-black tracking-widest uppercase px-10 py-4 transition-all bg-[#25D366] text-secondary rounded-md shadow-lg"
                                    >
                                        💬 Consult BBV Engineer On WhatsApp
                                    </a>
                                    <button type="button" onClick={handleReset} className="w-full sm:w-auto  font-black tracking-widest uppercase px-8 py-4 bg-secondary/5 text-secondary rounded-md transition-all border border-secondary/10">
                                        🔄 Modify Matrix Options
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* CONDITION 2: STANDARD ASSISTANCE OUTPUT (WHEELBASE / BATHROOM NOTICES RENDER) */
                            recommendation.primary_match && (
                                <div className="space-y-6">

                                    {/* DYNAMIC INTELLECTUAL SUGGESTIONS FEEDBACK COMPONENT */}
                                    {recommendation.suggestions?.compiled_pitch && (
                                        <div
                                            className="p-5 border flex items-start gap-4 shadow-sm transition-all"
                                            style={{
                                                borderRadius: '6px',
                                                backgroundColor: 'rgba(237,152,95,0.06)',
                                                borderColor: '#ED985F',
                                                borderLeftWidth: '5px'
                                            }}
                                        >
                                            <SpanTag
                                                text="💡"
                                                className="!text-2xl mt-0.5 shrink-0"
                                                inlineStyle={{ color: 'var(--color-hover)' }}
                                            />                                            <div>
                                                <h5 className="font-black text-sm uppercase tracking-wide mb-1" style={{ color: '#001F3D' }}>
                                                    BBV Engineering Suggestion Note
                                                </h5>
                                                <RichParagraph className="text-sm font-medium leading-relaxed" inlineStyle={{ color: '#001F3D' }}>
                                                    {recommendation.suggestions.compiled_pitch}
                                                </RichParagraph>
                                            </div>
                                        </div>
                                    )}

                                    {/* Core Card Splitter */}
                                    <div className="overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl rounded-lg border border-primary/10">

                                        {/* Left Layout Information Header */}
                                        <div className="lg:col-span-5 p-7 flex flex-col justify-between relative bg-primary text-secondary min-h-[320px]">
                                            <SpanTag

                                                text={`⚙️${`Configured Template Match`}`}
                                                className="!text-[10px] font-black tracking-widest uppercase !text-secondary"
                                            />

                                            <div className="mt-12 space-y-1.5">
                                                <SpanTag
                                                    text={recommendation.primary_match.type === 'inventory' ? 'Available Physical Asset' : 'Engineering Blueprint Vector'}
                                                    className="! font-bold tracking-widest uppercase !text-secondary/40"
                                                />
                                                <h4 className="text-2xl font-black tracking-tight text-secondary">
                                                    {recommendation.primary_match.title}
                                                </h4>
                                            </div>

                                            <div className="grid grid-cols-3 gap-2 mt-5">
                                                {recommendation.primary_match.images?.slice(0, 3).map((img, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={img}
                                                        alt="BBV Layout Concept Map"
                                                        className="w-full h-20 object-cover transition-all hover:scale-105 border border-secondary/5 rounded"
                                                    />
                                                )) || (
                                                        <div className="col-span-3 h-20 bg-secondary/5  flex items-center justify-center text-secondary/20">
                                                            No visual blueprints found
                                                        </div>
                                                    )}
                                            </div>
                                        </div>

                                        {/* Right Layout Capabilities Specs Sheet */}
                                        <div className="lg:col-span-7 p-8 flex flex-col justify-between bg-[#FBFBF9]">
                                            <div>
                                                <div className="flex items-center justify-between mb-5 pb-4 border-b border-primary/5">
                                                    <div>
                                                        <SpanTag text="Layout Base Specifications" className="! font-bold tracking-widest uppercase !text-primary/40" />
                                                        <SpanTag
                                                            text={`${recommendation.primary_match.wheelbase}" Wheelbase Structure`}
                                                            className="!text-xl font-black uppercase !text-primary"
                                                        />
                                                    </div>
                                                    <SpanTag
                                                        text={recommendation.primary_match.status}
                                                        className="! font-black tracking-widest uppercase !text-primary"
                                                    />
                                                </div>

                                                {/* Structural Configuration Tokens */}
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    <div className="flex items-center gap-1.5  font-bold tracking-wide px-3 py-1.5 bg-primary/5 rounded">
                                                        <Armchair className="w-3.5 h-3.5" style={{ color: 'var(--color-primary)' }} />
                                                        <SpanTag
                                                            text={`${recommendation.primary_match.seats} Belted Locations Fitted`}
                                                            className="! font-bold tracking-wide !text-primary"
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-1.5  font-bold tracking-wide px-3 py-1.5 bg-primary/5 rounded capitalize">
                                                        <ShowerHead className="w-3.5 h-3.5" style={{ color: 'var(--color-primary)' }} />
                                                        <SpanTag
                                                            text={`Built Bathroom: ${recommendation.primary_match.bathroom_type ? recommendation.primary_match.bathroom_type.replace(/_/g, ' ') : 'None / Open Cabin'}`}
                                                            className="! font-bold tracking-wide !text-primary capitalize"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Match Logic Justification */}
                                                {recommendation.primary_match.reason && (
                                                    <div className="mb-6">
                                                        <RichParagraph className=" font-bold tracking-widest uppercase mb-2 text-primary/40">
                                                            Core Structural Logic
                                                        </RichParagraph>
                                                        <RichParagraph className="text-sm font-medium px-4 py-3 bg-secondary border border-primary/10 rounded-md text-primary">
                                                            ✅ {recommendation.primary_match.reason}
                                                        </RichParagraph>
                                                    </div>
                                                )}

                                                {/* Features Highlight Parsing */}
                                                <div>
                                                    <RichParagraph className=" font-bold tracking-widest uppercase mb-3 text-primary/40">
                                                        Fitted Engineering Metrics
                                                    </RichParagraph>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        {recommendation.primary_match.key_features?.map((feat, i) => (
                                                            <div key={i} className="flex items-start gap-2  text-primary/70">

                                                                <SpanTag
                                                                    text={"—"}
                                                                    className=" !text-hover"
                                                                />
                                                                <SpanTag
                                                                    text={feat}
                                                                    className="! font-medium !text-primary/70"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* CTA Response Trigger Blocks */}
                                            <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center gap-3 border-t border-primary/5">
                                                {recommendation.cta_recommendation === 'Get Quote' ? (
                                                    <a href={`/quote?van=${recommendation.primary_match.slug}`} className="w-full sm:w-auto text-center  font-black tracking-widest uppercase px-8 py-3 bg-hover text-secondary rounded">
                                                        Get Custom Quote
                                                    </a>
                                                ) : (
                                                    <a
                                                        href={`https://wa.me/19514419719?text=${encodeURIComponent(
                                                            `Hi! I just ran your BBV Matchmaker Engine and mapped out the "${recommendation.primary_match.title}" layout structure. Let's discuss tailoring this setup over a custom spec.`
                                                        )}`}
                                                        target="_blank" rel="noreferrer" className="w-full sm:w-auto text-center  font-black tracking-widest uppercase px-8 py-3 bg-[#25D366] text-secondary rounded shadow-md"
                                                    >
                                                        💬 WhatsApp BBV Engineer
                                                    </a>
                                                )}

                                                {recommendation.primary_match.glbFile && (
                                                    <a href={`/camper-vans-for-sale/${recommendation.primary_match.slug}/configure`} className="w-full sm:w-auto text-center  font-black tracking-widest uppercase px-6 py-3 bg-primary text-secondary rounded">
                                                        👓 Render 3D Interface
                                                    </a>
                                                )}

                                                <SecondaryButton label="Retake Quiz" onClick={handleReset} className="ml-auto" />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )
                        )}

                        {/* ALTERNATIVES COMPONENT CARDS */}
                        {recommendation.alternatives && recommendation.alternatives.length > 0 && !recommendation.no_match_found && (
                            <div>
                                <div className="mb-4 flex items-center gap-2">
                                    <SpanTag
                                        text="Additional Build Solutions"
                                        className="! font-bold tracking-widest uppercase !text-primary/50"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {recommendation.alternatives.map((alt, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-5 bg-secondary border border-primary/10 rounded-lg transition-all hover:shadow-md">
                                            <div>
                                                <div className="mb-1.5">
                                                    <SpanTag
                                                        text={alt.type === 'inventory' ? 'Inventory Model' : 'Blueprint Design'}
                                                        className="!text-[9px] font-black tracking-widest uppercase px-2 py-0.5 inline-block bg-primary/5 !text-primary/60 rounded"
                                                    />
                                                </div>
                                                <h6 className="font-black text-sm text-primary">{alt.title}</h6>
                                            </div>
                                            <a
                                                href={`/${alt.type === 'inventory' ? 'van' : 'layouts'}/${alt.slug}`}
                                                className=" font-black uppercase px-4 py-2 bg-hover/10 text-hover border border-hover/20 rounded transition-all hover:bg-hover hover:text-secondary"
                                            >
                                                Inspect Layout →
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
}