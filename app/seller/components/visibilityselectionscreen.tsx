import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface reply {
  reply : string
}

const VisibilitySelectionScreen = (reply  : reply) => {

  const handleVisibilitySelection = (visibility) => {
    console.log(`Reply: ${reply.reply}`);
    console.log(`Visibility: ${visibility}`);
    // Save or process the reply with the selected visibility
    router.back()
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Who can See</Text>
      <Text style={styles.heading}>This Query?</Text>
      
      <Text style={styles.description}>
        This query can be visible to everyone in product FAQs as well as privately to the customer.
      </Text>
      <View style={{width : "100%" , flexDirection : "row" , justifyContent : "space-between"}}>
      <TouchableOpacity
        style={styles.customerOnlyButton}
        onPress={() => handleVisibilitySelection('CustomerOnly')}
      >
        <Text style={styles.buttonText}>Customer only</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.publicButton}
        onPress={() => handleVisibilitySelection('Public')}
      >
        <Text style={styles.buttonText}>Public</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default VisibilitySelectionScreen;

const styles = StyleSheet.create({
  container: { padding: 30, alignItems: 'center', justifyContent: 'center' },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  description: { color: '#888', textAlign: 'center', marginBottom: 24 },
  customerOnlyButton: { backgroundColor: '#d9534f', padding: 10, borderRadius: 5, width : "48%" , justifyContent : "center" , alignItems : "center" , height : 50},
  publicButton: { backgroundColor: '#4a4aef', padding: 10, borderRadius: 5 , width : "48%" , justifyContent : "center" , alignItems : "center"},
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
