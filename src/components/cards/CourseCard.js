import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export const CourseCard = ({ course, onPress }) => {
  const { code, name, credits, semester, _count } = course

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white/80 rounded-3xl border border-slate-200 p-5 shadow-sm mb-3 active:opacity-70"
    >
      <View className="flex-row items-start justify-between mb-2">
        <View className="flex-1">
          <Text className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            {code}
          </Text>
          <Text className="text-lg font-semibold text-slate-900 mt-1">{name}</Text>
        </View>
      </View>
      
      <View className="flex-row items-center gap-3 mt-3 flex-wrap">
        <View className="bg-brand-100 px-3 py-1 rounded-full">
          <Text className="text-xs font-semibold text-brand-700">{credits} Credits</Text>
        </View>
        <View className="bg-slate-100 px-3 py-1 rounded-full">
          <Text className="text-xs font-semibold text-slate-700">{semester}</Text>
        </View>
        {_count?.enrollments ? (
          <View className="bg-orange-100 px-3 py-1 rounded-full">
            <Text className="text-xs font-semibold text-orange-700">
              {_count.enrollments} enrolled
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  )
}

