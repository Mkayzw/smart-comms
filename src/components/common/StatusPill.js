import React from 'react'
import { View, Text } from 'react-native'

const toneClasses = {
  brand: 'bg-brand-100 text-brand-700',
  accent: 'bg-orange-100 text-orange-700',
  neutral: 'bg-slate-100 text-slate-700',
  info: 'bg-blue-100 text-blue-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  danger: 'bg-red-100 text-red-700',
}

export const StatusPill = ({ children, tone = 'neutral' }) => {
  return (
    <View className={`px-3 py-1 rounded-full ${toneClasses[tone] || toneClasses.neutral}`}>
      <Text className={`text-xs font-semibold ${toneClasses[tone]?.includes('text-') ? '' : 'text-slate-700'}`}>
        {children}
      </Text>
    </View>
  )
}

