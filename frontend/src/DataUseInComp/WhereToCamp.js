  export const campgrounds = [
        {
            categoryTitle: "Big Bear Lake Campgrounds (~20 Minutes From Our Showroom)",
            locations: [
                {
                    name: "Serrano Campground",
                    desc: "Located in the San Bernardino mountains, Serrano is the most popular campground for enjoying the scenic views of Big Bear Lake. At a walking distance from Big Bear Lake, this campground offers you access to multiple outdoor activities.",
                    images: [
                        "/whereToCamp/Serrano campground.webp",
                         "/whereToCamp/Serrano.webp"

                    ],
                    table: [
                        { seasonDates: "March 27, 2026 - November 29, 2026", siteType: "Standard non-electric",dailyRates:"$44 nightly- $2/holiday additional", maximumStay:"14 nights within a rolling 30-day period" },
                        { seasonDates: "March 27, 2026 - November 29, 2026", siteType: "RV electric", dailyRates:"$56 nightly",maximumStay:"" },
                    ],
                    facilities: ["Various sites for RV camping", "Full hookups (sewer, water, electricity)", "A dump station ($10 fee)", "Picnic tables", "Campfire rings with grills","Flush toilets & showers","Drinking water","Firewood vendor","Food storage locker"],
                    activities: ["Boating", "Fishing", "Hiking", "Mountain biking","Canoeing", "Water sports","Ranger station"]
                },
                {
                    name: "Pineknot Campground",
                    desc: "Pineknot Campground is located in the San Bernardino Mountains at Big Bear Lake. It accommodates both tents and RVs and is considered one of the best spots for mountain biking due to its proximity to ski mountain trails.",
                    images: [
                        "/whereToCamp/Pineknot campground.webp",
                        "/whereToCamp/Pineknot campground 2.webp",
                    ],
                   table: [
                        { seasonDates: "April 17, 2026 - October 17, 2026", siteType: "Standard non-electric",dailyRates:"$34", maximumStay:"14 days" },
                    ],
                    facilities: [
                        "Single-family campsites",
                        "Pets allowed",
                        "Picnic table",
                        "Campfire ring with grill",
                        "Firewood (available for purchase)",
                        "Flush toilets",
                        "Drinking water",
                        "Additional parking",
                        "Food storage locker",
                        "Trash disposal"
                    ],
                    notes: "Hookups and dump stations are not available.",
                    activities: [
                        "Hiking on multiple trails that differ in difficulty",
                        "Biking",
                        "Fishing",
                        "Boating",
                        "Camping"
                    ]
                },
                {
                    name: "Holcomb Valley Campground",
                    desc: "Holcomb Valley Campground is located about 5 miles north of Big Bear Lake, off a Forest Service road. The campground features 19 family sites, and each site can accommodate up to 8 people, making it a quiet and spacious camping option.",
                    images: [
                        "/whereToCamp/Holocomb valley campground 2.webp",
                        "/whereToCamp/holocomb valley ranch 4.webp"


                    ],
                 table: [
                        { seasonDates: "Mid-May through October", siteType: "",dailyRates:"$27 per night", maximumStay:"" },
                    ],
                    facilities: [
                        "Picnic table",
                        "Fire ring",
                        "Bear boxes",
                        "Vault toilets",
                        "Gas/Propane appliances allowed"
                    ],
                    notes: "Water is not available. Building rock fire rings is not allowed.",
                    activities: [
                        "Camping",
                        "Hiking",
                        "Wildlife viewing",
                        "Nature exploration"
                    ]
                },

                {
                    name: "Hanna Flat Campground",
                    desc: "Situated in the Southern mountains of California, Hanna Flat is a family-friendly campground with stunning sites, shaded areas, wildlife, and various bird species. Grocery stores and restaurants are about 3 miles away.",
                    images: [
                        "/whereToCamp/hanna flat campground 2.webp",
                        "/whereToCamp/Hanna flat campground.webp"
                    ],
                     table: [
                        { seasonDates: "April 17, 2026 - October 24, 2026", siteType: "Standard non-electric",dailyRates:"$33 nightly-$2/ holiday additional", maximumStay:"14 nights within a rolling 30-day period" },
                    ],
                    facilities: [
                        "Picnic table",
                        "Campfire ring with grill",
                        "Firewood vendor",
                        "Vault toilets",
                        "Trash collection",
                        "Tent pad",
                        "Drinking water",
                        "Food locker"
                    ],
                    notes: "Hookups or a dump station are not available.",
                    activities: [
                        "Swimming site",
                        "Hiking",
                        "Fishing",
                        "Boating",
                        "Biking"
                    ]
                }

            ]
        },
        {
            categoryTitle: "Campgrounds Near Big Bear (~20-30 Minutes From Our Showroom)",
            locations: [
                {
                    name: "Keller Peak Yellow Sites",
                    desc: "Keller Peak Yellow Sites (9 sites) are located near Running Springs. These sites are the best FREE options for those who want to enjoy scenic views without any hassle of reservations. Each campsite can accommodate up to 8 people and is available on a first-come, first-served basis.",
                    images: [
                        "/whereToCamp/keller peak yellow campsites 2.webp",
                        "/whereToCamp/keller peak yellow campsites.webp"
                    ],
                    stats: [
                        { label: "Number of Sites", value: "9" },
                        { label: "Max Occupancy", value: "Up to 8 people per site" },
                        { label: "Reservation", value: "First-come, first-served" }
                    ],
                    facilities: [
                        "Restrooms",
                        "Drinking water"
                    ],
                    notes: "Hookups are not available. A campfire permit is required for fire use.",
                    activities: [
                      "You can enjoy hiking or mountain biking as these sites are located near the Children’s Forest Visitor Center, the Children’s Forest exploration trail, and the Keller Peak Fire Lookout. Amenities, such as restrooms, drinking water, and hookups, are not available. You have to get a campfire permit for fire use."
                    ]
                },
                {
                    name: "Barton Flats Campground",
                    desc: "Located in the San Bernardino mountains and surrounded by pine and oak trees, Barton Flats Campground is just off the Rim of the World Scenic Byway.",
                    images: [
                        "/whereToCamp/barton flats campground 2.webp",
                        "/whereToCamp/barton flats campground 3.webp",
                    ],
                  table: [
                        { seasonDates: "April 3, 2026 - October 24, 2026", siteType: "Standard non-electric",dailyRates:"$36 nightly", maximumStay:"14 days" },
                    ],
                    facilities: [
                        "Dump station",
                        "Flush toilets",
                        "Showers",
                        "Trash collection",
                        "Drinking water",
                        "Food locker",
                        "Grills / Fire ring",
                        "Picnic table"
                    ],
                    activities: [
                        "Mountain biking on the Santa Ana River Trail",
                        "Horseback riding",
                        "Hiking",
                        "Boating",
                        "Fishing, canoeing, & kayaking in nearby Jenks Lake"
                    ]
                },
                {
                    name: "Green Valley Campground",
                    desc: "Situated near Arrowbear in the San Bernardino National Forest, Green Valley Campground is nestled between Lake Arrowhead and Big Bear Lake. Visitors can enjoy trout fishing in Green Valley Lake, which is only a mile away.",
                    images: [
                        "/whereToCamp/green valley campground 4.webp",
                        "/whereToCamp/green valley campground.webp"
                    ],
                 table: [
                        { seasonDates: "April 17, 2026-October 17, 2026", siteType: "Standard non-electric",dailyRates:"$29 daily rates-$2/holiday additional", maximumStay:"14 days" },
                    ],
                    facilities: [
                        "Drinking water",
                        "Flush toilets",
                        "Picnic table",
                        "Tent pad",
                        "Grills / Fire ring",
                        "Firewood",
                        "Drinking water (hand pump)",
                        "Pets allowed",
                        "Food storage locker"
                    ],
                    activities: [
                        "Swimming site",
                        "Hiking",
                        "Fishing",
                        "Camping",
                        "Boating"
                    ]
                }
            ]
        },
        {
            categoryTitle: "Big Bear Lake RV Parks",
            locations: [
                {
                    name: "Holloway's Marina & RV Park",
                    desc: "Holloway’s Marina & RV Park is situated on the water of Big Bear Lake in Metcalf Bay. With up to 100 sites, visitors can enjoy stunning views and easy access to Big Bear Lake and nearby attractions.",
                    images: [
                        "/whereToCamp/RV marina park 2.webp",
                        "/whereToCamp/RV marina park 3.webp"
                    ],
                    table: [
                        { seasonDates: "", siteType: "",dailyRates:"From $73 per night", maximumStay:"" },
                    ],
                    facilities: [
                        "Full hookups",
                        "Metered showers",
                        "Hot water",
                        "Laundry room",
                        "Dump station",
                        "Propane service",
                        "Clean heated buildings",
                        "Convenience store with groceries",
                        "Ice, beer & soda"
                    ],
                    activities: [
                        "In the Holloway Marina, you can enjoy boating and fishing. The park has a playground, one mile to the Alpine Slide snow play, and one & half miles to the Big Bear Village for groceries, shopping, and fine dining."
                    ]
                },
                {
                    name: "Pine Tree RV & Mobile Home Park",
                    desc: "Pine Tree RV & Mobile Home Park is situated near the northeast corner of Big Bear Lake. The park is pet-friendly and within walking distance of the public boat launch and picnic area.",
                    images: [
                        "/whereToCamp/pine tree rv park 2.webp",
                        "/whereToCamp/pine tree rv park 3.webp",

                    ],
                  table: [
                        { seasonDates: "", siteType: "",dailyRates:"$40-50 per night", maximumStay:"" },
                    ],
                    facilities: [
                        "Full hookups available (water, sewer, & electric)",
                        "Laundry room",
                        "Picnic table and fire ring",
                        "Pet-friendly",
                        "Onsite manager"
                    ],
                    activities: [
                        "Bike riding or walking in Alpine Pedal Path and Carol Morrison East Boat Ramp (¼ mile away)",
                        "The Woodlands Interpretive Trail and Discovery Center nearby",
                        "Hiking and mountain biking on national forest trails",
                        "Close to ski resorts: Snow Summit and Bear Mountain"
                    ]
                }
            ]

        }
    ];
// Quick comparison table at the top of /where-to-camp. Keep in sync with the
// cards above (prices and seasons come from their tables).
export const campgroundSummary = [
    { name: "Serrano Campground", type: "Tent & RV", price: "$44-56", hookups: "Electric & full hookup sites", season: "Late Mar - Nov" },
    { name: "Pineknot Campground", type: "Tent & RV", price: "$34", hookups: "None", season: "Mid Apr - mid Oct" },
    { name: "Holcomb Valley Campground", type: "Tent & RV", price: "$27", hookups: "None (no water)", season: "Mid May - Oct" },
    { name: "Hanna Flat Campground", type: "Tent & RV", price: "$33", hookups: "None", season: "Mid Apr - late Oct" },
    { name: "Keller Peak Yellow Sites", type: "Tent & RV", price: "Free", hookups: "None", season: "First-come, first-served" },
    { name: "Barton Flats Campground", type: "Tent & RV", price: "$36", hookups: "Dump station only", season: "Early Apr - late Oct" },
    { name: "Green Valley Campground", type: "Tent & RV", price: "$29", hookups: "None", season: "Mid Apr - mid Oct" },
    { name: "Holloway's Marina & RV Park", type: "RV park", price: "From $73", hookups: "Full hookups", season: "Check with park" },
    { name: "Pine Tree RV & Mobile Home Park", type: "RV park", price: "$40-50", hookups: "Full hookups", season: "Check with park" },
];

// Answers the Big Bear camping questions people search for (GSC).
export const campingFaqs = [
    {
        question: "Can you camp at Big Bear Lake?",
        answer: "Yes. Serrano Campground is a short walk from the north shore of Big Bear Lake, Pineknot Campground sits near the ski trails on the south side, and Holloway's Marina & RV Park and Pine Tree RV Park are right by the lake. Several more Forest Service campgrounds are within a 20-30 minute drive.",
    },
    {
        question: "What are the best campgrounds in Big Bear?",
        answer: "Serrano is the most popular for lake views and RV sites with hookups, Pineknot is best for mountain biking near the ski trails, Holcomb Valley is the quietest and most spacious, and Hanna Flat is a good shaded, family-friendly option.",
    },
    {
        question: "Which Big Bear campgrounds have RV hookups?",
        answer: "Serrano Campground has electric and full hookup RV sites. Holloway's Marina & RV Park and Pine Tree RV & Mobile Home Park both offer full hookups. Barton Flats has a dump station, and the other Forest Service campgrounds on this page have no hookups.",
    },
    {
        question: "How much does camping in Big Bear cost?",
        answer: "Forest Service campgrounds around Big Bear cost about $27 to $56 per night, with a small extra fee on holidays at some sites. RV parks with full hookups cost about $40 to $73 or more per night, and Keller Peak Yellow Sites are free. Check the campground's own site for current rates.",
    },
    {
        question: "Is there free camping near Big Bear?",
        answer: "Yes. Keller Peak Yellow Sites near Running Springs are free, first-come, first-served sites for up to 8 people each. There are no hookups, and you need a campfire permit to use fire.",
    },
    {
        question: "When is camping season in Big Bear?",
        answer: "Most campgrounds around Big Bear open between late March and May and close between mid-October and the end of November. Serrano has the longest season, from late March to late November. Most Forest Service sites have a 14-night maximum stay.",
    },
];
