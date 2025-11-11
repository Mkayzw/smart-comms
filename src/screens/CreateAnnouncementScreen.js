import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AnnouncementForm } from '../components/forms/AnnouncementForm'
import { useApiMutation } from '../hooks/hooks'
import { colors } from '../styles/colors'

export const CreateAnnouncementScreen = ({ navigation }) => {
  const [announcement, setAnnouncement] = useState({
    title: '',
    content: '',
    targetAudience: 'ALL',
    pinned: false,
  })

  const createAnnouncementMutation = useApiMutation('/announcements', 'POST', {
    onSuccess: () => {
      navigation.goBack()
    },
    onError: (error) => {
      Alert.alert('Error', error.message || 'Could not create announcement.')
    },
    invalidateQueries: ['/announcements'],
  })

  const handleSubmit = () => {
    createAnnouncementMutation.mutate(announcement)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create New Announcement</Text>
        </View>
        <AnnouncementForm
          announcement={announcement}
          setAnnouncement={setAnnouncement}
          handleSubmit={handleSubmit}
          isSubmitting={createAnnouncementMutation.isLoading}
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
