import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScheduleForm } from '../components/forms/ScheduleForm'
import { useApiMutation, useApiQuery } from '../hooks/hooks'
import { Loader } from '../components/common/Loader'
import { colors } from '../styles/colors'

export const CreateScheduleScreen = ({ navigation, route }) => {
  const { courseId } = route.params
  const [schedule, setSchedule] = useState({
    courseId: courseId || '',
    venueId: '',
    dayOfWeek: 'MONDAY',
    startTime: '',
    endTime: '',
    semester: '',
  })
  
  const coursesQuery = useApiQuery('/courses')
  const venuesQuery = useApiQuery('/venues')

  const createScheduleMutation = useApiMutation('/schedules', 'POST', {
    onSuccess: () => {
      navigation.goBack()
    },
    onError: (error) => {
      Alert.alert('Error', error.message || 'Could not create schedule.')
    },
    invalidateQueries: ['/schedules', `/courses/${courseId}`],
  })

  const handleSubmit = () => {
    createScheduleMutation.mutate(schedule)
  }

  if (coursesQuery.isLoading || venuesQuery.isLoading) {
    return <Loader />
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create New Schedule</Text>
        </View>
        <ScheduleForm
          schedule={schedule}
          setSchedule={setSchedule}
          handleSubmit={handleSubmit}
          isSubmitting={createScheduleMutation.isLoading}
          courses={coursesQuery.data}
          venues={venuesQuery.data}
        />
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate[200],
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.slate[900],
  },
})
