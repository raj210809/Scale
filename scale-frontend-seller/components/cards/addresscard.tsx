import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Checkbox } from 'react-native-paper';

interface AddressProps {
  id: string;
  name: string;
  address: string;
  phone: string;
  checked: boolean;
  onPress: () => void;
}

const Addresscard = ({ id, name, address, phone, checked, onPress }: AddressProps) => {
  return (
    <View style={styles.card}>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={onPress}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.address}>{address}</Text>
      <Text style={styles.phone}>{phone}</Text>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Addresscard;

const styles = StyleSheet.create({
  card: { marginBottom: 20, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 10 },
  name: { fontSize: 16, fontWeight: 'bold' },
  address: { fontSize: 14, color: '#666', marginVertical: 5 },
  phone: { fontSize: 14, color: '#666' },
  editButton: { marginTop: 10, backgroundColor: '#6c63ff', padding: 10, borderRadius: 5 },
  editButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
