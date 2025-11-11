import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useApiQuery } from '../hooks/hooks'
import { Loader } from '../components/common/Loader'
import { EmptyState } from '../components/common/EmptyState'
import { colors } from '../styles/colors'

export const NotificationsScreen = () => {
  const notificationsQuery = useApiQuery('/notifications', {
    params: { limit: 50, page: 1 }
  })

  const notifications = notificationsQuery.data?.data || notificationsQuery.data || []

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.subtitle}>Stay updated with campus activities</Text>
      </View>

      <ScrollView style={styles.scroll}>
        {notificationsQuery.isLoading ? (
          <Loader label="Loading notifications" />
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <View key={notification.id} style={[styles.card, !notification.isRead && styles.cardUnread]}>
              <Text style={styles.cardTitle}>{notification.title}</Text>
              <Text style={styles.cardText}>{notification.content}</Text>
              <Text style={styles.cardDate}>
                {new Date(notification.createdAt).toLocaleDateString()}
              </Text>
            </View>
          ))
        ) : (
          <EmptyState description="No notifications yet. You're all caught up!" />
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.slate[900],
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.slate[500],
    marginBottom: 16,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate[200],
    padding: 16,
    marginBottom: 12,
  },
  cardUnread: {
    backgroundColor: colors.brand[50],
    borderColor: colors.brand[200],
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.slate[900],
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: colors.slate[600],
    marginBottom: 8,
  },
  cardDate: {
    fontSize: 12,
    color: colors.slate[400],
  },
})
