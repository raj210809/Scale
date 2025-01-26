import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useShareButton } from '@/context/sharebutton'
import axios from 'axios'

interface bookmarkprop {
  id : string,
  type : string,
}

const Bookmark = (prop : bookmarkprop) => {

  const user = "6788e8786d5e4f7411b20b5e"

    const hasbookmarked = async () : Promise<any> => {
        try {
            const response = await axios.get("http://192.168.13.61:3000/bookmark/has-bookmarked",{params : {id : prop.id , type : prop.type , user : user }})
            setclicked(response.data.bookmark)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
      hasbookmarked()
    },[])

    const [clicked , setclicked] = useState<boolean>(false)

    const handleClick = async () => {
      if(clicked){
        try {
          await axios.post("http://192.168.13.61:3000/bookmark/remove-bookmark",{id : prop.id , type : prop.type , user : user})
          setclicked(false)
        } catch (error) {
          console.log(error)
        }}
      else{
        try {
          await axios.post("http://192.168.13.61:3000/bookmark/add-bookmark",{id : prop.id , type : prop.type , user : user})
          setclicked(true)
        } catch (error) {
          console.log(error)
        }}
    }

  return (
    <View style={{height : 30 , width : 30 , borderRadius : 15 , justifyContent : "center" , alignItems : "center" , marginTop : 5, marginLeft : 5}}>
        <TouchableOpacity onPress={handleClick}>
            <Ionicons name={clicked ? "bookmark" : "bookmark-outline"} size={24} color={clicked ? "black" : "cyan"} />
        </TouchableOpacity>
    </View>
  )
}

export default Bookmark

const styles = StyleSheet.create({})