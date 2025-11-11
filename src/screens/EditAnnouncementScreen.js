import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AnnouncementForm } from '../components/forms/AnnouncementForm'
import { useApiQuery, useApiMutation } from '../hooks/hooks'
import { Loader } from '../components/common/Loader'
import { colors } from '../styles/colors'

export const EditAnnouncementScreen = ({ route, navigation }) => {
  const { id } = route.params
  const announcementQuery = useApiQuery(`/announcements/${id}`)
  const [announcement, setAnnouncement] = useState(null)

  useEffect(() => {
    if (announcementQuery.data) {
      setAnnouncement(announcementQuery.data)
    }
  }, [announcementQuery.data])

  const editAnnouncementMutation = useApiMutation(`/announcements/${id}`, 'PUT', {
    onSuccess: () => {
      navigation.goBack()
    },
    onError: (error) => {
      Alert.alert('Error', error.message || 'Could not update announcement.')
    },
    invalidateQueries: ['/announcements', `/announcements/${id}`],
  })

  const handleSubmit = () => {
    editAnnouncementMutation.mutate(announcement)
  }

  if (announcementQuery.isLoading || !announcement) {
    return <Loader />
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Edit Announcement</Text>
        </View>
        <AnnouncementForm
          announcement={announcement}
          setAnnouncement={setAnnouncement}
          handleSubmit={handleSubmit}
          isSubmitting={editAnnouncementMutation.isLoading}
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
