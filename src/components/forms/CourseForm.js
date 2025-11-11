import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { colors } from '../../styles/colors'

export const CourseForm = ({ course, setCourse, handleSubmit, isSubmitting, lecturers = [] }) => {
  return (
    <View style={styles.form}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Course Code</Text>
        <TextInput
          style={styles.input}
          value={course.code}
          onChangeText={(text) => setCourse({ ...course, code: text })}
          placeholder="e.g., CS101"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Course Name</Text>
        <TextInput
          style={styles.input}
          value={course.name}
          onChangeText={(text) => setCourse({ ...course, name: text })}
          placeholder="e.g., Introduction to Computer Science"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={course.description}
          onChangeText={(text) => setCourse({ ...course, description: text })}
          placeholder="e.g., A foundational course..."
          multiline
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Department</Text>
        <TextInput
          style={styles.input}
          value={course.department}
          onChangeText={(text) => setCourse({ ...course, department: text })}
          placeholder="e.g., Computer Science"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Credits</Text>
        <TextInput
          style={styles.input}
          value={String(course.credits)}
          onChangeText={(text) => setCourse({ ...course, credits: text })}
          keyboardType="number-pad"
          placeholder="e.g., 3"
        />
      </View>
      {lecturers.length > 0 && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Lecturer</Text>
          <Picker
            selectedValue={course.lecturerId}
            onValueChange={(itemValue) => setCourse({ ...course, lecturerId: itemValue })}
            style={styles.picker}
          >
            {lecturers.map(lecturer => (
              <Picker.Item key={lecturer.id} label={`${lecturer.firstName} ${lecturer.lastName}`} value={lecturer.id} />
            ))}
          </Picker>
        </View>
      )}
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
  textarea: {
    height: 100,
    textAlignVertical: 'top',
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
