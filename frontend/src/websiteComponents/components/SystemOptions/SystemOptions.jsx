import React, { useState } from 'react';
import { data } from '../../DataUseInComp/SystemOptions';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function SystemOptions() {


    // States for filtering
    const [activeCategory, setActiveCategory] = useState(data[0].category.title);
    const [activeSubcategory, setActiveSubcategory] = useState(null);

    // Unique Categories nikalne ke liye
    const categories = [...new Set(data.map(item => item.category.title))];

    // Selected category ke mutabiq subcategories nikalne ke liye
    const subcategories = [...new Set(data
        .filter(item => item.category.title === activeCategory && item.subcategory)
        .map(item => item.subcategory.title)
    )];

    // Filtered data to display
    const filteredItems = data.filter(item => {
        const categoryMatch = item.category.title === activeCategory;
        const subcategoryMatch = activeSubcategory
            ? item.subcategory?.title === activeSubcategory
            : true;
        return categoryMatch && subcategoryMatch;
    });

    const handleCategoryClick = (cat) => {
        setActiveCategory(cat);
        setActiveSubcategory(null); // Category change hone par subcategory reset
    };

    return (<>
<Navbar/>
        <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>

            {/* 1. Category Buttons */}
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: activeCategory === cat ? '#2563eb' : '#e2e8f0',
                            color: activeCategory === cat ? 'white' : '#1e293b',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Category Description */}
            <p style={{ color: '#64748b', marginBottom: '20px' }}>
                {data.find(i => i.category.title === activeCategory)?.category.desc}
            </p>

            {/* 2. Subcategory Buttons (Sirf tab dikhein agar us category mein hon) */}
            {subcategories.length > 0 && (
                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                    {subcategories.map(sub => (
                        <button
                            key={sub}
                            onClick={() => setActiveSubcategory(sub)}
                            style={{
                                padding: '8px 15px',
                                borderRadius: '20px',
                                border: '1px solid #2563eb',
                                backgroundColor: activeSubcategory === sub ? '#2563eb' : 'transparent',
                                color: activeSubcategory === sub ? 'white' : '#2563eb',
                                cursor: 'pointer'
                            }}
                        >
                            {sub}
                        </button>
                    ))}
                    {activeSubcategory && (
                        <button onClick={() => setActiveSubcategory(null)} style={{border:'none', background:'none', color:'red', cursor:'pointer'}}>Clear ×</button>
                    )}
                </div>
            )}

            <hr style={{ border: '0.5px solid #e2e8f0', marginBottom: '30px' }} />

            {/* 3. Render Items (Image, Title, Desc, Items) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
                {filteredItems.map((item, index) => (
                    <div key={index} style={{
                        backgroundColor: 'white',
                        padding: '15px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}>
                        <img
                            src={item.image}
                            alt={item.title}
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <h3 style={{ marginTop: '15px', color: '#1e293b' }}>{item.title}</h3>

                        {/* Subcategory Description agar available ho */}
                        {item.subcategory && (
                            <p style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic' }}>
                                {item.subcategory.desc}
                            </p>
                        )}

                        <p style={{ color: '#475569', fontSize: '0.95rem' }}>{item.data.desc}</p>

                        <ul style={{ paddingLeft: '20px', color: '#475569' }}>
                            {item.data.item.map((li, i) => li && <li key={i} style={{ marginBottom: '5px' }}>{li}</li>)}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
        <Footer/>
          </>
    );
}