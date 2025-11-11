import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../../styles/colors'

export const VenueCard = ({ venue }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.venueName}>{venue.name}</Text>
        <Text style={styles.venueBuilding}>{venue.building}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.detailText}>Capacity: {venue.capacity}</Text>
        <Text style={styles.detailText}>Schedules: {venue._count?.schedules || 0}</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={[styles.statusPill, styles[venue.status]]}>
          {venue.status}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.slate[200],
  },
  cardHeader: {
    marginBottom: 12,
  },
  venueName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.slate[800],
  },
  venueBuilding: {
    fontSize: 14,
    color: colors.slate[500],
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: colors.slate[600],
  },
  cardFooter: {
    alignItems: 'flex-start',
  },
  statusPill: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    textTransform: 'uppercase',
  },
  AVAILABLE: {
    backgroundColor: colors.green[100],
    color: colors.green[800],
  },
  MAINTENANCE: {
    backgroundColor: colors.amber[100],
    color: colors.amber[800],
  },
  UNAVAILABLE: {
    backgroundColor: colors.red[100],
    color: colors.red[800],
  },
})
