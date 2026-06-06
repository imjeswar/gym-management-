# FitFlow Gym - Single Page Portfolio

A beautiful, responsive single-page portfolio website for FitFlow Gym with stunning gym imagery and smooth animations.

## Features

- **Single Page Design**: All content on one beautiful scrolling page
- **Gym Imagery**: Professional photos of gym equipment, training, and group classes
- **Smooth Animations**: Framer Motion animations on images and text
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark Theme**: Modern dark theme with purple, cyan, and green accents
- **Glass Morphism**: Modern UI components with glass effect
- **Interactive Elements**: Hover effects and transitions throughout

## Sections

1. **Navigation Bar** - Fixed header with logo and contact button
2. **Hero Section** - Title, description, and call-to-action buttons with gym hero image
3. **Stats Section** - Key metrics (5K+ members, 50+ trainers, 99.9% satisfaction, 24/7 access)
4. **Services Section** - Four services with images:
   - Personal Training (trainer.png)
   - State-of-the-Art Equipment (cardio.png)
   - Group Classes (group-class.png)
   - Nutrition Guidance
5. **Call-to-Action Section** - Contact information section
6. **Footer** - Links and copyright information

## Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component

## Images

The portfolio includes four professionally generated gym images:

- `public/gym-hero.png` - Modern gym interior with equipment and people
- `public/trainer.png` - Personal trainer helping client with weights
- `public/cardio.png` - Cardio area with treadmills and equipment
- `public/group-class.png` - Group fitness class with instructor

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open http://localhost:3000 in your browser
```

## Customization

- **Colors**: Edit the CSS variables in `app/globals.css`
- **Text**: Edit the content in `app/page.tsx`
- **Images**: Replace images in `public/` folder
- **Contact Info**: Update phone and email in the CTA section

## Color Scheme

- **Primary**: #7C3AED (Purple)
- **Secondary**: #06B6D4 (Cyan)
- **Accent**: #22C55E (Green)
- **Background**: #0F172A (Dark Navy)
- **Foreground**: #F8FAFC (Off-white)

## Animation Features

- Fade-in animations on page load
- Staggered animations for lists
- Image zoom effects on hover
- Smooth scroll animations
- Element animations on viewport entry

## Deployment

Deploy to Vercel:

```bash
vercel deploy
```

Or any Node.js hosting platform that supports Next.js.

## License

© 2026 FitFlow Gym. All rights reserved.
