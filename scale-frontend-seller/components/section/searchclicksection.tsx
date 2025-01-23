import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CategoryGrid = () => {
  const categories = [
    { id : '1' , title: 'Clothing', icon: '👕' },
    { id : '2',title: 'Technology', icon: '💻' },
    { id : '3',title: 'Beauty', icon: '💄' },
    { id : '4',title: 'Fitness', icon: '🏋️‍♂️' },
    { id : '5',title: 'Craft', icon: '🎨' },
    { id : '6',title: 'Home Decor', icon: '🏡' },
    { id : '7',title: 'Food', icon: '🍔' },
    { id : '8',title: 'Footwear', icon: '👟' },
  ];

  return (
    <View style={styles.grid}>
      {categories.map((category) => (
        <TouchableOpacity key={category.id} style={styles.card} onPress={()=> router.push({
          pathname : "/components/afterCategorypage",
          params : {
            type : category.title
          }
        })}>
          <Text style={styles.icon}>{category.icon}</Text>
          <Text style={styles.title}>{category.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  card: {
    width: '47%', // Adjust for spacing
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  title: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  icon: {
    fontSize: 28, // Adjust icon size
  },
});

export default CategoryGrid;
