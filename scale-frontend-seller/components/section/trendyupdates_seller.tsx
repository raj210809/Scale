import { StyleSheet, Switch, SwitchBase, Text, View } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import ReelPreview from '../cards/launchingsooncard';

interface section {
    type : string
}

const Trendyupdates_seller = (part : section) => {
    const [newlaunch , setnewlaunch]= useState(false);

    const dummyData1 = [
        {
          id: 1,
          imageUri: 'https://via.placeholder.com/300x200.png?text=Brand+1',
          brandName: 'Brand 1',
          productName: 'Product 1',
        },
        {
          id: 2,
          imageUri: 'https://via.placeholder.com/300x200.png?text=Brand+2',
          brandName: 'Brand 2',
          productName: 'Product 2',
        },
        {
          id: 3,
          imageUri: 'https://via.placeholder.com/300x200.png?text=Brand+3',
          brandName: 'Brand 3',
          productName: 'Product 3',
        },
        {
          id: 4,
          imageUri: 'https://via.placeholder.com/300x200.png?text=Brand+4',
          brandName: 'Brand 4',
          productName: 'Product 4',
        },
        {
          id: 5,
          imageUri: 'https://via.placeholder.com/300x200.png?text=Brand+5',
          brandName: 'Brand 5',
          productName: 'Product 5',
        },
        {
          id: 6,
          imageUri: 'https://via.placeholder.com/300x200.png?text=Brand+6',
          brandName: 'Brand 6',
          productName: 'Product 6',
        },
      ];

      const dummyData2 = [
        {
          id: 1,
          imageUri: 'https://via.placeholder.com/300x200.png?text=Brand+1',
          brandName: 'Brand 1',
          productName: 'Product 1',
          rating: 4.5,
          numberOfRatings: 150,
        },
        {
          id: 2,
          imageUri: 'https://via.placeholder.com/300x200.png?text=Brand+2',
          brandName: 'Brand 2',
          productName: 'Product 2',
          rating: 4.0,
          numberOfRatings: 120,
        },
        {
          id: 3,
          imageUri: 'https://via.placeholder.com/300x200.png?text=Brand+3',
          brandName: 'Brand 3',
          productName: 'Product 3',
          rating: 3.8,
          numberOfRatings: 95,
        },
        {
          id: 4,
          imageUri: 'https://via.placeholder.com/300x200.png?text=Brand+4',
          brandName: 'Brand 4',
          productName: 'Product 4',
          rating: 4.7,
          numberOfRatings: 200,
        },
        {
          id: 5,
          imageUri: 'https://via.placeholder.com/300x200.png?text=Brand+5',
          brandName: 'Brand 5',
          productName: 'Product 5',
          rating: 4.2,
          numberOfRatings: 180,
        },
        {
          id: 6,
          imageUri: 'https://via.placeholder.com/300x200.png?text=Brand+6',
          brandName: 'Brand 6',
          productName: 'Product 6',
          rating: 3.5,
          numberOfRatings: 65,
        },
      ];
      
  return (
    <View>
        <View style={{flexDirection : 'row', justifyContent : 'space-between',width : '100%' , alignItems :'center'}}>
        <Text style={styles.heading}>Trendy Updates</Text>
        <View style={{flexDirection : 'row' , alignItems : 'center'}}>
          <Text>New Launch</Text>
          <Switch
            value={newlaunch} 
            onValueChange={() => setnewlaunch(!newlaunch)} 
            style={styles.switchStyle} 
            trackColor={{ false: '#d3d3d3', true: '#81b0ff' }}
            thumbColor={newlaunch ? '#005eff' : '#f4f3f4'}
          />
        </View>
        </View>
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      >
        {(part.type === "launchingsoon" ? dummyData1 : dummyData2).map((items)=>{
            return(
                <ReelPreview key={items.id} {...items} part={part.type} />
            )
        })}
      </ScrollView>
    </View>
  );
}

export default Trendyupdates_seller;

const styles = StyleSheet.create({
    heading : {
        fontSize : 20,
        marginLeft : 10,
    },
    switchStyle: {
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], // Adjust switch size
        marginLeft: 3,
    },
});
