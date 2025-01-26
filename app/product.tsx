import Checkoutcard from '@/components/cards/checkoutcard';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface Payment {
  totalMRP: number;
  discount: number;
  shippingFee: number;
  totalAmount: number;
}

const MyBag = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState<{
    products: { id: string; price: number; quantity: number }[];
    payment: Payment;
  }>({
    products: [],
    payment: { totalMRP: 0, discount: 500, shippingFee: 100, totalAmount: 0 },
  });

  const userId = "6788e8786d5e4f7411b20b5e";

  // Fetch Cart Items
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `http://192.168.13.61:3000/cart/get-cart?userId=${userId}`
      );
      setCartItems(response.data.cart.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Handle item selection
  const handleSelectionChange = ({
    _id,
    price,
    quantity,
    selected,
  }: {
    _id: string;
    price: number;
    quantity: number;
    selected: boolean;
  }) => {
    setSelectedItems((prev) => {
      const updatedProducts = selected
        ? [...prev.products, { id: _id, price, quantity }]
        : prev.products.filter((item) => item.id !== _id);

      const totalMRP = updatedProducts.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const totalAmount =
        totalMRP - prev.payment.discount + prev.payment.shippingFee;

      return {
        products: updatedProducts,
        payment: { ...prev.payment, totalMRP, totalAmount },
      };
    });
  };

  const { totalMRP, discount, shippingFee, totalAmount } = selectedItems.payment;

  return (
    <ScrollView style={styles.container}>
      {cartItems?.map((item) => (
        <Checkoutcard
          key={item?._id}
          {...item.product}
          quantity={item.quantity}
          onSelectionChange={handleSelectionChange}
        />
      ))}
      <View style={styles.paymentInfo}>
        <Text>Total MRP: ₹ {totalMRP}</Text>
        <Text>Discount: ₹ {discount}</Text>
        <Text>Shipping Fee: ₹ {shippingFee}</Text>
        <Text style={styles.totalAmount}>Total Amount: ₹ {totalAmount}</Text>
      </View>
      <TouchableOpacity
        style={styles.placeOrderButton}
        onPress={() => {
          router.push({
            pathname: '/components/addressshoeingpage',
            params: { selectedItems: JSON.stringify(selectedItems) },
          });
        }}
      >
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  paymentInfo: { marginVertical: 20 },
  totalAmount: { fontWeight: 'bold', marginTop: 10 },
  placeOrderButton: { backgroundColor: '#ff0050', padding: 15, borderRadius: 5 },
  placeOrderText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});

export default MyBag;
