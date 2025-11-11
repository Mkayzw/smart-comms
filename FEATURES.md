# Mobile App Features

## ✅ Completed Features

### Authentication & Security
- ✅ Secure login with email & password
- ✅ Token-based authentication
- ✅ Secure token storage using Expo Secure Store
- ✅ Auto token refresh and validation
- ✅ Protected routes
- ✅ Logout functionality

### User Interface
- ✅ Bottom tab navigation (5 main tabs)
- ✅ Stack navigation for detail screens
- ✅ NativeWind/Tailwind CSS styling
- ✅ Consistent design system matching web app
- ✅ Brand colors (Teal #14b8a6)
- ✅ Responsive layouts
- ✅ Loading states
- ✅ Empty states
- ✅ Error handling

### Dashboard (Home Tab)
- ✅ Quick metrics overview
  - Total announcements count
  - Enrolled courses count
  - Upcoming sessions count
- ✅ Latest announcements preview (4 items)
- ✅ Upcoming schedule preview (4 items)
- ✅ My courses preview (4 items)
- ✅ Quick navigation links

### Announcements Tab
- ✅ Browse all announcements
- ✅ Search functionality
- ✅ Target audience filtering (ALL/STUDENTS/LECTURERS)
- ✅ Announcement cards with:
  - Title & content preview
  - Target audience badge
  - Comment count
  - Timestamp
- ✅ View announcement details
- ✅ Read & post comments
- ✅ Real-time comment updates

### Courses Tab
- ✅ Browse enrolled courses
- ✅ Course cards with:
  - Course code & name
  - Credits
  - Semester
  - Enrollment count
- ✅ View course details
- ✅ Course schedule display

### Schedule Tab
- ✅ View personal weekly timetable
- ✅ Schedule cards with:
  - Day of week
  - Time slot
  - Course name
  - Venue location
- ✅ Organized schedule view

### Profile Tab
- ✅ User profile display
- ✅ Avatar with initial
- ✅ User information:
  - Name
  - Email
  - Role badge (Student/Lecturer/Admin)
  - Student ID
  - Department
  - Join date
- ✅ Logout button

### Notifications
- ✅ View all notifications
- ✅ Unread notification indicator
- ✅ Mark as read functionality
- ✅ Notification timestamp
- ✅ Accessible from any screen

## 🎨 Design System

### Colors
- **Primary (Brand)**: Teal shades (#14b8a6)
- **Accent**: Orange shades (#f97316)
- **Neutral**: Slate shades for text/backgrounds
- **Status Colors**: Blue, Green, Yellow, Red for statuses

### Typography
- **Headings**: Bold, slate-900
- **Body**: Medium weight, slate-700
- **Captions**: Small, slate-500

### Components
- **Cards**: Rounded-3xl, white background, subtle borders
- **Buttons**: Rounded-2xl, brand-500 background
- **Inputs**: Rounded-2xl, border, white background
- **Pills/Badges**: Rounded-full, colored backgrounds
- **Shadows**: Subtle soft shadows

### Layout
- **Spacing**: Consistent padding/margins (p-4, p-5)
- **Grid**: Responsive grid layouts
- **Gaps**: Consistent gap-3, gap-4 between elements

## 📱 Navigation Structure

```
App
├── Login Screen (Unauthenticated)
└── Main Stack (Authenticated)
    ├── Main Tabs
    │   ├── Dashboard (Home)
    │   ├── Announcements
    │   ├── Courses
    │   ├── Schedule
    │   └── Profile
    └── Detail Screens (Modal)
        ├── Announcement Detail
        ├── Course Detail
        └── Notifications
```

## 🔌 API Integration

### Endpoints Used
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user
- `GET /announcements` - List announcements
- `GET /announcements/:id` - Get announcement details
- `GET /announcements/:id/comments` - Get comments
- `POST /announcements/:id/comments` - Post comment
- `GET /courses/my` - Get enrolled courses
- `GET /courses/:id` - Get course details
- `GET /schedules/my-schedule` - Get personal schedule
- `GET /notifications` - Get notifications
- `PUT /notifications/mark-read` - Mark notification as read

### Request Handling
- Automatic token injection
- Query parameter building
- Error handling
- Loading states
- Success callbacks

## 🛠️ Technical Stack

### Core
- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform & tooling
- **React 19** - UI library
- **React Native 0.81** - Native framework

### Navigation
- **React Navigation 7** - Navigation library
- **Native Stack Navigator** - Stack navigation
- **Bottom Tabs Navigator** - Tab navigation

### Styling
- **NativeWind 4** - Tailwind CSS for React Native
- **Tailwind CSS 3** - Utility-first CSS

### Storage
- **Expo Secure Store** - Secure token storage

### UI Components
- **React Native Safe Area Context** - Safe area handling
- **React Native Screens** - Native screen components
- **React Native Gesture Handler** - Gesture handling

## 📦 Project Structure

```
mobile/
├── src/
│   ├── components/
│   │   ├── cards/
│   │   │   ├── AnnouncementCard.js
│   │   │   ├── CourseCard.js
│   │   │   ├── MetricCard.js
│   │   │   └── ScheduleCard.js
│   │   └── common/
│   │       ├── EmptyState.js
│   │       ├── Loader.js
│   │       └── StatusPill.js
│   ├── config/
│   │   └── index.js
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   ├── screens/
│   │   ├── AnnouncementDetailScreen.js
│   │   ├── AnnouncementsScreen.js
│   │   ├── CourseDetailScreen.js
│   │   ├── CoursesScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── LoginScreen.js
│   │   ├── MyScheduleScreen.js
│   │   ├── NotificationsScreen.js
│   │   └── ProfileScreen.js
│   └── utils/
│       ├── apiClient.js
│       └── hooks.js
├── App.js
├── babel.config.js
├── metro.config.js
├── tailwind.config.js
├── global.css
└── package.json
```

## 🚀 Getting Started

See [QUICKSTART.md](./QUICKSTART.md) for setup instructions.

## 📝 Notes

- No TanStack Query - Simple custom hooks for data fetching
- No complex state management - React Context for auth only
- Clean, maintainable code
- Matches web app design system
- Mobile-first UX patterns (bottom tabs, native gestures)

