import { useNavigation } from '@react-navigation/native'
import { type NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Animated, { BounceInUp } from 'react-native-reanimated'
import { useDispatch } from 'react-redux'
import asyncUserActions from '../../store/actions/userActions'
import { type Dispatch } from '@reduxjs/toolkit'
import { type IAction } from '../../types'

const SignUpForm = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const dispatch = useDispatch<Dispatch<IAction>>()
  const authInitialState = { email: '', login: '', password: '' }
  const [authInputs, setAuthInputs] = useState(authInitialState)
  const changeAuthMethod = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    })
  }
  const processSignUp = () => {
    dispatch(asyncUserActions.signUp(authInputs))
    setAuthInputs(authInitialState)
  }
  return (
    <Animated.View entering={BounceInUp.delay(300)} style={styles.formContainer}>
      <TextInput
        style={styles.input}
        value={authInputs.email}
        onChangeText={(text) => setAuthInputs({ ...authInputs, email: text })}
        placeholder="Email..."
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={authInputs.login}
        onChangeText={(text) => setAuthInputs({ ...authInputs, login: text })}
        placeholder="Login..."
      />
      <TextInput
        style={styles.input}
        value={authInputs.password}
        onChangeText={(text) => setAuthInputs({ ...authInputs, password: text })}
        placeholder="Password..."
        secureTextEntry
      />
      <Button color={styles.white.color} title="Sign Up" onPress={processSignUp} />
      <View style={styles.changeAuthContainer}>
        <Text style={styles.white}>Already have an account? </Text>
        <TouchableOpacity onPressOut={changeAuthMethod}>
          <Text style={styles.blue}>Sign In!</Text>
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

export default SignUpForm
