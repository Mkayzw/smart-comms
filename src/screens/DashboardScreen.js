import React, { useMemo } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useApiQuery } from '../hooks/hooks'
import { Loader } from '../components/common/Loader'
import { EmptyState } from '../components/common/EmptyState'
import { colors } from '../styles/colors'

export const DashboardScreen = ({ navigation }) => {
  const announcementsQuery = useApiQuery('/announcements', {
    params: { limit: 4, page: 1 }
  })

  const coursesQuery = useApiQuery('/courses/my', {
    params: { limit: 4, page: 1 }
  })

  const scheduleQuery = useApiQuery('/schedules/my-schedule', {
    params: { limit: 4, page: 1 }
  })

  const metrics = useMemo(() => {
    const totalAnnouncements = announcementsQuery.data?.pagination?.total ?? announcementsQuery.data?.data?.length ?? 0
    const totalCourses = coursesQuery.data?.pagination?.total ?? coursesQuery.data?.data?.length ?? 0
    const nextScheduleCount = scheduleQuery.data?.pagination?.total ?? scheduleQuery.data?.data?.length ?? 0

    return [
      { label: 'Announcements', value: totalAnnouncements },
      { label: 'My Courses', value: totalCourses },
      { label: 'Upcoming Sessions', value: nextScheduleCount }
    ]
  }, [announcementsQuery.data, coursesQuery.data, scheduleQuery.data])

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scroll}>
        {/* Metrics */}
        <View style={styles.section}>
          {metrics.map((metric) => (
            <View key={metric.label} style={styles.metricCard}>
              <Text style={styles.metricValue}>{metric.value || 0}</Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
            </View>
          ))}
        </View>

        {/* Latest Announcements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Announcements</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Announcements')}>
              <Text style={styles.linkText}>View all</Text>
            </TouchableOpacity>
          </View>
          
          {announcementsQuery.isLoading ? (
            <Loader label="Fetching announcements" />
          ) : announcementsQuery.data?.data?.length ? (
            announcementsQuery.data.data.map((announcement) => (
              <TouchableOpacity
                key={announcement.id}
                style={styles.card}
                onPress={() => navigation.navigate('AnnouncementDetail', { id: announcement.id })}
              >
                <Text style={styles.cardTitle}>{announcement.title}</Text>
                <Text style={styles.cardText} numberOfLines={2}>{announcement.content}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <EmptyState description="When the lecturers speak up, you'll see it here." />
          )}
        </View>

        {/* My Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Courses</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Courses')}>
              <Text style={styles.linkText}>Manage courses</Text>
            </TouchableOpacity>
          </View>
          
          {coursesQuery.isLoading ? (
            <Loader label="Loading courses" />
          ) : coursesQuery.data?.data?.length ? (
            coursesQuery.data.data.map((course) => (
              <TouchableOpacity
                key={course.id}
                style={styles.card}
                onPress={() => navigation.navigate('CourseDetail', { id: course.id })}
              >
                <Text style={styles.courseCode}>{course.code}</Text>
                <Text style={styles.cardTitle}>{course.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <EmptyState description="Grab a course and let's make your calendar busy again." />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.slate[50],
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.slate[900],
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.brand[600],
  },
  metricCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.slate[200],
    padding: 20,
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.slate[900],
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.slate[500],
    marginTop: 4,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.slate[200],
    padding: 20,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.slate[900],
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: colors.slate[500],
  },
  courseCode: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brand[600],
    marginBottom: 4,
  },
})
