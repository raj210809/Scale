import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import OrderCard from '@/components/cards/ordershowingcard';
import axios from 'axios';

const Yourorders = () => {

    const [orders , setOrders] = useState([])
    const userId = "6788e8786d5e4f7411b20b5e"
    const fetchOrders = async () => {
        try {
            const response = await axios.get(`http://192.168.13.61:3000/order/get-orders?user=${userId}`)
            setOrders(response.data.orders)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchOrders()
    },[])

  return (
    <ScrollView>
      {orders.map((item)=>{
        return (
            <OrderCard {...item} key={item._id}/>
        )
      })}
    </ScrollView>
  )
}

export default Yourorders

const styles = StyleSheet.create({})