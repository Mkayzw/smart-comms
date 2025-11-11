import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native'
import { useAuth } from '../../contexts/AuthContext'
import { useApiMutation } from '../../hooks/hooks'
import { Feather } from '@expo/vector-icons'
import { colors } from '../../styles/colors'

export const CommentList = ({ announcementId, comments: initialComments, authorId }) => {
  const { user } = useAuth()
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState('')

  const addCommentMutation = useApiMutation(`/announcements/${announcementId}/comments`, 'POST', {
    onSuccess: (newComment) => {
      setComments([newComment, ...comments])
      setNewComment('')
    },
    onError: (error) => {
      Alert.alert('Error', error.message || 'Could not post comment.')
    },
  })

  const deleteCommentMutation = useApiMutation(null, 'DELETE', {
    onSuccess: (data, variables) => {
      setComments(comments.filter(c => c.id !== variables.id))
    },
    onError: (error) => {
      Alert.alert('Error', error.message || 'Could not delete comment.')
    },
  })

  const handleAddComment = () => {
    if (newComment.trim()) {
      addCommentMutation.mutate({ content: newComment })
    }
  }
  
  const handleDeleteComment = (id) => {
    Alert.alert('Delete Comment', 'Are you sure you want to delete this comment?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteCommentMutation.mutate({ id }, { url: `/comments/${id}` }) },
    ])
  }

  const renderComment = ({ item }) => (
    <View style={styles.comment}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentAuthor}>{item.user.firstName} {item.user.lastName}</Text>
        {user?.role === 'ADMIN' || user?.id === item.user.id ? (
          <TouchableOpacity onPress={() => handleDeleteComment(item.id)}>
            <Feather name="trash-2" size={16} color={colors.red[500]} />
          </TouchableOpacity>
        ) : null}
      </View>
      <Text style={styles.commentContent}>{item.content}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comments ({comments.length})</Text>
      <View style={styles.addCommentContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
          <Feather name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.noComments}>No comments yet.</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.slate[800],
  },
  addCommentContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.slate[300],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: colors.brand[500],
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comment: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.slate[200],
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: colors.slate[700],
  },
  commentContent: {
    color: colors.slate[600],
  },
  noComments: {
    textAlign: 'center',
    color: colors.slate[500],
    marginTop: 20,
  },
})
