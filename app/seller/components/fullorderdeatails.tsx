import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

const OrderDetails = () => {
  const {orderId} = useLocalSearchParams();
  // Hardcoded order details (replace with your data structure as needed)
  const orderDetails = {
    id: orderId,
    customerName: "Michael Lee",
    date: "August 1, 2024",
    status: "Canceled",
    total: "$150.00",
    customerInfo: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "(123) 456-7890",
    },
    shippingDetails: {
      address: "123 Main St, Springfield, IL 62701",
      method: "Standard Shipping",
    },
    orderItems: [
      { name: "AirMax Pro", quantity: 1, price: "$100.00" },
      { name: "Shoe Care Kit", quantity: 1, price: "$20.00" },
    ],
    totalRs: "Rs 10061.38",
    paymentMethod: "Credit Card (**** **** **** 1234)",
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.orderId}>Order Id #{orderDetails.id}</Text>
      </Text>

      <View style={styles.card}>
        <Text style={styles.section}>
          <Text style={styles.label}>Customer:</Text> {orderDetails.customerName}
        </Text>
        <Text style={styles.section}>
          <Text style={styles.label}>Date:</Text> {orderDetails.date}
        </Text>
        <Text style={styles.section}>
          <Text style={styles.label}>Status:</Text> {orderDetails.status}
        </Text>
        <Text style={styles.section}>
          <Text style={styles.label}>Total:</Text> {orderDetails.total}
        </Text>

        <Text style={styles.subHeading}>Customer Information:</Text>
        <Text style={styles.section}>
          • <Text style={styles.label}>Name:</Text> {orderDetails.customerInfo.name}
        </Text>
        <Text style={styles.section}>
          • <Text style={styles.label}>Email:</Text> {orderDetails.customerInfo.email}
        </Text>
        <Text style={styles.section}>
          • <Text style={styles.label}>Phone:</Text> {orderDetails.customerInfo.phone}
        </Text>

        <Text style={styles.subHeading}>Shipping Details:</Text>
        <Text style={styles.section}>
          • <Text style={styles.label}>Address:</Text> {orderDetails.shippingDetails.address}
        </Text>
        <Text style={styles.section}>
          • <Text style={styles.label}>Shipping Method:</Text>{" "}
          {orderDetails.shippingDetails.method}
        </Text>

        <Text style={styles.subHeading}>Order Items:</Text>
        {orderDetails.orderItems.map((item, index) => (
          <Text key={index} style={styles.section}>
            {index + 1}. <Text style={styles.label}>Product Name:</Text> {item.name}{" "}
            {"\n"}
            <Text style={styles.label}>Quantity:</Text> {item.quantity} {"\n"}
            <Text style={styles.label}>Price:</Text> {item.price}
          </Text>
        ))}

        <Text style={styles.section}>
          <Text style={styles.label}>Total:</Text> {orderDetails.totalRs}
        </Text>
        <Text style={styles.section}>
          <Text style={styles.label}>Payment Method:</Text> {orderDetails.paymentMethod}
        </Text>
      </View>
    </ScrollView>
  );
};

export default OrderDetails;

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
