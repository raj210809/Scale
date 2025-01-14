import { StyleSheet, Text, TouchableOpacity, View, Image , Button } from 'react-native';
import React from 'react';

const Excitingoffers = () => {
  return (
    <View>
      <Text style={styles.heading}>Exciting offers</Text>
      <View style={styles.outerview}>
        <View style={styles.leftview}>
          <TouchableOpacity onPress={() => {}} style={{ height: 150 }}>
            <Image
              source={{
                uri: 'https://st.depositphotos.com/2036077/2629/i/950/depositphotos_26296093-stock-photo-3d-special-offer-word-on.jpg',
              }}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={{height : 90}}>
            <Image
              source={{
                uri: 'https://st.depositphotos.com/2036077/2629/i/950/depositphotos_26296093-stock-photo-3d-special-offer-word-on.jpg',
              }}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.rightview}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={{
                uri: 'https://st.depositphotos.com/2036077/2629/i/950/depositphotos_26296093-stock-photo-3d-special-offer-word-on.jpg',
              }}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection : 'row' , justifyContent : 'center'}}>
      <TouchableOpacity onPressOut={()=>{}} style={{height : 30 , backgroundColor : '#ff4757' , width : '99%',borderBottomLeftRadius: 10 , borderBottomRightRadius : 10}}>
        <Text style={{alignSelf:'center'}}>show all</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default Excitingoffers;

const styles = StyleSheet.create({
  container: {},
  heading: {
    fontSize: 20,
    marginLeft: 10,
  },
  outerview: {
    flexDirection: 'row',
    height: 250,
  },
  leftview: {
    flexDirection: 'column',
    flex: 1,
    width : '55%'
  },
  rightview: {
    flex: 1,
    width : '45%'
  },
  image: {
    width: '100%',
    height : '100%',
    resizeMode: 'cover',
  },
});
