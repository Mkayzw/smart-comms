import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useApiQuery, useApiMutation } from '../hooks/hooks'
import { useAuth } from '../contexts/AuthContext'
import { Loader } from '../components/common/Loader'
import { EmptyState } from '../components/common/EmptyState'
import { Feather } from '@expo/vector-icons'
import { colors } from '../styles/colors'

export const VenueDetailScreen = ({ route, navigation }) => {
  const { id } = route.params
  const { user } = useAuth()
  const venueQuery = useApiQuery(`/venues/${id}`)

  const deleteVenueMutation = useApiMutation(`/venues/${id}`, 'DELETE', {
    onSuccess: () => {
      navigation.goBack()
    },
    onError: (error) => {
      Alert.alert('Error', error.message || 'Could not delete venue.')
    },
    invalidateQueries: ['/venues'],
  })

  const handleDelete = () => {
    Alert.alert(
      'Delete Venue',
      'Are you sure you want to delete this venue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteVenueMutation.mutate() },
      ]
    )
  }

  if (venueQuery.isLoading) {
    return <Loader />
  }

  if (venueQuery.isError) {
    return (
      <EmptyState
        icon="alert-triangle"
        message="Could not load venue details."
        details={venueQuery.error?.message}
      />
    )
  }

  const venue = venueQuery.data

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.venueName}>{venue.name}</Text>
          <Text style={styles.venueBuilding}>{venue.building}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailItem}>Capacity: {venue.capacity}</Text>
          <Text style={styles.detailItem}>Status: {venue.status}</Text>
          <Text style={styles.detailItem}>Schedules: {venue.schedules?.length || 0}</Text>
        </View>
      </ScrollView>
      {user?.role === 'ADMIN' && (
        <View style={styles.fabContainer}>
          <TouchableOpacity 
            style={styles.fab} 
            onPress={() => navigation.navigate('EditVenue', { id: venue.id })}
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
  venueName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.slate[900],
  },
  venueBuilding: {
    fontSize: 16,
    color: colors.slate[500],
  },
  details: {
    padding: 16,
  },
  detailItem: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.slate[700],
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
