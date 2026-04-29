import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import AppRouter from './routes'
import OfflineBanner from './components/OfflineBanner'
import PWAInstallBanner from './components/PWAInstallBanner'

/**
 * App.tsx — migrado de React Native (Expo) para React + Vite PWA
 *
 * Mapeamento das mudanças:
 *   SafeAreaProvider/SafeAreaView  → div com padding seguro via CSS env()
 *   StatusBar (expo)               → <meta name="theme-color"> no index.html
 *   useFonts (@expo-google-fonts)  → <link> Google Fonts no index.html
 *   AppState                       → useNetworkStatus (Page Visibility API)
 *   @react-navigation              → react-router-dom v6
 *   AsyncStorage                   → localStorage
 *   NetInfo                        → useNetworkStatus (navigator.onLine)
 */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-container">
          <OfflineBanner />
          <PWAInstallBanner />
          <AppRouter />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}
