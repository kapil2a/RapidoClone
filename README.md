<<<<<<< HEAD
# Racing Rapido 🏁

A F1 & MotoGP themed ride-hailing application built with Next.js, React, and Firebase.

## Features

- **F1 & MotoGP Themes**: Choose between Formula 1 and MotoGP racing themes
- **Real-time Tracking**: Live map tracking with racing-themed interface
- **F1 Start Light Sequence**: Authentic F1 start procedure simulation
- **User Authentication**: Firebase authentication with Google sign-in
- **Racing Statistics**: Track your racing performance and earn badges
- **Responsive Design**: Beautiful UI optimized for all devices

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom racing themes
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Icons**: Lucide React
- **Fonts**: Orbitron (racing), Rajdhani (speed), Inter

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Firebase**
   - Create a Firebase project
   - Enable Authentication and Firestore
   - Copy your Firebase config to `.env.local`

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Application**
   - Navigate to `http://localhost:3000`

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── login/             # Authentication pages
│   ├── Ride/              # Ride booking pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   └── Ride/             # Ride-specific components
├── context/              # React context providers
├── lib/                  # Utility libraries
├── types/                # TypeScript type definitions
└── app/global.css        # Global styles
```

## Key Components

- **RacingStartLight**: F1-style start light sequence
- **MapView**: Interactive racing-themed map
- **Navbar**: Navigation with racing theme
- **AuthContext**: Firebase authentication management

## Racing Features

- **F1 Start Procedure**: 5-light sequence simulation
- **Live Tracking**: Real-time driver location updates
- **Racing Stats**: Performance tracking and badges
- **Theme Switching**: F1 vs MotoGP visual themes

## Environment Variables

Create a `.env.local` file with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Racing Themes

### F1 Theme
- Red color scheme (#E10600)
- Formula 1 car icons (🏎️)
- Mercedes-inspired styling

### MotoGP Theme
- Neon green color scheme (#00FF00)
- Motorcycle icons (🏍️)
- Yamaha-inspired styling

---

**Ready to race? Start your engines! 🏁**
=======
# RapidoClone
>>>>>>> 566bbc005880866e3f5580b00151c40d6c527fc3
