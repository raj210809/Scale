import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Addresscard from '@/components/cards/addresscard';
import { router } from 'expo-router';

const ChooseAddress = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const addresses = [
    {
      id: '1',
      name: 'Ruchika',
      address: 'Address Line 1, Address Line 2, Address Line 3',
      phone: '999*******',
    },
    {
      id: '2',
      name: 'Anshul',
      address: 'Address Line 1, Address Line 2, Address Line 3',
      phone: '999*******',
    },
  ];

  const handleContinue = () => {
    if (!selectedAddress) {
      Alert.alert('Error', 'Please select an address before continuing.');
    } else {
      console.log('Selected Address:', addresses.find((addr) => addr.id === selectedAddress));
      router.push('/components/paymentpage');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {addresses.map((item) => (
        <Addresscard
          key={item.id}
          {...item}
          checked={selectedAddress === item.id}
          onPress={() => setSelectedAddress(item.id)}
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
