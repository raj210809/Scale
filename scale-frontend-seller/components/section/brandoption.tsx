import { StyleSheet, Text, View ,Image } from 'react-native'
import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { router } from 'expo-router'

const Optionsection = () => {
    const options = [
        {
            id : '1',
            image : "https://via.placeholder.com/50",
            name : "Nike"
        },
        {
            id : '2',
            image : "https://via.placeholder.com/50",
            name : "H&M"
        },
        {
            id : '3',
            image : "https://via.placeholder.com/50",
            name : "Zara"
        },
        {
            id : '4',
            image : "https://via.placeholder.com/50",
            name : "Adidas"
        },
        {
            id : '5',
            image : "https://via.placeholder.com/50",
            name : "Raymond"
        },
        {
            id : '6',
            image : "https://via.placeholder.com/50",
            name : "WildCraft"
        },
        {
            id : "7",
            image : "https://via.placeholder.com/50",
            name : "Balenciaga"
        },
    ]
  return (
    <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.divstyle}
    >
        {options.map((item)=>{
            return (
                <TouchableOpacity onPress={()=>{router.push({
                    pathname : "/components/afterCategorypage",
                    params : {
                        type : item.name
                    }
                })}} style={styles.buttonstyle} key={item.id}>
                    <Image source={{uri : item.image}} style={styles.iconstyle}/>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            )
        })}
    </ScrollView>
  )
}

export default Optionsection

const styles = StyleSheet.create({
    divstyle : {
        height : 100,
    },
    buttonstyle : {
        margin : 10,
        marginLeft : 15,
        marginRight : 15,
        flexDirection  :'column',
        justifyContent : 'center',
        alignItems : 'center'
    },
    iconstyle : {
        height : 60,
        width : 60,
        borderRadius : 20
    },
    icntext : {

    }
})