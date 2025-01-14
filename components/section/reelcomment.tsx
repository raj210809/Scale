import { StyleSheet, Text, View , TextInput , TouchableOpacity} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import CommentCard from '../cards/commentcard'
import { ScrollView } from 'react-native-gesture-handler'

const Reelcomment = () => {

    const comments = [
        {
            id : '1',
            name : "laila",
            comment : 'hi bro hello this is the first comment hello bro how are you',
            profilepic : 'https://randomuser.me/api/portraits/women/10.jpg'
        },
        {
            id : "2",
            name : 'raj',
            comment : 'hello bro kaise ho bhai this is the comment for this this is the second comment',
            profilepic : "https://randomuser.me/api/portraits/women/10.jpg"
        }
    ]

  return (
    <View style={{width : "100%" , height :"100%"}}>
      <ScrollView>
        {comments.map((item)=>{
          return (
            <CommentCard key={item.id} {...item}/>
          )
        })}
      </ScrollView>
      <View style={{flexDirection : 'row' , width : '98%' , justifyContent : 'space-around' , marginBottom : 5 , position: "absolute" , bottom : 10}}>
        <TextInput placeholder='write comment here' style={{width : '80%' , height : 40 , borderColor: '#6c63ff', borderWidth: 1 , borderRadius : 10 }}></TextInput>
        <TouchableOpacity style={{width : '15%' , flexDirection : 'row' , justifyContent : 'center' , alignItems : 'center' }}>
            <Ionicons name='send' size={28} style={{alignSelf : 'center'}}></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Reelcomment

const styles = StyleSheet.create({})