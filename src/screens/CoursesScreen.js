import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useApiQuery } from '../hooks/hooks'
import { Loader } from '../components/common/Loader'
import { EmptyState } from '../components/common/EmptyState'
import { colors } from '../styles/colors'
import { Feather } from '@expo/vector-icons'
import { useAuth } from '../contexts/AuthContext'

export const CoursesScreen = ({ navigation }) => {
  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const coursesQuery = useApiQuery('/courses', { params: { search } })

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CourseDetails', { course: item })}
    >
      <Text style={styles.courseCode}>{item.code}</Text>
      <Text style={styles.cardTitle}>{item.name}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Courses</Text>
        {['ADMIN', 'LECTURER'].includes(user?.role) && (
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate('CreateCourse')}
          >
            <Feather name="plus" size={20} color={colors.slate[50]} />
            <Text style={styles.createButtonText}>New</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color={colors.slate[400]} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search courses"
          placeholderTextColor={colors.slate[400]}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView style={styles.scroll}>
        {coursesQuery.isLoading ? (
          <Loader label="Loading courses" />
        ) : coursesQuery.data?.data?.length ? (
          coursesQuery.data.data.map((course) => (
            <View key={course.id} style={styles.card}>
              <Text style={styles.courseCode}>{course.code}</Text>
              <Text style={styles.cardTitle}>{course.name}</Text>
            </View>
          ))
        ) : (
          <EmptyState description="You're not enrolled in any courses yet." />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.slate[900],
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand[500],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  createButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.slate[100],
    borderRadius: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.slate[900],
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
  courseCode: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brand[600],
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.slate[900],
  },
})
