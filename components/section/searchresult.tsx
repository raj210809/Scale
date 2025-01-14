import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import ProductCard from '../cards/productshowsmall';

interface prop {
    searchfor : string
}

const Searchresult = (prop: prop) => {
    const dummyData = [
        {
            id: 1,
            productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Wireless Headphones",
            productDescription: "High-quality wireless headphones with noise cancellation.",
            productBrand: "SoundPro",
            productRating: 4.5,
            productReviewCount: 145,
            productPrice: 99,
        },
        {
            id: 2,
            productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Wireless Headphones",
            productDescription: "High-quality wireless headphones with noise cancellation.",
            productBrand: "SoundPro",
            productRating: 4.5,
            productReviewCount: 145,
            productPrice: 99,
        },
        {
            id: 3,
            productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Wireless Headphones",
            productDescription: "High-quality wireless headphones with noise cancellation.",
            productBrand: "SoundPro",
            productRating: 4.5,
            productReviewCount: 145,
            productPrice: 99,
        },
        {
            id: 4,
            productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Wireless Headphones",
            productDescription: "High-quality wireless headphones with noise cancellation.",
            productBrand: "SoundPro",
            productRating: 4.5,
            productReviewCount: 145,
            productPrice: 99,
        },
        {
            id: 5,
            productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Wireless Headphones",
            productDescription: "High-quality wireless headphones with noise cancellation.",
            productBrand: "SoundPro",
            productRating: 4.5,
            productReviewCount: 145,
            productPrice: 99,
        },
        {
            id: 6,
            productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Wireless Headphones",
            productDescription: "High-quality wireless headphones with noise cancellation.",
            productBrand: "SoundPro",
            productRating: 4.5,
            productReviewCount: 145,
            productPrice: 99,
        },
        {
            id: 7,
            productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Wireless Headphones",
            productDescription: "High-quality wireless headphones with noise cancellation.",
            productBrand: "SoundPro",
            productRating: 4.5,
            productReviewCount: 145,
            productPrice: 99,
        },
        {
            id: 8,
            productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Wireless Headphones",
            productDescription: "High-quality wireless headphones with noise cancellation.",
            productBrand: "SoundPro",
            productRating: 4.5,
            productReviewCount: 145,
            productPrice: 99,
        },
    ];
  return (
    <ScrollView style={{flex : 1}}>
      {dummyData.map((item)=>{
        return (
            <ProductCard {...item} accessor_name='customer' key={item.id}/>
        )
      })}
    </ScrollView>
  )
}

export default Searchresult

const styles = StyleSheet.create({})