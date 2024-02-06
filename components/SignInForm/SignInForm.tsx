import { useNavigation } from '@react-navigation/native'
import { type Dispatch } from '@reduxjs/toolkit'
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Animated, { BounceInUp } from 'react-native-reanimated'
import { useDispatch } from 'react-redux'
import { type IAction } from '../../types'
import { useState } from 'react'
import { type NativeStackNavigationProp } from '@react-navigation/native-stack'
import asyncUserActions from '../../store/actions/userActions'

const SignInForm = () => {
  const dispatch = useDispatch<Dispatch<IAction>>()
  const authInitState = { login: '', password: '' }
  const [authInputs, setAuthInputs] = useState(authInitState)
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const changeAuthMethod = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignUp' }],
    })
  }
  const processSignIn = () => {
    dispatch(asyncUserActions.signIn(authInputs))
    setAuthInputs(authInitState)
  }
  return (
    <Animated.View entering={BounceInUp.delay(300)} style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Login..."
        value={authInputs.login}
        onChangeText={(text) => setAuthInputs({ ...authInputs, login: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password..."
        value={authInputs.password}
        secureTextEntry
        onChangeText={(text) => setAuthInputs({ ...authInputs, password: text })}
      />
      <Button color={styles.white.color} title="Sign in" onPress={processSignIn} />
      <View style={styles.changeAuthContainer}>
        <Text style={styles.white}>Don't have an account? </Text>
        <TouchableOpacity onPress={changeAuthMethod}>
          <Text style={styles.blue}>Sign Up!</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    gap: 10,
    paddingHorizontal: '10%',
  },
  changeAuthContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 123,
  },
  input: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fafafa',
    color: '#789cdb',
  },
  white: {
    color: '#fafafa',
  },
  blue: {
    color: '#789cdb',
  },
})

export default SignInForm
