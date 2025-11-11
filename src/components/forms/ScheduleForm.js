import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { colors } from '../../styles/colors'

export const ScheduleForm = ({ schedule, setSchedule, handleSubmit, isSubmitting, venues = [], courses = [] }) => {
  return (
    <View style={styles.form}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Course</Text>
        <Picker
          selectedValue={schedule.courseId}
          onValueChange={(itemValue) => setSchedule({ ...schedule, courseId: itemValue })}
          style={styles.picker}
        >
          {courses.map(course => (
            <Picker.Item key={course.id} label={course.name} value={course.id} />
          ))}
        </Picker>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Venue</Text>
        <Picker
          selectedValue={schedule.venueId}
          onValueChange={(itemValue) => setSchedule({ ...schedule, venueId: itemValue })}
          style={styles.picker}
        >
          {venues.map(venue => (
            <Picker.Item key={venue.id} label={venue.name} value={venue.id} />
          ))}
        </Picker>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Day of the Week</Text>
        <Picker
          selectedValue={schedule.dayOfWeek}
          onValueChange={(itemValue) => setSchedule({ ...schedule, dayOfWeek: itemValue })}
          style={styles.picker}
        >
          <Picker.Item label="Monday" value="MONDAY" />
          <Picker.Item label="Tuesday" value="TUESDAY" />
          <Picker.Item label="Wednesday" value="WEDNESDAY" />
          <Picker.Item label="Thursday" value="THURSDAY" />
          <Picker.Item label="Friday" value="FRIDAY" />
        </Picker>
      </View>
      {/* Time inputs would ideally be a custom time picker component */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Start Time (HH:MM)</Text>
        <TextInput
          style={styles.input}
          value={schedule.startTime}
          onChangeText={(text) => setSchedule({ ...schedule, startTime: text })}
          placeholder="e.g., 09:00"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>End Time (HH:MM)</Text>
        <TextInput
          style={styles.input}
          value={schedule.endTime}
          onChangeText={(text) => setSchedule({ ...schedule, endTime: text })}
          placeholder="e.g., 11:00"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Semester</Text>
        <TextInput
          style={styles.input}
          value={schedule.semester}
          onChangeText={(text) => setSchedule({ ...schedule, semester: text })}
          placeholder="e.g., Fall 2025"
        />
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
