import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";

const NBOptions = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  // Payment options with icons and labels
  const options = [
    { id: 1, label: "Axis Bank", icon: "https://path/to/gpay-icon.png" },
    { id: 2, label: "HDFC Bank", icon: "https://path/to/phonepe-icon.png" },
    { id: 3, label: "ICICI Bank", icon: "https://path/to/paytm-icon.png" },
    { id: 4, label: "Kotak Mahindra Bank", icon: "https://path/to/upi-id-icon.png" },
    { id: 5, label: "Punjab National Bank", icon: "https://path/to/upi-id-icon.png" },
    { id: 6, label: "State Bank of India", icon: "https://path/to/upi-id-icon.png" },
  ];

  const handleSelect = (id) => {
    setSelectedOption(id); // Allow only one option to be selected
  };

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.optionContainer,
            selectedOption === option.id && styles.selectedOption,
          ]}
          onPress={() => {handleSelect(option.id)
          }}
        >
          {/* Icon */}
          <Image
            source={{ uri: option.icon }}
            style={styles.icon}
            resizeMode="contain"
          />

          {/* Label */}
          <Text style={styles.label}>{option.label}</Text>

          {/* Checkbox */}
          <View
            style={[
              styles.checkbox,
              selectedOption === option.id && styles.checkedCheckbox,
            ]}
          >
            {selectedOption === option.id && <View style={styles.checkboxTick} />}
          </View>
        </TouchableOpacity>
      ))}
    <TouchableOpacity style={styles.methodButton}>
            <Text style={styles.methodText}>Proceed</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height : "auto",
    padding: 20,
    backgroundColor: "#fff",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedOption: {
    borderColor: "#d3006c",
    backgroundColor: "#fce4f4",
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#d3006c",
    alignItems: "center",
    justifyContent: "center",
  },
  checkedCheckbox: {
    backgroundColor: "#d3006c",
  },
  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  input :
    {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        height : 50,
    },
    methodButton : {
        padding: 15,
        borderWidth: 1,
        borderColor: 'pink',
        borderRadius: 5,
        marginBottom: 15,
        height : 50,
        marginTop : 10,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#ff005c'
    },
    methodText : {
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default NBOptions;
