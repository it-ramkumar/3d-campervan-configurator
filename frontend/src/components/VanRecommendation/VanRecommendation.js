"use client"
import React, { useState, useRef } from 'react';
import { Heading3 } from '../Common/Common';

const OPTIONS = {
    use_case: [
        { value: 'family', label: 'Family Trip', icon: '👨‍👩‍👧‍👦' },
        { value: 'solo', label: 'Solo Traveler', icon: '🧑‍🚀' },
        { value: 'couple', label: 'Couple Adventure', icon: '👩‍❤️‍👨' },
        { value: 'business', label: 'Business / Commercial', icon: '💼' },
        { value: 'adventure', label: 'Extreme Adventure', icon: '🏔️' },
    ],
    budget: [
        { value: 'low', label: 'Economy', sub: '< $60k', desc: 'Basic functional conversion' },
        { value: 'mid', label: 'Mid-Range', sub: '$60k – $100k', desc: 'Balanced features & comfort' },
        { value: 'high', label: 'High-End', sub: '$100k – $150k', desc: 'Premium materials & off-grid' },
        { value: 'premium', label: 'Premium', sub: '> $150k', desc: 'Luxury ultimate specs' },
    ],
    style: [
        { value: 'luxury', label: 'Luxury', desc: 'Sleek, high-end, premium look' },
        { value: 'rugged', label: 'Rugged / 4x4', desc: 'Built for tough terrains' },
        { value: 'minimal', label: 'Minimalist', desc: 'Clean, efficient space saving' },
        { value: 'mixed', label: 'Mixed Custom', desc: 'Versatile multi-purpose' },
    ],
    priority: [
        { value: 'comfort', label: 'Comfort & Climate', desc: 'AC, heaters, premium bedding' },
        { value: 'adventure', label: 'Off-Grid Power', desc: 'Solar, massive lithium batteries' },
        { value: 'space', label: 'Storage & Garage', desc: 'Large gear garage, smart cabinets' },
        { value: 'price', label: 'Value for Money', desc: 'Cost-efficient optimizations' },
    ],
};

const STEP_LABELS = ['Travel Vibe', 'Capacity', 'Comfort', 'Budget', 'Style & Priority'];

export default function VanRecommendation() {
    const [formData, setFormData] = useState({
        use_case: 'family',
        seats_required: 2,
        sleeps_required: 2,
        bathroom_required: false,
        budget: 'mid',
        style: 'luxury',
        priority: 'comfort',
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [recommendation, setRecommendation] = useState(null);
    const [error, setError] = useState('');
    const resultsRef = useRef(null);
    const totalSteps = 5;

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
                setError(data.message || 'No matching vans found.');
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
        setFormData({ use_case: 'family', seats_required: 2, sleeps_required: 2, bathroom_required: false, budget: 'mid', style: 'luxury', priority: 'comfort' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-12" style={{ fontFamily: 'var(--font-heading)' }}>

            {/* ===== FORM CARD ===== */}
            <div  className="overflow-hidden shadow-2xl mb-12 bg-primary rounded-lg">

                {/* Header Strip */}
                <div className="px-8 pt-8 pb-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <p className="text-xs font-bold tracking-widest uppercase mb-1 text-hover">
                                Van Matchmaker
                            </p>
                            <Heading3 text='Find Your Perfect Build' className='text-secondary' />


                        </div>
                        <span
                            className="text-xs font-bold tracking-widest uppercase px-3 py-1.5"
                            style={{ backgroundColor: 'rgba(237,152,95,0.15)', color: '#ED985F', borderRadius: '4px', border: '1px solid rgba(237,152,95,0.3)' }}
                        >
                            {currentStep} / {totalSteps}
                        </span>
                    </div>

                    {/* Step indicators */}
                    <div className="flex items-center gap-1 mb-5">
                        {STEP_LABELS.map((label, i) => {
                            const step = i + 1;
                            const isActive = step === currentStep;
                            const isDone = step < currentStep;
                            return (
                                <React.Fragment key={step}>
                                    <div className="flex flex-col items-center">
                                        <div
                                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-all"
                                            style={{
                                                backgroundColor: isActive ? '#ED985F' : isDone ? 'rgba(237,152,95,0.3)' : 'rgba(255,255,255,0.08)',
                                                color: isActive ? '#fff' : isDone ? '#ED985F' : 'rgba(255,255,255,0.3)',
                                            }}
                                        >
                                            {isDone ? '✓' : step}
                                        </div>
                                        <span
                                            className="text-[9px] font-bold tracking-wider uppercase mt-1 hidden md:block"
                                            style={{ color: isActive ? '#ED985F' : 'rgba(255,255,255,0.3)' }}
                                        >
                                            {label}
                                        </span>
                                    </div>
                                    {i < STEP_LABELS.length - 1 && (
                                        <div className="flex-1 h-px mb-3" style={{ backgroundColor: isDone ? 'rgba(237,152,95,0.4)' : 'rgba(255,255,255,0.08)' }} />
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
                <form onSubmit={handleSubmit} className="px-8 py-8">
                    <div className="min-h-[260px] flex flex-col justify-between">

                        {/* STEP 1 */}
                        {currentStep === 1 && (
                            <div>
                                <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                    What is your primary travel vibe?
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                    {OPTIONS.use_case.map((opt) => {
                                        const active = formData.use_case === opt.value;
                                        return (
                                            <button
                                                key={opt.value}
                                                type="button"
                                                onClick={() => handleInputChange('use_case', opt.value)}
                                                className="p-5 flex flex-col items-center justify-center gap-3 transition-all"
                                                style={{
                                                    borderRadius: '6px',
                                                    border: `1px solid ${active ? '#ED985F' : 'rgba(255,255,255,0.08)'}`,
                                                    backgroundColor: active ? 'rgba(237,152,95,0.12)' : 'rgba(255,255,255,0.03)',
                                                }}
                                            >
                                                <span className="text-2xl">{opt.icon}</span>
                                                <span
                                                    className="text-xs font-bold tracking-wider text-center uppercase"
                                                    style={{ color: active ? '#ED985F' : 'rgba(255,255,255,0.5)' }}
                                                >
                                                    {opt.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* STEP 2 */}
                        {currentStep === 2 && (
                            <div>
                                <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                    How many people need to fit?
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                                    {[
                                        { key: 'seats_required', label: 'Seats Required', sub: 'Number of seatbelts needed' },
                                        { key: 'sleeps_required', label: 'Sleeping Spots', sub: 'Number of people sleeping' },
                                    ].map(({ key, label, sub }) => (
                                        <div
                                            key={key}
                                            className="flex items-center justify-between p-5"
                                            style={{ borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.03)' }}
                                        >
                                            <div>
                                                <span className="block font-black text-sm tracking-wide" style={{ color: '#FBFBF9' }}>{label}</span>
                                                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{sub}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <button
                                                    type="button"
                                                    onClick={() => handleCounter(key, 'dec')}
                                                    className="w-8 h-8 flex items-center justify-center font-black text-base transition-all"
                                                    style={{ borderRadius: '4px', border: '1px solid rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#FBFBF9' }}
                                                >−</button>
                                                <span className="text-xl font-black w-5 text-center" style={{ color: '#ED985F' }}>{formData[key]}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleCounter(key, 'inc')}
                                                    className="w-8 h-8 flex items-center justify-center font-black text-base transition-all"
                                                    style={{ borderRadius: '4px', border: '1px solid rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#FBFBF9' }}
                                                >+</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STEP 3 */}
                        {currentStep === 3 && (
                            <div className="max-w-md mx-auto text-center">
                                <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                    Bathroom Requirement
                                </p>
                                <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.35)' }}>
                                    Do you strictly need an indoor shower / toilet arrangement?
                                </p>
                                <div className="flex items-center justify-center gap-4">
                                    {[
                                        { val: false, label: 'Not Needed' },
                                        { val: true, label: 'Must Have 🚿' },
                                    ].map(({ val, label }) => {
                                        const active = formData.bathroom_required === val;
                                        return (
                                            <button
                                                key={String(val)}
                                                type="button"
                                                onClick={() => handleInputChange('bathroom_required', val)}
                                                className="px-8 py-4 font-black text-xs tracking-widest uppercase transition-all w-40"
                                                style={{
                                                    borderRadius: '6px',
                                                    border: `1px solid ${active ? '#ED985F' : 'rgba(255,255,255,0.1)'}`,
                                                    backgroundColor: active ? 'rgba(237,152,95,0.15)' : 'rgba(255,255,255,0.03)',
                                                    color: active ? '#ED985F' : 'rgba(255,255,255,0.45)',
                                                }}
                                            >
                                                {label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* STEP 4 */}
                        {currentStep === 4 && (
                            <div>
                                <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                    Select your preferred price bracket
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                    {OPTIONS.budget.map((opt) => {
                                        const active = formData.budget === opt.value;
                                        return (
                                            <button
                                                key={opt.value}
                                                type="button"
                                                onClick={() => handleInputChange('budget', opt.value)}
                                                className="p-5 text-left flex flex-col gap-2 transition-all"
                                                style={{
                                                    borderRadius: '6px',
                                                    border: `1px solid ${active ? '#ED985F' : 'rgba(255,255,255,0.08)'}`,
                                                    backgroundColor: active ? 'rgba(237,152,95,0.12)' : 'rgba(255,255,255,0.03)',
                                                }}
                                            >
                                                <span className="block text-xs font-black tracking-widest uppercase" style={{ color: active ? '#ED985F' : '#FBFBF9' }}>
                                                    {opt.label}
                                                </span>
                                                <span className="block text-base font-black" style={{ color: active ? '#ED985F' : 'rgba(255,255,255,0.6)' }}>
                                                    {opt.sub}
                                                </span>
                                                <span className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>
                                                    {opt.desc}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* STEP 5 */}
                        {currentStep === 5 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { field: 'style', label: 'Build Style Interior', items: OPTIONS.style },
                                    { field: 'priority', label: 'Top Priority', items: OPTIONS.priority },
                                ].map(({ field, label, items }) => (
                                    <div key={field}>
                                        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</p>
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
                                                            <span className="block text-xs font-black tracking-wide uppercase" style={{ color: active ? '#ED985F' : '#FBFBF9' }}>
                                                                {opt.label}
                                                            </span>
                                                            <span className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{opt.desc}</span>
                                                        </div>
                                                        <div
                                                            className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center transition-all"
                                                            style={{
                                                                border: `2px solid ${active ? '#ED985F' : 'rgba(255,255,255,0.2)'}`,
                                                                backgroundColor: active ? '#ED985F' : 'transparent',
                                                            }}
                                                        >
                                                            {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Navigation */}
                        <div
                            className="flex items-center justify-between mt-8 pt-6"
                            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                        >
                            <button
                                type="button"
                                onClick={handlePrev}
                                disabled={currentStep === 1 || loading}
                                className="px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition-all"
                                style={{
                                    borderRadius: '6px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    backgroundColor: 'transparent',
                                    color: currentStep === 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.5)',
                                    cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                                }}
                            >
                                Back
                            </button>

                            {currentStep < totalSteps ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="px-7 py-2.5 text-xs font-black tracking-widest uppercase transition-all"
                                    style={{ borderRadius: '6px', backgroundColor: '#FBFBF9', color: '#001F3D' }}
                                >
                                    Continue →
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-8 py-2.5 text-xs font-black tracking-widest uppercase transition-all"
                                    style={{
                                        borderRadius: '6px',
                                        backgroundColor: loading ? 'rgba(237,152,95,0.5)' : '#ED985F',
                                        color: '#fff',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    {loading ? 'Analyzing Builds...' : 'Find My Van →'}
                                </button>
                            )}
                        </div>
                    </div>

                    {error && (
                        <p
                            className="mt-4 text-xs font-bold text-center p-3 tracking-wide"
                            style={{ borderRadius: '6px', backgroundColor: 'rgba(255,59,48,0.1)', color: '#ff6b6b', border: '1px solid rgba(255,59,48,0.2)' }}
                        >
                            {error}
                        </p>
                    )}
                </form>
            </div>


            {/* ===== RESULTS ===== */}
            <div ref={resultsRef} id="results-section" className="scroll-mt-6">
                {recommendation && (
                    <div className="space-y-8">

                        {/* Results header */}
                        <div className="text-center max-w-xl mx-auto">
                            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#ED985F' }}>
                                Matchmaking Complete
                            </p>
                            <h3 className="text-3xl font-black tracking-tight" style={{ color: '#001F3D' }}>
                                Your Personalized Result
                            </h3>
                            <p className="text-sm mt-2" style={{ color: 'rgba(0,31,61,0.45)' }}>
                                Based on: <em className="font-medium not-italic" style={{ color: '#001F3D' }}>{recommendation.user_profile_summary}</em>
                            </p>
                        </div>

                        {/* PRIMARY MATCH */}
                        {recommendation.primary_match && (
                            <div
                                className="overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl"
                                style={{ borderRadius: '6px', border: '1px solid rgba(0,31,61,0.12)' }}
                            >
                                {/* Left dark panel */}
                                <div
                                    className="lg:col-span-5 p-7 flex flex-col justify-between relative"
                                    style={{ backgroundColor: '#001F3D', minHeight: '320px' }}
                                >
                                    <span
                                        className="absolute top-5 left-5 text-xs font-black tracking-widest uppercase px-3 py-1.5"
                                        style={{ borderRadius: '4px', backgroundColor: '#ED985F', color: '#fff' }}
                                    >
                                        {recommendation.primary_match.score >= 7 ? '🏆 Best Match' : 'Closest Recommendation'}
                                    </span>

                                    <div className="mt-12 space-y-2">
                                        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
                                            {recommendation.primary_match.type === 'inventory' ? 'Available Inventory' : 'Custom Portfolio'}
                                        </span>
                                        <h4 className="text-2xl font-black tracking-tight" style={{ color: '#FBFBF9' }}>
                                            {recommendation.primary_match.title}
                                        </h4>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 mt-5">
                                        {recommendation.primary_match.images && recommendation.primary_match.images.length > 0 ? (
                                            recommendation.primary_match.images.map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt="Van Layout"
                                                    className="w-full h-20 object-cover transition-all hover:scale-105"
                                                    style={{ borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)' }}
                                                />
                                            ))
                                        ) : (
                                            <div className="col-span-3 h-20 flex items-center justify-center text-xs" style={{ borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.2)' }}>
                                                No images available
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right light panel */}
                                <div className="lg:col-span-7 p-8 flex flex-col justify-between" style={{ backgroundColor: '#FBFBF9' }}>
                                    <div>
                                        {/* Price row */}
                                        <div
                                            className="flex items-center justify-between mb-5 pb-5"
                                            style={{ borderBottom: '1px solid rgba(0,31,61,0.08)' }}
                                        >
                                            <div>
                                                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(0,31,61,0.4)' }}>
                                                    Price Estimate
                                                </span>
                                                <span className="block text-2xl font-black mt-0.5" style={{ color: '#001F3D' }}>
                                                    {(() => {
                                                        // Safe check: Price ko integer mein convert karein (commas/characters remove karke)
                                                        const rawPrice = recommendation.primary_match.price;
                                                        const parsedPrice = rawPrice ? parseInt(String(rawPrice).replace(/[^0-9]/g, ''), 10) : 0;

                                                        // Agar price valid hai aur 100 se barri hai, to hi return karein
                                                        if (parsedPrice > 100) {
                                                            return `$${parsedPrice.toLocaleString()}`;
                                                        } else {
                                                            // Fallback text jab price 100 se kam ho, null ho, ya empty ho
                                                            return 'Contact for Pricing';
                                                        }
                                                    })()}
                                                </span>
                                            </div>
                                            <span
                                                className="text-xs font-black tracking-widest uppercase px-3 py-1.5"
                                                style={{ borderRadius: '4px', backgroundColor: 'rgba(0,31,61,0.07)', color: '#001F3D' }}
                                            >
                                                {recommendation.primary_match.status}
                                            </span>
                                        </div>

                                        {/* Badges */}
                                        <div className="flex flex-wrap gap-2 mb-5">
                                            {[
                                                `💺 Seats: ${recommendation.primary_match.seats}`,
                                                `🛌 Sleeps: ${recommendation.primary_match.sleeps}`,
                                                recommendation.primary_match.bathroom ? '🚿 Indoor Bathroom' : '🍂 Off-Grid Setup',
                                            ].map((badge) => (
                                                <span
                                                    key={badge}
                                                    className="text-xs font-bold tracking-wide px-3 py-1.5"
                                                    style={{ borderRadius: '4px', backgroundColor: 'rgba(0,31,61,0.07)', color: '#001F3D' }}
                                                >
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Match reason */}
                                        <div className="mb-5">
                                            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'rgba(0,31,61,0.4)' }}>
                                                Why This Match
                                            </p>
                                            <p
                                                className="text-sm font-medium px-4 py-3 capitalize"
                                                style={{ borderRadius: '6px', backgroundColor: 'rgba(237,152,95,0.1)', color: '#001F3D', border: '1px solid rgba(237,152,95,0.25)' }}
                                            >
                                                ✅ {recommendation.primary_match.reason}
                                            </p>
                                        </div>

                                        {/* Features */}
                                        <div>
                                            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'rgba(0,31,61,0.4)' }}>
                                                Key Highlight Features
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                                                {recommendation.primary_match.key_features?.map((feat, i) => (
                                                    <div key={i} className="flex items-start gap-2 text-xs" style={{ color: 'rgba(0,31,61,0.7)' }}>
                                                        <span style={{ color: '#ED985F', flexShrink: 0 }}>—</span>
                                                        <span>{feat}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA Actions */}
                                    <div
                                        className="mt-8 pt-6 flex flex-col sm:flex-row items-center gap-3"
                                        style={{ borderTop: '1px solid rgba(0,31,61,0.08)' }}
                                    >
                                        {recommendation.cta_recommendation === 'Get Quote' ? (
                                            <a
                                                href={`/quote?van=${recommendation.primary_match.slug}`}
                                                className="w-full sm:w-auto text-center text-xs font-black tracking-widest uppercase px-8 py-3 transition-all"
                                                style={{ borderRadius: '6px', backgroundColor: '#ED985F', color: '#fff' }}
                                            >
                                                Get Custom Quote
                                            </a>
                                        ) : (
                                            <a
                                                href={`https://wa.me/19514419719?text=${encodeURIComponent(
                                                    `Hi! I configured "${recommendation.primary_match.title}" via Van Quiz. I want to discuss this layout.`
                                                )}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="w-full sm:w-auto text-center text-xs font-black tracking-widest uppercase px-8 py-3 transition-all hover:opacity-90 active:scale-[0.98]"
                                                style={{ borderRadius: '6px', backgroundColor: '#25D366', color: '#fff' }}
                                            >
                                                💬 WhatsApp Us
                                            </a>
                                        )}

                                        {recommendation.primary_match.glbFile && (
                                            <a
                                                href={`/viewer?model=${recommendation.primary_match.glbFile}`}
                                                className="w-full sm:w-auto text-center text-xs font-black tracking-widest uppercase px-6 py-3 transition-all"
                                                style={{ borderRadius: '6px', backgroundColor: '#001F3D', color: '#FBFBF9' }}
                                            >
                                                👓 View 3D Model
                                            </a>
                                        )}

                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="text-xs font-bold ml-auto transition-all"
                                            style={{ color: 'rgba(0,31,61,0.35)', textDecoration: 'underline', textDecorationStyle: 'dotted' }}
                                        >
                                            Retake Quiz
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ALTERNATIVES */}
                        {recommendation.alternatives && recommendation.alternatives.length > 0 && (
                            <div>
                                <p className="text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2" style={{ color: 'rgba(0,31,61,0.5)' }}>
                                    <span style={{ color: '#ED985F' }}>—</span> Alternative Layouts
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {recommendation.alternatives.map((alt, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between p-5 transition-all hover:shadow-md"
                                            style={{ borderRadius: '6px', border: '1px solid rgba(0,31,61,0.1)', backgroundColor: '#FBFBF9' }}
                                        >
                                            <div>
                                                <span
                                                    className="text-[9px] font-black tracking-widest uppercase px-2 py-0.5 mb-1.5 inline-block"
                                                    style={{ borderRadius: '3px', backgroundColor: 'rgba(0,31,61,0.07)', color: 'rgba(0,31,61,0.5)' }}
                                                >
                                                    {alt.type} Setup
                                                </span>
                                                <h6 className="font-black text-sm" style={{ color: '#001F3D' }}>{alt.title}</h6>
                                                <span className="text-xs mt-0.5" style={{ color: 'rgba(0,31,61,0.35)' }}>
                                                    Match Score: {alt.score}
                                                </span>
                                            </div>
                                            <a
                                                href={`/${alt.type === 'inventory' ? 'van' : 'layouts'}/${alt.slug}`}
                                                className="text-xs font-black tracking-wider uppercase px-4 py-2 transition-all flex-shrink-0"
                                                style={{ borderRadius: '4px', backgroundColor: 'rgba(237,152,95,0.1)', color: '#ED985F', border: '1px solid rgba(237,152,95,0.2)' }}
                                            >
                                                View →
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
