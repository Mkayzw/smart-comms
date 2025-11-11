import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CourseForm } from '../components/forms/CourseForm'
import { useApiQuery, useApiMutation } from '../hooks/hooks'
import { useAuth } from '../contexts/AuthContext'
import { Loader } from '../components/common/Loader'
import { colors } from '../styles/colors'

export const EditCourseScreen = ({ route, navigation }) => {
  const { id } = route.params
  const { user } = useAuth()
  const courseQuery = useApiQuery(`/courses/${id}`)
  const [course, setCourse] = useState(null)
  
  const lecturersQuery = useApiQuery(user?.role === 'ADMIN' ? '/users?role=LECTURER' : null)

  useEffect(() => {
    if (courseQuery.data) {
      setCourse({
        ...courseQuery.data,
        credits: String(courseQuery.data.credits),
      })
    }
  }, [courseQuery.data])

  const editCourseMutation = useApiMutation(`/courses/${id}`, 'PUT', {
    onSuccess: () => {
      navigation.goBack()
    },
    onError: (error) => {
      Alert.alert('Error', error.message || 'Could not update course.')
    },
    invalidateQueries: ['/courses', `/courses/${id}`],
  })

  const handleSubmit = () => {
    editCourseMutation.mutate(course)
  }

  if (courseQuery.isLoading || lecturersQuery.isLoading || !course) {
    return <Loader />
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Edit Course</Text>
        </View>
        <CourseForm
          course={course}
          setCourse={setCourse}
          handleSubmit={handleSubmit}
          isSubmitting={editCourseMutation.isLoading}
          lecturers={lecturersQuery.data}
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
