"use client"
import React, { useState, useRef } from 'react';
import { Heading3, RichParagraph, SpanTag, SecondaryButton } from '../Common/Common';
import { ShowerHead, Armchair, Ruler, Zap } from "lucide-react"

const OPTIONS = {
    van_length: [
        { value: 'short', label: 'Short Wheelbase', desc: 'Compact & agile — Sprinter 144 / Transit 148 / Promaster 130' },
        { value: 'long', label: 'Long Wheelbase', desc: 'Maximum interior space — Sprinter 170 / Transit 148 Ext / Promaster 159' },
        { value: 'no_preference', label: 'No Preference', desc: 'Open to any chassis length' },
    ],
    yes_no_preference: [
        { value: 'yes', label: 'Yes, Must Have' },
        { value: 'no_preference', label: 'No Preference' },
    ],
};

const STEP_LABELS = ['Van Length', 'Passengers', 'Bathroom', 'Battery & AC', 'Contact Info'];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function VanRecommendation() {
    const [formData, setFormData] = useState({
        van_length: 'no_preference',
        passengers: 2,
        bathroom_required: 'no_preference',
        battery_ac_required: 'no_preference',
        customer_name: '',
        customer_phone: '',
        customer_email: '',
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [recommendation, setRecommendation] = useState(null);
    const [error, setError] = useState('');
    const resultsRef = useRef(null);
    const totalSteps = 5;

    const handleInputChange = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

    const handleCounter = (type) => {
        setFormData((prev) => {
            const newVal = type === 'inc' ? prev.passengers + 1 : Math.max(1, prev.passengers - 1);
            return { ...prev, passengers: newVal };
        });
    };

    const handleNext = () => { if (currentStep < totalSteps) setCurrentStep(currentStep + 1); };
    const handlePrev = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.customer_name.trim() || !formData.customer_phone.trim() || !formData.customer_email.trim()) {
            setError('Please fill in your name, phone and email so our team can reach you back.');
            return;
        }
        if (!EMAIL_REGEX.test(formData.customer_email.trim())) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const tracking =
                typeof window !== 'undefined'
                    ? JSON.parse(sessionStorage.getItem('tracking')) || {}
                    : {};

            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/recommend`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, ...tracking }),
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
            van_length: 'no_preference',
            passengers: 2,
            bathroom_required: 'no_preference',
            battery_ac_required: 'no_preference',
            customer_name: '',
            customer_phone: '',
            customer_email: '',
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

                        {/* STEP 1: VAN LENGTH */}
                        {currentStep === 1 && (
                            <div>
                                <RichParagraph className="font-bold text-secondary tracking-widest uppercase mb-5" inlineStyle={{ color: 'rgba(255,255,255,0.4)' }}>
                                    Do you have a preferred van length?
                                </RichParagraph>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {OPTIONS.van_length.map((opt) => {
                                        const active = formData.van_length === opt.value;
                                        return (
                                            <button
                                                key={opt.value}
                                                type="button"
                                                onClick={() => handleInputChange('van_length', opt.value)}
                                                className="p-5 flex flex-col text-left justify-between h-36 transition-all"
                                                style={{
                                                    borderRadius: '6px',
                                                    border: `1px solid ${active ? '#ED985F' : 'rgba(255,255,255,0.08)'}`,
                                                    backgroundColor: active ? 'rgba(237,152,95,0.12)' : 'rgba(255,255,255,0.03)',
                                                }}
                                            >
                                                <Ruler className="w-6 h-6" style={{ color: active ? '#ED985F' : 'rgba(255,255,255,0.5)' }} />
                                                <div>
                                                    <SpanTag text={opt.label} className={`!text-sm font-black uppercase ${active ? '!text-[#ED985F]' : '!text-secondary'}`} />
                                                    <SpanTag text={opt.desc} className="! !text-secondary/30 mt-1" />
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* STEP 2: PASSENGERS */}
                        {currentStep === 2 && (
                            <div className="max-w-md mx-auto text-center w-full">
                                <RichParagraph className=" font-bold tracking-widest uppercase mb-6" inlineStyle={{ color: 'rgba(255,255,255,0.4)' }}>
                                    How many passengers do you need to seat at minimum?
                                </RichParagraph>
                                <div
                                    className="flex items-center justify-between p-6 bg-secondary/5 border border-secondary/10 rounded-lg max-w-sm mx-auto"
                                >
                                    <div className="text-left">
                                        <SpanTag text="Passengers" className="!text-secondary font-black text-sm tracking-wide" />
                                        <SpanTag text="Minimum seating capacity" className="!text-secondary/35 " />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button
                                            type="button"
                                            onClick={() => handleCounter('dec')}
                                            className="w-10 h-10 flex items-center justify-center font-black text-base transition-all"
                                            style={{ borderRadius: '4px', border: '1px solid rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#FBFBF9' }}
                                        >−</button>
                                        <SpanTag
                                            text={formData.passengers}
                                            className="!text-2xl font-black w-6 text-center"
                                            inlineStyle={{ color: 'var(--color-hover)' }}
                                        />                                        <button
                                            type="button"
                                            onClick={() => handleCounter('inc')}
                                            className="w-10 h-10 flex items-center justify-center font-black text-base transition-all"
                                            style={{ borderRadius: '4px', border: '1px solid rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#FBFBF9' }}
                                        >+</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: BATHROOM */}
                        {currentStep === 3 && (
                            <div className="space-y-8 max-w-3xl mx-auto w-full">
                                <div>
                                    <RichParagraph className="text-center  font-bold tracking-widest uppercase mb-4" inlineStyle={{ color: 'rgba(255,255,255,0.4)' }}>
                                        Do you need an Indoor Bathroom / Shower Setup?
                                    </RichParagraph>
                                    <div className="flex justify-center gap-4 mb-4">
                                        {OPTIONS.yes_no_preference.map((opt) => {
                                            const active = formData.bathroom_required === opt.value;
                                            return (
                                                <button
                                                    key={opt.value}
                                                    type="button"
                                                    onClick={() => handleInputChange('bathroom_required', opt.value)}
                                                    className="px-6 py-3 font-black  uppercase tracking-wider border rounded-md transition-all w-48"
                                                    style={{
                                                        border: active ? '1px solid #ED985F' : '1px solid rgba(255,255,255,0.1)',
                                                        backgroundColor: active ? 'rgba(237,152,95,0.15)' : 'rgba(255,255,255,0.03)',
                                                        color: active ? '#ED985F' : 'rgba(255,255,255,0.45)',
                                                    }}
                                                >
                                                    {opt.value === 'yes' ? `${opt.label} 🚿` : opt.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 4: BATTERY / OFF-GRID AC */}
                        {currentStep === 4 && (
                            <div className="space-y-8 max-w-3xl mx-auto w-full">
                                <div>
                                    <RichParagraph className="text-center  font-bold tracking-widest uppercase mb-2" inlineStyle={{ color: 'rgba(255,255,255,0.4)' }}>
                                        Do you want an Off-Grid Battery & AC System?
                                    </RichParagraph>
                                    <RichParagraph className="text-center mb-4 !text-secondary/30">
                                        Helps us understand your budget for a complex electrical build — doesn't affect which layouts you're shown.
                                    </RichParagraph>
                                    <div className="flex justify-center gap-4 mb-4">
                                        {OPTIONS.yes_no_preference.map((opt) => {
                                            const active = formData.battery_ac_required === opt.value;
                                            return (
                                                <button
                                                    key={opt.value}
                                                    type="button"
                                                    onClick={() => handleInputChange('battery_ac_required', opt.value)}
                                                    className="px-6 py-3 font-black  uppercase tracking-wider border rounded-md transition-all w-48 flex items-center justify-center gap-2"
                                                    style={{
                                                        border: active ? '1px solid #ED985F' : '1px solid rgba(255,255,255,0.1)',
                                                        backgroundColor: active ? 'rgba(237,152,95,0.15)' : 'rgba(255,255,255,0.03)',
                                                        color: active ? '#ED985F' : 'rgba(255,255,255,0.45)',
                                                    }}
                                                >
                                                    {opt.value === 'yes' && <Zap className="w-4 h-4" />}
                                                    {opt.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 5: CONTACT INFO (GATE BEFORE RESULTS) */}
                        {currentStep === 5 && (
                            <div className="max-w-md mx-auto w-full space-y-4">
                                <RichParagraph className="text-center font-bold tracking-widest uppercase mb-2" inlineStyle={{ color: 'rgba(255,255,255,0.4)' }}>
                                    Almost there — where should we send your matches?
                                </RichParagraph>
                                <RichParagraph className="text-center mb-4 !text-secondary/30">
                                    So our BBV team can follow up and answer any questions about your build.
                                </RichParagraph>

                                <div className="space-y-3">
                                    <div>
                                        <SpanTag text="Full Name" className="!text-secondary/40 font-bold tracking-wide uppercase !text-[11px] block mb-1" />
                                        <input
                                            type="text"
                                            value={formData.customer_name}
                                            onChange={(e) => handleInputChange('customer_name', e.target.value)}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 rounded-md text-secondary outline-none transition-all"
                                            style={{ border: '1px solid rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.05)' }}
                                        />
                                    </div>
                                    <div>
                                        <SpanTag text="Phone Number" className="!text-secondary/40 font-bold tracking-wide uppercase !text-[11px] block mb-1" />
                                        <input
                                            type="tel"
                                            value={formData.customer_phone}
                                            onChange={(e) => handleInputChange('customer_phone', e.target.value)}
                                            placeholder="+1 (555) 123-4567"
                                            className="w-full px-4 py-3 rounded-md text-secondary outline-none transition-all"
                                            style={{ border: '1px solid rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.05)' }}
                                        />
                                    </div>
                                    <div>
                                        <SpanTag text="Email Address" className="!text-secondary/40 font-bold tracking-wide uppercase !text-[11px] block mb-1" />
                                        <input
                                            type="email"
                                            value={formData.customer_email}
                                            onChange={(e) => handleInputChange('customer_email', e.target.value)}
                                            placeholder="you@example.com"
                                            className="w-full px-4 py-3 rounded-md text-secondary outline-none transition-all"
                                            style={{ border: '1px solid rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.05)' }}
                                        />
                                    </div>
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
                                            `Hi BBV Team! I ran the Matchmaker Quiz. I need a custom structure build setup: Strict Passengers: ${formData.passengers}, Van Length Preference: ${formData.van_length}. Let's discuss custom blueprint routing.`
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
                            /* CONDITION 2: STANDARD ASSISTANCE OUTPUT */
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
                                                    {formData.battery_ac_required === 'yes' && (
                                                        <div className="flex items-center gap-1.5  font-bold tracking-wide px-3 py-1.5 bg-primary/5 rounded capitalize">
                                                            <Zap className="w-3.5 h-3.5" style={{ color: 'var(--color-primary)' }} />
                                                            <SpanTag
                                                                text="Off-Grid Power: Available as Custom Add-On"
                                                                className="! font-bold tracking-wide !text-primary capitalize"
                                                            />
                                                        </div>
                                                    )}
                                                </div>

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
                                                    <a href={`/van-detail/${recommendation.primary_match.slug}`} className="w-full sm:w-auto text-center  font-black tracking-widest uppercase px-8 py-3 bg-hover text-secondary rounded">
                                                        Get Full Detail
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
                                                href={alt.url}
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
