import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { VenueForm } from '../components/forms/VenueForm'
import { useApiMutation } from '../hooks/hooks'
import { colors } from '../styles/colors'

export const CreateVenueScreen = ({ navigation }) => {
  const [venue, setVenue] = useState({
    name: '',
    building: '',
    capacity: '0',
    status: 'AVAILABLE',
  })

  const createVenueMutation = useApiMutation('/venues', 'POST', {
    onSuccess: () => {
      navigation.goBack()
    },
    onError: (error) => {
      Alert.alert('Error', error.message || 'Could not create venue.')
    },
    invalidateQueries: ['/venues'],
  })

  const handleSubmit = () => {
    createVenueMutation.mutate(venue)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create New Venue</Text>
        </View>
        <VenueForm
          venue={venue}
          setVenue={setVenue}
          handleSubmit={handleSubmit}
          isSubmitting={createVenueMutation.isLoading}
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
