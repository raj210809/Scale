import { ImageBackground, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Productbottomsheet from '@/components/bottomsheet/products'
import { router } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import Bookmark from '@/components/buttons/bookmark'
import Share from '@/components/buttons/share'

const reelleftswipe = () => {
  return (
    <ImageBackground source={{uri : "https://via.placeholder.com/50"}} style={{flex : 1}} resizeMode='cover'>
        <View style={{flexDirection : 'row',justifyContent : 'space-between',padding : 10 , position : 'absolute',width : '100%' , top : 50 , alignItems : 'center'}}>
            <View>
                <TouchableOpacity onPress={()=>{router.back()}} style={{width : 50 , height : 50 , borderRadius : 25 , backgroundColor : 'rgba(255,255,255,0.5)',justifyContent : 'center',alignItems : 'center'}}>
                    <FontAwesome name="arrow-left" size={24} color="black" />
                </TouchableOpacity> 
            </View>
            <View style={{flexDirection : 'row' , height : 50 , justifyContent : 'space-between' , width : '15%' , alignItems : 'center'}}>
                <Bookmark/>
                <Share/>
            </View>
        </View>
        <Productbottomsheet onClose={()=>{}} studentid='12345'/>
    </ImageBackground>
  )
}

export default reelleftswipe

const styles = StyleSheet.create({})