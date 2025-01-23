import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { router } from 'expo-router'

const setPass = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleclick = () => {
        if(password === confirmPassword
    ){
        alert('Password Reset')
        router.push("/seller/(tabs)")
    } else {
        alert('Password does not match')
    }
    }

  return (
    <View style={{padding: 20}}>
      <Text style={styles.title}>Password Reset</Text>
      <TextInput placeholder="Enter Password" style={styles.input} onChangeText={(text)=> setPassword(text)}/>
        <TextInput placeholder='Confirm PAssword' style={styles.input} onChangeText={(text)=> setConfirmPassword(text)} />
      <TouchableOpacity style={styles.button} onPress={handleclick}>
        <Text style={styles.buttonText}>Submmit</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Back</Text>
        </TouchableOpacity>
    </View>
  )
}

export default setPass

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      marginVertical: 10,
      height : 55
    },
    button: {
      backgroundColor: '#e91e63',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    orText: {
      textAlign: 'center',
      marginVertical: 10,
    },
    socialButton: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 15,
      marginVertical: 5,
      alignItems: 'center',
    },
    picker : {
      width : '100%'
    }
  });