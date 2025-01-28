import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

interface Address {
  _id: string;
  user: string;
  name: string;
  mobile: string;
  pincode: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  address_type: string;
  __v: number;
}

interface OrderItem {
  product: string;
  quantity: number;
  price: string;
}

interface Order {
  _id: string;
  user: string;
  brand: string;
  address: Address;
  status: string;
  orderOn: string;
  orderItems: OrderItem[];
  totalAmount: number;
  paymentMethod : {
    mode : string,
    name : string,
  }
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  termsAccepted: boolean;
  notificationPermission: boolean;
  yourOrders: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const order = () => {
  const {orderId} = useLocalSearchParams();
  
  const [order , setOrders] = useState<Order>()
  const [user , setUser] = useState<User>()

  const fetchOrder = async () =>{
    try {
      const response = await fetch(`http://192.168.13.61:3000/order/get-order-by-id?orderId=${orderId}`)
      const data = await response.json()
      setOrders(data.order)
      setUser(data.user)
  } catch (error) {
      console.log(error)
  }}
  useEffect(()=>{
    fetchOrder()
  },[])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.orderId}>Order Id #{order?._id}</Text>
      </Text>

      <View style={styles.card}>
        <Text style={styles.section}>
          <Text style={styles.label}>Customer:</Text> {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.section}>
          <Text style={styles.label}>Date:</Text> {order?.orderOn}
        </Text>
        <Text style={styles.section}>
          <Text style={styles.label}>Status:</Text> {order?.status}
        </Text>
        <Text style={styles.section}>
          <Text style={styles.label}>Total:</Text> {order?.totalAmount}
        </Text>

        <Text style={styles.subHeading}>Customer Information:</Text>
        <Text style={styles.section}>
          • <Text style={styles.label}>Name:</Text> {order?.address.name}
        </Text>
        <Text style={styles.section}>
          • <Text style={styles.label}>Email:</Text> {user?.email}
        </Text>
        <Text style={styles.section}>
          • <Text style={styles.label}>Phone:</Text> {order?.address.mobile}
        </Text>

        <Text style={styles.subHeading}>Shipping Details:</Text>
        <Text style={styles.section}>
          • <Text style={styles.label}>Address:</Text> {order?.address.address} , {order?.address.locality}  {order?.address.city} , {order?.address.state} , {order?.address.pincode}
        </Text>
        <Text style={styles.section}>
          • <Text style={styles.label}>Shipping Method:</Text>{" "}
          Standard
        </Text>

        <Text style={styles.subHeading}>Order Items:</Text>
        {order?.orderItems.map((item, index) => (
          <Text key={index} style={styles.section}>
            {index + 1}. <Text style={styles.label}>Product Name:</Text> {item.product}{" "}
            {"\n"}
            <Text style={styles.label}>Quantity:</Text> {item.quantity} {"\n"}
            <Text style={styles.label}>Price:</Text> {item.price}
          </Text>
        ))}

        <Text style={styles.section}>
          <Text style={styles.label}>Total:</Text> {order?.totalAmount}
        </Text>
        <Text style={styles.section}>
          <Text style={styles.label}>Payment Method:</Text> {order?.paymentMethod.mode}
        </Text>
      </View>
    </ScrollView>
  );
};

export default order;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  orderId: {
    color: "#E91E63",
  },
  card: {
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  section: {
    marginBottom: 8,
    fontSize: 16,
    color: "#333",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#555",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
});
