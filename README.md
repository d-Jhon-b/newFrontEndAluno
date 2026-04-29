# 📱 Carteirinha Digital — Fatec Itaquera (PWA)

Migração de **React Native (Expo)** para **React + Vite + TypeScript** como **PWA (Progressive Web App)**.

---

## 🔄 O que é PWA?

PWA (Progressive Web App) é o nome correto do que você estava procurando.
O usuário acessa pelo navegador normalmente, e o navegador oferece a opção de **"Adicionar à tela inicial"** — criando um atalho que abre o app sem barra de URL, em tela cheia, igual a um app nativo. Funciona em Android, iOS, Windows e Desktop.

---

## 🗂️ Estrutura do projeto

```
src/
├── assets/              # Ícones, imagens
├── components/
│   ├── AppShell.tsx      # Layout com header + bottom nav
│   ├── OfflineBanner.tsx # Banner sem conexão
│   └── PWAInstallBanner.tsx # Prompt de instalação
├── contexts/
│   └── AuthContext.tsx   # Estado global de autenticação
├── hooks/
│   ├── useNetworkStatus.ts  # Substitui NetInfo do RN
│   └── usePWAInstall.ts     # Prompt de instalação PWA
├── pages/
│   ├── Login/
│   ├── Home/
│   ├── Carteirinha/
│   ├── Horarios/
│   └── Calendario/
├── routes/
│   └── index.tsx         # Substitui @react-navigation
├── services/
│   └── authService.ts    # Chamadas à API REST
├── types/
│   └── index.ts          # Tipos TypeScript
├── App.tsx
├── main.tsx
└── index.css             # Variáveis de tema global
```

---

## 🔁 Mapeamento de tecnologias (React Native → React Web)

| React Native / Expo           | React + Vite PWA                          |
|-------------------------------|-------------------------------------------|
| `SafeAreaProvider/SafeAreaView`| `env(safe-area-inset-*)` no CSS           |
| `StatusBar` (Expo)            | `<meta name="theme-color">` no HTML       |
| `useFonts` (@expo-google-fonts)| `<link>` Google Fonts no `index.html`     |
| `AppState`                    | Page Visibility API / `usePWAInstall`     |
| `@react-navigation/native`    | `react-router-dom` v6                     |
| `@react-navigation/native-stack`| `<Routes>` + `<Route>` + `useNavigate` |
| `AsyncStorage`                | `localStorage`                            |
| `NetInfo`                     | `navigator.onLine` + eventos online/offline|
| `expo-image-picker`           | `<input type="file" accept="image/*" capture>`|
| `@expo/vector-icons`          | SVG inline (sem dependência externa)      |
| `react-native-vector-icons`   | SVG inline                                |
| `StyleSheet.create({})`       | CSS Modules (`.module.css`)               |
| `View`, `Text`, `TouchableOpacity` | `div`, `p`, `button` HTML nativos  |
| `FlatList`                    | `Array.map()` + CSS scroll                |
| `ScrollView`                  | `overflow-y: auto` no CSS                 |
| `expo start`                  | `vite dev`                                |
| `app.json` (Expo config)      | `vite.config.ts` + `manifest` no PWA plugin|

---

## 🚀 Como rodar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.example .env
# Edite o .env com a URL do seu backend
```

### 3. Rodar em desenvolvimento
```bash
npm run dev
```

### 4. Build para produção
```bash
npm run build
```

### 5. Preview do build
```bash
npm run preview
```

---

## 📲 Como instalar como PWA

### Android (Chrome)
1. Abra o app no Chrome
2. Menu (⋮) → "Adicionar à tela inicial"
3. Confirme — aparece como ícone na home

### iOS (Safari)
1. Abra no Safari
2. Compartilhar (⬆) → "Adicionar à Tela Início"
3. Confirme o nome

### Desktop (Chrome/Edge)
- Ícone de instalação aparece na barra de endereços

---

## ⚙️ Configurações do PWA (`vite.config.ts`)

O plugin `vite-plugin-pwa` gera automaticamente:
- `manifest.webmanifest` — nome, ícones, cores, modo standalone
- Service Worker com cache offline
- Atualização automática quando há nova versão

---

## 🎨 Temas e cores

As cores do projeto original foram mantidas:
```css
--color-primary: #c41c34   /* vermelho Fatec */
--color-background: #0d0d0d
```
Todas as variáveis estão em `src/index.css`.

---

## 🔌 Integração com o Backend

O projeto se conecta à mesma API Node.js/Express do projeto original.
Configure a URL em `.env`:
```
VITE_API_URL=https://sua-api.com
```

Os endpoints esperados são:
- `POST /auth/login` → `{ token, aluno }`
- `GET  /aluno/perfil`
- `GET  /aluno/horarios`
- `GET  /aluno/calendario`

---

## 📦 Dependências principais

```json
{
  "react": "^18",
  "react-router-dom": "^6",   ← substitui @react-navigation
  "qrcode.react": "^4",       ← QR Code do aluno
  "vite-plugin-pwa": "^0.20"  ← torna o app instalável
}
```

---

*Projeto PEPPE — Fatec Itaquera 2025 · DSM*
