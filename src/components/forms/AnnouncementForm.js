import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { colors } from '../../styles/colors'

export const AnnouncementForm = ({ announcement, setAnnouncement, handleSubmit, isSubmitting }) => {
  return (
    <View style={styles.form}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={announcement.title}
          onChangeText={(text) => setAnnouncement({ ...announcement, title: text })}
          placeholder="e.g., Campus Maintenance"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Content</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={announcement.content}
          onChangeText={(text) => setAnnouncement({ ...announcement, content: text })}
          placeholder="e.g., The main campus will be closed..."
          multiline
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Target Audience</Text>
        <Picker
          selectedValue={announcement.targetAudience}
          onValueChange={(itemValue) => setAnnouncement({ ...announcement, targetAudience: itemValue })}
          style={styles.picker}
        >
          <Picker.Item label="All" value="ALL" />
          <Picker.Item label="Students" value="STUDENTS" />
          <Picker.Item label="Lecturers" value="LECTURERS" />
        </Picker>
      </View>
      <View style={styles.switchGroup}>
        <Text style={styles.label}>Pinned</Text>
        <Switch
          value={announcement.pinned}
          onValueChange={(value) => setAnnouncement({ ...announcement, pinned: value })}
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
  switchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
    height: 120,
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
