import React, { useState } from 'react'
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useApiQuery, useApiMutation } from '../hooks/hooks'
import { useAuth } from '../contexts/AuthContext'
import { Loader } from '../components/common/Loader'
import { EmptyState } from '../components/common/EmptyState'
import { CommentList } from '../components/lists/CommentList'
import { colors } from '../styles/colors'
import { Feather } from '@expo/vector-icons'

export const AnnouncementDetailScreen = ({ route, navigation }) => {
  const { id } = route.params
  const { user } = useAuth()
  const [comment, setComment] = useState('')

  const announcementQuery = useApiQuery(`/announcements/${id}`)
  const commentsQuery = useApiQuery(`/announcements/${id}/comments`)

  const commentMutation = useApiMutation(`/announcements/${id}/comments`, {
    method: 'POST',
    onSuccess: () => {
      setComment('')
      commentsQuery.refetch()
    }
  })

  const deleteAnnouncementMutation = useApiMutation(`/announcements/${id}`, 'DELETE', {
    onSuccess: () => {
      navigation.goBack()
    },
    onError: (error) => {
      Alert.alert('Error', error.message || 'Could not delete announcement.')
    },
    invalidateQueries: ['/announcements'],
  })
  
  const handleDelete = () => {
    Alert.alert(
      'Delete Announcement',
      'Are you sure you want to delete this announcement?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteAnnouncementMutation.mutate() },
      ]
    )
  }

  const handleSubmitComment = () => {
    if (!comment.trim()) return
    commentMutation.mutate({ content: comment })
  }

  if (announcementQuery.isLoading) {
    return <Loader label="Loading announcement" />
  }

  const announcement = announcementQuery.data?.data || announcementQuery.data
  const comments = commentsQuery.data?.data || commentsQuery.data || []

  if (!announcement) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Announcement not found</Text>
      </View>
    )
  }

  const created = new Date(announcement.createdAt)
  const canModify = user?.role === 'ADMIN' || user?.id === announcement.author?.id

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
        keyboardVerticalOffset={100}
      >
        <ScrollView style={styles.scroll}>
          <View style={styles.card}>
            <Text style={styles.title}>{announcement.title}</Text>
            <Text style={styles.content}>{announcement.content}</Text>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Posted by {announcement.author?.name || 'Unknown'} • {created.toLocaleDateString()}
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Comments ({comments.length})</Text>

          {comments.map((comment) => (
            <View key={comment.id} style={styles.commentCard}>
              <Text style={styles.commentAuthor}>{comment.author?.name || 'Anonymous'}</Text>
              <Text style={styles.commentText}>{comment.content}</Text>
              <Text style={styles.commentDate}>
                {new Date(comment.createdAt).toLocaleDateString()}
              </Text>
            </View>
          ))}

          {comments.length === 0 && (
            <Text style={styles.emptyComments}>No comments yet. Be the first!</Text>
          )}
        </ScrollView>

        <View style={styles.commentInput}>
          <TextInput
            style={styles.input}
            placeholder="Add a comment..."
            value={comment}
            onChangeText={setComment}
            multiline
          />
          <TouchableOpacity
            onPress={handleSubmitComment}
            disabled={!comment.trim() || commentMutation.isLoading}
            style={[styles.postButton, (!comment.trim() || commentMutation.isLoading) && styles.postButtonDisabled]}
          >
            {commentMutation.isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.postButtonText}>Post</Text>
            )}
          </TouchableOpacity>
        </View>
        {canModify && (
          <View style={styles.fabContainer}>
            <TouchableOpacity 
              style={styles.fab} 
              onPress={() => navigation.navigate('EditAnnouncement', { id })}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.slate[50],
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: colors.slate[500],
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.slate[200],
    padding: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.slate[900],
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    color: colors.slate[700],
    lineHeight: 24,
  },
  footer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.slate[200],
  },
  footerText: {
    fontSize: 12,
    color: colors.slate[400],
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.slate[900],
    marginBottom: 12,
  },
  commentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate[200],
    padding: 16,
    marginBottom: 12,
  },
  commentAuthor: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brand[600],
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: colors.slate[700],
  },
  commentDate: {
    fontSize: 12,
    color: colors.slate[400],
    marginTop: 8,
  },
  emptyComments: {
    fontSize: 14,
    color: colors.slate[500],
    textAlign: 'center',
    paddingVertical: 32,
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: colors.slate[200],
    gap: 8,
  },
  input: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate[300],
    backgroundColor: colors.slate[50],
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
  },
  postButton: {
    backgroundColor: colors.brand[500],
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  postButtonDisabled: {
    opacity: 0.5,
  },
  postButtonText: {
    color: '#ffffff',
    fontWeight: '600',
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
