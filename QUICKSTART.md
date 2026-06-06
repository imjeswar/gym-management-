# FitFlow Quick Start Guide

## Get Started in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- pnpm, npm, or yarn
- A code editor (VS Code recommended)

### 1. Installation

```bash
# Clone or navigate to the project
cd fitflow

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at **http://localhost:3000**

### 2. First Login

#### Option A: Sign Up New Account
1. Click **"Get Started"** on the landing page
2. Enter your details:
   - Full Name: Your Name
   - Email: your@email.com
   - Password: Your secure password (min 6 chars)
   - Role: Select Admin/Trainer/Member
3. Click **"Sign Up"**
4. You'll be redirected to the dashboard

#### Option B: Quick Demo
Simply explore the landing page and click through features to see the UI.

### 3. Dashboard Navigation

After logging in, you'll see the main dashboard with:
- **Key Metrics**: Total members, revenue, growth rate, active trainers
- **Charts**: Revenue trends, membership distribution
- **Quick Actions**: Links to all major features

### 4. Main Features to Try

#### Members Management
- Go to **Members** in sidebar
- Click **"Add New Member"** to create a new member profile
- View, edit, or delete member records
- Track membership status and payment history

#### Attendance Tracking
- Navigate to **Attendance**
- Generate QR codes for members
- Record check-in/check-out times
- View attendance reports

#### Progress Tracking
- Go to **Progress**
- Log member fitness metrics (weight, body fat, strength)
- View progress charts and trends
- Set fitness goals and milestones

#### Payments & Memberships
- Access **Payments** to track transaction history
- Visit **Memberships** to manage membership plans
- View revenue analytics and payment status

#### Analytics
- **Analytics Page**: Detailed charts and data visualization
- **Admin Dashboard**: Comprehensive business metrics

#### Settings
- Update your profile information
- Configure gym settings
- Manage notification preferences
- Change password and security settings

### 5. API Testing (Optional)

Test the API using curl or Postman:

```bash
# Get JWT Token (replace credentials)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com","password":"password"}'

# Get Members (use token from response)
curl -X GET http://localhost:3000/api/members \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create Member
curl -X POST http://localhost:3000/api/members \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "membershipStatus":"active",
    "membershipPlan":"standard"
  }'
```

### 6. Navigation Map

```
Landing Page (/)
├── Sign In → /auth/login
├── Sign Up → /auth/signup
└── Get Started → /auth/signup

Dashboard (/dashboard) [Protected]
├── Overview → /dashboard/
├── Members → /dashboard/members
├── Trainers → /dashboard/trainers
├── Attendance → /dashboard/attendance
├── Memberships → /dashboard/memberships
├── Payments → /dashboard/payments
├── Progress → /dashboard/progress
├── Analytics → /dashboard/analytics
├── Admin Dashboard → /dashboard/admin
└── Settings → /dashboard/settings
```

### 7. Key Keyboard Shortcuts

- `Ctrl/Cmd + K` - Open command palette (if implemented)
- `Ctrl/Cmd + /` - Toggle sidebar
- `Escape` - Close modals and dialogs

### 8. Helpful Tips

1. **Dark Theme**: The app uses a dark theme optimized for eye comfort
2. **Responsive Design**: Works on mobile, tablet, and desktop
3. **Local Storage**: Your login token is stored locally - logout to clear
4. **Data Persistence**: Mock data resets on server restart
5. **Animations**: Smooth animations throughout the app (can disable in settings)

### 9. Common Tasks

#### Add a New Member
1. Go to **Members** page
2. Click **"Add New Member"** button
3. Fill in the form:
   - Name, Email, Phone
   - Fitness Goal (optional)
   - Membership Plan (Basic/Standard/Premium)
4. Click **"Save"**

#### Record Attendance
1. Navigate to **Attendance** page
2. Click **"Generate QR Code"** for a member
3. Scan QR code with device
4. Time is automatically recorded

#### Track Progress
1. Go to **Progress** page
2. Select a member
3. Click **"Add Progress Record"**
4. Enter metrics (weight, body fat, etc.)
5. Charts update automatically

#### View Analytics
1. Visit **Analytics** page
2. Charts show:
   - Revenue trends
   - Member growth
   - Attendance patterns
   - Top trainers
   - Membership distribution

### 10. Troubleshooting

#### Server Won't Start
```bash
# Kill port 3000 if in use
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 pnpm dev
```

#### Authentication Issues
```bash
# Clear localStorage and refresh
# In browser console: localStorage.clear()
```

#### Styling Looks Wrong
```bash
# Rebuild Tailwind CSS
pnpm build

# Restart dev server
pnpm dev
```

#### Dependencies Issue
```bash
# Clear node_modules and reinstall
rm -rf node_modules
pnpm install
```

### 11. Customization

#### Change Brand Colors
Edit `/app/globals.css` and update the color variables:
```css
@theme {
  --color-primary: hsl(263 100% 57%);     /* Purple */
  --color-secondary: hsl(180 100% 50%);   /* Cyan */
  --color-accent: hsl(142 100% 46%);      /* Green */
}
```

#### Update App Name
Search and replace "FitFlow" with your gym name:
```bash
# Find and replace in all files
sed -i 's/FitFlow/Your Gym Name/g' app/**/*.tsx
```

#### Add Custom Logo
Replace the icon in components and update metadata in `app/layout.tsx`

### 12. Next Steps

1. **Deploy to Vercel**:
   ```bash
   vercel deploy
   ```

2. **Connect Real Database**:
   - Choose: MongoDB, PostgreSQL, or Supabase
   - Update `lib/db.ts` with connection string
   - Run migrations

3. **Add Payment Processing**:
   - Sign up for Stripe/PayPal
   - Update payment endpoints

4. **Enable Email Notifications**:
   - Set up SendGrid or Mailgun
   - Configure email templates

5. **Add Custom Domain**:
   - Purchase domain name
   - Configure DNS records
   - Set up SSL certificate

### 13. Documentation

- **README.md**: Comprehensive project documentation
- **PROJECT_SUMMARY.md**: Build report and architecture overview
- **API Routes**: Check `/app/api/` for endpoint details
- **Types**: See `/types/index.ts` for data structures

### 14. Support & Help

**Common Issues**:
- Check browser console for JavaScript errors
- Verify all environment variables are set
- Ensure backend server is running
- Clear cache and cookies if needed

**Useful Commands**:
```bash
# Run type checking
pnpm tsc --noEmit

# Format code
pnpm format

# Build for production
pnpm build

# Analyze bundle
pnpm build --analyze
```

### 15. Success Checklist

✅ Server is running at http://localhost:3000  
✅ Landing page loads with animations  
✅ Can sign up for new account  
✅ Can log in with credentials  
✅ Dashboard displays with charts  
✅ Can add/edit members  
✅ Can record attendance  
✅ Can track progress  
✅ Can view analytics  
✅ Responsive design works on mobile  

---

## You're All Set!

FitFlow is ready to use. Start exploring the features and managing your gym operations. For detailed information, see README.md and PROJECT_SUMMARY.md.

**Happy Gym Managing!** 🏋️
