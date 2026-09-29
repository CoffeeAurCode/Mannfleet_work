# Image Positioning in the Fleet Card — What We Did & Why

---

## The Original Request

You asked to "shift down" the 1st and 3rd images of the Mercedes-Benz E-Class (Monthly Lease) card.

---

## Attempt 1 — `translateY` (Wrong Approach)

The first thing I tried was CSS `transform: translateY(96px)` on the image element.

### What `translateY` actually does

Think of the image as a photo printed on paper, placed inside a box (the card). The box has `overflow: hidden`, meaning anything that sticks out of the box gets cut off.

`translateY(96px)` **physically moves that piece of paper downward by 96 pixels** inside the box.

```
Before translateY:          After translateY(96px):
┌──────────────┐            ┌──────────────┐
│ 🚗 top       │            │              │  ← 96px empty gap (no image)
│              │            │ 🚗 top       │
│ 🚗 body      │            │              │
│              │     →      │ 🚗 body      │
│ 🚗 bottom    │            │              │
└──────────────┘            │ 🚗 bottom    │  ← gets clipped by overflow:hidden
                            └──────────────┘
```

### The empty space problem

Because the image was moved DOWN, the **top 96px of the card had nothing behind it** — just the card's background color showing through. That's the "empty space at the top" you saw. The image was also losing its bottom portion, clipped by the card's `overflow: hidden`.

`translateY` is the wrong tool here because it moves the **element itself**, not the **viewport/crop** of the image.

---

## Attempt 2 — `object-position` (Correct Approach)

### What `object-position` actually does

Every image in this project uses `object-fit: cover`. This means:

- The image is **scaled up** to completely fill the card container.
- Since the image is larger than the card, some of it gets cropped.
- `object-position` controls **which part of the image is visible** — like moving a camera frame over a larger photo.

No element is being moved. The image element always fills 100% of the card. Only the **crop window** shifts.

```
The full image (larger than card):
┌──────────────────────┐
│  sky / background    │  0%
│                      │
│  🚗 roof             │  30%
│  🚗 windshield       │  50% ← center 50%
│  🚗 body             │  70% ← center 70% (final setting)
│  🚗 wheels           │
│  road                │  100% (bottom)
└──────────────────────┘

Card viewport at center 70%:
┌──────────────┐
│  🚗 roof     │  ← top of card
│  🚗 body     │
│  🚗 wheels   │  ← bottom of card
└──────────────┘
```

### How percentages work

| Value | Meaning | What you see |
|---|---|---|
| `center 0%` / `center top` | Top of image anchored to top of card | Very top of image (sky, ceiling) |
| `center 50%` | Middle of image centered in card | Middle portion of image |
| `center 70%` | 70% down the image centered in card | Upper-lower portion (where the car body is) |
| `center 100%` / `center bottom` | Bottom of image anchored to bottom of card | Very bottom of image (road, wheels) |

The card's default was `center bottom` for ALL images. Images 1 and 3 needed a different crop, so we added `imageIndexObjectPositions` — an array that lets each image in the carousel have its own `object-position` override, falling back to the card default for all others.

---

## The Final Solution

```typescript
// In the vehicle data (fleet/page.tsx)
imageObjectPosition: "center bottom",           // default for all images
imageIndexObjectPositions: ["center 70%", undefined, "center 70%"],
//                           ^ image 1       ^ image 2 (uses default)  ^ image 3
```

- Image 1 → `center 70%` (shows upper car body)
- Image 2 → `undefined` → falls back to `center bottom`
- Image 3 → `center 70%` (shows upper car body)

The `ImageCarousel` component reads `indexObjectPositions?.[currentIndex] ?? objectPosition` — meaning: use the per-image override if it exists, otherwise use the card's global position.

---

## Summary

| Approach | What it does | Problem |
|---|---|---|
| `translateY(96px)` | Moves the image element down | Creates empty space at top, clips bottom |
| `object-position: center 70%` | Shifts the crop window into the image | No empty space, no clipping, correct result |
