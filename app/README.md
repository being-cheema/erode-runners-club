# Erode Runners Club Mobile App

A modern Progressive Web App (PWA) built with React, TypeScript, and Tailwind CSS for the Erode Runners Club community.

## Features

- 📱 **Progressive Web App** - Installable on mobile and desktop
- 🌓 **Dark/Light Mode** - Multiple theme options (default, blue, green, purple)
- 🏃‍♂️ **Activity Tracking** - Dashboard for runners with statistics
- 📊 **Advanced Charts** - Comprehensive data visualization with Recharts
- 👥 **Community Features** - Leaderboards, blogs, and social features
- 🏆 **Race Calendar** - Upcoming events and race tracking
- 💪 **Training Plans** - Personalized training programs
- 🔔 **Notifications** - Push notifications for updates
- 📴 **Offline Support** - Works offline with service worker

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with CSS variables
- **Build Tool**: Vite
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Motion (Framer Motion)
- **PWA**: Vite PWA plugin with Workbox

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd erode-runners-club-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── components/          # React components
│   ├── ui/             # Reusable UI components (Radix UI)
│   ├── figma/          # Figma-exported components
│   └── *.tsx           # Main app components
├── src/                # Source files
│   └── main.tsx        # App entry point
├── public/             # Static assets
│   ├── manifest.json   # PWA manifest
│   ├── sw.js          # Service worker
│   └── icons/         # PWA icons
├── styles/            # Global styles
│   └── globals.css    # CSS variables and base styles
├── App.tsx            # Main app component
└── index.html         # HTML template
```

## Key Components

- **App.tsx** - Main application with routing logic
- **Dashboard** - User dashboard with activity overview
- **Profile** - User profile management
- **Statistics** - Running statistics and charts
- **RaceCalendar** - Race events and calendar
- **Leaderboard** - Community rankings
- **TrainingPlans** - Training program management
- **Settings** - App preferences and theme settings

## Theming

The app supports multiple themes:
- Light/Dark mode toggle
- Color schemes: Default (black), Blue, Green, Purple
- CSS variables for easy customization

## PWA Features

- Installable on mobile devices
- Offline functionality
- Push notifications
- Background sync
- Fast loading with service worker caching

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Component Development

All UI components are built with:
- Radix UI primitives for accessibility
- Tailwind CSS for styling
- TypeScript for type safety
- Motion for animations

## License

This project is part of the Erode Runners Club community.

## Contributing

Please read the contribution guidelines in the `guidelines/` directory before submitting pull requests.