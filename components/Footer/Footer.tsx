import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DropdownSelect from 'react-native-input-select'
import { useDispatch, useSelector } from 'react-redux'
import asyncItemActions, { itemActions } from '../../store/actions/itemActions'
import { getFilterSelector, getUserSelector } from '../../store/selectors'
import { FC } from 'react'
import { IFiltersComponent } from '../../types/components'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckDouble, faFilter } from '@fortawesome/free-solid-svg-icons'

const Footer: FC<IFiltersComponent> = ({ activeCounter, isAnyFinished }) => {
  const dispatch = useDispatch()
  const user = useSelector(getUserSelector)
  const filter = useSelector(getFilterSelector)
  const processRemoveSelected = () => {
    dispatch(asyncItemActions.processRemoveSelected(user!))
  }
  const changeFilter = (value: string) => {
    dispatch(itemActions.setFilter(value))
  }
  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{activeCounter} tasks left</Text>
      <View style={styles.dropdownContainer}>
        <DropdownSelect
          dropdownStyle={styles.dropdown}
          dropdownIconStyle={styles.dropdownIcon}
          dropdownContainerStyle={{ marginBottom: 0 }}
          checkboxComponentStyles={{
            checkboxStyle: { borderColor: '#789cdb' },
            checkboxLabelStyle: { color: '#789cdb' },
          }}
          selectedItemStyle={{ color: '#789cdb' }}
          dropdownIcon={<FontAwesomeIcon icon={faFilter} color="#789cdb" size={15} />}
          options={[
            { label: 'All', value: 'All' },
            { label: 'Active', value: 'Active' },
            { label: 'Finished', value: 'Finished' },
          ]}
          selectedValue={filter}
          onValueChange={changeFilter}
          primaryColor={'#789cdb'}
        />
      </View>
      {isAnyFinished ? (
        <TouchableOpacity onPress={processRemoveSelected}>
          <Text style={styles.button}>Delete selected</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
  dropdownContainer: {
    maxWidth: 100,
  },
  dropdown: {
    width: 100,
    marginBottom: 0,
    paddingHorizontal: 5,
    paddingVertical: 0,
    minHeight: 30,
    borderColor: '#789cdb',
  },
  dropdownIcon: {
    top: '25%',
    right: 10,
  },
  button: {
    color: '#789cdb',
    textDecorationLine: 'underline',
  },
  counter: {
    color: '#789cdb',
  },
})
export default Footer
