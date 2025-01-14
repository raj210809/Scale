import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import TermsScreen from './Termsscreen'; // Import the TermsScreen component
import NotificationPermissionScreen from './notificationpermission';

const SignupScreen = () => {
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);

  const handleSubmit = () => {
    setModalVisible1(true); // Show the modal when the button is clicked
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finish Signing Up</Text>
      <TextInput placeholder="First Name" style={styles.input} />
      <TextInput placeholder="Last Name" style={styles.input} />
      <TextInput placeholder="Date of Birth (dd/mm/yyyy)" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry />
      <Text>Password strength: Poor/Good/Excellent</Text>
      
      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {/* Modal for Terms Screen */}
      <Modal
        visible={isModalVisible1}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible1(false)} // Close the modal on back press
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TermsScreen nav={setModalVisible2}/>
          </View>
        </View>
      </Modal>
      <Modal
      visible={isModalVisible2}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible2(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <NotificationPermissionScreen />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      marginVertical: 10,
    },
    button: {
      backgroundColor: '#e91e63',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    orText: {
      textAlign: 'center',
      marginVertical: 10,
    },
    socialButton: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 15,
      marginVertical: 5,
      alignItems: 'center',
    },
    modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    height: '50%',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  });

export default SignupScreen;
