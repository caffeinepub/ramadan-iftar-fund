# Ramadan Iftar Fund

## Current State
The donation page features a single custom amount input with UPI deep link payment using UPI ID rohankhan3161@oksbi and mobile number 9382376193. The page has Islamic aesthetics with black/emerald theme, impact counters, campus initiative section, and transparency gallery.

## Requested Changes (Diff)

### Add
- Four preset donation buttons: ₹50, ₹100, ₹250, ₹500
- Device detection to show appropriate messaging for mobile vs desktop users
- Clear fallback instructions for manual UPI payment if deep link fails
- Prominent display of UPI ID and mobile number for manual payment

### Modify
- Payment section to support both preset amounts and custom amount input
- UPI deep link to use standardized format: `upi://pay?pa=rohankhan3161@oksbi&pn=Ramadan%20Iftar%20Fund&am=AMOUNT&cu=INR`
- Payment UI to be fully mobile responsive with improved button styling
- JavaScript to be clean, minimal, and handle both preset and custom amounts

### Remove
- None

## Implementation Plan
1. Update frontend payment section component with:
   - Four styled preset amount buttons (₹50, ₹100, ₹250, ₹500)
   - Custom amount input field with validation
   - UPI ID and mobile number display
   - Device-aware messaging (mobile prompt for desktop users, fallback instructions for mobile)
   - Clean JavaScript function to handle UPI deep link generation
   - Mobile-responsive flexbox layout for buttons
2. Validate frontend builds successfully

## UX Notes
- Preset buttons provide quick donation options
- Custom amount allows flexibility for any contribution
- Desktop users see clear instruction to open on mobile
- Mobile users get fallback instructions if UPI app doesn't auto-open
- UPI ID and mobile number prominently displayed for manual payment
- Clean, minimal JavaScript ensures maximum compatibility across devices
