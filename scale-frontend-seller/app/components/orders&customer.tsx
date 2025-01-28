import { StyleSheet, Text, View , TextInput , Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Ordersmallcard from '@/components/cards/ordersmallcard';
import axios from 'axios';

const Orders_customer = () => {
    const [searchText, setSearchText] = React.useState('');

    const [orders , setOrders] = React.useState([])

    const brand = "nike"

    const fetchorders = async () => {
        try {
            const response = await axios.get(`http://192.168.13.61:3000/order/get-brand-orders?brand=${brand}`)
            setOrders(response.data.order)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchorders()
    },[])

    const dummyCustomers = [
        {
            id: 1,
            name: 'John Doe',
            imageUrl: 'https://randomuser.me/api/port',
            totalSpent: 5000,
            itemsPurchased: 5,
        },
        {
            id: 2,
            name: 'Jane Doe',
            imageUrl: 'https://randomuser.me/api/port',
            totalSpent: 3000,
            itemsPurchased: 3,
        },
        {
            id: 3,
            name: 'Alice',
            imageUrl: 'https://randomuser.me/api/port',
            totalSpent: 1000,
            itemsPurchased: 2,
        },]
  return (
    <ScrollView style={styles.container}>
      {/* orders */}
      <View>
        <Text style={styles.headerTitle}>Orders</Text>
        <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginVertical: 2 }} />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Order id"
        placeholderTextColor="#ccc"
        value={searchText}
        onChangeText={setSearchText}
        />
        <View style={styles.statsRow}>
            <View style={styles.statBox}>
                <Text style={styles.statValue}>4.6</Text>
                <Text style={styles.statLabel}>300+ ratings</Text>
            </View>
            <View style={styles.statBox}>
                <Text style={styles.statValue}>250k</Text>
                <Text style={styles.statLabel}>Influencers</Text>
            </View>
            <View style={styles.statBox}>
                <Text style={styles.statValue}>15</Text>
                <Text style={styles.statLabel}>Item sold</Text>
            </View>
        </View>
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginTop : 10}}
        >
            {orders?.map((order) => (
                <Ordersmallcard {...order} key={order._id} customer={order.address.name} />
            ))}
        </ScrollView>
        {/* top customers */}
        <View style={{marginTop : 20}}>
            <Text style={styles.headerTitle}>Top Customers</Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginVertical: 2 }} />
            <View style={{flexDirection : 'row' , justifyContent : 'space-around' , marginTop : 20}}>
                {dummyCustomers.map((customer) => (
                    <TouchableOpacity style={{width : "30%" , flexDirection : 'column' , alignItems : 'center'}} key={customer.id}>
                        <Image
                            source={{ uri: customer.imageUrl }}
                            style={{width : "80%" , height : 90 , resizeMode : "cover" , borderRadius : 10}}/>
                        <Text style={{fontSize : 20}}>{customer.name}</Text>
                        <Text>Rs. {customer.totalSpent}</Text>
                        <Text> {customer.itemsPurchased} items</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    </ScrollView>
  )
}

export default Orders_customer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
      },
      bottomNavContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
      },
      navItem: {
        alignItems: 'center',
      },
      header: {
      },
      headerTitle: {
        fontSize: 25,
        fontWeight: 'bold',
      },
      headerSubtitle: {
        color: '#888',
      },
      chart: {
        marginVertical: 20,
      },
      performanceContainer: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginBottom: 20,
        flexWrap : 'wrap',
        flexDirection : 'row',
      },
      performanceTitle: {
        fontWeight: 'bold',
      },
      visitsContainer: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginBottom: 20,
      },
      visitsTitle: {
        fontWeight: 'bold',
      },
      visitStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      bestsellingContainer: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
      },
      bestsellingTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
      },
      bestsellingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      bestsellingImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
      },
      statsRow: {
          flexDirection: 'row',
          justifyContent: "space-between",
          width: '100%',
          marginVertical: 10,
        },
        statBox: {
          alignItems: 'center',
        },
        statValue: {
          fontSize: 22,
          fontWeight: 'bold',
        },
        statLabel: {
          fontSize: 15,
          color: '#666',
        },
        statsBox: {
          alignItems: 'center',
          width : "50%",
          marginTop : 15
        },
        filterContainer: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 20,
          marginTop: 10,
        },
        filterButton: {
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 20,
          backgroundColor: '#e0e0e0',
        },
        activeFilter: {
          backgroundColor: '#d9534f',
        },
        filterText: {
          color: '#fff',
          fontWeight: 'bold',
        },
        searchInput : {
            borderWidth : 1,
            borderColor : 'gray',
            borderRadius : 10,
            padding : 10,
            marginVertical : 10
        }
})