import { StyleSheet, Text, View , Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Updatedrafts = () => {
  return (
    <View>
      <View style={{height : 400 , width : '95%' , borderWidth : 1 , borderColor : 'black' , borderRadius : 13 , padding : 10 , margin : 10 , backgroundColor : "grey"}}>
        <Text style={{marginTop  :20}}>New Launch</Text>
        <Image source={{uri : 'https://st.depositphotos.com/2036077/2629/i/950/depositphotos_26296093-stock-photo-3d-special-offer-word-on.jpg'}} style={{width : "95%" , height : "60%" , marginTop : 20 , borderBottomRightRadius : 15 , borderBottomLeftRadius : 15}}/>
        <Text style={{fontSize : 18 , fontWeight : "700" , marginTop : 10}}>Product Name</Text>
        <Text style={{fontSize : 18 , fontWeight : "200" , marginTop : 5}}>description</Text>
      </View>
      <View style={{flexDirection : 'row' , justifyContent : "space-around"}}>
        <TouchableOpacity style={{height : 45 , backgroundColor : 'white' , width : '48%' , borderWidth :1 , justifyContent : 'center' , alignItems : 'center' , borderRadius : 10}}>
          <Text style={{alignSelf:'center'}}>Edit Post</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{height : 45 , backgroundColor : 'black' , width : '48%' , borderWidth :1 , justifyContent : 'center' , alignItems : 'center' , borderRadius : 10}}>
          <Text style={{alignSelf:'center', color : "#fff"}}>Release Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Updatedrafts

const styles = StyleSheet.create({})