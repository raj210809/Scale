import React, { useState,useEffect } from "react";
import { Animated } from "react-native"; // For the slide animation
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import ProductCard from "@/components/cards/productshowsmall";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useAppStore } from "@/store/store";

const PersonalChat = () => {

  const {selectedChatData, setSelectedChatData, setSelectedChatMessages,selectedChatMessages,addMessages} = useAppStore();
  
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/message/userId/otherUserId`,
          {
            
            withCredentials: true,               
          }
        );
  
        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages);
          console.log("SelectedChatMessages:", response.data.messages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
  
    if (selectedChatData._id) {
      getMessages();
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);
  

  const product = {
    id: 2,
    productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    productName: "Wireless Headphones",
    productDescription: "High-quality wireless headphones with noise cancellation.",
    productBrand: "SoundPro",
    productRating: 4.5,
    productReviewCount: 145,
    productPrice: 99,
  };

  const [messages, setMessages] = useState([
    { id: 1, type: "text", message: "Hi!", time: "10:00 AM", isSent: false },
    { id: 2, type: "text", message: "Hello! How are you?", time: "10:01 AM", isSent: true },
    { id: 3, type: "product", message: product, time: "10:02 AM", isSent: false },
  ]);

  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false); // Toggle product visibility
  const [animationValue] = useState(new Animated.Value(-200)); // Initial position off-screen

  const toggleProductCard = () => {
    if (isExpanded) {
      Animated.timing(animationValue, {
        toValue: -200,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsExpanded(false));
    } else {
      setIsExpanded(true);
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const sendMessage = () => {z
    if (input.trim() !== "") {
      setSelectedChatMessages([...selectedChatMessages, { id: Date.now(), message: input, time: "Now", isSent: true }]);
      
      setInput("");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          item.type === "text" ? (
            <Text
              style={[
                styles.message,
                item.isSent ? styles.sentMessage : styles.receivedMessage,
              ]}
            >
              {item.message}
            </Text>
          ) : (
            <View style={styles.productContainer}>
              <Text style={styles.message}>Check out this product</Text>
              <Animated.View style={[styles.productCard, { left: animationValue }]}>
              <TouchableOpacity onPress={toggleProductCard} style={styles.arrowButton}>
                {isExpanded ? (<FontAwesome name="angle-left" size={24} color="#fff" />) : (<FontAwesome name="angle-right" size={24} color="#fff" />)}
              </TouchableOpacity>
                <ProductCard {...item.message} accessor_name="customer" />
              </Animated.View>
              <Text style={styles.message}>{item.time}</Text>
            </View>
          )
        }
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Add styles for new components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "70%",
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#dcf8c6",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e1e1e1",
  },
  productContainer: {
    position: "relative",
    marginVertical: 10,
    width: "95%",
  },
  arrowButton: {
    position: "absolute",
    left: "95%",
    top: "40%",
    backgroundColor: "#000000",
    height: 40,
    width: 40,
    padding: 5,
    borderRadius: 20,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  arrowText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  productCard: {
    position: "absolute",
    top: 0,
    left: -200, // Default hidden position
    zIndex: 5,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PersonalChat;
