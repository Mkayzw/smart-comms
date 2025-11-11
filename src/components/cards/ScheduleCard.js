import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const dayOfWeekMap = {
  MONDAY: 'Mon',
  TUESDAY: 'Tue',
  WEDNESDAY: 'Wed',
  THURSDAY: 'Thu',
  FRIDAY: 'Fri',
  SATURDAY: 'Sat',
  SUNDAY: 'Sun',
}

export const ScheduleCard = ({ schedule, onPress }) => {
  const { dayOfWeek, startTime, endTime, course, venue } = schedule

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white/80 rounded-3xl border border-slate-200 p-4 shadow-sm mb-3 active:opacity-70"
    >
      <View className="flex-row items-center gap-3">
        <View className="bg-brand-500 rounded-2xl px-3 py-2 items-center justify-center min-w-[50px]">
          <Text className="text-xs font-bold text-white uppercase">
            {dayOfWeekMap[dayOfWeek] || dayOfWeek}
          </Text>
        </View>
        
        <View className="flex-1">
          <Text className="text-sm font-semibold text-slate-900">
            {course?.name || 'Course'}
          </Text>
          <Text className="text-xs text-slate-500 mt-1">
            {startTime} - {endTime}
          </Text>
          {venue && (
            <Text className="text-xs text-brand-600 mt-1">📍 {venue.name}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

