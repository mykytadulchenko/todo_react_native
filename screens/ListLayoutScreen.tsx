import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView, StyleSheet } from 'react-native'
import Controls from '../components/Controls/Controls'
import Footer from '../components/Footer/Footer'
import ItemList from '../components/ItemList/ItemList'
import { useDispatch, useSelector } from 'react-redux'
import { getDataSelector, getFilterSelector, getUserSelector } from '../store/selectors'
import { useEffect, useMemo } from 'react'
import asyncItemActions from '../store/actions/itemActions'
import Profile from '../components/Profile/Profile'

const ListLayoutScreen = () => {
  const dispatch = useDispatch()
  const user = useSelector(getUserSelector)
  const data = useSelector(getDataSelector)
  const filter = useSelector(getFilterSelector)

  useEffect(() => {
    dispatch(asyncItemActions.fetchData(user!))
  }, [])

  const activeCounter = data.reduce((acc, el) => (el.completed ? acc : ++acc), 0)

  const filteredData = useMemo(() => {
    switch (filter) {
      case 'Active':
        return data.filter((el) => !el.completed)
      case 'Finished':
        return data.filter((el) => el.completed)
      default:
        return data
    }
  }, [filter, data])
  return (
    <LinearGradient style={styles.outerContainer} colors={['#83a4d4', '#b6fbff']}>
      <SafeAreaView style={styles.innerContainer}>
        <Profile user={user!}/>
        <Controls />
        <ItemList data={filteredData} />
        <Footer activeCounter={activeCounter} isAnyFinished={data.length !== activeCounter} />
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  innerContainer: {
    gap: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
})
export default ListLayoutScreen
