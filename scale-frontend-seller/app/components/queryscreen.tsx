
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

interface Query {
  _id : string,
  productName : string,
  productId : string,
  query : string,
  hasAnswerd : boolean
}

const QueryListScreen = () => {

  const router = useRouter();
  const [queries, setQueries] = React.useState([]);
  const brand = "nike";

  const fetchQueries = async () => {
    const response = await axios.get('http://192.168.13.61:3000/query/getQuery',{
      params : {
        brand : brand
      }
    });
    setQueries(response.data);
  }

  useEffect(() => {
    fetchQueries();
  }, []);

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
              pathname : '/components/replyinputscreen',
              params : {productId : item.productId, productName : item.productName, query : item.query , id : item._id}
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
      keyExtractor={(item) => item._id}
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
