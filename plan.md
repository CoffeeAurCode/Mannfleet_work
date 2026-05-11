# Fleet Page — Add New Car Images

## What was found

8 new image folders exist in `public/Mann car pictures/` that are **not yet being used** by the fleet page. All 8 match vehicles already present in the fleet (currently showing Unsplash placeholder images).

---

## Mapping: folder → fleet entry

| Folder | Maps to fleet entry | Current image | Action |
|--------|--------------------|-----------------------------|--------|
| `Ertiga/` (5 imgs) | `ertiga` — Maruti Suzuki Ertiga (Economy SUV) | Unsplash | Replace |
| `Kia Carens/` (5 imgs) | `kia-carens` — Kia Carens (Economy SUV) | Unsplash | Replace |
| `Mahindra XUV 7/` (6 imgs) | `xuv700` — Mahindra XUV700 (Economy Plus SUV) | Unsplash | Replace |
| `Ford endeavor/` (6 imgs) | `ford-endeavour` — Ford Endeavour (Premium Plus SUV) | Unsplash | Replace |
| `BMW X5/` (6 imgs) | `bmw-x5` — BMW X5 (Luxury SUV) | Unsplash | Replace |
| `volvo xc90/` (7 imgs) | `volvo-xc90` — Volvo XC90 (Luxury SUV) | Unsplash | Replace |
| `range rover sport/` (6 imgs) | `range-rover-sport` — Range Rover Sport (Range Rover SUV) | Unsplash | Replace |
| `Hyundai Creta/` (6 imgs) | `sd-creta` — Hyundai Creta Self Drive | Unsplash | Replace |

> **Note on Hyundai Creta:** The Creta currently only appears as a Self Driving entry. Since the folder is provided, I will also **add a new chauffeur-driven Hyundai Creta entry** to the `SUVs` section under `ECONOMY PLUS` (between Crysta and XUV700), which is a natural fit for the car's segment. Let me know if you want a different category.

---

## Changes to `src/app/fleet/page.tsx`

### 1. Maruti Suzuki Ertiga (id: `ertiga`)
**Category:** Economy SUV  
Replace Unsplash URL with:
```
image: [
  "/Mann%20car%20pictures/Ertiga/ChatGPT%20Image%20May%204%2C%202026%2C%2009_51_52%20AM.png",
  "/Mann%20car%20pictures/Ertiga/ChatGPT%20Image%20May%205%2C%202026%2C%2001_33_07%20PM.png",
  "/Mann%20car%20pictures/Ertiga/ChatGPT%20Image%20May%205%2C%202026%2C%2001_37_10%20PM.png",
  "/Mann%20car%20pictures/Ertiga/ChatGPT%20Image%20May%205%2C%202026%2C%2001_51_20%20PM.png",
  "/Mann%20car%20pictures/Ertiga/ChatGPT%20Image%20May%205%2C%202026%2C%2001_56_20%20PM.png",
]
```

### 2. Kia Carens (id: `kia-carens`)
**Category:** Economy SUV  
Replace Unsplash URL with:
```
image: [
  "/Mann%20car%20pictures/Kia%20Carens/ChatGPT%20Image%20May%205%2C%202026%2C%2009_23_09%20PM.png",
  "/Mann%20car%20pictures/Kia%20Carens/ChatGPT%20Image%20May%205%2C%202026%2C%2009_28_23%20PM.png",
  "/Mann%20car%20pictures/Kia%20Carens/ChatGPT%20Image%20May%205%2C%202026%2C%2009_28_33%20PM.png",
  "/Mann%20car%20pictures/Kia%20Carens/ChatGPT%20Image%20May%205%2C%202026%2C%2009_28_55%20PM.png",
  "/Mann%20car%20pictures/Kia%20Carens/ChatGPT%20Image%20May%205%2C%202026%2C%2009_30_43%20PM.png",
]
```

### 3. NEW — Hyundai Creta (id: `hyundai-creta`)
**Category:** Economy Plus SUV  *(new entry — insert before XUV700)*
```
{
  id: "hyundai-creta", name: "Hyundai Creta", type: "SUVs", category: "ECONOMY PLUS",
  seating: "5 Seater Including Pilot", luggage: "433 Litres",
  image: [
    "/Mann%20car%20pictures/Hyundai%20Creta/ChatGPT%20Image%20May%206%2C%202026%2C%2004_02_53%20PM.png",
    "/Mann%20car%20pictures/Hyundai%20Creta/ChatGPT%20Image%20May%206%2C%202026%2C%2004_03_00%20PM.png",
    "/Mann%20car%20pictures/Hyundai%20Creta/ChatGPT%20Image%20May%206%2C%202026%2C%2004_03_04%20PM.png",
    "/Mann%20car%20pictures/Hyundai%20Creta/ChatGPT%20Image%20May%206%2C%202026%2C%2004_03_10%20PM.png",
    "/Mann%20car%20pictures/Hyundai%20Creta/ChatGPT%20Image%20May%206%2C%202026%2C%2004_03_13%20PM.png",
    "/Mann%20car%20pictures/Hyundai%20Creta/ChatGPT%20Image%20May%206%2C%202026%2C%2004_05_02%20PM.png",
  ],
}
```

### 4. Mahindra XUV700 (id: `xuv700`)
**Category:** Economy Plus SUV  
Replace Unsplash URL with:
```
image: [
  "/Mann%20car%20pictures/Mahindra%20XUV%207/ChatGPT%20Image%20May%206%2C%202026%2C%2002_37_02%20PM.png",
  "/Mann%20car%20pictures/Mahindra%20XUV%207/ChatGPT%20Image%20May%206%2C%202026%2C%2002_37_11%20PM.png",
  "/Mann%20car%20pictures/Mahindra%20XUV%207/ChatGPT%20Image%20May%206%2C%202026%2C%2002_37_14%20PM.png",
  "/Mann%20car%20pictures/Mahindra%20XUV%207/ChatGPT%20Image%20May%206%2C%202026%2C%2002_37_22%20PM.png",
  "/Mann%20car%20pictures/Mahindra%20XUV%207/ChatGPT%20Image%20May%206%2C%202026%2C%2002_37_26%20PM.png",
  "/Mann%20car%20pictures/Mahindra%20XUV%207/ChatGPT%20Image%20May%206%2C%202026%2C%2002_37_30%20PM.png",
]
```

### 5. Ford Endeavour (id: `ford-endeavour`)
**Category:** Premium Plus SUV  
Replace Unsplash URL with:
```
image: [
  "/Mann%20car%20pictures/Ford%20endeavor/ChatGPT%20Image%20May%206%2C%202026%2C%2002_47_28%20PM.png",
  "/Mann%20car%20pictures/Ford%20endeavor/ChatGPT%20Image%20May%206%2C%202026%2C%2002_47_33%20PM.png",
  "/Mann%20car%20pictures/Ford%20endeavor/ChatGPT%20Image%20May%206%2C%202026%2C%2002_47_50%20PM.png",
  "/Mann%20car%20pictures/Ford%20endeavor/ChatGPT%20Image%20May%206%2C%202026%2C%2002_47_55%20PM.png",
  "/Mann%20car%20pictures/Ford%20endeavor/ChatGPT%20Image%20May%206%2C%202026%2C%2002_48_01%20PM.png",
  "/Mann%20car%20pictures/Ford%20endeavor/ChatGPT%20Image%20May%206%2C%202026%2C%2002_53_49%20PM.png",
]
```

### 6. BMW X5 (id: `bmw-x5`)
**Category:** Luxury SUV  
Replace Unsplash URL with:
```
image: [
  "/Mann%20car%20pictures/BMW%20X5/ChatGPT%20Image%20May%206%2C%202026%2C%2003_03_10%20PM.png",
  "/Mann%20car%20pictures/BMW%20X5/ChatGPT%20Image%20May%206%2C%202026%2C%2003_03_14%20PM.png",
  "/Mann%20car%20pictures/BMW%20X5/ChatGPT%20Image%20May%206%2C%202026%2C%2003_03_17%20PM.png",
  "/Mann%20car%20pictures/BMW%20X5/ChatGPT%20Image%20May%206%2C%202026%2C%2003_03_21%20PM.png",
  "/Mann%20car%20pictures/BMW%20X5/ChatGPT%20Image%20May%206%2C%202026%2C%2003_03_26%20PM.png",
  "/Mann%20car%20pictures/BMW%20X5/ChatGPT%20Image%20May%206%2C%202026%2C%2003_03_32%20PM.png",
]
```

### 7. Volvo XC90 (id: `volvo-xc90`)
**Category:** Luxury SUV  
Replace Unsplash URL with:
```
image: [
  "/Mann%20car%20pictures/volvo%20xc90/ChatGPT%20Image%20May%206%2C%202026%2C%2003_34_02%20PM.png",
  "/Mann%20car%20pictures/volvo%20xc90/ChatGPT%20Image%20May%206%2C%202026%2C%2003_34_06%20PM.png",
  "/Mann%20car%20pictures/volvo%20xc90/ChatGPT%20Image%20May%206%2C%202026%2C%2003_34_10%20PM.png",
  "/Mann%20car%20pictures/volvo%20xc90/ChatGPT%20Image%20May%206%2C%202026%2C%2003_34_18%20PM.png",
  "/Mann%20car%20pictures/volvo%20xc90/ChatGPT%20Image%20May%206%2C%202026%2C%2003_34_22%20PM.png",
  "/Mann%20car%20pictures/volvo%20xc90/ChatGPT%20Image%20May%206%2C%202026%2C%2003_34_26%20PM.png",
  "/Mann%20car%20pictures/volvo%20xc90/ChatGPT%20Image%20May%206%2C%202026%2C%2003_34_31%20PM.png",
]
```

### 8. Range Rover Sport (id: `range-rover-sport`)
**Category:** Range Rover SUV  
Replace Unsplash URL with:
```
image: [
  "/Mann%20car%20pictures/range%20rover%20sport/ChatGPT%20Image%20May%206%2C%202026%2C%2003_38_23%20PM.png",
  "/Mann%20car%20pictures/range%20rover%20sport/ChatGPT%20Image%20May%206%2C%202026%2C%2003_38_44%20PM.png",
  "/Mann%20car%20pictures/range%20rover%20sport/ChatGPT%20Image%20May%206%2C%202026%2C%2003_38_48%20PM.png",
  "/Mann%20car%20pictures/range%20rover%20sport/ChatGPT%20Image%20May%206%2C%202026%2C%2003_38_52%20PM.png",
  "/Mann%20car%20pictures/range%20rover%20sport/ChatGPT%20Image%20May%206%2C%202026%2C%2003_38_56%20PM.png",
  "/Mann%20car%20pictures/range%20rover%20sport/ChatGPT%20Image%20May%206%2C%202026%2C%2003_38_59%20PM.png",
]
```

### 9. Hyundai Creta Self Drive (id: `sd-creta`)
**Category:** Self Driving  
Replace Unsplash URL with:
```
image: [
  "/Mann%20car%20pictures/Hyundai%20Creta/ChatGPT%20Image%20May%206%2C%202026%2C%2004_02_53%20PM.png",
  "/Mann%20car%20pictures/Hyundai%20Creta/ChatGPT%20Image%20May%206%2C%202026%2C%2004_03_00%20PM.png",
  "/Mann%20car%20pictures/Hyundai%20Creta/ChatGPT%20Image%20May%206%2C%202026%2C%2004_03_04%20PM.png",
  "/Mann%20car%20pictures/Hyundai%20Creta/ChatGPT%20Image%20May%206%2C%202026%2C%2004_03_10%20PM.png",
  "/Mann%20car%20pictures/Hyundai%20Creta/ChatGPT%20Image%20May%206%2C%202026%2C%2004_03_13%20PM.png",
  "/Mann%20car%20pictures/Hyundai%20Creta/ChatGPT%20Image%20May%206%2C%202026%2C%2004_05_02%20PM.png",
]
```

---

## Vehicles still without local images (no matching folder)

These will remain on Unsplash for now:
- `range-rover` — Range Rover Vogue / Autobiography / LWB
- `tempo-traveller` — Tempo Traveller

---

## Summary of changes

| Type | Count |
|------|-------|
| Unsplash URLs replaced with local images | 8 vehicles |
| New vehicle entry added (Hyundai Creta, chauffeur-driven) | 1 |
| File changed | `src/app/fleet/page.tsx` only |
