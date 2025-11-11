import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { colors } from '../../styles/colors'

export const VenueForm = ({ venue, setVenue, handleSubmit, isSubmitting }) => {
  return (
    <View style={styles.form}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={venue.name}
          onChangeText={(text) => setVenue({ ...venue, name: text })}
          placeholder="e.g., Main Auditorium"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Building</Text>
        <TextInput
          style={styles.input}
          value={venue.building}
          onChangeText={(text) => setVenue({ ...venue, building: text })}
          placeholder="e.g., Engineering Block"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Capacity</Text>
        <TextInput
          style={styles.input}
          value={String(venue.capacity)}
          onChangeText={(text) => setVenue({ ...venue, capacity: text })}
          keyboardType="number-pad"
          placeholder="e.g., 500"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Status</Text>
        <Picker
          selectedValue={venue.status}
          onValueChange={(itemValue) => setVenue({ ...venue, status: itemValue })}
          style={styles.picker}
        >
          <Picker.Item label="Available" value="AVAILABLE" />
          <Picker.Item label="Maintenance" value="MAINTENANCE" />
          <Picker.Item label="Unavailable" value="UNAVAILABLE" />
        </Picker>
      </View>
      <TouchableOpacity
        style={[styles.button, isSubmitting && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>{isSubmitting ? 'Submitting...' : 'Submit'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.slate[700],
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.slate[300],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  picker: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.slate[300],
    borderRadius: 8,
  },
  button: {
    backgroundColor: colors.brand[500],
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.brand[300],
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
