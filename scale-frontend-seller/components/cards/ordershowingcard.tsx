import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Drawer } from "react-native-paper";
import Orderextension from "../section/orderextension";

interface OrderDetails {
  name: string;
  description: string;
  brand: string;
  rating: number;
  reviews: number;
  price: string;
  size: string;
  quantity: string;
  image: string;
  delivery: string;
  orderTime: string;
  status: string;
  address: string;
  payment: {
    totalMRP: string;
    discount: string;
    shippingFee: string;
    totalAmount: string;
  };
}

const OrderCard = (prop : OrderDetails) => {

  const [isDrawer , setDrawer] = useState(false)

  return (
    <View style={styles.card}>
      <View style={styles.header}>
      <Text style={styles.title} numberOfLines={1}>
            {prop.name}
        </Text>
        <View style={{flexDirection:'row'}}>
        <View style={{ flex: 1 }}>
          <Text style={styles.subtitle} numberOfLines={1}>
            {prop.description}
          </Text>
          <Text style={styles.brand}>{prop.brand}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{prop.rating}</Text>
            <Text style={styles.reviews}>({prop.reviews})</Text>
          </View>
            <Text style={styles.price}>{prop.price}</Text>
            <Text style={styles.sizeQuantity}>
            Sz | {prop.size} Qt | {prop.quantity}
            </Text>
        </View>
        <Image
          source={{ uri: prop.image }}
          style={styles.image}/>
        </View>
      </View>

      <TouchableOpacity style={[styles.deliveryButton , prop.status === "delivered" ? styles.delivered : null]} onPress={()=>{setDrawer(!isDrawer)}}>
        <Text style={styles.deliveryText}>{prop.delivery}</Text>
        <FontAwesome name={isDrawer === false ? "chevron-right" : "chevron-down"} size={16} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.orderTime}>{prop.orderTime}</Text>
      {isDrawer && <Orderextension {...prop} />}
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    margin: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888",
    marginTop: 4,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginLeft: 10,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    justifyContent: "space-between",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  rating: {
    backgroundColor: "#FFEB3B",
    color: "#333",
    fontWeight: "bold",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 14,
    marginRight: 4,
  },
  reviews: {
    fontSize: 14,
    color: "#888",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 8,
  },
  sizeQuantity: {
    fontSize: 14,
    color: "#666",
    marginTop : 4
  },
  deliveryButton: {
    backgroundColor: "#E91E63",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 4,
    marginVertical: 8,
  },
  deliveryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 4,
  },
  orderTime: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
  delivered : {
    backgroundColor  : "#000"
  }
});
