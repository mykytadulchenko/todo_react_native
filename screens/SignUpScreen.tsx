import { LinearGradient } from 'expo-linear-gradient'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'
import Animated, { BounceInUp } from 'react-native-reanimated'
import SignUpForm from '../components/SignUpForm/SignUpForm'

const SignUpScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient style={styles.fullHeight} colors={['#83a4d4', '#b6fbff']}>
        <Animated.View entering={BounceInUp} style={styles.titleContainer}>
          <ScrollView contentContainerStyle={styles.fullHeight}>
            <Text style={[styles.title, styles.white, styles.textShadow]}>Sign Up</Text>
          </ScrollView>
        </Animated.View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.fullHeight}>
          <SignUpForm />
        </KeyboardAvoidingView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  fullHeight: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    gap: 10,
    paddingHorizontal: '10%',
  },
  titleContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
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
  title: {
    padding: 5,
    paddingTop: '50%',
    fontSize: 48,
  },
  white: {
    color: '#fafafa',
  },
  blue: {
    color: '#789cdb',
  },
  textShadow: {
    textShadowColor: 'rgba(84, 84, 84, 0.4)',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 5,
  },
})
export default SignUpScreen
