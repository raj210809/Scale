import { StyleSheet, Text, View , TouchableOpacity , TextInput } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker'

const employeeregistration = () => {

    const [selectedValue  ,setSelectedValue] = React.useState("")
    const [employee , setEmployee] = React.useState({
        accountHolderName : "",
        bankName : "",
        accountNumber : "",
        accountType : selectedValue,
        routingName : "",
        swiftCode : "",
        taxID : ""
    })

    const handleChange = (name , value) => {
        setEmployee({
            ...employee,
            [name] : value
        })
    }
  return (
    <View style={{padding: 20}}>
          <Text style={styles.title}>Company Registration</Text>
          <TextInput placeholder="Account Holder Name" style={styles.input} onChangeText={(text)=> handleChange("accountHolderName" , text)}/>
            <TextInput placeholder='Bank Name' style={styles.input} onChangeText={(text)=> handleChange("bankName" , text)} />
            <TextInput placeholder="Company Account Number" style={styles.input} onChangeText={(text)=> handleChange("accountNumber" , text)}/>
                <View style={{width : '100%' , borderWidth : 1, borderRadius : 7 , borderColor: '#ccc',}}>
                <Picker
                selectedValue={selectedValue}
                placeholder='Account Type'
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
                style={styles.picker}
            >
        <Picker.Item label="Current" value="Current" />
        <Picker.Item label="Savings" value="Savings" />
      </Picker>
                </View>
            <TextInput placeholder='Routing Name' style={styles.input} onChangeText={(text)=> handleChange("routingName" ,text)} />
            <TextInput placeholder='SWIFT/BIC Code' style={styles.input} onChangeText={(text)=> handleChange("swiftCode" ,text)} />
            <TextInput placeholder='Tax ID/VAT Number' style={styles.input} onChangeText={(text)=> handleChange("taxID" ,text)} />
          <TouchableOpacity style={styles.button} onPress={()=>{}}>
            <Text style={styles.buttonText}>Submmit</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Back</Text>
            </TouchableOpacity>
        </View>
  )
}

export default employeeregistration

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
      width : '100%',
      borderWidth : 1,
    }
  });