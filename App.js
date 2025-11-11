import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar, LogBox } from 'react-native'
import { AuthProvider } from './src/contexts/AuthContext'
import AppNavigator from './src/navigation/AppNavigator'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
        <AppNavigator />
      </AuthProvider>
    </QueryClientProvider>
  )
}
