import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useApiQuery, useApiMutation } from '../hooks/hooks'
import { useAuth } from '../contexts/AuthContext'
import { Loader } from '../components/common/Loader'
import { EmptyState } from '../components/common/EmptyState'
import { Feather } from '@expo/vector-icons'
import { colors } from '../styles/colors'

export const CourseDetailScreen = ({ route, navigation }) => {
  const { id } = route.params
  const { user } = useAuth()
  const courseQuery = useApiQuery(`/courses/${id}`)

  const enrollMutation = useApiMutation(`/courses/${id}/enroll`, 'POST', {
    onSuccess: () => courseQuery.refetch(),
    onError: (error) => Alert.alert('Error', error.message || 'Could not enroll.'),
  })

  const dropMutation = useApiMutation(`/courses/${id}/enroll`, 'DELETE', {
    onSuccess: () => courseQuery.refetch(),
    onError: (error) => Alert.alert('Error', error.message || 'Could not drop course.'),
  })
  
  const deleteMutation = useApiMutation(`/courses/${id}`, 'DELETE', {
    onSuccess: () => navigation.goBack(),
    onError: (error) => Alert.alert('Error', error.message || 'Could not delete course.'),
    invalidateQueries: ['/courses'],
  })

  const handleDelete = () => {
    Alert.alert('Delete Course', 'Are you sure you want to delete this course?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteMutation.mutate() },
    ])
  }

  if (courseQuery.isLoading) return <Loader />
  if (courseQuery.isError) return <EmptyState message="Could not load course." />

  const course = courseQuery.data
  const canModify = user?.role === 'ADMIN' || user?.id === course.lecturer.id

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.courseCode}>{course.code}</Text>
          <Text style={styles.courseName}>{course.name}</Text>
          <Text style={styles.lecturer}>
            Lecturer: {course.lecturer.firstName} {course.lecturer.lastName}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.description}>{course.description}</Text>
          <Text style={styles.detailItem}>Department: {course.department}</Text>
          <Text style={styles.detailItem}>Credits: {course.credits}</Text>
        </View>
        
        <View style={styles.schedulesHeader}>
          <Text style={styles.sectionTitle}>Schedules</Text>
          {canModify && (
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => navigation.navigate('CreateSchedule', { courseId: id })}
            >
              <Feather name="plus" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
        {course.schedules.length > 0 ? (
          course.schedules.map(schedule => (
            <TouchableOpacity 
              key={schedule.id}
              style={styles.scheduleCard}
              onPress={() => canModify && navigation.navigate('EditSchedule', { id: schedule.id })}
            >
              <Text>{schedule.dayOfWeek} {schedule.startTime} - {schedule.endTime}</Text>
              <Text>{schedule.venue.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noSchedules}>No schedules for this course yet.</Text>
        )}
      </ScrollView>
      {user?.role === 'STUDENT' && (
        <TouchableOpacity 
          style={styles.enrollButton}
          onPress={() => course.isEnrolled ? dropMutation.mutate() : enrollMutation.mutate()}
        >
          <Text style={styles.enrollButtonText}>{course.isEnrolled ? 'Drop Course' : 'Enroll'}</Text>
        </TouchableOpacity>
      )}
      {canModify && (
        <View style={styles.fabContainer}>
          <TouchableOpacity 
            style={styles.fab} 
            onPress={() => navigation.navigate('EditCourse', { id })}
          >
            <Feather name="edit-2" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.fab, styles.fabDelete]} 
            onPress={handleDelete}
          >
            <Feather name="trash-2" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.slate[50],
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate[200],
  },
  courseCode: {
    fontSize: 16,
    color: colors.slate[500],
    marginBottom: 4,
  },
  courseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.slate[900],
  },
  lecturer: {
    fontSize: 14,
    color: colors.slate[600],
    marginTop: 8,
  },
  details: {
    padding: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.slate[800],
    marginBottom: 16,
  },
  schedulesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.slate[800],
  },
  addButton: {
    backgroundColor: colors.brand[500],
    padding: 6,
    borderRadius: 999,
  },
  scheduleCard: {
    backgroundColor: 'white',
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.slate[200],
  },
  noSchedules: {
    textAlign: 'center',
    color: colors.slate[500],
    padding: 16,
  },
  detailItem: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.slate[700],
  },
  enrollButton: {
    backgroundColor: colors.brand[500],
    paddingVertical: 16,
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
  },
  enrollButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
  },
  fab: {
    backgroundColor: colors.brand[500],
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    marginLeft: 10,
  },
  fabDelete: {
    backgroundColor: colors.red[500],
  },
})
