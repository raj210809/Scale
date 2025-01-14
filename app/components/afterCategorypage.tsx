import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { router, useLocalSearchParams } from 'expo-router'

const AfterCategoryPage = () => {

    const {type} = useLocalSearchParams()

    const categoriesData = [
        {
          category: "Fitness",
          subclasses: [
            { name: "Equipments", backgroundImage: "https://example.com/fitness-equipments.jpg" },
            { name: "Active Wears", backgroundImage: "https://example.com/fitness-activewear.jpg" },
            { name: "Nutrition", backgroundImage: "https://example.com/fitness-nutrition.jpg" },
            { name: "Yoga Mats", backgroundImage: "https://example.com/fitness-yogamats.jpg" },
            { name: "Dumbbells", backgroundImage: "https://example.com/fitness-dumbbells.jpg" },
            { name: "Resistance Bands", backgroundImage: "https://example.com/fitness-bands.jpg" },
            { name: "Sports Shoes", backgroundImage: "https://example.com/fitness-shoes.jpg" },
            { name: "Smart Watches", backgroundImage: "https://example.com/fitness-watches.jpg" },
          ],
        },
        {
          category: "Clothing",
          subclasses: [
            { name: "Men's Wear", backgroundImage: "https://example.com/clothing-men.jpg" },
            { name: "Women's Wear", backgroundImage: "https://example.com/clothing-women.jpg" },
            { name: "Kids' Wear", backgroundImage: "https://example.com/clothing-kids.jpg" },
            { name: "Formal Wear", backgroundImage: "https://example.com/clothing-formal.jpg" },
            { name: "Casual Wear", backgroundImage: "https://example.com/clothing-casual.jpg" },
            { name: "Ethnic Wear", backgroundImage: "https://example.com/clothing-ethnic.jpg" },
            { name: "Active Wear", backgroundImage: "https://example.com/clothing-active.jpg" },
            { name: "Accessories", backgroundImage: "https://example.com/clothing-accessories.jpg" },
          ],
        },
        {
          category: "Technology",
          subclasses: [
            { name: "Smartphones", backgroundImage: "https://example.com/technology-smartphones.jpg" },
            { name: "Laptops", backgroundImage: "https://example.com/technology-laptops.jpg" },
            { name: "Smart Watches", backgroundImage: "https://example.com/technology-watches.jpg" },
            { name: "Tablets", backgroundImage: "https://example.com/technology-tablets.jpg" },
            { name: "Headphones", backgroundImage: "https://example.com/technology-headphones.jpg" },
            { name: "Gaming Consoles", backgroundImage: "https://example.com/technology-gaming.jpg" },
            { name: "Cameras", backgroundImage: "https://example.com/technology-cameras.jpg" },
            { name: "Accessories", backgroundImage: "https://example.com/technology-accessories.jpg" },
          ],
        },
        {
          category: "Beauty",
          subclasses: [
            { name: "Skincare", backgroundImage: "https://example.com/beauty-skincare.jpg" },
            { name: "Haircare", backgroundImage: "https://example.com/beauty-haircare.jpg" },
            { name: "Makeup", backgroundImage: "https://example.com/beauty-makeup.jpg" },
            { name: "Fragrances", backgroundImage: "https://example.com/beauty-fragrances.jpg" },
            { name: "Nail Care", backgroundImage: "https://example.com/beauty-nails.jpg" },
            { name: "Bath & Body", backgroundImage: "https://example.com/beauty-body.jpg" },
            { name: "Beauty Tools", backgroundImage: "https://example.com/beauty-tools.jpg" },
            { name: "Men's Grooming", backgroundImage: "https://example.com/beauty-grooming.jpg" },
          ],
        },
        {
          category: "Craft",
          subclasses: [
            { name: "Painting Supplies", backgroundImage: "https://example.com/craft-painting.jpg" },
            { name: "Knitting & Crochet", backgroundImage: "https://example.com/craft-knitting.jpg" },
            { name: "Scrapbooking", backgroundImage: "https://example.com/craft-scrapbooking.jpg" },
            { name: "DIY Kits", backgroundImage: "https://example.com/craft-diy.jpg" },
            { name: "Sewing Supplies", backgroundImage: "https://example.com/craft-sewing.jpg" },
            { name: "Calligraphy", backgroundImage: "https://example.com/craft-calligraphy.jpg" },
            { name: "Paper Craft", backgroundImage: "https://example.com/craft-paper.jpg" },
            { name: "Beading & Jewelry", backgroundImage: "https://example.com/craft-jewelry.jpg" },
          ],
        },
        {
          category: "Home Decor",
          subclasses: [
            { name: "Wall Art", backgroundImage: "https://example.com/homedecor-wallart.jpg" },
            { name: "Lighting", backgroundImage: "https://example.com/homedecor-lighting.jpg" },
            { name: "Furniture", backgroundImage: "https://example.com/homedecor-furniture.jpg" },
            { name: "Rugs & Carpets", backgroundImage: "https://example.com/homedecor-rugs.jpg" },
            { name: "Curtains", backgroundImage: "https://example.com/homedecor-curtains.jpg" },
            { name: "Mirrors", backgroundImage: "https://example.com/homedecor-mirrors.jpg" },
            { name: "Vases", backgroundImage: "https://example.com/homedecor-vases.jpg" },
            { name: "Candles", backgroundImage: "https://example.com/homedecor-candles.jpg" },
          ],
        },
        {
          category: "Food",
          subclasses: [
            { name: "Snacks", backgroundImage: "https://example.com/food-snacks.jpg" },
            { name: "Beverages", backgroundImage: "https://example.com/food-beverages.jpg" },
            { name: "Baking Supplies", backgroundImage: "https://example.com/food-baking.jpg" },
            { name: "Spices", backgroundImage: "https://example.com/food-spices.jpg" },
            { name: "Organic Food", backgroundImage: "https://example.com/food-organic.jpg" },
            { name: "Frozen Food", backgroundImage: "https://example.com/food-frozen.jpg" },
            { name: "Healthy Snacks", backgroundImage: "https://example.com/food-healthy.jpg" },
            { name: "Canned Goods", backgroundImage: "https://example.com/food-canned.jpg" },
          ],
        },
        {
          category: "Footwear",
          subclasses: [
            { name: "Men's Shoes", backgroundImage: "https://example.com/footwear-men.jpg" },
            { name: "Women's Shoes", backgroundImage: "https://example.com/footwear-women.jpg" },
            { name: "Kids' Shoes", backgroundImage: "https://example.com/footwear-kids.jpg" },
            { name: "Sneakers", backgroundImage: "https://example.com/footwear-sneakers.jpg" },
            { name: "Sandals", backgroundImage: "https://example.com/footwear-sandals.jpg" },
            { name: "Formal Shoes", backgroundImage: "https://example.com/footwear-formal.jpg" },
            { name: "Boots", backgroundImage: "https://example.com/footwear-boots.jpg" },
            { name: "Slippers", backgroundImage: "https://example.com/footwear-slippers.jpg" },
          ],
        },
      ];
      const selectedCategory = categoriesData.find((category) => category.category === type);

  if (!selectedCategory) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Category not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        {selectedCategory.subclasses.map((subclass, index) => (
          <TouchableOpacity key={index} style={styles.touchableOpacity} onPress={()=> router.push({
            pathname : "/components/searchcomponent",
            params : {searchfor : type + " " + subclass.name}
          })}>
            <ImageBackground
              source={{ uri: subclass.backgroundImage }}
              style={styles.imageBackground}
              resizeMode="cover"
            >
              <Text style={styles.subclassText}>{subclass.name}</Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default AfterCategoryPage;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly', // Ensures even spacing between elements
    paddingHorizontal: 10,
  },
  touchableOpacity: {
    width: 180, // This keeps the width close to half the row, considering spacing
    height: 120, // Adjust height as needed
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
    elevation: 3,
  },
  imageBackground: {
    height : "100%",
    width : "100%"
  },
  subclassText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 5,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});