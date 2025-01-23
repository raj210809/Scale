import { StyleSheet, Text, View , TouchableOpacity , TextInput } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { router } from 'expo-router'

const companyregistration = () => {
    const [employee , setEmployee] = React.useState({
        companyName : "",
        businessEmail : "",
        contactNumber : "",
        businessAddress : "",
        websiteURL : "",
        businessRegistrationNumber : "",
        companyTagline : "",
        fullName : "",
        emailAddress : "",
        designation : "",
        phoneNumber : ""
    })

    const handleChange = (name , value) => {
        setEmployee({
            ...employee,
            [name] : value
        })
    }
  return (
    <ScrollView style={{padding: 20}}>
          <Text style={styles.title}>Company Registration</Text>
          <TextInput placeholder="Company Name" style={styles.input} onChangeText={(text)=> handleChange("companyName" , text)}/>
            <TextInput placeholder='Business Email' style={styles.input} onChangeText={(text)=> handleChange("businessEmail" , text)} />
            <TextInput placeholder="Contact Number" style={styles.input} onChangeText={(text)=> handleChange("contactNumber" , text)}/>
            <TextInput placeholder='Business Address' style={styles.input} onChangeText={(text)=> handleChange("businessAddress" ,text)} />
            <TextInput placeholder='Website URL (optional)' style={styles.input} onChangeText={(text)=> handleChange("websiteURL" ,text)} />
            <TextInput placeholder='Business Registration Number' style={styles.input} onChangeText={(text)=> handleChange("businessRegistrationNumber" ,text)} />
            <TextInput placeholder='Company Tagline' style={styles.input} onChangeText={(text)=> handleChange("companyTagline" ,text)} />
            <TextInput placeholder='Your FUll Name' style={styles.input} onChangeText={(text)=> handleChange("fullName" ,text)} />
            <TextInput placeholder='Your Emaiul Address' style={styles.input} onChangeText={(text)=> handleChange("emailAddress" ,text)} />
            <TextInput placeholder='Your Designation' style={styles.input} onChangeText={(text)=> handleChange("designation" ,text)} />
            <TextInput placeholder='Your Phone Number' style={styles.input} onChangeText={(text)=> handleChange("phoneNumber" ,text)} />
          <TouchableOpacity style={styles.button} onPress={()=>{router.push("/onboardingseller/companyAccount")}}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{router.back()}}>
            <Text>Back</Text>
            </TouchableOpacity>
        </ScrollView>
  )
}

export default companyregistration

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