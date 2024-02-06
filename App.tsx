import { Provider } from 'react-redux'
import AppLayout from './components/AppLayout/AppLayout'
import store from './store/store'
import { StatusBar } from 'expo-status-bar'

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <AppLayout />
    </Provider>
  )
}
