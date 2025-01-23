import React, { useCallback, useRef } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import ProductCard from '../cards/productshowsmall';

interface props {
    onClose : () => void , 
    studentid : string
}

const Productbottomsheet : React.FC<props> = ({ onClose, studentid }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChange = useCallback((index) => {
    console.log('Sheet position changed to index:', index);
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <ProductCard {...item} accessor_name='customer' />
    </View>
  );

  const snapPoints = ['60%'];

  const products = [
    {
      id: 1,
      productImage: 'https://via.placeholder.com/300x200.png?text=Product+1',
      productName: 'Wireless Earbuds',
      productDescription: 'High-quality wireless earbuds with noise cancellation and long battery life.',
      productBrand: 'SoundPro',
      productRating: 4.5,
      productReviewCount: 1200,
      productPrice: 59.99,
    },
    {
      id: 2,
      productImage: 'https://via.placeholder.com/300x200.png?text=Product+2',
      productName: 'Smartwatch',
      productDescription: 'Feature-packed smartwatch with fitness tracking, heart rate monitoring, and customizable watch faces.',
      productBrand: 'TechTime',
      productRating: 4.2,
      productReviewCount: 850,
      productPrice: 129.99,
    },
    {
      id: 3,
      productImage: 'https://via.placeholder.com/300x200.png?text=Product+3',
      productName: 'Gaming Keyboard',
      productDescription: 'Mechanical gaming keyboard with RGB backlighting, customizable keys, and ergonomic design.',
      productBrand: 'GameZone',
      productRating: 4.8,
      productReviewCount: 530,
      productPrice: 89.99,
    },
  ];

  return (
    <BottomSheet
      enablePanDownToClose
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      onClose={onClose}
    >
      <BottomSheetView>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default Productbottomsheet;

const styles = StyleSheet.create({});
