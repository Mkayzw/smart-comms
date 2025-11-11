import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { VenueForm } from '../components/forms/VenueForm'
import { useApiQuery, useApiMutation } from '../hooks/hooks'
import { Loader } from '../components/common/Loader'
import { colors } from '../styles/colors'

export const EditVenueScreen = ({ route, navigation }) => {
  const { id } = route.params
  const venueQuery = useApiQuery(`/venues/${id}`)
  const [venue, setVenue] = useState(null)

  useEffect(() => {
    if (venueQuery.data) {
      setVenue({
        ...venueQuery.data,
        capacity: String(venueQuery.data.capacity),
      })
    }
  }, [venueQuery.data])

  const editVenueMutation = useApiMutation(`/venues/${id}`, 'PUT', {
    onSuccess: () => {
      navigation.goBack()
    },
    onError: (error) => {
      Alert.alert('Error', error.message || 'Could not update venue.')
    },
    invalidateQueries: ['/venues', `/venues/${id}`],
  })

  const handleSubmit = () => {
    editVenueMutation.mutate(venue)
  }

  if (venueQuery.isLoading || !venue) {
    return <Loader />
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Edit Venue</Text>
        </View>
        <VenueForm
          venue={venue}
          setVenue={setVenue}
          handleSubmit={handleSubmit}
          isSubmitting={editVenueMutation.isLoading}
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
