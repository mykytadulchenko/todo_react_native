import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { type Dispatch } from "@reduxjs/toolkit"
import { FC } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch } from "react-redux"
import asyncUserActions from "../../store/actions/userActions"
import { type IAction } from "../../types"
import { IUserProfile } from "../../types/components"

const Profile:FC<IUserProfile> = ({ user }) => {
    const dispatch = useDispatch<Dispatch<IAction>>()
    const date = new Date()

    const logOutHandler = () => {
        dispatch(asyncUserActions.asyncLogOut())
    }
    
    const dateStringCreator = () =>
        new Intl.DateTimeFormat('en-US', {
          dateStyle: 'full',
    }).format(date)
    
    const responsiveGreeting = (date: Date) => {
        const hours = date.getHours()
        if (hours >= 4 && hours < 12) return 'Good morning'
        if (hours >= 12 && hours < 16) return 'Good day'
        if (hours >= 16 && hours < 24) return 'Good evening'
        if (hours >= 0 && hours < 4) return 'Good night'
    }
  return (
    <View style={styles.container}>
        <Text style={styles.blueColor}>Today is {dateStringCreator()}</Text>
        <View style={styles.profile}>
            <Text style={[styles.blueColor, styles.greeting]}>{responsiveGreeting(date)}, {user.login} !</Text>
            <TouchableOpacity onPress={logOutHandler}>
                <FontAwesomeIcon icon={faRightFromBracket} color='#789cdb' size={20}/>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
        padding: 10,
        width: '100%',
        borderRadius: 8,
        backgroundColor: '#fafafa',
    },
    profile: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    greeting: {
        fontSize: 20
    },
    blueColor: {
        color: '#789cdb'
    }
})

export default Profile