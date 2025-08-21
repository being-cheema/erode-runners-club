# 🏃‍♂️ Erode Runners Club

> **Join the community of passionate runners in Erode and track your fitness journey with our comprehensive mobile and web application.**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![PWA Ready](https://img.shields.io/badge/PWA-ready-blue)]()
[![Android App](https://img.shields.io/badge/Android-APK%20Available-green)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2+-blue)]()
[![React](https://img.shields.io/badge/React-18+-blue)]()

## 📱 Overview

Erode Runners Club is a modern, feature-rich Progressive Web App (PWA) and mobile application designed for the running community in Erode. Built with cutting-edge web technologies, it provides a seamless experience across all devices - from desktop browsers to mobile phones.

### 🌟 Key Highlights

- **🏃‍♂️ Community-Driven**: Built specifically for Erode's running community
- **📱 Cross-Platform**: Works on web, mobile, and as a native Android app
- **🌓 Multiple Themes**: Support for light/dark modes and color schemes
- **📊 Advanced Analytics**: Comprehensive running statistics and performance tracking
- **🏆 Gamification**: Leaderboards, achievements, and race tracking
- **📴 Offline Ready**: Full PWA capabilities with offline functionality

## 🚀 Features

### Core Features
- **📊 Dashboard**: Personalized running dashboard with quick stats and upcoming events
- **🏃‍♂️ Activity Tracking**: Monitor runs, distance, pace, and performance metrics
- **📅 Race Calendar**: View and register for upcoming races and events
- **📈 Statistics**: Detailed analytics with charts and progress tracking
- **🏆 Leaderboard**: Community rankings and competitive features
- **📝 Blog System**: Community articles, tips, and running guides
- **💪 Training Plans**: Personalized training programs and schedules
- **👤 Profile Management**: User profiles with achievements and history
- **⚙️ Settings**: Customizable preferences and app configuration

### Technical Features
- **🔧 Progressive Web App (PWA)**: Installable, offline-capable, push notifications
- **📱 Mobile-First Design**: Responsive layout optimized for mobile devices
- **🌓 Theme System**: Multiple color schemes (Default, Blue, Green, Purple)
- **🎨 Modern UI**: Built with Radix UI primitives and Tailwind CSS
- **⚡ Performance**: Optimized bundles, lazy loading, and efficient caching
- **🔔 Push Notifications**: Real-time updates and engagement
- **📴 Offline Support**: Service worker for offline functionality
- **📊 Data Visualization**: Advanced charts with Recharts library

## 🛠️ Technology Stack

### Frontend & UI
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript 5.2+** - Type-safe development experience
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI primitives
- **Motion** - Smooth animations and micro-interactions

### Data & Visualization
- **Recharts** - Powerful charting library for React
- **React Hook Form** - Performant form handling
- **React Day Picker** - Date selection components

### Mobile & PWA
- **Capacitor** - Cross-platform mobile development
- **Vite PWA Plugin** - Progressive Web App features
- **Service Worker** - Offline caching and background sync
- **Web App Manifest** - Native app-like experience

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
erode-runners-club/
├── app/                          # Main application directory
│   ├── components/               # React components
│   │   ├── ui/                  # Reusable UI components (Radix UI based)
│   │   │   ├── button.tsx       # Button component
│   │   │   ├── card.tsx         # Card component
│   │   │   ├── chart.tsx        # Chart components
│   │   │   ├── dialog.tsx       # Modal dialogs
│   │   │   ├── sheet.tsx        # Slide-out panels
│   │   │   └── ...              # Other UI primitives
│   │   ├── figma/               # Figma-exported components
│   │   ├── AdvancedCharts.tsx   # Complex chart implementations
│   │   ├── AnimationProvider.tsx # Animation context and utilities
│   │   ├── AuthScreens.tsx      # Authentication flow
│   │   ├── BlogsSection.tsx     # Blog and articles
│   │   ├── BottomNavigation.tsx # Mobile navigation
│   │   ├── Dashboard.tsx        # Main dashboard
│   │   ├── Leaderboard.tsx      # Community rankings
│   │   ├── OnboardingFlow.tsx   # First-time user experience
│   │   ├── Profile.tsx          # User profile management
│   │   ├── PWAProvider.tsx      # PWA functionality provider
│   │   ├── RaceCalendar.tsx     # Events and races
│   │   ├── Settings.tsx         # App configuration
│   │   ├── Statistics.tsx       # Analytics and metrics
│   │   ├── ThemeProvider.tsx    # Theme system
│   │   └── TrainingPlans.tsx    # Training programs
│   ├── src/                     # Source files
│   │   ├── hooks/               # Custom React hooks
│   │   │   └── useHaptics.ts    # Haptic feedback utilities
│   │   └── main.tsx             # Application entry point
│   ├── public/                  # Static assets
│   │   ├── icons/               # PWA icons (multiple sizes)
│   │   ├── manifest.json        # Web app manifest
│   │   └── sw.js                # Service worker
│   ├── styles/                  # Global styles and themes
│   │   └── globals.css          # CSS variables and base styles
│   ├── guidelines/              # Development guidelines
│   │   └── Guidelines.md        # Project guidelines and standards
│   ├── App.tsx                  # Main application component
│   ├── index.html               # HTML template
│   ├── package.json             # Dependencies and scripts
│   ├── vite.config.ts           # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── capacitor.config.ts      # Capacitor mobile configuration
│   ├── tsconfig.json            # TypeScript configuration
│   └── README.md                # Application-specific documentation
├── app-debug.apk                # Android APK build
└── README.md                    # This file
```

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Git** - Version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/being-cheema/erode-runners-club.git
   cd erode-runners-club
   ```

2. **Navigate to the app directory**
   ```bash
   cd app
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Development Commands

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality

# Mobile Development (requires Capacitor setup)
npx cap add android     # Add Android platform
npx cap run android     # Run on Android device/emulator
npx cap open android    # Open Android project in Android Studio
```

## 📱 Mobile App Development

### Android APK

The repository includes a pre-built Android APK (`app-debug.apk`) that you can install directly on Android devices for testing.

### Building for Mobile

1. **Install Capacitor CLI**
   ```bash
   npm install -g @capacitor/cli
   ```

2. **Build the web app**
   ```bash
   npm run build
   ```

3. **Add Android platform**
   ```bash
   npx cap add android
   ```

4. **Sync changes**
   ```bash
   npx cap sync
   ```

5. **Open in Android Studio**
   ```bash
   npx cap open android
   ```

### Capacitor Configuration

The app includes comprehensive Capacitor configuration in `capacitor.config.ts`:

- **App ID**: `com.eroderunnersclub.app`
- **Haptic Feedback**: Enabled for better mobile UX
- **Push Notifications**: Configured with badge, sound, and alert options
- **Security**: HTTPS scheme for Android

## 🎨 Design System & Theming

### Theme System

The application supports multiple themes through CSS variables:

- **Light/Dark Mode**: Automatic system preference detection
- **Color Schemes**: Default (Black), Blue, Green, Purple
- **Customizable**: Easy theme switching through settings

### UI Components

Built on **Radix UI** primitives for accessibility and consistency:

```tsx
// Example: Using the Button component
import { Button } from './components/ui/button';

<Button variant="default" size="md">
  Start Run
</Button>
```

### Color System

```css
/* Theme variables in globals.css */
:root {
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 96.1%;
  --muted: 0 0% 96.1%;
  /* ... more color variables */
}
```

## 📊 Features Deep Dive

### Dashboard
- **Quick Stats**: Current month progress, upcoming races
- **Weather Integration**: Running conditions display
- **Activity Summary**: Recent runs and achievements
- **Quick Actions**: Start run, view calendar, check leaderboard

### Statistics & Analytics
- **Advanced Charts**: Distance, pace, elevation tracking
- **Progress Metrics**: Weekly/monthly/yearly comparisons
- **Performance Analysis**: Detailed run analytics
- **Goal Tracking**: Personal targets and achievements

### Race Calendar
- **Event Listings**: Local and regional races
- **Registration**: Direct race registration through the app
- **Reminders**: Push notifications for upcoming events
- **Results**: Post-race results and rankings

### Community Features
- **Leaderboards**: Monthly distance challenges
- **Blog System**: Community articles and tips
- **Social Sharing**: Share achievements and milestones
- **Group Challenges**: Team-based competitions

### Training Plans
- **Personalized Programs**: Beginner to advanced training
- **Adaptive Scheduling**: Flexible training calendars
- **Progress Tracking**: Workout completion and metrics
- **Expert Tips**: Professional running guidance

## 🔧 PWA Features

### Installation
- **Install Banner**: Automatic install prompts on supported devices
- **App Shortcuts**: Quick actions from home screen
- **Standalone Mode**: Full-screen app experience

### Offline Capabilities
- **Service Worker**: Comprehensive caching strategy
- **Background Sync**: Data synchronization when online
- **Offline Indicators**: Clear offline/online status

### Push Notifications
- **Race Reminders**: Upcoming event notifications
- **Achievement Alerts**: Milestone and goal notifications
- **Community Updates**: New blog posts and challenges

## ⚡ Performance Optimizations

### Bundle Optimization
```javascript
// Vite configuration for optimal chunks
rollupOptions: {
  output: {
    manualChunks: {
      vendor: ['react', 'react-dom'],
      ui: ['@radix-ui/react-*'],
      charts: ['recharts'],
      animation: ['motion']
    }
  }
}
```

### Loading Strategy
- **Code Splitting**: Automatic component-level splitting
- **Lazy Loading**: On-demand component loading
- **Image Optimization**: Responsive images and WebP support
- **Caching**: Aggressive caching for static assets

## 🧪 Testing & Quality

### Code Quality
- **ESLint**: Comprehensive linting rules
- **TypeScript**: Full type safety
- **Component Testing**: UI component verification

### Performance Monitoring
- **Bundle Analysis**: Bundle size optimization
- **Lighthouse Audits**: PWA compliance verification
- **Runtime Performance**: Core Web Vitals tracking

## 🚀 Deployment

### Web Deployment
1. **Build for production**
   ```bash
   npm run build
   ```

2. **Deploy dist/ folder** to your hosting provider
   - Vercel, Netlify, or any static hosting
   - Ensure service worker registration
   - Configure HTTPS for PWA features

### Mobile Deployment
1. **Build and sync**
   ```bash
   npm run build
   npx cap sync
   ```

2. **Generate signed APK** through Android Studio
3. **Publish to Google Play Store**

## 🤝 Contributing

We welcome contributions from the Erode running community! Please read our [Contributing Guidelines](app/guidelines/Guidelines.md) before submitting pull requests.

### Development Guidelines
- **Code Style**: Follow ESLint configuration
- **Component Design**: Use Radix UI primitives
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 compliance
- **Performance**: Optimize for mobile devices

### Getting Started with Contributions
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the Erode Runners Club community initiative.

## 🆘 Support & Community

- **Issues**: Report bugs and feature requests through GitHub Issues
- **Discussions**: Join community discussions in the repository
- **Running Club**: Connect with local runners in Erode

## 🔮 Roadmap

### Upcoming Features
- [ ] **GPS Tracking**: Real-time run tracking with maps
- [ ] **Social Features**: Friend connections and activity feeds
- [ ] **Wearable Integration**: Smartwatch synchronization
- [ ] **Advanced Analytics**: AI-powered performance insights
- [ ] **Group Runs**: Organize and join group running sessions
- [ ] **Nutrition Tracking**: Diet and hydration monitoring
- [ ] **Injury Prevention**: Health and wellness features

### Technical Improvements
- [ ] **Backend Integration**: API development for data persistence
- [ ] **Real-time Features**: WebSocket integration for live updates
- [ ] **Advanced PWA**: Background processing and enhanced offline features
- [ ] **Performance**: Further optimization and caching improvements

---

<div align="center">

**Built with ❤️ for the Erode Runners Club community**

[View Live Demo](https://your-demo-url.com) | [Download Android APK](./app-debug.apk) | [Report Issues](https://github.com/being-cheema/erode-runners-club/issues)

</div>
