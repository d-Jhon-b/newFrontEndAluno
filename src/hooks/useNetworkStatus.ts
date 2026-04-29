import { useState, useEffect } from 'react'

/**
 * Substitui @react-native-community/netinfo do React Native.
 * Usa a API nativa do navegador: navigator.onLine + eventos online/offline.
 */
export function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsConnected(true)
    const handleOffline = () => setIsConnected(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return { isConnected }
}
