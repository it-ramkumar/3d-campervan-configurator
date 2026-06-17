"use client"
import React, { useState, useRef } from 'react';
import { Heading3, RichParagraph, WatermarkText, SecondaryButton } from '../Common/Common';

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
    kitchen_amenities: [
        { value: 'sink', label: 'Deep Undermount Sink', desc: 'Premium sink with professional faucet' },
        { value: 'fridge', label: '12V Compressor Fridge', desc: 'Dedicated efficient cooling appliance' },
        { value: 'stove', label: 'Induction / Gas Cooktop', desc: 'Built-in high performance stove' }
    ],
    vehicle_chassis: [
        { value: 'sprinter', label: 'Mercedes Sprinter', desc: 'Premium precision chassis setup' },
        { value: 'transit', label: 'Ford Transit', desc: 'High serviceability & capable AWD options' },
        { value: 'no_preference', label: 'No Preference', desc: 'Prioritize layout build specifications' }
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
        kitchen_required: false,
        kitchen_items: [], // Array to hold selected kitchen elements multiple values
        vehicle_chassis: 'no_preference',
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

    const toggleKitchenItem = (itemValue) => {
        setFormData((prev) => {
            const exists = prev.kitchen_items.includes(itemValue);
            const updated = exists
                ? prev.kitchen_items.filter(i => i !== itemValue)
                : [...prev.kitchen_items, itemValue];
            return { ...prev, kitchen_items: updated };
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
            kitchen_required: false,
            kitchen_items: [],
            vehicle_chassis: 'no_preference',
            style: 'luxury',
            priority: 'comfort'
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-12" style={{ fontFamily: 'var(--font-heading)' }}>

            {/* ===== FORM CARD ===== */}
            <div className="overflow-hidden shadow-2xl mb-12 bg-primary rounded-lg">

                {/* Header Strip */}
                <div className="px-8 pt-8 pb-6 border-b">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <WatermarkText text="Van Matchmaker" className="mb-1" />
                            <Heading3 text='Find Your Perfect Build' className='text-secondary' />
                        </div>
                        <WatermarkText text={`${currentStep} / ${totalSteps}`} />
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
                                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300
                                                ${isActive
                                                    ? 'bg-[#ED985F] text-white scale-110 shadow-md shadow-[#ED985F]/20'
                                                    : isDone
                                                        ? 'bg-[#ED985F]/30 text-[#ED985F]'
                                                        : 'bg-white/5 text-white/30'
                                                }`}
                                        >
                                            {isDone ? '✓' : step}
                                        </div>
                                        <WatermarkText
                                            text={label}
                                            className={`!text-[12px] mt-1 hidden md:block transition-colors duration-300
                                                ${isActive ? 'text-hover' : 'text-secondary/30'}`}
                                        />
                                    </div>
                                    {i < STEP_LABELS.length - 1 && (
                                        <div
                                            className={`flex-1 h-px mb-3 transition-colors duration-300
                                                ${isDone ? 'bg-[#ED985F]/40' : 'bg-white/5'}`}
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
                <form onSubmit={handleSubmit} className="px-8 py-8">
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
                                                <span className="text-3xl">{opt.icon}</span>
                                                <div>
                                                    <WatermarkText text={opt.label} className={`!text-sm font-black uppercase ${active ? '!text-[#ED985F]' : '!text-secondary'}`} />
                                                    <WatermarkText text={opt.desc} className="!text-xs !text-white/30 mt-1" />
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
                                <RichParagraph className="text-xs font-bold tracking-widest uppercase mb-6" inlineStyle={{ color: 'rgba(255,255,255,0.4)' }}>
                                    How many belted seats do you strictly require?
                                </RichParagraph>
                                <div
                                    className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-lg max-w-sm mx-auto"
                                >
                                    <div className="text-left">
                                        <WatermarkText text="Seats Required" className="!text-secondary font-black text-sm tracking-wide" />
                                        <WatermarkText text="Number of seatbelts needed" className="!text-white/35 text-xs" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button
                                            type="button"
                                            onClick={() => handleCounter('seats_required', 'dec')}
                                            className="w-10 h-10 flex items-center justify-center font-black text-base transition-all"
                                            style={{ borderRadius: '4px', border: '1px solid rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#FBFBF9' }}
                                        >−</button>
                                        <span className="text-2xl font-black w-6 text-center" style={{ color: '#ED985F' }}>{formData.seats_required}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleCounter('seats_required', 'inc')}
                                            className="w-10 h-10 flex items-center justify-center font-black text-base transition-all"
                                            style={{ borderRadius: '4px', border: '1px solid rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#FBFBF9' }}
                                        >+</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: AMENITIES FUNNEL (BATHROOM TYPES & KITCHEN SPECIFICS) */}
                        {currentStep === 3 && (
                            <div className="space-y-8 max-w-3xl mx-auto w-full">
                                {/* Bathroom Master Switch */}
                                <div>
                                    <RichParagraph className="text-center text-xs font-bold tracking-widest uppercase mb-4" inlineStyle={{ color: 'rgba(255,255,255,0.4)' }}>
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
                                                    onClick={() => { handleInputChange('bathroom_required', val); if(!val) handleInputChange('bathroom_type', ''); }}
                                                    className="px-6 py-3 font-black text-xs uppercase tracking-wider border rounded-md transition-all w-40"
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

                                    {/* Conditional BBV Bathroom Sub-options */}
                                    {formData.bathroom_required && (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4 transition-all duration-300">
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
                                                        <WatermarkText text={type.label} className={`!text-xs font-black ${active ? '!text-[#ED985F]' : '!text-secondary'}`} />
                                                        <WatermarkText text={type.desc} className="!text-[10px] !text-white/30 mt-0.5 leading-tight" />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                {/* Kitchen Master Switch */}
                                <div className="pt-6 border-t border-white/5">
                                    <RichParagraph className="text-center text-xs font-bold tracking-widest uppercase mb-4" inlineStyle={{ color: 'rgba(255,255,255,0.4)' }}>
                                        Do you need an Indoor Galley / Kitchen Setup?
                                    </RichParagraph>
                                    <div className="flex justify-center gap-4 mb-4">
                                        {[
                                            { val: false, label: 'Not Needed' },
                                            { val: true, label: 'Must Have 🍳' },
                                        ].map(({ val, label }) => {
                                            const active = formData.kitchen_required === val;
                                            return (
                                                <button
                                                    key={String(val)}
                                                    type="button"
                                                    onClick={() => { handleInputChange('kitchen_required', val); if(!val) handleInputChange('kitchen_items', []); }}
                                                    className="px-6 py-3 font-black text-xs uppercase tracking-wider border rounded-md transition-all w-40"
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

                                    {/* Conditional Kitchen Infrastructure Items */}
                                    {formData.kitchen_required && (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4 transition-all duration-300">
                                            {OPTIONS.kitchen_amenities.map((item) => {
                                                const active = formData.kitchen_items.includes(item.value);
                                                return (
                                                    <div
                                                        key={item.value}
                                                        onClick={() => toggleKitchenItem(item.value)}
                                                        className="p-3 cursor-pointer border rounded-md transition-all text-left flex items-center justify-between"
                                                        style={{
                                                            border: active ? '1px solid #ED985F' : '1px solid rgba(255,255,255,0.05)',
                                                            backgroundColor: active ? 'rgba(237,152,95,0.08)' : 'transparent',
                                                        }}
                                                    >
                                                        <div>
                                                            <WatermarkText text={item.label} className={`!text-xs font-black ${active ? '!text-[#ED985F]' : '!text-secondary'}`} />
                                                            <WatermarkText text={item.desc} className="!text-[10px] !text-white/30 mt-0.5 leading-tight" />
                                                        </div>
                                                        <div className="w-3.5 h-3.5 border rounded flex items-center justify-center text-[9px] font-bold" style={{ borderColor: active ? '#ED985F' : 'rgba(255,255,255,0.2)', color: '#ED985F' }}>
                                                            {active && '✓'}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* STEP 4: CHASSIS VEHICLE, STYLE & PRIORITY */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div>
                                    <RichParagraph className="text-xs font-bold tracking-widest uppercase mb-3" inlineStyle={{ color: 'rgba(255,255,255,0.4)' }}>
                                        Preferred Vehicle Platform
                                    </RichParagraph>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {OPTIONS.vehicle_chassis.map((opt) => {
                                            const active = formData.vehicle_chassis === opt.value;
                                            return (
                                                <div
                                                    key={opt.value}
                                                    onClick={() => handleInputChange('vehicle_chassis', opt.value)}
                                                    className="p-4 cursor-pointer border rounded-md transition-all text-left"
                                                    style={{
                                                        border: active ? '1px solid #ED985F' : '1px solid rgba(255,255,255,0.07)',
                                                        backgroundColor: active ? 'rgba(237,152,95,0.1)' : 'rgba(255,255,255,0.02)',
                                                    }}
                                                >
                                                    <WatermarkText text={opt.label} className={`!text-xs font-black uppercase ${active ? '!text-[#ED985F]' : '!text-secondary'}`} />
                                                    <WatermarkText text={opt.desc} className="!text-xs mt-0.5 !text-white/30" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                                    {[
                                        { field: 'style', label: 'Build Style Interior', items: OPTIONS.style },
                                        { field: 'priority', label: 'Top Priority Focus', items: OPTIONS.priority },
                                    ].map(({ field, label, items }) => (
                                        <div key={field}>
                                            <RichParagraph className="text-xs font-bold tracking-widest uppercase mb-3" inlineStyle={{ color: 'rgba(255,255,255,0.4)' }}>
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
                                                                <WatermarkText text={opt.label} className={`!text-xs font-black tracking-wide uppercase ${active ? '!text-[#ED985F]' : '!text-secondary'}`} />
                                                                <WatermarkText text={opt.desc} className="!text-xs mt-0.5 !text-white/30" />
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
                                    label={loading ? 'Analyzing Builds...' : 'Find My Van →'}
                                    disabled={loading}
                                    type="submit"
                                />
                            )}
                        </div>
                    </div>

                    {error && (
                        <RichParagraph
                            className="mt-4 text-xs font-bold text-center p-3 tracking-wide"
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

                        {/* Results header */}
                        <div className="text-center max-w-xl mx-auto">
                            <RichParagraph className="text-xs font-bold tracking-widest uppercase mb-2" inlineStyle={{ color: '#ED985F' }}>
                                Matchmaking Complete
                            </RichParagraph>
                            <h3 className="text-3xl font-black tracking-tight" style={{ color: '#001F3D' }}>
                                Your Personalized Result
                            </h3>
                            <RichParagraph className="text-sm mt-2" inlineStyle={{ color: 'rgba(0,31,61,0.45)' }}>
                                Based on your layout selections and requirements context.
                            </RichParagraph>
                        </div>

                        {/* CONDITION 1: RECONCILE DYNAMIC FALLBACK IF ABSOLUTELY NO PLANS MATCH */}
                        {recommendation.no_match_found ? (
                            <div className="max-w-3xl mx-auto overflow-hidden shadow-2xl bg-[#001F3D] border border-orange-400/20 text-center p-12 rounded-lg">
                                <div className="w-16 h-16 bg-orange-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">📐</span>
                                </div>
                                <h3 className="text-3xl font-black tracking-tight text-white mb-3">
                                    Your Requirements are Beautifully Unique!
                                </h3>
                                <RichParagraph className="text-base text-white/70 max-w-xl mx-auto mb-8">
                                    {recommendation.message || "Hamare ready configurations ya baseline assets me aapki strict configuration maujood nahi hai. Lekin fikr ki koi baat nahi, hum custom builders hain!"}
                                </RichParagraph>

                                <div className="bg-white/5 border border-white/10 rounded-lg p-6 max-w-md mx-auto mb-8 text-left grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-xs text-white/40 block uppercase font-black">Vibe Context</span>
                                        <span className="text-sm font-bold text-orange-400 uppercase">{formData.use_case} Build</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-white/40 block uppercase font-black">Target Seating</span>
                                        <span className="text-sm font-bold text-orange-400">{formData.seats_required} Belted Spots</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-white/40 block uppercase font-black">Bathroom Infrastructure</span>
                                        <span className="text-sm font-bold text-white">{formData.bathroom_required ? formData.bathroom_type.replace('_',' ') : 'None (Open Space)'}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-white/40 block uppercase font-black">Kitchen Items</span>
                                        <span className="text-sm font-bold text-white">{formData.kitchen_required ? formData.kitchen_items.join(', ') : 'None'}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <a
                                        href={`https://wa.me/19514419719?text=${encodeURIComponent(
                                            `Hi! I configured a custom layout via Quiz. No matching ready plan fits my exact components: Vibe: ${formData.use_case.toUpperCase()}, Seats Needed: ${formData.seats_required}, Bathroom Configuration: ${formData.bathroom_required ? formData.bathroom_type : 'No'}, Kitchen Infrastructure: ${formData.kitchen_required ? formData.kitchen_items.join('+') : 'No'}. I want to talk to an engineer for a custom 3D layout blueprint.`
                                        )}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full sm:w-auto text-center text-xs font-black tracking-widest uppercase px-10 py-4 transition-all bg-[#25D366] text-white rounded-md shadow-lg hover:opacity-90"
                                    >
                                        💬 Connect On WhatsApp
                                    </a>
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="w-full sm:w-auto text-xs font-black tracking-widest uppercase px-8 py-4 bg-white/5 text-white hover:bg-white/10 rounded-md transition-all border border-white/10"
                                    >
                                        🔄 Adjust Selections
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* CONDITION 2: STANDARD SUCCESS MATCH PRESENTATION */
                            recommendation.primary_match && (
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
                                            {recommendation.primary_match.score >= 12 ? '🏆 Best Layout Match' : 'Closest Recommendation'}
                                        </span>

                                        <div className="mt-12 space-y-2">
                                            <WatermarkText
                                                text={recommendation.primary_match.type === 'inventory' ? 'Available Inventory' : 'Custom Portfolio Layout'}
                                                className="!text-xs font-bold tracking-widest uppercase !text-white/35"
                                            />
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
                                                        alt="Van Layout Blueprint"
                                                        className="w-full h-20 object-cover transition-all hover:scale-105"
                                                        style={{ borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)' }}
                                                    />
                                                ))
                                            ) : (
                                                <div className="col-span-3 h-20 flex items-center justify-center text-xs" style={{ borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.2)' }}>
                                                    No configuration renders available
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right light panel */}
                                    <div className="lg:col-span-7 p-8 flex flex-col justify-between" style={{ backgroundColor: '#FBFBF9' }}>
                                        <div>
                                            <div
                                                className="flex items-center justify-between mb-5 pb-5"
                                                style={{ borderBottom: '1px solid rgba(0,31,61,0.08)' }}
                                            >
                                                <div>
                                                    <WatermarkText text="Layout Status" className="!text-xs font-bold tracking-widest uppercase !text-primary/40" />
                                                    <span className="block text-xl font-black mt-0.5 text-primary uppercase">
                                                        {recommendation.primary_match.type === 'inventory' ? 'Ready to Ship' : 'Custom Spec Plan'}
                                                    </span>
                                                </div>
                                                <span
                                                    className="text-xs font-black tracking-widest uppercase px-3 py-1.5"
                                                    style={{ borderRadius: '4px', backgroundColor: 'rgba(0,31,61,0.07)', color: '#001F3D' }}
                                                >
                                                    {recommendation.primary_match.status || 'Available'}
                                                </span>
                                            </div>

                                            {/* Dynamic Layout Configuration Badges */}
                                            <div className="flex flex-wrap gap-2 mb-5">
                                                <span className="text-xs font-bold tracking-wide px-3 py-1.5 bg-primary/5 text-primary rounded">
                                                    💺 Seats: {recommendation.primary_match.seats}
                                                </span>
                                                {recommendation.primary_match.bathroom && (
                                                    <span className="text-xs font-bold tracking-wide px-3 py-1.5 bg-primary/5 text-primary rounded capitalize">
                                                        🚿 Bath: {recommendation.primary_match.bathroom_type?.replace(/_/g, ' ')}
                                                    </span>
                                                )}
                                                <span className="text-xs font-bold tracking-wide px-3 py-1.5 bg-primary/5 text-primary rounded">
                                                    {recommendation.primary_match.glbFile ? '👓 3D Asset Available' : '📐 Blueprint Map'}
                                                </span>
                                            </div>

                                            {/* Match reasoning justification text */}
                                            {recommendation.primary_match.reason && (
                                                <div className="mb-5">
                                                    <RichParagraph className="text-xs font-bold tracking-widest uppercase mb-2" inlineStyle={{ color: 'rgba(0,31,61,0.4)' }}>
                                                        Why This Match Fits
                                                    </RichParagraph>
                                                    <RichParagraph
                                                        className="text-sm font-medium px-4 py-3"
                                                        inlineStyle={{ borderRadius: '6px', backgroundColor: 'rgba(237,152,95,0.1)', color: '#001F3D', border: '1px solid rgba(237,152,95,0.25)' }}
                                                    >
                                                        ✅ {recommendation.primary_match.reason}
                                                    </RichParagraph>
                                                </div>
                                            )}

                                            {/* Key features display list */}
                                            <div>
                                                <RichParagraph className="text-xs font-bold tracking-widest uppercase mb-3" inlineStyle={{ color: 'rgba(0,31,61,0.4)' }}>
                                                    Key Premium Highlights
                                                </RichParagraph>
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

                                        {/* Core CTA Actions Panel */}
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
                                                        `Hi! I matched "${recommendation.primary_match.title}" via Van Quiz configuration. I want to discuss this blueprint layout design with an engineer.`
                                                    )}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="w-full sm:w-auto text-center text-xs font-black tracking-widest uppercase px-8 py-3 transition-all"
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

                                            <SecondaryButton
                                                label="Retake Quiz"
                                                onClick={handleReset}
                                                className="ml-auto"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        )}

                        {/* ALTERNATIVES LAYOUT RENDER COMPONENT */}
                        {recommendation.alternatives && recommendation.alternatives.length > 0 && !recommendation.no_match_found && (
                            <div>
                                <RichParagraph className="text-xs font-bold tracking-widests uppercase mb-4 flex items-center gap-2" inlineStyle={{ color: 'rgba(0,31,61,0.5)' }}>
                                    <span style={{ color: '#ED985F' }}>—</span> Alternative Layout Solutions
                                </RichParagraph>
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
                                                    {alt.type === 'inventory' ? 'Inventory Asset' : 'Custom Blueprint'} Setup
                                                </span>
                                                <h6 className="font-black text-sm" style={{ color: '#001F3D' }}>{alt.title}</h6>
                                                <WatermarkText text={`Match Score: ${alt.score}`} className="!text-xs mt-0.5 !text-primary/35" />
                                            </div>
                                            <a
                                                href={`/${alt.type === 'inventory' ? 'van' : 'layouts'}/${alt.slug}`}
                                                className="text-xs font-black tracking-wider uppercase px-4 py-2 transition-all flex-shrink-0"
                                                style={{ borderRadius: '4px', backgroundColor: 'rgba(237,152,95,0.1)', color: '#ED985F', border: '1px solid rgba(237,152,95,0.2)' }}
                                            >
                                                View Plan →
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