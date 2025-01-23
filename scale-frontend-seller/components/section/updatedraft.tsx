import { StyleSheet, Text, View  } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import React from 'react'
import Updatedrafts from '../cards/updatedrafts';

const UpdateDraft = () => {

    const dummyData = [
        {
            id: 1,
            productName: "Product 1",
            description: "Description for product 1",
            imageUri: "https://st.depositphotos.com/2036077/2629/i/950/depositphotos_26296093-stock-photo-3d-special-offer-word-on.jpg"
        },
        {
            id: 2,
            productName: "Product 2",
            description: "Description for product 2",
            imageUri: "https://st.depositphotos.com/2036077/2629/i/950/depositphotos_26296093-stock-photo-3d-special-offer-word-on.jpg"
        },
        {
            id: 3,
            productName: "Product 3",
            description: "Description for product 3",
            imageUri: "https://st.depositphotos.com/2036077/2629/i/950/depositphotos_26296093-stock-photo-3d-special-offer-word-on.jpg"
        },
        {
            id: 4,
            productName: "Product 4",
            description: "Description for product 4",
            imageUri: "https://st.depositphotos.com/2036077/2629/i/950/depositphotos_26296093-stock-photo-3d-special-offer-word-on.jpg"
        }
    ];
    
  return (
    <ScrollView>
      {dummyData.map((item) => {
        return (
            <Updatedrafts key={item.id}/>
        )
      })}
    </ScrollView>
  )
}

export default UpdateDraft

const styles = StyleSheet.create({})