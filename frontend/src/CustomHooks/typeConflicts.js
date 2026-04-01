export const TYPE_CONFLICTS = {
  "wall-ceiling-door-panel": [
    "ceiling",
    "wall-panel",
    "wall-ceiling",
    "door-panel",
  ],
  "wall-ceiling": ["ceiling", "wall-panel", "wall-ceiling", "wall-ceiling-door-panel"],
  "ceiling": ["wall-ceiling-door-panel", "wall-ceiling", "ceiling"],
  "wall-panel": ["wall-ceiling-door-panel", "wall-ceiling", "wall-panel"],
  "door-panel": ["wall-ceiling-door-panel", "door-panel"],
  "carrier":["storage-box-r","bicycle-l","storage-box-toper-r" ],

   "bicycle-l" :["carrier","storage-box-r","storage-box-toper-r","bicycle-r"],
   "storage-box-r":["carrier","bicycle-l"],
   "bicycle-r" :["bicycle-l","storage-box-l","storage-box"],
   "storage-box" :["bicycle-r","storage-box-thule"],
   "storage-box-thule" :["storage-box"],

};