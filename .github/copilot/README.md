# Pomodoro Timer App - Developer Guide

## Project Overview

This is a Pomodoro timer application built with React, TypeScript, and Tailwind CSS. The app features a customizable timer with different modes (pomodoro, short break, long break), theme customization, and persistent settings.

## Architecture

### File Structure

```
pomodoro-app/
├── components/           # React components
│   ├── CheckBox/         # UI components with individual directories
│   ├── ColorSelector/
│   ├── FontSelector/
│   ├── InputNumber/
│   ├── Navbar/
│   ├── PomodoroApp/      # Main app component
│   ├── SettingsModal/
│   ├── ThemeToggle/
│   ├── TimerClock/       # Timer display component
│   ├── TimerPills/       # Timer type selector
│   └── ToggleSwitch/
├── pages/                # Page components
├── store/                # Zustand state management
│   ├── modalStore.ts     # Modal visibility state
│   ├── themeStore.ts     # Theme preferences state
│   └── timerStore.ts     # Timer logic and state
├── styles/               # CSS styles
│   └── main.css          # Main CSS file with Tailwind imports
├── utils/                # Utility functions
│   ├── faviconUtils.ts   # Dynamic favicon generation
│   └── timerUtils.ts     # Timer calculations and helpers
└── public/favicon_io/    # Favicon assets
```

### State Management

The app uses Zustand for state management with three main stores:

1. **timerStore**: Manages timer state, including current timer, mode, and settings
2. **themeStore**: Manages theme settings (font, color)
3. **modalStore**: Controls the settings modal visibility

## Key Features Implementation

### Pomodoro Timer Logic

The timer logic is implemented in `timerStore.ts` and `timerUtils.ts`. The main timer runs via a React useEffect hook with setInterval.

### Theme Customization

Theme settings are managed in `themeStore.ts` and applied via CSS variables and Tailwind classes.

### Dynamic Favicon

The favicon updates to show the current timer progress using SVG generation in `faviconUtils.ts`.

## GitHub Copilot Usage

### Effective Prompting

When working with this codebase, here are some effective ways to prompt GitHub Copilot:

1. **Component Updates**:

   ```
   // Create a new component that extends the TimerClock to show additional statistics
   ```

2. **State Management**:

   ```
   // Add a new setting to the themeStore to control animation speed
   ```

3. **Testing**:
   ```
   // Write a test for the TimerPills component that verifies it changes the timer type
   ```

### Key Areas for Copilot Assistance

Copilot can be particularly helpful with:

1. **Component Props Types**: The app uses TypeScript interfaces for all component props
2. **Animation Code**: Complex Framer Motion animations in TimerClock and other components
3. **Testing Mocks**: Creating mock functions and state for testing components
4. **Tailwind Utilities**: Suggesting appropriate Tailwind classes for styling

## Development Workflow

### Setting Up

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`

### Building New Features

When adding new features:

1. Create or modify components in the `components/` directory
2. Update state in the appropriate store
3. Add any utility functions needed
4. Write tests for new functionality

### Testing

Run tests with:

```
npm test
```

The app uses Vitest and React Testing Library. When writing tests:

1. Mock any necessary state or functions
2. Test basic rendering and functionality
3. For timer components, mock the timing functions to avoid hanging tests

## Common Issues and Solutions

### Timer Accuracy

The timer may drift slightly over long periods due to JavaScript's setTimeout/setInterval precision. The app focuses on UI responsiveness over millisecond accuracy.

### React Strict Mode

The app uses React Strict Mode which causes effects to run twice in development. This may cause the timer to behave differently in development vs production.

### Mobile Safari Issues

Some mobile browsers may throttle timers when the tab is not active. The app uses localStorage to help maintain timer state across refreshes.

## API References

- **Framer Motion**: [Documentation](https://www.framer.com/motion/)
- **Zustand**: [Documentation](https://github.com/pmndrs/zustand)
- **React Testing Library**: [Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- **Tailwind CSS**: [Documentation](https://tailwindcss.com/docs)
