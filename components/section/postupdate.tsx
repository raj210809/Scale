import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

const Postupdate = () => {
  return (
    <ScrollView>
      <View style={{borderWidth : 1 , borderColor : 'black' , padding : 10 , borderRadius : 10 , margin : 10}}>
        <Text style={{fontSize : 18,fontWeight : "600"}}>Add image/video</Text>
        <Text>related to announcement</Text>
        <View style={{width : '98%' , height : 250 , marginTop : 20 , borderWidth : 1 , borderColor : 'black' , borderRadius : 10}}>
            <TouchableOpacity>
                <ImageBackground style={{width : '100%' , height : '100%' , justifyContent : 'center' , alignItems : 'center' , flexDirection : 'row'}}>
                    <View style={{backgroundColor : 'rgba(0,0,0,0.5)' , padding : 10 , borderRadius : 10 , flexDirection : 'row' , alignItems : 'center' , justifyContent : 'center'}}>
                        <Text>Upload Image</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
      </View>
      <TextInput placeholder="Heading in 5 words" style={{borderWidth : 1 , borderColor : 'black' , padding : 10 , borderRadius : 10 , margin : 10 , height : 55}}/>
      <TextInput placeholder="Description in 150 words" style={{borderWidth : 1 , borderColor : 'black' , padding : 10 , borderRadius : 10 , margin : 10 , height : 55}}/>
      <View style={{flexDirection : 'row' , justifyContent : 'space-around' , marginTop : 10}}>
        <TouchableOpacity style={{backgroundColor : 'black' , padding : 10 , borderRadius : 10 , width : '48%' , alignItems : 'center' , justifyContent : 'center' , alignSelf : 'center' , marginTop : 20 , height: 45}}>
            <Text style={{color : 'white'}}>Upload later</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor : 'black' , padding : 10 , borderRadius : 10 , width : '48%' , alignItems : 'center' , justifyContent : 'center' , alignSelf : 'center' , marginTop : 20 , height : 45}}>
            <Text style={{color : 'white'}}>Release Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Postupdate

const styles = StyleSheet.create({})