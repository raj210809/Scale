import CustomCaptcha from '@/components/section/captcha';
import NBOptions from '@/components/section/netbanking';
import PaymentOptions from '@/components/section/upiselection';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet , Nstivemodu } from 'react-native';

const Payment = () => {
  const paymentMethods = ['UPI (all apps)', 'Cash on Delivery', 'Netbanking'];

  const [COD , setCOD] = useState(false);
  const [upi , setUpi] = useState(false);
  const [netbanking , setNetbanking] = useState(false);

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.methodButton} onPress={()=> setUpi(!upi)}>
          <Text style={styles.methodText}>UPI (all apps)</Text>
        </TouchableOpacity>
        {upi && < PaymentOptions/>}
        <TouchableOpacity style={styles.methodButton} onPress={()=> setCOD(!COD)}>
          <Text style={styles.methodText}>Cash on Delivery</Text>
        </TouchableOpacity>
        {COD && <CustomCaptcha />}
        <TouchableOpacity style={styles.methodButton} onPress={()=> setNetbanking(!netbanking)}>
          <Text style={styles.methodText}>Net Banking</Text>
        </TouchableOpacity>
        {netbanking && <NBOptions/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  methodButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  methodText: { fontSize: 16, fontWeight: 'bold' , marginTop : 10 },
});

export default Payment;
