  export const campgrounds = [
        {
            categoryTitle: "Campgrounds Closest to Our Showroom (~20 minutes Drive)",
            locations: [
                {
                    name: "Serrano Campground",
                    desc: "Located in the San Bernardino mountains, Serrano is the most popular campground for enjoying the scenic views of Big Bear Lake. At a walking distance from Big Bear Lake, this campground offers you access to multiple outdoor activities.",
                    images: [
                        "/whereToCamp/Serrano campground.webp",
                         "/whereToCamp/Serrano.webp"

                    ],
                    table: [
                        { seasonDates: "March 7, 2025 - November 29, 2025", siteType: "Standard non-electric",dailyRates:"$44 nightly- $2/holiday additional", maximumStay:"14 nights within a rolling 30-day period" },
                        { seasonDates: "March 27, 2026 - November 29, 2026", siteType: "RV electric", dailyRates:"$56 nightly",maximumStay:"" },
                    ],
                    facilities: ["Various sites for RV camping", "Full hookups (sewer, water, electricity)", "A dump station ($10 fee)", "Picnic tables", "Campfire rings with grills","Flush toilets & showers","Drinking water","Firewood vendor","Food storage locker"],
                    activities: ["Boating", "Fishing", "Hiking", "Mountain biking","Canoeing", "Water sports","Ranger station"]
                },
                {
                    name: "Pineknot Campground",
                    desc: "Pineknot Campground is located in the San Bernardino Mountains at Big Bear Lake. It accommodates both tents and RVs and is considered one of the best spots for mountain biking due to its proximity to ski mountain trails.",
                    images: [
                        "/whereToCamp/pine tree rv park 2.webp",
                        "/whereToCamp/pine tree rv park 3.webp",


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
                        { seasonDates: "Mid-May through October", siteType: "",dailyRates:"$27", maximumStay:"Per Night" },
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
                        { seasonDates: "April 17, 2026 - October 24, 2026", siteType: "Standard non-electric",dailyRates:"$33 nightly-$2/ holiday additional", maximumStay:"14 nights within a rolling 30-period" },
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
            categoryTitle: "Campgrounds at ~ 20-30 minutes Drive From Our Showroom",
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
            categoryTitle: "RV Parks",
            locations: [
                {
                    name: "Holloway's Marina & RV Park",
                    desc: "Holloway’s Marina & RV Park is situated on the water of Big Bear Lake in Metacalf Bay. With up to 100 sites, visitors can enjoy stunning views and easy access to Big Bear Lake and nearby attractions.",
                    images: [
                        "/whereToCamp/RV marina park 2.webp",
                        "/whereToCamp/RV marina park 3.webp"
                    ],
                    table: [
                        { seasonDates: "", siteType: "",dailyRates:"Starting at $73", maximumStay:"Per Night" },
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
                        { seasonDates: "", siteType: "",dailyRates:"$40-50", maximumStay:"For Guest" },
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