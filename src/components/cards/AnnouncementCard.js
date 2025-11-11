import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { StatusPill } from '../common/StatusPill'

const audienceCopy = {
  ALL: 'Everyone',
  STUDENTS: 'Students',
  LECTURERS: 'Lecturers'
}

export const AnnouncementCard = ({ announcement, onPress }) => {
  const { title, content, targetAudience, createdAt, _count } = announcement
  const created = new Date(createdAt)

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white/80 rounded-3xl border border-slate-200 p-5 shadow-sm mb-3 active:opacity-70"
    >
      <View className="flex-row items-start justify-between mb-2">
        <View className="flex-1">
          <Text className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {audienceCopy[targetAudience] || 'Everyone'}
          </Text>
          <Text className="text-lg font-semibold text-slate-900 mt-2">{title}</Text>
        </View>
        <StatusPill tone="info">{_count?.comments ?? 0} replies</StatusPill>
      </View>
      
      <Text className="text-sm text-slate-500 mt-2" numberOfLines={2}>
        {content}
      </Text>
      
      <View className="flex-row items-center gap-4 mt-4">
        <Text className="text-xs font-medium text-slate-400">
          📅 {created.toLocaleDateString()} {created.toLocaleTimeString()}
        </Text>
        <Text className="text-xs font-medium text-slate-400">
          💬 {_count?.comments ?? 0} comments
        </Text>
      </View>
    </TouchableOpacity>
  )
}

