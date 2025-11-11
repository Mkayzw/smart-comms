import React from 'react'
import { View, Text } from 'react-native'

const toneColors = {
  brand: 'bg-brand-500',
  accent: 'bg-orange-500',
  neutral: 'bg-slate-500',
}

export const MetricCard = ({ label, value, tone = 'neutral' }) => {
  return (
    <View className="bg-white/90 rounded-3xl border border-slate-200 p-5 shadow-sm">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-2xl font-bold text-slate-900">{value || 0}</Text>
          <Text className="text-sm font-semibold text-slate-500 mt-1">{label}</Text>
        </View>
        <View className={`h-12 w-12 rounded-2xl ${toneColors[tone]} opacity-20`} />
      </View>
    </View>
  )
}

