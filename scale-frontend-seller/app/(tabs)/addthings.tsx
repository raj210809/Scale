import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Postupdate from '@/components/section/postupdate'
import AddProductSection from '@/components/section/addproduct'
import { router } from 'expo-router'

const addthings = () => {
    const [page , setpage] = useState("Post Update")

    return (
      <View style={{ height : '100%'}}>
        <View>
          <TouchableOpacity style={{flexDirection : 'row' , width : '100%' , justifyContent : 'flex-end' , height : 15 , alignItems : 'center' , marginTop : 5}} onPress={()=>{router.push("/drafts")}}>
            <Text style={{marginRight : 10 , fontWeight : '800'}}>Drafts</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection : 'row' , justifyContent : 'space-around' , marginTop : 20}}>
          <TouchableOpacity style={[styles.filterButton , page === "Post Update" && styles.activeFilter]} onPress={() => setpage("Post Update")}>
            <Text style={[styles.headtext , page === "Post Update" && styles.activeheadtext]}>Post Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterButton , page === "Add Products" && styles.activeFilter]} onPress={() => setpage("Add Products")}>
            <Text style={[styles.headtext , page === 'Add Products' && styles.activeheadtext]}>Add Products</Text>
          </TouchableOpacity>
        </View>
        {page === "Post Update" ? <Postupdate/> : <AddProductSection/>}
      </View>
    )
}

export default addthings

const styles = StyleSheet.create({
    filterButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      backgroundColor: 'grey',
      width : "48%",
      alignItems : 'center',
      justifyContent : 'center',
      flexDirection : 'row'
    },
    activeFilter: {
      backgroundColor: '#000',
    },
    headtext : {
      color : 'black',
    },
    activeheadtext : {
      color : 'white'
    }
  })