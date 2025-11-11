import { config } from '../config'

const API_BASE_URL = config.API_URL

const buildUrl = (path, params) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  const url = new URL(`${API_BASE_URL}${cleanPath}`)
  
  if (params && typeof params === 'object') {
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.filter(v => v !== undefined && v !== null && v !== '').forEach(entry => {
          url.searchParams.append(key, entry)
        })
      } else if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, value)
      }
    })
  }
  
  return url.toString()
}

export const apiFetch = async (path, options = {}) => {
  const {
    method = 'GET',
    body,
    token,
    params,
    headers: customHeaders = {},
    timeout = 10000 // 10 second timeout by default
  } = options

  const url = buildUrl(path, params)

  const headers = {
    Accept: 'application/json',
    ...customHeaders
  }

  if (body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  // Create abort controller for timeout
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body && !(body instanceof FormData) ? JSON.stringify(body) : body,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (response.status === 204) {
      return null
    }

    const contentType = response.headers.get('Content-Type')
    const isJson = contentType?.includes('application/json')
    const payload = isJson ? await response.json() : await response.text()

    if (!response.ok) {
      const errorMessage = payload?.error || payload?.message || response.statusText
      const error = new Error(errorMessage || 'Request failed')
      error.status = response.status
      error.payload = payload
      throw error
    }

    return payload
  } catch (err) {
    clearTimeout(timeoutId)
    
    // Handle timeout errors
    if (err.name === 'AbortError') {
      const error = new Error('Request timeout - please check your network connection')
      error.status = 408
      error.isTimeout = true
      throw error
    }
    
    // Re-throw other errors
    throw err
  }
}

