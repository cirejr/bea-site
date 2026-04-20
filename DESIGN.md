# Design System Strategy: The Academic Architect

## 1. Overview & Creative North Star
The "Creative North Star" for this design system is **The Academic Architect**. This vision moves away from the sterile, "template-first" look of modern SaaS and instead embraces a high-end editorial feel that balances the prestige of a global institution with the sharp, forward-leaning precision of modern architecture.

By utilizing high-contrast typography scales and intentional asymmetry, the system creates a signature visual rhythm. We do not simply "place" content; we curate it within a landscape of vibrant azure depths and glass-like surfaces. The layout should feel like a premium digital blueprint—structured yet airy, authoritative yet transparent.

---

## 2. Colors & Tonal Depth
Our palette is a study in "Blue on Blue" depth, utilizing the vibrant **Logo Blue (#007AFF)** as the heartbeat of the interface.

*   **The "No-Line" Rule:** To achieve a premium, seamless aesthetic, 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined through tonal shifts. Transitions between `surface` (#f6faff) and `surface_container_low` (#edf4fc) provide the structural logic without the visual "noise" of lines.
*   **Surface Hierarchy & Nesting:** Treat the UI as physical layers of frosted glass. Use `surface_container_lowest` (#ffffff) for high-priority cards resting on a `surface_container` (#e8eff7) background. This creates a "natural" lift.
*   **The "Glass & Gradient" Rule:** Floating elements (modals, dropdowns, navigation bars) should utilize Glassmorphism. Apply a backdrop-blur (12px–20px) to semi-transparent surface colors to allow the underlying azure tones to bleed through.
*   **Signature Textures:** For Hero sections and primary CTAs, use a subtle linear gradient transitioning from `primary` (#0058bc) to `primary_container` (#0070eb) at a 135-degree angle. This adds a "lithographic" quality that flat colors lack.

---

## 3. Typography
The typography strategy relies on the tension between the modern geometric stability of **Inter** and the intellectual heritage of **Noto Serif**.

*   **Display & Headlines (Inter):** All `display` and `headline` scales must use the `primary` (#007AFF) token. This reinforces the "Logo-First" identity. The large scale of `display-lg` (3.5rem) should be used to anchor pages, often with intentional negative space to its left or right.
*   **Body & Titles (Noto Serif):** Body text utilizes Noto Serif to evoke academic rigor and readability. The transition from an Inter headline to a Noto Serif body creates a sophisticated "Editorial" feel.
*   **Labels (Inter):** Functional text (captions, labels, overlines) returns to Inter in `secondary` (#5e5e5d) or the Silver accent (#E5E4E2) to maintain a technical, architectural "blueprint" look.

---

## 4. Elevation & Depth
Depth in this system is achieved through **Tonal Layering** rather than traditional drop shadows.

*   **The Layering Principle:** Stack your containers. An inner card should use `surface_container_lowest` (#ffffff) when placed inside a `surface_container_low` (#edf4fc) wrapper. The contrast is subtle but enough for the eye to perceive hierarchy.
*   **Ambient Shadows:** Where a floating effect is mandatory (e.g., a primary FAB), use an extra-diffused shadow.
    *   *Logic:* Blur: 32px, Spread: -4px, Opacity: 6% of `on_surface`.
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use the `outline_variant` at 15% opacity. Never use a 100% opaque border.
*   **The Arrow Motif:** Use the B.E.A. arrow motif as a repeating watermark in `primary_container` (#003366) at 5% opacity within large dark-themed containers to provide a bespoke, branded texture.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` (#007AFF) background with `on_primary` (#ffffff) text. Use `ROUND_FOUR` (1rem) for all corners. No border.
*   **Secondary:** `surface_container_highest` background with `primary` text. This provides a "soft" alternative to the vibrant primary button.
*   **Tertiary (Ghost):** No background. Use `primary` text and the Silver accent (#E5E4E2) for the icon stroke.

### Cards & Lists
*   **Cards:** Forbid divider lines. Separate content using the Spacing Scale (minimum 24px) or by nesting a `surface_container_lowest` block inside the card for specific metadata.
*   **Lists:** Use a subtle background change on hover (`surface_container_high`) rather than a separator line.

### Input Fields
*   **States:** Background should be `surface_container_low`. On focus, transition the background to `surface_container_lowest` and add a 2px "Ghost Border" using the `primary` color at 30% opacity.
*   **Typography:** Labels must be `label-md` in Inter.

### Chips
*   Use `secondary_container` for the background with `on_secondary_container` for text. The silver accent (#E5E4E2) should be used for the close/action icons within the chip.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical margins to create an "Editorial" layout.
*   **Do** use the Silver accent (#E5E4E2) for hairline icon strokes to mimic architectural steel.
*   **Do** lean into "Deep Azure" (`primary_container`) for footer or sidebar backgrounds to create a sense of institutional groundedness.
*   **Do** ensure a minimum of 32px of white space between major "No-Line" sections.

### Don't:
*   **Don't** use black (#000000) for text; always use `on_surface` (#151c22) for a softer, more premium contrast.
*   **Don't** use standard "drop shadows" on cards; stick to Tonal Layering.
*   **Don't** use Noto Serif for headlines; it is reserved for the "narrative" body text.
*   **Don't** use navy or grey-scale for containers; always tint your neutrals with Azure to maintain the Logo-First identity.