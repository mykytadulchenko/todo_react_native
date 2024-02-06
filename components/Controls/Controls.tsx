import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import asyncItemActions from '../../store/actions/itemActions'
import { getSelectAllSelector, getUserSelector } from '../../store/selectors'

const Controls = () => {
  const dispatch = useDispatch()
  const user = useSelector(getUserSelector)
  const selectAll = useSelector(getSelectAllSelector)
  const [input, setInput] = useState('')
  const processAddItem = () => {
    dispatch(asyncItemActions.addNewItem(user!, input))
    setInput('')
  }
  const processSelectAll = () => {
    dispatch(asyncItemActions.processSelectAll(user!, selectAll))
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={processSelectAll}>
        <FontAwesomeIcon icon={faCheckDouble} color="#789cdb" size={25} />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={input}
        placeholder='Input task...'
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={processAddItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
  input: {
    flexGrow: 1,
    padding: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#789cdb',
    color: '#789cdb',
  },
  button: {
    color: '#789cdb',
  },
})
export default Controls
