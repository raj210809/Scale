import { router } from 'expo-router';
import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

interface cardprop1 {
    id : number,
    imageUri : string,
    brandName : string,
    productName : string,
    part : string,
    seller : string | null
}

interface cardprop2 {
  id : number,
  imageUri : string,
  brandName : string,
  productName : string,
  ratings : number,
  numberOfRatings : number
  part : string,
  seller : string | null
}

const ReelPreview = (card : cardprop2 | cardprop2) => {
  return (
    <TouchableOpacity style={styles.container} onPress={()=>{router.push({
      pathname : '/reel',
      params : {
        id : card.id,
        type : card.part
      }
    })}}>
      <ImageBackground
        source={{ uri: card.imageUri }}
        style={styles.image}
        resizeMode="cover"
      >
        <View style={styles.divbutton}>
        <View>
          {card.part === "launchingsoon" ? null : (<Text style={styles.productRating}>⭐ {card.ratings} ({card.numberOfRatings})</Text>)}
          <Text style={styles.text}>{card.brandName}</Text>
          <Text>{card.productName}</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{card.part === "launchingsoon" ? "Prebook" : "View"}</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150, // Adjust width
    height: 250, // Adjust height
    borderRadius: 15,
    overflow: 'hidden',
    margin : 5,
  },
  divbutton : {
    flex : 1,
    flexDirection : 'column',
    justifyContent : 'space-between',
    padding : 7
  },
  image: {
    flex: 1
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ff4757',
    borderRadius: 8,
    width : '70%',
    height : 30,
    alignSelf : 'center',
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    marginBottom : 25
  },
  buttonText: {
    color: '#fff',
    textAlign : "center"
  },
  productRating: { fontSize: 14, color: '#666' },
});

export default ReelPreview;
