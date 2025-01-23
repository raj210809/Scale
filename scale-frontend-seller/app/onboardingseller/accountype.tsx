import { StyleSheet, Text, View , TouchableOpacity  } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const accountype = () => {

    const [type , setType] = React.useState("")

    const handleclick = () => {
        if(type === "company"){
            router.push("/onboardingseller/employeeregistration")
        } else {
            router.push("/onboardingseller/companyregistration")
        }
    }

  return (
    <View style={{padding: 20}}>
          <Text style={styles.title}>Register as</Text>
          <TouchableOpacity style={[{marginTop : 20 , height : 60 , borderWidth : 2 , borderColor : 'black' , justifyContent : 'center' , borderRadius : 10} , type === "company" ? {backgroundColor : 'black'} : {}]} onPress={()=> setType("company")}>
            <Text style={[{marginLeft : 20} , type === "company" && {color : "white"}]}>Employee To Register Company</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[{marginTop : 20 , height : 60 , borderWidth : 2 , borderColor : 'black' , justifyContent : 'center' , borderRadius : 10} , type === "employee" ? {backgroundColor : 'black'} : {}]} onPress={()=> setType("employee")}>
            <Text style={[{marginLeft : 20} , type === "employee" && {color : "white"}]}>A New Company</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleclick}>
            <Text style={styles.buttonText}>Submmit</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Back</Text>
            </TouchableOpacity>
        </View>
  )
}

export default accountype

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