import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

interface order {
    id : string,
    customer : string
    orderStatus : string,
    orderDate : string,
    orderAmount : number
}

const Ordersmallcard = (prop : order) => {
  return (
    <View style={{padding : 5 , width : 190 , backgroundColor : "#ff005c" , marginLeft : 10 , borderRadius : 10 , marginRight : 10}}>
      <Text style={{fontSize : 20 , marginBottom : 5}}>Order ID {prop.id}</Text>
      <Text>Customer : {prop.customer}</Text>
        <Text>Date : {prop.orderDate}</Text>
    <Text>Amount : {prop.orderAmount}</Text>
      <Text>Status : {prop.orderStatus}</Text>
      <TouchableOpacity style={{height : 45 , flexDirection : 'row' , justifyContent : 'center' , alignItems : 'center' , borderWidth : 1 , borderColor : 'black' , borderRadius : 10 , width: "100%" , marginTop : 7 , backgroundColor : "white"}} onPress={()=>{router.push({
        pathname : "/components/fullorderdeatails",
        params : {
            orderId : prop.id
        }
      })}}>
        <Text>View Details</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Ordersmallcard

const styles = StyleSheet.create({})