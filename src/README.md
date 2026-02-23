# Ramadan Iftar Fund - Donation Landing Page

A production-ready, mobile-responsive donation platform for Ramadan Iftar meal distribution, built on the Internet Computer blockchain.

## Features

### 🎨 Design System
- **Islamic Aesthetic**: Soft teal-green (#4A9B7F) and warm gold (#D4AF37) color palette
- **Typography**: Merriweather serif for headlines, Inter for body text
- **Responsive**: Mobile-first design tested at 375px, 768px, and 1440px breakpoints
- **Dark Mode**: Full light and dark mode support with custom tokens

### 📊 Live Impact Counter
- Real-time statistics fetched from blockchain backend
- Animated counters with smooth easing
- Three key metrics:
  - Total Amount Raised (₹)
  - Meals Sponsored (auto-calculated at ₹50/meal)
  - Target Progress (toward 1000 meals goal)
- Progress bar visualization with crescent moon aesthetic

### 💳 Multiple Donation Methods
1. **UPI QR Code**: Scan and pay via any UPI app
2. **UPI ID**: Copy-paste functionality with toast notifications
3. **Razorpay**: Placeholder for card payment integration

### 🔍 Transparency Section
- **Expense Breakdown**: Detailed cost per meal (₹40 food + ₹8 logistics + ₹2 platform)
- **100% Guarantee**: All donations go directly to meal distribution
- **Daily Reports**: Section for upcoming meal distribution updates
- **Photo Gallery**: Visual proof of meal distribution on the ground

### 🌙 Interactive Elements
- Animated Islamic geometric pattern overlay on hero
- Smooth scroll animations with staggered reveals
- Scroll progress indicator at top
- Copy-to-clipboard functionality with visual feedback
- Loading states for all async operations

## Technical Stack

### Frontend
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS with OKLCH color tokens
- **UI Components**: shadcn/ui (Radix primitives)
- **State Management**: TanStack React Query for server state
- **Animations**: Custom CSS animations + react-countup style counters
- **Icons**: Lucide React

### Backend
- **Platform**: Internet Computer (Motoko canister)
- **Storage**: Stable storage with pre/post upgrade hooks
- **API**: 5 query/update functions for campaign management

## Project Structure

```
src/
├── frontend/
│   ├── src/
│   │   ├── App.tsx              # Main landing page component
│   │   ├── components/
│   │   │   ├── AnimatedCounter.tsx  # Smooth counter animation
│   │   │   └── ui/              # shadcn components (read-only)
│   │   ├── hooks/
│   │   │   ├── useQueries.ts    # React Query hooks
│   │   │   ├── useActor.ts      # Backend actor hook
│   │   │   └── useInternetIdentity.ts
│   │   ├── backend.d.ts         # TypeScript types (generated)
│   │   └── backend.ts           # Actor wrapper (generated)
│   ├── index.css                # Custom OKLCH design tokens
│   └── tailwind.config.js       # Extended theme config
└── backend/
    └── main.mo                  # Motoko smart contract

public/
└── assets/
    └── generated/               # Generated images
        ├── hero-pattern.jpg     # Islamic geometric background
        ├── upi-qr-placeholder.png
        └── meal-distribution-*.jpg (4 photos)
```

## Backend API

### Types
```typescript
type Donation = {
  amount: bigint;
  timestamp: bigint;
}

type CampaignStats = {
  totalAmount: bigint;
  mealsSponsored: bigint;
  targetMeals: bigint;
  percentageComplete: number;
}
```

### Functions
- `makeDonation(amount: bigint): Promise<void>` - Record a donation
- `getTotalAmountRaised(): Promise<bigint>` - Get total raised
- `getMealsSponsored(): Promise<bigint>` - Calculate meals count
- `getCampaignStats(): Promise<CampaignStats>` - Get all statistics
- `getAllDonations(): Promise<Donation[]>` - Fetch all donations

## Design Decisions

### Color Philosophy
- **Primary (Soft Green)**: Represents Islam, peace, and growth
- **Accent (Gold)**: Signifies generosity and premium quality
- **Background (Cream/Ivory)**: Warm, welcoming, non-clinical charity aesthetic
- **Dark Mode (Deep Teal)**: Maintains Islamic green theme in darker context

### Animation Strategy
1. **Hero load**: Fade-in-up with staggered delay
2. **Counter animation**: Smooth easeOutExpo over 2 seconds
3. **Scroll progress**: Real-time bar at top of page
4. **Hover states**: Scale transformations for cards and buttons

### Accessibility
- Semantic HTML (`<section>`, `<header>`, `<footer>`)
- ARIA labels on interactive elements
- Keyboard navigation support (inherited from shadcn/ui)
- AA+ contrast ratios in both light and dark modes
- Focus-visible rings on all interactive elements

### Performance
- Image optimization (WebP where possible, responsive sizes)
- React Query caching (30s refetch interval for stats)
- Optimistic UI updates with rollback on error
- Lazy loading for below-fold images
- CSS-only animations (no JavaScript reflows)

## Running Locally

```bash
# Install dependencies
pnpm install

# Start local replica (backend)
dfx start --background
dfx deploy

# Start frontend dev server
cd src/frontend
pnpm dev
```

## Production Build

```bash
# Type checking
pnpm --filter '@caffeine/template-frontend' typescript-check

# Linting
pnpm --filter '@caffeine/template-frontend' lint

# Build
pnpm --filter '@caffeine/template-frontend' build:skip-bindings
```

## Future Enhancements

- [ ] Razorpay payment gateway integration
- [ ] Email receipts for donations
- [ ] Daily meal distribution reports with photos
- [ ] Donor leaderboard
- [ ] Social sharing functionality
- [ ] Multi-language support (English, Arabic, Urdu)
- [ ] SMS notifications for campaign milestones

## License

Built with ❤️ using [caffeine.ai](https://caffeine.ai)

---

**Disclaimer**: This is a demonstration website. For actual donations, please verify the authenticity of the organization and payment details.
