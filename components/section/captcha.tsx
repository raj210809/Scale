import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const generateCaptcha = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
};

const CustomCaptcha = (data : any) => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userInput, setUserInput] = useState("");
  let newData = {
    data : data.data,
    paymentMode : {
      mode : "Cash on Delivery"
    }
  }

  const handleVerify =async () => {
    if (userInput.toUpperCase() === captcha) {
      try {
        const response = await axios.post("http://192.168.13.61:3000/orderProcessing",{
          data : newData
        })
        if (response.status === 200) {
          Alert.alert("Success", "Order Placed Successfully");
        }
      } catch (error) {
        console.log(error)
      }
      setUserInput(""); // Reset input
    } else {
      Alert.alert("Error", "CAPTCHA Verification Failed. Try Again.");
    }
  };

  const handleRefresh = () => {
    setCaptcha(generateCaptcha()); // Generate a new CAPTCHA
    setUserInput(""); // Reset input
  };

  return (
    <View style={styles.container}>

      {/* Display the CAPTCHA */}
      <View style={styles.captchaBox}>
        <Text style={styles.captchaText}>{captcha}</Text>
      </View>

      {/* Input Box */}
      <TextInput
        style={styles.input}
        placeholder="Enter CAPTCHA"
        value={userInput}
        onChangeText={setUserInput}
        autoCapitalize="characters"
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRefresh}>
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height : 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  captchaBox: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  captchaText: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 2,
    color: "#333",
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 18,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomCaptcha;
