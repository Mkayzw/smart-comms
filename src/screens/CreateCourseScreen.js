import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CourseForm } from '../components/forms/CourseForm'
import { useApiMutation, useApiQuery } from '../hooks/hooks'
import { useAuth } from '../contexts/AuthContext'
import { Loader } from '../components/common/Loader'
import { colors } from '../styles/colors'

export const CreateCourseScreen = ({ navigation }) => {
  const { user } = useAuth()
  const [course, setCourse] = useState({
    code: '',
    name: '',
    description: '',
    department: '',
    credits: '0',
    lecturerId: user?.role === 'LECTURER' ? user.id : '',
  })
  
  const lecturersQuery = useApiQuery(user?.role === 'ADMIN' ? '/users?role=LECTURER' : null)

  const createCourseMutation = useApiMutation('/courses', 'POST', {
    onSuccess: () => {
      navigation.goBack()
    },
    onError: (error) => {
      Alert.alert('Error', error.message || 'Could not create course.')
    },
    invalidateQueries: ['/courses'],
  })

  const handleSubmit = () => {
    createCourseMutation.mutate(course)
  }

  if (lecturersQuery.isLoading) {
    return <Loader />
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create New Course</Text>
        </View>
        <CourseForm
          course={course}
          setCourse={setCourse}
          handleSubmit={handleSubmit}
          isSubmitting={createCourseMutation.isLoading}
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
