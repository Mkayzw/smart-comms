import React, { createContext, useContext, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import { apiFetch } from '../utils/apiClient'

const AuthContext = createContext(null)

const STORAGE_KEY = 'smart-uni-auth-v2'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    loadStoredAuth()
  }, [])

  const loadStoredAuth = async () => {
    try {
      const cached = await SecureStore.getItemAsync(STORAGE_KEY)
      if (!cached) {
        setStatus('unauthenticated')
        return
      }

      const parsed = JSON.parse(cached)
      if (!parsed?.token) {
        throw new Error('bad cache')
      }

      setToken(parsed.token)
      setStatus('loading')

      // Use a shorter timeout for initial auth check (5 seconds)
      const profileResponse = await apiFetch('/auth/me', { 
        token: parsed.token,
        timeout: 5000
      })
      const profile = profileResponse?.data || profileResponse
      setUser(profile)
      setStatus('authenticated')
    } catch (err) {
      console.error('Auth cache error:', err)
      
      // If it's a timeout, still set authenticated with cached token
      // User can try to use the app, and if truly invalid, other requests will fail
      if (err.isTimeout) {
        console.log('Backend not reachable, using cached auth')
        setStatus('authenticated')
        // We keep the token but no user profile
      } else {
        // For other errors, clear auth completely
        await SecureStore.deleteItemAsync(STORAGE_KEY)
        setToken(null)
        setUser(null)
        setStatus('unauthenticated')
      }
    }
  }

  const login = async ({ email, password }) => {
    setStatus('loading')
    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: { email, password }
      })

      const payload = res?.data || res
      const nextToken = payload?.token
      const nextUser = payload?.user

      if (!nextToken || !nextUser) {
        throw new Error('Backend sent invalid auth payload')
      }

      setToken(nextToken)
      setUser(nextUser)
      setStatus('authenticated')
      await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify({ token: nextToken }))
      return nextUser
    } catch (err) {
      setStatus('unauthenticated')
      throw err
    }
  }

  const logout = async () => {
    setToken(null)
    setUser(null)
    setStatus('unauthenticated')
    await SecureStore.deleteItemAsync(STORAGE_KEY)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        status,
        isAuthenticated: status === 'authenticated',
        isLoading: status === 'loading' || status === 'checking',
        login,
        logout,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}

