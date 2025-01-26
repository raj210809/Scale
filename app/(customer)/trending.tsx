import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import IndexSearch from '../components/searchcomponent'
import { ScrollView } from 'react-native-gesture-handler'
import Indexsearch from '@/components/section/indexsearch'
import Launchingsoon from '@/components/section/launchingsoon'
import Optionsection from '@/components/section/brandoption'

const trending = () => {

    const [modalVisible, setModalVisible] = useState(false);
  return (
    <ScrollView style={{backgroundColor : "white"}}>
        <View style={{height : 40 , backgroundColor : "beige "}}>
            <Text style={{fontSize: 25,fontWeight: 'bold',marginLeft: 10,color: 'red',}}>Scale</Text>
        </View>
      <Indexsearch modalVisible={setModalVisible}/>
      <Launchingsoon type="trending" />
      <View style={{marginTop : 20 , padding : 10}}>
        <Text style={{fontSize : 23 , fontWeight : "bold"}}>Brands</Text>
        <Optionsection />
      </View>
      <View style={{marginTop : 20 , padding : 10}}>
        <Text style={{fontSize : 23 , fontWeight : "bold"}}>Looking For ...</Text>
        </View>
    </ScrollView>
  )
}

export default trending

const styles = StyleSheet.create({})