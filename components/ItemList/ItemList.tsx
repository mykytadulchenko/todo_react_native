import { FC } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { IListItem } from '../../types'
import { IListItemLayout } from '../../types/components'
import Item from '../Item/Item'

const ItemList: FC<IListItemLayout> = ({ data }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ gap: 10 }}>

      {data.length ?
      data.map((item: IListItem) => (
        <Item key={item.id} itemData={item} />
      ))
      :
      <Text style={styles.placeholder}>List is empty!</Text>}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexGrow: 1,
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
  placeholder: {
    textAlign: 'center',
    color: '#789cdb'
  }
})
export default ItemList
