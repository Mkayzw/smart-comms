# Smart University Mobile App

React Native mobile application for the Smart University Communication and Venue Notification System.

## Features

- 🔐 Authentication with secure token storage
- 📢 View and interact with announcements
- 📚 Browse enrolled courses
- 📅 Check personal schedule/timetable
- 🔔 Receive and manage notifications
- 👤 User profile management

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **NativeWind** - Styling (Tailwind CSS for React Native)
- **React Navigation** - Navigation library
- **Expo Secure Store** - Secure token storage

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Update the API URL in `src/utils/apiClient.js`:
```javascript
const API_BASE_URL = 'http://YOUR_IP:5000/api'  // Use your machine's IP for physical devices
```

3. Start the development server:
```bash
pnpm start
```

4. Run on your device:
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or press `a` for Android emulator
   - Or press `i` for iOS simulator (macOS only)

## Project Structure

```
mobile/
├── src/
│   ├── components/
│   │   ├── cards/          # Reusable card components
│   │   └── common/         # Common UI components
│   ├── contexts/
│   │   └── AuthContext.js  # Authentication state management
│   ├── navigation/
│   │   └── AppNavigator.js # Navigation configuration
│   ├── screens/            # App screens
│   └── utils/
│       ├── apiClient.js    # API fetch wrapper
│       └── hooks.js        # Custom React hooks
├── App.js                  # Root component
├── global.css              # Global styles (NativeWind)
└── tailwind.config.js      # Tailwind configuration
```

## Styling

The app uses **NativeWind**, which brings Tailwind CSS to React Native. All styles match the web app's design system with the same color palette and spacing.

### Color Palette

- **Brand** (Teal): `#14b8a6` - Primary actions and highlights
- **Accent** (Orange): `#f97316` - Secondary accents
- **Slate**: Various shades for text and backgrounds

### Example Usage

```jsx
<View className="bg-white rounded-3xl border border-slate-200 p-5">
  <Text className="text-lg font-bold text-slate-900">Title</Text>
</View>
```

## API Integration

All API calls are handled through:
- `apiFetch()` - Low-level fetch wrapper
- `useApiQuery()` - For GET requests with auto-refetch
- `useApiMutation()` - For POST/PUT/DELETE requests

Example:
```javascript
const announcementsQuery = useApiQuery('/announcements', {
  params: { limit: 10, page: 1 }
})

const createMutation = useApiMutation('/announcements', {
  method: 'POST',
  onSuccess: () => {
    // Handle success
  }
})
```

## Authentication

Authentication tokens are securely stored using Expo Secure Store and automatically attached to all API requests. The auth state is managed globally via `AuthContext`.

## Development Notes

- No unnecessary dependencies (no TanStack Query, just plain React hooks)
- Simple, clean code matching web app patterns
- All data fetching uses custom hooks for consistency
- UI components mirror the web app's design system

## Building for Production

### Android
```bash
pnpm run android
```

### iOS
```bash
pnpm run ios
```

For production builds, check [Expo's build documentation](https://docs.expo.dev/build/introduction/).

