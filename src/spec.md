# Ramadan Iftar Fund - SVU Campus Initiative

## Current State

The website currently features:
- A "Transparency & Accountability" section with expense breakdown card (lines 423-480)
- Photo gallery of meal distribution (lines 482-513)
- Premium black background with emerald gradient
- SVU student-targeted messaging throughout
- Full mobile-responsive design

## Requested Changes (Diff)

### Remove
- Entire "Transparency & Accountability" section including:
  - Section heading and description
  - Expense breakdown card (meals, packaging, platform fees)
  - All transparency-related content

### Add
- New "Our Campus, Our Initiative" section replacing the removed transparency section
  - Full-width background image/video of Swami Vivekananda University campus
  - Dark overlay (60% black opacity) for text readability
  - Heading: "An Initiative by SVU Students"
  - Subtext: "Together, we are serving Iftar meals to those in need."
  - Caption: "Swami Vivekananda University, West Bengal"
  - If video: autoplay, muted, loop, no controls, mobile-optimized

### Modify
- N/A - All other sections remain unchanged

## Implementation Plan

1. Generate a high-quality campus image (university building, campus scene with Islamic aesthetic feel)
2. Update App.tsx:
   - Remove Transparency section (lines 423-480)
   - Replace with new "Our Campus, Our Initiative" section
   - Implement full-width background image with dark overlay
   - Add centered text content with proper hierarchy
   - Maintain premium black and emerald green theme
   - Ensure mobile responsiveness
3. Keep photo gallery section intact (lines 482-513)
4. Validate build and typecheck

## UX Notes

- The new section should feel inspiring and campus-centric
- Dark overlay ensures text is always readable over the image
- Full-width design creates visual impact
- Maintains the premium aesthetic with black background and emerald accents
- Section positioned between donation and photo gallery sections
- Mobile users should see properly scaled campus imagery
