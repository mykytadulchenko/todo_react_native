import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useDispatch, useSelector } from 'react-redux'
import SignInScreen from '../../screens/SignInScreen'
import SignUpScreen from '../../screens/SignUpScreen'
import { getAuthStatus } from '../../store/selectors'
import ListLayoutScreen from '../../screens/ListLayoutScreen'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { userActions } from '../../store/actions/userActions'

const Stack = createNativeStackNavigator()

const AppLayout = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(getAuthStatus)
  useEffect(() => {
    const authResolver = async () => {
      const token = await AsyncStorage.getItem('auth_token')
      if (!token) return
      dispatch(userActions.setCurrentUser(token))
    }
    authResolver()
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
        {isAuth ? (
          <>
            <Stack.Screen name="ListLayout" component={ListLayoutScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppLayout
