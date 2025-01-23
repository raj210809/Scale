import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { router } from 'expo-router'

const verifyotp = () => {

    const [otpentered , setotpenterd] = useState(false)
    const [otp , setotp] = useState("")

    const OTP = "1234"

    const handleclick = ()=> {
        if(otp === OTP){
            router.push("/onboardingseller/passwordreset/setuppass")
        }else{
            setotpenterd(true)
            setotp("")
        }
    }

  return (
    <View style={{padding: 20}}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={{color : "red"}}>{otpentered ? "Incorrect OTP Entered" : "We have sent you r otp to your email"}</Text>
      <TextInput placeholder={otpentered ? "Re-Enter OTP" : "Enter OTP"} style={styles.input} onChangeText={(text)=>setotp(text)}/>
      <TouchableOpacity style={styles.button} onPress={handleclick}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      <TouchableOpacity >
        <Text>Back</Text>
        </TouchableOpacity>
    </View>
  )
}

export default verifyotp

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