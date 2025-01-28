import { StyleSheet, Text, View ,TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import ProductCard from '@/components/cards/productshowsmall';
import axios from 'axios';

const Allproducts = () => {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const brand = "nike"
    const [products , setProducts] = useState([])

    const fetchdata = async()=>{
      const response = await axios.get("http://192.168.13.61:3000/products/get-product-by-brand",{
        params : {
          brand : brand
        }
      })
      setProducts(response.data.products)
    }

    useEffect(()=>{
      fetchdata()
    },[])

    const dummyData = [
        {
            id: 1,
            productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Wireless Headphones",
            productDescription: "High-quality wireless headphones with noise cancellation.",
            productBrand: "SoundPro",
            productRating: 4.5,
            productReviewCount: 145,
            productPrice: 99,
        },
        {
            id: 2,
            productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Wireless Headphones",
            productDescription: "High-quality wireless headphones with noise cancellation.",
            productBrand: "SoundPro",
            productRating: 4.5,
            productReviewCount: 145,
            productPrice: 99,
        },
        {
            id: 3,
            productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Wireless Headphones",
            productDescription: "High-quality wireless headphones with noise cancellation.",
            productBrand: "SoundPro",
            productRating: 4.5,
            productReviewCount: 145,
            productPrice: 99,
        },
        {
            id: 4,
            productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Wireless Headphones",
            productDescription: "High-quality wireless headphones with noise cancellation.",
            productBrand: "SoundPro",
            productRating: 4.5,
            productReviewCount: 145,
            productPrice: 99,
        },
    ];
    const renderItem = ({ item }) => {
        return <ProductCard key={item.id} {...item} accessor_name="seller" />;
      };
    
      return (
        <View style={styles.container}>
          {/* Filter Buttons */}
          <ScrollView horizontal style={styles.filterContainer} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === 'All' && styles.activeFilter,
              ]}
              onPress={() => setSelectedFilter('All')}
            >
              <Text style={styles.filterText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === 'Bestselling' && styles.activeFilter,
              ]}
              onPress={() => setSelectedFilter('Bestselling')}
            >
              <Text style={styles.filterText}>Bestselling</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === 'Men' && styles.activeFilter,
              ]}
              onPress={() => setSelectedFilter('Men')}
            >
              <Text style={styles.filterText}>Men</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === 'Women' && styles.activeFilter,
              ]}
              onPress={() => setSelectedFilter('Women')}
            >
              <Text style={styles.filterText}>Women</Text>
            </TouchableOpacity>
          </ScrollView>
    
          {/* Product List */}
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      );
    };
    
    export default Allproducts;
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
      },
      filterContainer: {
        flexDirection: 'row',
        marginBottom: 20,
      },
      filterButton: {
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
        marginLeft: 10,
        height: 40,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
      },
      activeFilter: {
        backgroundColor: '#d9534f',
      },
      filterText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      listContainer: {
        paddingBottom: 20,
      },
    });