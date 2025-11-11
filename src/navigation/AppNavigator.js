import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import { useAuth } from '../contexts/AuthContext'
import { colors } from '../styles/colors'
import { Feather } from '@expo/vector-icons'

// Screens
import { LoginScreen } from '../screens/LoginScreen'
import { DashboardScreen } from '../screens/DashboardScreen'
import { AnnouncementsScreen } from '../screens/AnnouncementsScreen'
import { AnnouncementDetailScreen } from '../screens/AnnouncementDetailScreen'
import { CoursesScreen } from '../screens/CoursesScreen'
import { CourseDetailScreen } from '../screens/CourseDetailScreen'
import { MyScheduleScreen } from '../screens/MyScheduleScreen'
import { NotificationsScreen } from '../screens/NotificationsScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
import { VenuesScreen } from '../screens/VenuesScreen'
import { CreateVenueScreen } from '../screens/CreateVenueScreen'
import { VenueDetailScreen } from '../screens/VenueDetailScreen'
import { EditVenueScreen } from '../screens/EditVenueScreen'
import { CreateAnnouncementScreen } from '../screens/CreateAnnouncementScreen'
import { EditAnnouncementScreen } from '../screens/EditAnnouncementScreen'
import { CreateCourseScreen } from '../screens/CreateCourseScreen'
import { EditCourseScreen } from '../screens/EditCourseScreen'
import { CreateScheduleScreen } from '../screens/CreateScheduleScreen'
import { EditScheduleScreen } from '../screens/EditScheduleScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const headerStyle = {
  backgroundColor: colors.slate[50],
  elevation: 0,
  shadowOpacity: 0,
  borderBottomWidth: 1,
  borderBottomColor: colors.slate[200],
}

const headerTitleStyle = {
  fontWeight: '700',
  fontSize: 18,
  color: colors.slate[900],
}

// Main tabs navigator
const MainTabs = () => {
  const { user } = useAuth()

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle,
        headerTitleStyle,
        headerShadowVisible: false,
        tabBarActiveTintColor: colors.brand[500],
        tabBarInactiveTintColor: colors.slate[400],
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: colors.slate[200],
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Announcements" 
        component={AnnouncementsScreen}
        options={{
          title: 'Announcements',
          tabBarIcon: ({ color, size, focused }) => (
            <Feather name="bell" size={size} color={color} />
          ),
        }}
      />
      {['ADMIN', 'LECTURER'].includes(user?.role) && (
        <Tab.Screen 
          name="Venues" 
          component={VenuesScreen}
          options={{
            title: 'Venues',
            tabBarIcon: ({ color, size, focused }) => (
              <Feather name="map-pin" size={size} color={color} />
            ),
          }}
        />
      )}
      <Tab.Screen 
        name="Courses" 
        component={CoursesScreen}
        options={{
          title: 'Courses',
          tabBarIcon: ({ color, size, focused }) => (
            <Feather name="book-open" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="MySchedule" 
        component={MyScheduleScreen}
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, size, focused }) => (
            <Feather name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <View style={styles.loadingLogo}>
          <Text style={styles.loadingLogoText}>SU</Text>
        </View>
        <ActivityIndicator size="large" color={colors.brand[500]} style={{ marginTop: 16 }} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    )
  }

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle,
            headerTitleStyle,
            headerShadowVisible: false,
            headerBackTitleVisible: false,
            headerTintColor: colors.brand[500],
          }}
        >
          <Stack.Screen 
            name="Main" 
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="AnnouncementDetail" 
            component={AnnouncementDetailScreen}
            options={{ title: 'Announcement' }}
          />
          <Stack.Screen 
            name="CourseDetail" 
            component={CourseDetailScreen}
            options={{ title: 'Course Details' }}
          />
          <Stack.Screen 
            name="VenueDetail" 
            component={VenueDetailScreen}
            options={{ title: 'Venue Details' }}
          />
          <Stack.Screen 
            name="CreateAnnouncement" 
            component={CreateAnnouncementScreen}
            options={{ title: 'New Announcement' }}
          />
          <Stack.Screen 
            name="EditAnnouncement" 
            component={EditAnnouncementScreen}
            options={{ title: 'Edit Announcement' }}
          />
          <Stack.Screen 
            name="CreateCourse" 
            component={CreateCourseScreen}
            options={{ title: 'New Course' }}
          />
          <Stack.Screen 
            name="EditCourse" 
            component={EditCourseScreen}
            options={{ title: 'Edit Course' }}
          />
          <Stack.Screen 
            name="CreateSchedule" 
            component={CreateScheduleScreen}
            options={{ title: 'New Schedule' }}
          />
          <Stack.Screen 
            name="EditSchedule" 
            component={EditScheduleScreen}
            options={{ title: 'Edit Schedule' }}
          />
          <Stack.Screen 
            name="CreateVenue" 
            component={CreateVenueScreen}
            options={{ title: 'New Venue' }}
          />
          <Stack.Screen 
            name="EditVenue" 
            component={EditVenueScreen}
            options={{ title: 'Edit Venue' }}
          />
          <Stack.Screen 
            name="Notifications" 
            component={NotificationsScreen}
            options={{ title: '🔔 Notifications' }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  loadingLogo: {
    backgroundColor: colors.brand[500],
    borderRadius: 16,
    height: 64,
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  loadingLogoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.slate[500],
    marginTop: 8,
  },
})

export default AppNavigator
