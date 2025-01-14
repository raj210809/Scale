import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import OrderCard from '@/components/cards/ordershowingcard';

const Yourorders = () => {

    const orderDetailsData = [
        {
            name: "Nike Red casual shoes with white...",
            description: "Combining comfort, durability, and style.",
            brand: "Nike",
            rating: 4.5,
            reviews: 150,
            price: "Rs 3500",
            size: "6 UK",
            quantity: "1",
            image: "https://via.placeholder.com/150",
            delivery: "Arriving in 4 days",
            orderTime: "2023-12-20 15:30:00",
            status: "Packaging started",
            address:
                "73 Khaladin Terrace, A K Marg, Gowala Tank Rd, Opp Symphony, August Kranti Marg, Mumbai, Maharashtra, 400036",
            payment: {
                totalMRP: "Rs 4000",
                discount: "- Rs 500",
                shippingFee: "Rs 30",
                totalAmount: "Rs 3530",
            },
        },
        {
            name: "Adidas Ultraboost Shoes",
            description: "High-performance shoes for everyday running.",
            brand: "Adidas",
            rating: 4.8,
            reviews: 210,
            price: "Rs 8000",
            size: "9 UK",
            quantity: "1",
            image: "https://via.placeholder.com/150",
            delivery: "Arriving in 2 days",
            orderTime: "2023-12-18 12:45:00",
            status: "Dispatched",
            address:
                "15 Park Street, Park Lane, Sector 10, Gurugram, Haryana, 122001",
            payment: {
                totalMRP: "Rs 9000",
                discount: "- Rs 1000",
                shippingFee: "Free",
                totalAmount: "Rs 8000",
            },
        },
        {
            name: "Apple AirPods Pro (2nd Gen)",
            description: "Next-level sound quality and noise cancellation.",
            brand: "Apple",
            rating: 4.9,
            reviews: 95,
            price: "Rs 25000",
            size: "N/A",
            quantity: "1",
            image: "https://via.placeholder.com/150",
            delivery: "Arriving tomorrow",
            orderTime: "2023-12-22 09:00:00",
            status: "Out for delivery",
            address:
                "45 Residency Road, Near Mall of India, Bangalore, Karnataka, 560001",
            payment: {
                totalMRP: "Rs 27000",
                discount: "- Rs 2000",
                shippingFee: "Rs 100",
                totalAmount: "Rs 25100",
            },
        },
        {
            name: "Sony WH-1000XM5 Headphones",
            description: "Industry-leading noise cancellation for audiophiles.",
            brand: "Sony",
            rating: 4.6,
            reviews: 320,
            price: "Rs 29990",
            size: "N/A",
            quantity: "1",
            image: "https://via.placeholder.com/150",
            delivery: "Delivered 2 days ago",
            orderTime: "2023-12-16 14:30:00",
            status: "delivered",
            address:
                "10 MG Road, Opposite Tech Park, Pune, Maharashtra, 411001",
            payment: {
                totalMRP: "Rs 33000",
                discount: "- Rs 3000",
                shippingFee: "Rs 50",
                totalAmount: "Rs 29990",
            },
        },
        {
            name: "Fossil Gen 6 Smartwatch",
            description: "Modern and stylish smartwatch with advanced features.",
            brand: "Fossil",
            rating: 4.4,
            reviews: 180,
            price: "Rs 19999",
            size: "One Size",
            quantity: "1",
            image: "https://via.placeholder.com/150",
            delivery: "Arriving in 7 days",
            orderTime: "2023-12-25 10:15:00",
            status: "Processing",
            address:
                "88 Silverline Apartments, Napean Sea Road, Mumbai, Maharashtra, 400026",
            payment: {
                totalMRP: "Rs 22000",
                discount: "- Rs 2001",
                shippingFee: "Free",
                totalAmount: "Rs 19999",
            },
        },
    ];
    

  return (
    <ScrollView>
      {orderDetailsData.map((item)=>{
        return (
            <OrderCard {...item} key={item.name}/>
        )
      })}
    </ScrollView>
  )
}

export default Yourorders

const styles = StyleSheet.create({})