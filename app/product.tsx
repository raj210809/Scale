import Checkoutcard from '@/components/cards/checkoutcard';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const MyBag = () => {
  const cartItems = [
    {
      id: '1',
      name: 'Puma Red Casual Shoes',
      brand: 'Puma',
      price: '3500',
      rating: '3.5',
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: '2',
      name: 'Leather Boots',
      brand: 'Woodland',
      price: '6500',
      rating: '4.5',
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [selectedItems, setSelectedItems] = useState<{ [key: string]: { price: number; quantity: number } }>({});
  const discount = 500;
  const shipping_fee = 100;

  const handleSelectionChange = ({ id, price, quantity, selected }: { id: string; price: number; quantity: number; selected: boolean }) => {
    setSelectedItems((prev) => {
      const newState = { ...prev };
      if (selected) {
        newState[id] = { price, quantity };
      } else {
        delete newState[id];
      }
      return newState;
    });
  };
  const totalAmount = Object.values(selectedItems).reduce((sum, item) => sum + item.price * item.quantity, 0);
  let finalAmount = totalAmount - discount + shipping_fee;
  
  return (
    <ScrollView style={styles.container}>
      {cartItems.map((item) => (
        <Checkoutcard key={item.id} {...item} onSelectionChange={handleSelectionChange}/>
      ))}
      <View style={styles.paymentInfo}>
        <Text>Total MRP: ₹ {totalAmount}</Text>
        <Text>Discount: ₹ {discount}</Text>
        <Text>Shipping Fee: ₹ {shipping_fee}</Text>
        <Text style={styles.totalAmount}>Total Amount: ₹ {finalAmount}</Text>
      </View>
      <TouchableOpacity style={styles.placeOrderButton} onPress={()=>{router.push('/components/addressshoeingpage')}}>
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  card: { flexDirection: 'row', marginBottom: 20, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 10 },
  image: { width: 100, height: 100, marginRight: 10 },
  details: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold' },
  brand: { fontSize: 14, color: '#666' },
  price: { fontSize: 16, color: '#000' },
  rating: { fontSize: 14, color: '#666' },
  actions: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
  quantityText: { marginHorizontal: 10 },
  paymentInfo: { marginVertical: 20 },
  totalAmount: { fontWeight: 'bold', marginTop: 10 },
  placeOrderButton: { backgroundColor: '#ff0050', padding: 15, borderRadius: 5 },
  placeOrderText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});

export default MyBag;
