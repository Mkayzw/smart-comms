import React, { useState } from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useApiQuery } from '../hooks/hooks'
import { Loader } from '../components/common/Loader'
import { EmptyState } from '../components/common/EmptyState'
import { colors } from '../styles/colors'
import { useAuth } from '../contexts/AuthContext'
import { Feather } from '@expo/vector-icons'

export const AnnouncementsScreen = ({ navigation }) => {
  const { user } = useAuth()
  const [search, setSearch] = useState('')

  const announcementsQuery = useApiQuery('/announcements', {
    params: {
      limit: 20,
      page: 1,
      search: search || undefined
    }
  })

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Announcements</Text>
        {['ADMIN', 'LECTURER'].includes(user?.role) && (
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate('CreateAnnouncement')}
          >
            <Feather name="plus" size={20} color={colors.slate[50]} />
            <Text style={styles.createButtonText}>New</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color={colors.slate[400]} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search announcements"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView style={styles.scroll}>
        {announcementsQuery.isLoading ? (
          <Loader label="Fetching announcements" />
        ) : announcementsQuery.data?.data?.length ? (
          announcementsQuery.data.data.map((announcement) => (
            <View key={announcement.id} style={styles.card}>
              <Text style={styles.cardTitle}>{announcement.title}</Text>
              <Text style={styles.cardText} numberOfLines={2}>{announcement.content}</Text>
            </View>
          ))
        ) : (
          <EmptyState description="No one said anything yet. Must be exam week." />
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
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate[300],
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate[300],
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: '500',
    color: colors.slate[700],
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.slate[900],
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: colors.slate[500],
  },
})
