import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { FC, useMemo, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useDispatch } from 'react-redux'
import asyncItemActions from '../../store/actions/itemActions'
import { IListItemComponent } from '../../types/components'

const Item: FC<IListItemComponent> = ({ itemData }) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(itemData.value)
  const itemStyle = useMemo(
    () => (itemData.completed ? [styles.text, styles.finished] : styles.text),
    [itemData.completed],
  )
  const removeItem = () => {
    dispatch(asyncItemActions.removeItem(itemData))
  }
  const checkItem = () => {
    dispatch(asyncItemActions.editItem({ ...itemData, completed: !itemData.completed }))
  }
  const editItem = () => {
    if (itemData.value === value) return
    dispatch(asyncItemActions.editItem({ ...itemData, value }))
  }
  const cancelEdit = () => {
    setValue(itemData.value)
    setIsEditing(false)
  }
  return (
    <View style={styles.container}>
      {isEditing ? (
        <TextInput
          style={styles.editInput}
          value={value}
          onChangeText={(text) => setValue(text)}
          onSubmitEditing={editItem}
          onBlur={cancelEdit}
          autoFocus
        />
      ) : (
        <>
          <BouncyCheckbox
            isChecked={itemData.completed}
            fillColor="#789cdb"
            unfillColor="#fafafa"
            onPress={checkItem}
            disableBuiltInState={true}
          />
          <TouchableOpacity style={{ flexGrow: 1 }} onLongPress={() => setIsEditing(true)}>
            <Text style={itemStyle}>{itemData.value}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={removeItem}>
            <FontAwesomeIcon icon={faTrash} color={'#ad0000'} />
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#789cdb',
    borderRadius: 6,
  },
  text: {
    fontSize: 20,
    color: '#789cdb',
  },
  finished: {
    textDecorationLine: 'line-through',
    textDecorationColor: '#789cdb',
  },
  editInput: {
    width: '100%',
    fontSize: 21,
    color: '#789cdb',
  },
})
export default Item
