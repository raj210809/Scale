import { router } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Bookmark from '../buttons/bookmark';

interface product {
    id : number,
    productImage : string,
    productName : string,
    productDescription : string,
    productBrand : string,
    productRating : number,
    productReviewCount : number,
    productPrice : number
}

interface accressor {
  accessor_name : string
}

const ProductCard = (item : product & accressor) => {
  return (
    <View style={styles.card}>
        <View style={{flexDirection:'row' , height:170}}>
        <View style={{width:'50%' , height : '100%'}}>
          <ImageBackground
        source={{ uri: item.productImage }} 
        style={styles.image}
        resizeMode='cover'
        >
          <Bookmark/>
        </ImageBackground>
        </View>
        <View style={styles.content}>
        <Text style={styles.title}>{item.productName}</Text>
        <Text style={styles.description}>{item.productDescription}</Text>
        <Text style={styles.brand}>{item.productBrand}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{item.productRating}</Text>
          <Text style={styles.reviewCount}>({item.productReviewCount})</Text>
        </View>
        <Text style={styles.price}>Rs {item.productPrice}</Text>
        </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.viewButton} onPress={()=>{router.push({
            pathname : "/product/[id]",
            params : {
                id : item.id,
                accessor : item.accessor_name,
            }
          })}}>
            <Text style={styles.buttonText}>View Product</Text>
          </TouchableOpacity>
          {item.accessor_name === "customer" ? <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>Add to Bag</Text>
          </TouchableOpacity> : null}
          {item.accessor_name === "sellerdraft" ? <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>Release Now</Text>
          </TouchableOpacity> : null}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
  },
  image: {
    height: "100%",
    borderRadius: 8,
    marginBottom : 5
  },
  content: {
    marginTop: 5,
    width :'50%',
    marginLeft : 7
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  brand: {
    fontSize: 12,
    color: '#999',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  rating: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  viewButton: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 8,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#c2185b',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProductCard;