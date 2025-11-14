export const formQuestions = [
  {
    step: 1,
    title: "Travel Info",
    questions: [
      {
        id: "plans",
        question: "What are your plans for the van?",
         inputType: "radio",
        options: [
          "Full time van living",
          "Weekend and short trips",
          "Use for business",
          "No clue yet",
        ],
      },
      {
        id: "people",
        question: "How many people will typically travel in your van?",
        inputType: "radio",
        options: ["1-2 people", "3-4 people", "5-6", "more than 6"],
      },
    ],
  },
  {
    step: 2,
    title: "Van Preferences",
    questions: [
      {
        id: "vanSize",
        question: "Do you prefer a short or a long van?",
        inputType: "radio",
        options: [
          "short (Sprinter 144 or Transit 148 or ProMaster 136)",
          "long (Sprinter 170 or Transit 148ext or ProMaster 159)",
          "super long (Sprinter 170ext)",
          "I am not sure yet",
        ],
      },
      {
        id: "ac",
        question: "Do you need an A/C unit?",
        inputType: "radio",
        options: [
          "Yes, a 12v one being able to work off the grid",
          "Yes, a 110v one and I will use it while connected to shore power only",
          "No, I don't need A/C",
          "I'd rather have 2 roof fans",
        ],
      },
      {
        id: "shower",
        question: "What best describes your shower needs?",
        inputType: "radio",
        options: [
          "Indoor full standing proper bathroom",
          "Indoor pop up or folding hidden shower",
          "Outdoor rear shower is fine",
          "I don't need one",
        ],
      },
    ],
  },
  {
    step: 3,
    title: "Comfort & Utilities",
    questions: [
      {
        id: "electrical",
        question: "What best describes your electrical needs?",
        inputType: "radio",
        options: [
          "I just need to charge my electronics and run the fridge",
          "I want to use A/C, induction, microwave, hairdryer, etc.",
          "I want to live off the grid for as long as possible",
        ],
      },
      {
        id: "heating",
        question: "What heating system do you plan on?",
        inputType: "radio",
        options: [
          "advanced glycol combined water and air heater",
          "diesel air heater under the passenger seat and 110v water heater",
          "diesel air heater under the passenger seat and 12v water heater",
          "not that important right now",
        ],
      },
    ],
  },
  {
    step: 4,
    title: "Final Details",
    questions: [
      {
        id: "sleeping",
        question: "What are your sleeping arrangements?",
        options: [
          "Stationary bed with garage storage area underneath",
          "Electric bed that goes up and down with dinette below",
          "Seating benches and a table that transform to bed",
          "Murphy fold away bed",
        ],
      },
      {
        id: "haveVan",
        question: "Do you have a van?",
        inputType: "radio",
        options: [
          "Yes, I have a van already",
          "No, I need your help to source one",
          "I want to purchase a ready to go camper van",
          "I am currently in the initial stages of gathering information",
        ],
      },
      {
        id: "roads",
        question: "Where are you taking your van?",
        inputType: "radio",
        options: [
          "I drive mostly on paved roads and RWD van is fine",
          "I am going off-road and drive when it is snowing. I need AWD",
          "I am not sure yet",
        ],
      },
      {
        id: "budget",
        question: "Separate from the van purchase, how much for the build-out?",
        inputType: "radio",
        options: ["$79K - $99K", "$100K - $119K", "$120K+"],
      },
      {
        id: "payment",
        question: "How are you paying for the van and conversion?",
         inputType: "radio",
        options: [
          "Finance just the Van and pay cash for conversion",
          "Pay cash for both Van and conversion",
          "I am still figuring that out",
        ],
      },
    ],
  },
  { step: 5, title: "Summary", questions: [] },
  {
    step: 6,
    title: "Contact Info",

    questions: [
      {
        id: "phone",
        question: "Please leave your phone number below (OPTIONAL)",
        type: "text",
        placeholder: "Phone Number",
      },
      {
        id: "email",
        question: "OR leave your e-mail address below",
        type: "email",
        placeholder: "Email Address",
      },
    ],
  },
];