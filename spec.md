# Ramadan Iftar Fund

## Current State
The donation section currently has:
- Single custom amount input field
- "Pay Now" button that triggers UPI payment with ID 9382376193
- QR code with WhatsApp Image 2026-02-25 at 05.01.09.jpeg
- Copy UPI ID button showing 9382376193
- Alternative payment methods section

## Requested Changes (Diff)

### Add
- Four preset donation amount buttons: ₹50, ₹100, ₹250, ₹500
- `payUPI(amount)` function that constructs UPI deep links with the amount parameter

### Modify
- Update UPI ID from "9382376193" to "rohankhan3161@oksbi" across:
  - Preset amount buttons UPI deep links
  - Custom amount input UPI deep links
  - Copy UPI ID button and clipboard copy
  - UPI ID display card
- Restructure donation section to show:
  1. Heading: "Support Iftar with Your Contribution"
  2. Subheading: "Select an amount or enter custom amount."
  3. Four preset amount buttons in a responsive grid
  4. Custom amount input field with "Donate" button
  5. Alternative payment methods (QR code and Copy UPI ID)

### Remove
- None

## Implementation Plan
1. Update the `payUPI` function to accept amount as parameter and use UPI ID "rohankhan3161@oksbi"
2. Add four Button components for preset amounts (₹50, ₹100, ₹250, ₹500) that call `payUPI` with respective amounts
3. Update `payCustom` function to use the updated `payUPI` function
4. Update `handleCopyUPI` to copy "rohankhan3161@oksbi" instead of "9382376193"
5. Update the UPI ID display card to show "rohankhan3161@oksbi"
6. Restructure the donation section layout to show preset buttons above custom amount input
7. Update heading to "Select an amount or enter custom amount."
8. Validate TypeScript compilation and build

## UX Notes
- Preset donation buttons provide quick one-tap payment options for common amounts
- Custom amount field allows donors flexibility to contribute any amount ≥ ₹1
- All payment buttons trigger UPI deep links that open the user's UPI app pre-filled with payment details
- The new UPI ID "rohankhan3161@oksbi" will be used across all payment flows
- Maintain premium black and emerald green theme with proper contrast
- Ensure mobile responsiveness for button grid layout
