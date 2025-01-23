import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

interface product {
    id : string,
    brand : string,
    description : string , 
    imageUrl : string
}

const InfluencerProductsCard = (item : product) => {
    return (
        <View style={styles.cardContainer}>
            <ImageBackground source={{ uri: item.imageUrl }} style={styles.imageBackground}>
                <Text style={styles.brandText}>{item.brand}</Text>
                <Text style={styles.descriptionText}>{item.description}</Text>
            </ImageBackground>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>View Products</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: '50%',
        alignItems: 'center',
        marginBottom: 20,
        padding : 10
    },
    imageBackground: {
        width: '100%',
        aspectRatio: 1,
        justifyContent: 'flex-end',
    },
    brandText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    descriptionText: {
        fontSize: 14,
        color: '#fff',
    },
    button: {
        width: '100%',
        height: 35,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderBottomLeftRadius : 15,
        borderBottomRightRadius : 15
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default InfluencerProductsCard;