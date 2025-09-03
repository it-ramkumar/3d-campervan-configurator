   export const TYPE_DEPENDENCIES = {
    "counter-top": ["kitchen"],
    "microwave": ["counter-top","kitchen"],
    "stove": ["counter-top","kitchen"],
    "countertop": ["counter-top","kitchen"],
    "window" : ["Popout"],
    "sink-cover" : [
    {
      type: "counter-top",
      conditions: {
        hasSink: true,
      },
    },
    "kitchen","Faucet"
  ],
  "backsplash":["kitchen"],
    "appliance" : ["kitchen"],
      "Faucet": [
    {
      type: "counter-top",
      conditions: {
        hasSink: true,
      },
    },
    "kitchen"
  ],
  "cushion":["dinette"],
  "swiveltable":["cushion"],
  "light":["dinette"],
  "showerbox":["dinette"]




  };
