import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

const { width } = Dimensions.get("window");

const AddNewAddress = () => {
  const [selectedType, setSelectedType] = useState("Home");
  const [address , newAddress] = useState({
    name : "",
    mobile : "",
    pincode : "",
    address : "",
    locality : "",
    city : "",
    state : "",
    address_type : selectedType
  })

  const handleinput = (name , value) => {
    newAddress({
      ...address,
      [name] : value
    })
  }

  const handleClick = () => {
    console.log(address)
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Contact Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Details</Text>
        <TextInput placeholder="Name*" style={styles.input} onChangeText={(text)=> handleinput("name" , text)}/>
        <TextInput placeholder="Mobile No*" style={styles.input} onChangeText={(text)=> handleinput("mobile" , text)}/>
      </View>

      {/* Address Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address</Text>
        <TextInput placeholder="560001" style={styles.input} onChangeText={(text)=> handleinput("pincode" , text)}/>
        <TextInput
          placeholder="Address* (House No, Building, Street, Area)"
          style={styles.input}
          onChangeText={(text)=> handleinput("address" , text)}
        />
        <TextInput placeholder="Locality/Town*" style={styles.input} onChangeText={(text)=> handleinput("locality" , text)}/>
        <View style={styles.row}>
          <TextInput placeholder="Bangalore" style={[styles.input, styles.halfInput]} onChangeText={(text)=> handleinput("city" , text)}/>
          <TextInput placeholder="Karnataka" style={[styles.input, styles.halfInput]} onChangeText={(text)=> handleinput("state" , text)}/>
        </View>
      </View>

      {/* Save Address As */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Save Address as</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              selectedType === "Home" && styles.selectedButton,
            ]}
            onPress={() => setSelectedType("Home")}
          >
            <Text style={styles.radioText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioButton,
              selectedType === "Work" && styles.selectedButton,
            ]}
            onPress={() => setSelectedType("Work")}
          >
            <Text style={styles.radioText}>Work</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Add Address Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleClick}>
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  backButton: {
    marginTop: 10,
  },
  backText: {
    fontSize: 18,
    color: "#000",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginVertical: 10,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: (width - 60) / 2,
  },
  radioButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    backgroundColor: "#f5f5f5",
  },
  selectedButton: {
    backgroundColor: "#ffd1dc",
    borderColor: "#ff8fa4",
  },
  radioText: {
    color: "#000",
  },
  addButton: {
    backgroundColor: "#ff005c",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 30,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddNewAddress;
