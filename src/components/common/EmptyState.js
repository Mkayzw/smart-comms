import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../../styles/colors'

export const EmptyState = ({ description }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Text style={styles.emoji}>📭</Text>
      </View>
      <Text style={styles.text}>{description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    backgroundColor: colors.slate[100],
    borderRadius: 32,
    height: 64,
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emoji: {
    fontSize: 30,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.slate[500],
    textAlign: 'center',
    paddingHorizontal: 16,
  },
})
