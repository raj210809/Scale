import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useShareButton } from '@/context/sharebutton'

const Bookmark = (prop : hellprop) => {

    const [clicked , setclicked] = useState(false)

  return (
    <View style={{height : 30 , width : 30 , borderRadius : 15 , justifyContent : "center" , alignItems : "center" , marginTop : 5, marginLeft : 5}}>
        <TouchableOpacity onPress={() => setclicked(!clicked)}>
            <Ionicons name={clicked ? "bookmark" : "bookmark-outline"} size={24} color={clicked ? "black" : "cyan"} />
        </TouchableOpacity>
    </View>
  )
}

export default Bookmark

const styles = StyleSheet.create({})