# FitFlow - Premium Gym Management SaaS Platform

A comprehensive, production-ready SaaS platform for gym owners and fitness professionals to manage members, trainers, memberships, attendance, payments, and progress tracking with beautiful, modern UI.

## Features

### Core Management
- **Member Management**: Add, edit, delete, and manage gym members with detailed profiles
- **Trainer Management**: Manage trainer profiles, certifications, and assign them to members
- **Membership Management**: Create and manage different membership plans (Basic, Standard, Premium) with automatic renewal tracking
- **Attendance Tracking**: QR code-based check-in/check-out system with real-time attendance reports
- **Progress Tracking**: Track member progress with weight, body fat, and strength metrics with visual charts

### Business Operations
- **Payment Management**: Dummy payment system UI with realistic transaction handling and history
- **Analytics Dashboard**: Comprehensive admin dashboard with revenue analytics, membership distribution, and attendance trends
- **Admin Controls**: Full admin dashboard with system-wide analytics and member/payment insights
- **Notifications**: Real-time notification system with customizable alerts for key events

### User Experience
- **Beautiful Landing Page**: Modern, animated landing page with feature showcase
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Dark Theme**: Premium dark theme with purple/cyan/green color scheme
- **Smooth Animations**: Framer Motion animations throughout the app for polished UX
- **Role-Based Access**: Admin, Trainer, and Member roles with different permission levels

## Tech Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **React**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 with custom theme
- **Animations**: Framer Motion
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **QR Code**: qrcode.react for attendance tracking

### Backend
- **Runtime**: Node.js
- **API Routes**: Next.js API Routes
- **Authentication**: JWT with bcryptjs password hashing
- **Database**: In-memory store (demo) with TypeScript interfaces for real database integration
- **Validation**: Custom validation utilities

### Development
- **Language**: TypeScript
- **Build Tool**: Next.js built-in
- **Package Manager**: pnpm

## Project Structure

```
/vercel/share/v0-project/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── auth/                    # Authentication pages
│   │   ├── signup/
│   │   └── login/
│   ├── api/                     # API routes
│   │   ├── auth/
│   │   ├── members/
│   │   ├── trainers/
│   │   ├── attendance/
│   │   ├── progress/
│   │   └── payments/
│   └── dashboard/               # Dashboard pages
│       ├── page.tsx             # Main dashboard
│       ├── layout.tsx
│       ├── members/
│       ├── trainers/
│       ├── attendance/
│       ├── memberships/
│       ├── payments/
│       ├── progress/
│       ├── analytics/
│       ├── admin/
│       ├── settings/
│       └── notifications/
├── components/
│   ├── auth/                    # Auth components
│   └── dashboard/               # Dashboard components
├── lib/
│   ├── auth.ts                  # Authentication utilities
│   ├── db.ts                    # Database operations (demo)
│   ├── constants.ts             # App constants
│   └── api-handler.ts           # API error handling
├── types/
│   └── index.ts                 # TypeScript type definitions
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

## Getting Started

### Prerequisites
- Node.js 18+ or bun
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fitflow
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables (if needed):
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Landing Page
Visit the homepage to see the beautiful marketing site with feature showcase and call-to-action buttons.

### Authentication
- **Sign Up**: Create a new account at `/auth/signup` with role selection (Admin/Trainer/Member)
- **Sign In**: Log in with credentials at `/auth/login`
- **Token Storage**: JWT tokens are stored in localStorage for session management

### Dashboard
After authentication, access the main dashboard at `/dashboard` with:
- Overview cards with key metrics
- Member and payment analytics
- Recent activity feed
- Quick action buttons

### Core Modules

#### Members (`/dashboard/members`)
- View all members in a data table
- Add new members with profile information
- Edit member details
- Delete members
- Filter and search members

#### Trainers (`/dashboard/trainers`)
- Manage trainer profiles
- Assign trainers to members
- Track trainer certifications
- View trainer schedules

#### Attendance (`/dashboard/attendance`)
- Generate QR codes for members
- Track daily check-ins/check-outs
- View attendance reports
- Generate attendance analytics

#### Memberships (`/dashboard/memberships`)
- Create and manage membership plans
- Track membership renewals
- Manage member subscriptions
- Monitor expiring memberships

#### Payments (`/dashboard/payments`)
- Process and record payments (demo)
- View payment history
- Generate invoices
- Track revenue

#### Progress (`/dashboard/progress`)
- Track member fitness metrics (weight, body fat, etc.)
- View progress charts
- Record milestones
- Generate progress reports

#### Analytics (`/dashboard/analytics`)
- View comprehensive analytics dashboards
- Revenue charts and reports
- Member growth trends
- Attendance statistics

#### Admin Dashboard (`/dashboard/admin`)
- System-wide analytics
- Revenue vs. Expenses charts
- Membership distribution pie chart
- Weekly attendance trends
- System alerts and notifications

#### Settings (`/dashboard/settings`)
- Update profile information
- Gym settings management
- Notification preferences
- Security settings
- Change password

#### Notifications (`/dashboard/notifications`)
- View all system notifications
- Mark notifications as read
- Delete notifications
- Filter notifications by type

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/validate` - Validate token

### Members
- `GET /api/members` - Get all members
- `POST /api/members` - Create new member
- `GET /api/members/[id]` - Get member details
- `PUT /api/members/[id]` - Update member
- `DELETE /api/members/[id]` - Delete member

### Trainers
- `GET /api/trainers` - Get all trainers
- `POST /api/trainers` - Create new trainer

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Create attendance record

### Progress
- `GET /api/progress` - Get progress records
- `POST /api/progress` - Create progress record

### Payments
- `GET /api/payments` - Get payment records
- `POST /api/payments` - Create payment record

## Authentication & Security

### Security Features
- Password hashing with bcryptjs (10 salt rounds)
- JWT token-based authentication
- Secure token storage in localStorage
- CORS enabled for API routes
- Input validation on all endpoints
- Role-based access control

### Default Credentials (Demo)
```
Email: demo@fitflow.com
Password: Demo@123
Role: Admin
```

## Color Scheme

The application uses a carefully chosen color palette:
- **Primary**: Purple (#7C3AED) - Brand primary color
- **Secondary**: Cyan (#06B6D4) - Accent color
- **Accent**: Green (#22C55E) - Success/positive color
- **Background**: Dark gray (#0F172A) - Main background
- **Foreground**: Light gray (#F8FAFC) - Text color

## Responsive Design

The app is fully responsive with breakpoints for:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

All components use Tailwind CSS responsive utilities for optimal display on any device.

## Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- Lazy loading of components
- Efficient state management
- Caching strategies for API responses

## Deployment

### Deploy to Vercel (Recommended)
```bash
vercel deploy
```

### Deploy to Other Platforms
The project is a standard Next.js application and can be deployed to:
- AWS Amplify
- Netlify
- Railway
- Heroku
- Any platform supporting Node.js

## Future Enhancements

- Real database integration (MongoDB, PostgreSQL, etc.)
- Stripe payment integration
- Email notifications
- Mobile app (React Native)
- Advanced reporting
- Bulk member import/export
- Calendar integration
- Video tutorials
- Live chat support
- SMS notifications

## Contributing

Contributions are welcome! Please follow the existing code style and structure.

## License

This project is licensed under the MIT License.

## Support

For support, please contact support@fitflow.com or open an issue on GitHub.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Animated with [Framer Motion](https://www.framer.com/motion)
- Charts by [Recharts](https://recharts.org)
- Icons from [Lucide React](https://lucide.dev)

---

**FitFlow v1.0** - Premium Gym Management Platform
