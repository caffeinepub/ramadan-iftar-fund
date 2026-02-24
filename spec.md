# Ramadan Iftar Fund

## Current State
The donation page currently has:
- Four preset donation buttons (₹50, ₹100, ₹250, ₹500)
- Custom amount input field
- UPI ID: rohankhan3161@oksbi
- QR code for UPI payments
- "Copy UPI ID" functionality

## Requested Changes (Diff)

### Add
- Single custom amount input interface as the primary donation method

### Modify
- Replace preset donation buttons with a single custom amount input field
- Change UPI ID from `rohankhan3161@oksbi` to `9382376193`
- Update payment flow to use custom amount only (minimum ₹1)
- Simplify the donation section heading and instructions

### Remove
- Four preset donation amount buttons (₹50, ₹100, ₹250, ₹500)

## Implementation Plan
1. Update donation section to show only custom amount input
2. Change UPI ID to 9382376193 across all payment links
3. Update the payment script to handle custom amounts with ₹1 minimum
4. Keep QR code and copy UPI ID features intact
5. Validate and deploy

## UX Notes
- Users now enter any amount they want (minimum ₹1)
- "Pay Now" button triggers UPI payment with entered amount
- Cleaner, more flexible donation interface
- UPI deep link opens user's payment app with pre-filled details
