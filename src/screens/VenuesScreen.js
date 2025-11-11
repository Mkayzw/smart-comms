import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useApiQuery } from '../hooks/hooks'
import { useAuth } from '../contexts/AuthContext'
import { Feather } from '@expo/vector-icons'
import { colors } from '../styles/colors'
import { EmptyState } from '../components/common/EmptyState'
import { Loader } from '../components/common/Loader'
import { VenueCard } from '../components/cards/VenueCard'

export const VenuesScreen = ({ navigation }) => {
  const { user } = useAuth()
  const venuesQuery = useApiQuery('/venues')

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('VenueDetail', { id: item.id })}>
      <VenueCard venue={item} />
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Venues</Text>
        {user?.role === 'ADMIN' && (
          <TouchableOpacity 
            style={styles.createButton} 
            onPress={() => navigation.navigate('CreateVenue')}
          >
            <Feather name="plus" size={20} color={colors.slate[50]} />
            <Text style={styles.createButtonText}>New Venue</Text>
          </TouchableOpacity>
        )}
      </View>

      {venuesQuery.isLoading ? (
        <Loader />
      ) : venuesQuery.isError ? (
        <EmptyState
          icon="alert-triangle"
          message="Could not load venues."
          details={venuesQuery.error?.message}
        />
      ) : (
        <FlatList
          data={venuesQuery.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <EmptyState
              icon="map-pin"
              message="No venues found."
              details="There are currently no venues to display."
            />
          }
          refreshing={venuesQuery.isRefetching}
          onRefresh={venuesQuery.refetch}
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate[200],
    backgroundColor: 'white',
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
  list: {
    padding: 16,
  },
})
