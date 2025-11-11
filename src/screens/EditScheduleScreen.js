import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScheduleForm } from '../components/forms/ScheduleForm'
import { useApiQuery, useApiMutation } from '../hooks/hooks'
import { Loader } from '../components/common/Loader'
import { Feather } from '@expo/vector-icons'
import { colors } from '../styles/colors'

export const EditScheduleScreen = ({ route, navigation }) => {
  const { id } = route.params
  const scheduleQuery = useApiQuery(`/schedules/${id}`)
  const [schedule, setSchedule] = useState(null)
  
  const coursesQuery = useApiQuery('/courses')
  const venuesQuery = useApiQuery('/venues')

  useEffect(() => {
    if (scheduleQuery.data) {
      setSchedule(scheduleQuery.data)
    }
  }, [scheduleQuery.data])

  const editScheduleMutation = useApiMutation(`/schedules/${id}`, 'PUT', {
    onSuccess: () => {
      navigation.goBack()
    },
    onError: (error) => {
      Alert.alert('Error', error.message || 'Could not update schedule.')
    },
    invalidateQueries: ['/schedules', `/courses/${schedule?.courseId}`],
  })
  
  const deleteScheduleMutation = useApiMutation(`/schedules/${id}`, 'DELETE', {
    onSuccess: () => {
      navigation.goBack()
    },
    onError: (error) => {
      Alert.alert('Error', error.message || 'Could not delete schedule.')
    },
    invalidateQueries: ['/schedules', `/courses/${schedule?.courseId}`],
  })

  const handleSubmit = () => {
    editScheduleMutation.mutate(schedule)
  }
  
  const handleDelete = () => {
    Alert.alert('Delete Schedule', 'Are you sure you want to delete this schedule?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteScheduleMutation.mutate() },
    ])
  }

  if (scheduleQuery.isLoading || coursesQuery.isLoading || venuesQuery.isLoading || !schedule) {
    return <Loader />
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Edit Schedule</Text>
          <TouchableOpacity onPress={handleDelete}>
            <Feather name="trash-2" size={24} color={colors.red[500]} />
          </TouchableOpacity>
        </View>
        <ScheduleForm
          schedule={schedule}
          setSchedule={setSchedule}
          handleSubmit={handleSubmit}
          isSubmitting={editScheduleMutation.isLoading}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
