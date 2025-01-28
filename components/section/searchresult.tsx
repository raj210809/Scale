import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import ProductCard from '../cards/productshowsmall';
import { mainproduct } from '@/app/product/[id]';
import axios from 'axios';

interface prop {
    searchfor : string
}

const Searchresult = (prop: prop) => {
    const [data , setData] = useState<mainproduct[]>([])
    const fetchData = async ()=>{
        try {
            const response = await axios.get(`http://192.168.13.61:3000/products/search?query=${prop.searchfor}`)
            setData(response.data.products)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchData()
    },[prop])
  return (
    <ScrollView style={{flex : 1}}>
      {data.map((item)=>{
        return (
            <ProductCard {...item} accessor_name='customer' key={item._id}/>
        )
      })}
    </ScrollView>
  )
}

export default Searchresult

const styles = StyleSheet.create({})