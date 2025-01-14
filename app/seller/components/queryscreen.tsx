
import React from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

const QueryListScreen = () => {

  const router = useRouter();
  const queries = [
    { id: '1', productName: 'Air Max 2024', productId: '123456', query: 'Hi, when will the new Air Max 2024 be available in size 10?' },
    { id: '2', productName: 'Dri-FIT T-Shirts', productId: '654321', query: 'What material are the Dri-FIT T-shirts made of, and how durable are they?' },
  ];

  const renderQuery = ({ item }) => (
    <View style={styles.queryCard}>
      <Text style={styles.productName}>[{item.productName}] ({item.productId})</Text>
      <Text style={styles.queryText}>{item.query}</Text>
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.viewProductButton}>
          <Text style={styles.vpbuttonText}>View product</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.replyButton}
          onPress={()=>{
            router.push({
              pathname : '/seller/components/replyinputscreen',
              params : {productId : item.productId, productName : item.productName, query : item.query}
            })}}
        >
          <Text style={styles.buttonText}>Send reply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={queries}
      renderItem={renderQuery}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

export default QueryListScreen;

const styles = StyleSheet.create({
  container: { padding: 16 },
  queryCard: { backgroundColor: '#f9f9f9', padding: 16, marginBottom: 12, borderRadius: 8 },
  productName: { fontWeight: 'bold', marginBottom: 8 },
  queryText: { marginBottom: 12 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  viewProductButton: { backgroundColor: '#fff', padding: 10, borderRadius: 5 , height : 50 , width : "48%" , justifyContent : "center" , alignItems : "center"},
  replyButton: { backgroundColor: '#000', padding: 10, borderRadius: 5 , width : "48%" , justifyContent : "center" , alignItems : "center"},
  vpbuttonText: { color: '#000', fontWeight: 'bold' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
