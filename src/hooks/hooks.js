import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiFetch } from '../utils/apiClient'
import { useAuth } from '../contexts/AuthContext'

export const useApiQuery = (queryKey, options = {}) => {
  const { token } = useAuth()
  const queryFn = () => apiFetch(queryKey, { token, ...options })
  
  return useQuery(queryKey, queryFn, {
    enabled: !!token,
    ...options,
  })
}

export const useApiMutation = (url, method = 'POST', options = {}) => {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  const mutationFn = (body) => {
    return apiFetch(url, {
      method,
      body,
      token,
    })
  }

  return useMutation(mutationFn, {
    ...options,
    onSuccess: (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context)
      }
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach(key => {
          queryClient.invalidateQueries(key)
        })
      }
    },
  })
}
