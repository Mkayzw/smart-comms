# Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- Expo Go app on your phone (iOS/Android)
- Backend server running

## Steps

### 1. Install Dependencies

```bash
cd mobile
pnpm install
```

### 2. Configure API URL

Open `src/config/index.js` and update the API URL:

**For physical devices:**
```javascript
export const config = {
  API_URL: 'http://192.168.x.x:5000/api',  // Your computer's IP address
}
```

**To find your IP address:**
- **Linux/Mac**: `ifconfig` or `ip addr show`
- **Windows**: `ipconfig`

**For Android emulator:**
```javascript
export const config = {
  API_URL: 'http://10.0.2.2:5000/api',  // Android emulator special IP
}
```

**For iOS simulator:**
```javascript
export const config = {
  API_URL: 'http://localhost:5000/api',  // iOS simulator can use localhost
}
```

### 3. Start Backend Server

Make sure your backend is running and accessible:

```bash
cd ../BACKEND
pnpm dev
```

### 4. Start Mobile App

```bash
cd mobile
pnpm start
```

This will show a QR code in your terminal.

### 5. Run on Device

**Option A: Physical Device (Recommended for testing)**
1. Install "Expo Go" app from App Store (iOS) or Play Store (Android)
2. Open Expo Go
3. Scan the QR code from your terminal
4. App will load on your device

**Option B: Emulator**
- Press `a` for Android emulator
- Press `i` for iOS simulator (macOS only)

## Test Login

Use the test credentials from your backend seed data:

**Admin:**
- Email: `admin@university.edu`
- Password: `password123`

**Student:**
- Email: `student@university.edu`
- Password: `password123`

**Lecturer:**
- Email: `lecturer@university.edu`
- Password: `password123`

## Troubleshooting

### "Network request failed"
- Check that backend is running
- Verify API URL in `src/config/index.js`
- Make sure phone and computer are on same WiFi network
- Check firewall settings

### "Unable to resolve module"
- Clear cache: `pnpm start --clear`
- Reinstall: `rm -rf node_modules && pnpm install`

### Metro bundler issues
- Kill all Node processes: `killall -9 node`
- Clear watchman: `watchman watch-del-all` (if installed)
- Start fresh: `pnpm start --clear`

### Can't connect to backend
- Ping your computer's IP from phone browser: `http://192.168.x.x:5000`
- Check if backend is listening on 0.0.0.0 (not just localhost)
- Temporarily disable firewall for testing

## Next Steps

Once running:
1. ✅ Login with test credentials
2. ✅ Browse dashboard
3. ✅ View announcements
4. ✅ Check your schedule
5. ✅ View enrolled courses
6. ✅ Check notifications
7. ✅ View profile

Happy coding! 🚀

