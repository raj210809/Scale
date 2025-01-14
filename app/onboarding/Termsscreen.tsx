import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface terms {
  nav : (x : boolean) => void
}

const TermsScreen = (func : terms ) => {
  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.title}>Terms of Service</Text>
      <Text>
        1. Introduction: Welcome to Scale. By using our app, you agree to these terms...
      </Text>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => func.nav(true)}>
        <Text style={styles.buttonText}>Accept All</Text>
      </TouchableOpacity>
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
  });

export default TermsScreen;
