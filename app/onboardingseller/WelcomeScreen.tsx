import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

const WelcomeScreenSeller = () => {

  const [selectedValue  ,setSelectedValue] = useState("+91")
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Scale</Text>
      <TextInput style={styles.input} placeholder="Enter your email" />
      <TextInput placeholder="Phone number or email" style={styles.input} />
      <TouchableOpacity onPress={()=> router.push("/onboardingseller/passwordreset/veriftmail")}>
        <Text style={{color : 'red' , fontWeight : '700' , fontSize : 15}}>Forgot Password ?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/onboarding/Verifynumber")}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', justifyContent: 'center' , alignItems: 'center' , width: '100%'}}>
      <Text>Don't have an account ? </Text>
      <TouchableOpacity onPress={() => {router.push('/onboarding/signupscreen')}}>
        <Text style={{color : 'red' , fontWeight : '700' , fontSize : 15}}>Sign up</Text>
      </TouchableOpacity>
      </View>
      <Text style={styles.orText}>OR</Text>
      <TouchableOpacity style={styles.socialButton}><Text>Continue with Email</Text></TouchableOpacity>
      {Platform.OS === "ios" ? <TouchableOpacity style={styles.socialButton}><Text>Continue with Apple</Text></TouchableOpacity> : null}
      <TouchableOpacity style={styles.socialButton}><Text>Continue with Google</Text></TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}><Text>Continue with Facebook</Text></TouchableOpacity>
    </View>
  );
};

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

export default WelcomeScreenSeller;
