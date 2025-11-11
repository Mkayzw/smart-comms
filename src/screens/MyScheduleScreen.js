import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useApiQuery } from '../hooks/hooks'
import { Loader } from '../components/common/Loader'
import { EmptyState } from '../components/common/EmptyState'
import { colors } from '../styles/colors'

export const MyScheduleScreen = () => {
  const scheduleQuery = useApiQuery('/schedules/my-schedule', {
    params: { limit: 50, page: 1 }
  })

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>My Schedule</Text>
        <Text style={styles.subtitle}>Your weekly timetable</Text>
      </View>

      <ScrollView style={styles.scroll}>
        {scheduleQuery.isLoading ? (
          <Loader label="Loading schedule" />
        ) : scheduleQuery.data?.data?.length ? (
          scheduleQuery.data.data.map((entry) => (
            <View key={entry.id} style={styles.card}>
              <Text style={styles.cardTitle}>{entry.course?.name || 'Course'}</Text>
              <Text style={styles.cardText}>{entry.dayOfWeek} • {entry.startTime} - {entry.endTime}</Text>
              {entry.venue && <Text style={styles.venue}>📍 {entry.venue.name}</Text>}
            </View>
          ))
        ) : (
          <EmptyState description="No classes scheduled. Free time!" />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.slate[50],
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.slate[900],
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.slate[500],
    marginBottom: 16,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
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
  venue: {
    fontSize: 12,
    color: colors.brand[600],
    marginTop: 4,
  },
})
