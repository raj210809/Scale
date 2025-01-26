import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Addresscard from '@/components/cards/addresscard';
import { useRouter , useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const ChooseAddress = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const [addresses , setAddress] = useState([])
  const router = useRouter()

  const { selectedItems } = useLocalSearchParams();

  // Parse the stringified data back to an object
  const parsedSelectedItems = selectedItems ? JSON.parse(selectedItems) : {};
  const user = "6788e8786d5e4f7411b20b5e"

  let data = {
    cartContent : parsedSelectedItems,
    address : selectedAddress,
    user : user
  }


  const userId = "6788e8786d5e4f7411b20b5e"

  const fetchaddress = async () => {
    try {
      const response = await axios.get("http://192.168.13.61:3000/address/get-addresses",{
        params : {
          user : userId
        }
      })
      setAddress(response.data.addresses)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchaddress()
  },[])

  const handleContinue = () => {
    if (!selectedAddress) {
      Alert.alert('Error', 'Please select an address before continuing.');
    } else {
      console.log('Selected Address:', addresses.find((addr) => addr._id === selectedAddress));
      router.push({
        pathname : '/components/paymentpage',
        params : {
          data : JSON.stringify(data)
        }
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      {addresses.map((item) => (
        <Addresscard
          key={item._id}
          {...item}
          checked={selectedAddress === item._id}
          onPress={() => setSelectedAddress(item._id)}
        />
      ))}
      <TouchableOpacity style={styles.addButton} onPress={()=> router.push("/components/add-address")}>
        <Text style={styles.addButtonText}>+ Add Address</Text>
      </TouchableOpacity>
      <Text style={styles.deliveryDate}>Estimated Delivery: By 1 Aug 2024</Text>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ChooseAddress;

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  addButton: { marginTop: 20, padding: 15, borderRadius: 5, borderColor: '#6c63ff', borderWidth: 1 },
  addButtonText: { textAlign: 'center', fontWeight: 'bold', color: '#6c63ff' },
  deliveryDate: { marginTop: 20, fontSize: 14, color: '#666' },
  continueButton: { marginTop: 20, backgroundColor: '#ff0050', padding: 15, borderRadius: 5 },
  continueButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
