import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const FilterMenu = () => {
  const [filters, setFilters] = useState({
    relevance: "",
    priceRange: { min: 0, max: 4000 },
    brand: [],
    rating: [],
    size: [],
    color: [],
  });

  const brands = ["Adidas", "Converse", "New Balance", "Nike", "Puma", "Reebok", "Vans","Adida", "Convers", "New Balane", "Nie", "Pum", "Reebo", "Van"];
  const ratings = [5.0, 4.5, 4.0, 3.5, 3.0, 2.5];
  const sizes = ["4 UK", "5 UK", "6 UK", "7 UK", "8 UK", "9 UK"];
  const colors = ["#FF0000", "#FFA500", "#FFFF00", "#008000", "#0000FF", "#800080"];

  const toggleSelection = (category, value) => {
    if (category === "relevance") {
      setFilters({ ...filters, relevance: value });
    } else {
      const updatedList = filters[category].includes(value)
        ? filters[category].filter((item) => item !== value)
        : [...filters[category], value];
      setFilters({ ...filters, [category]: updatedList });
    }
  };

  const applyFilters = () => {
    console.log("Applied Filters: ", filters);
  };

  return (
    <View style={{ borderTopRightRadius : 20 , borderTopLeftRadius : 20 , height : "100%"}}>
    <ScrollView
      style={styles.container}
    horizontal
    pagingEnabled
    >
  {/* Relevance */}
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Relevance</Text>
    {["Price: Low to High", "Price: High to Low", "Newest Arrivals", "Best Sellers", "Customer Ratings", "Popularity"].map((option) => (
      <TouchableOpacity
        key={option}
        style={styles.optionButton}
        onPress={() => toggleSelection("relevance", option)}
      >
        <Text
          style={[
            styles.optionText,
            filters.relevance === option && styles.selectedOptionText,
          ]}
        >
          {option}
        </Text>
      </TouchableOpacity>
    ))}
  </View>

  {/* Price Range */}
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Price Range</Text>
    <View style={styles.rowContainer}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Min"
        value={String(filters.priceRange.min)}
        onChangeText={(value) =>
          setFilters({
            ...filters,
            priceRange: { ...filters.priceRange, min: value },
          })
        }
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Max"
        value={String(filters.priceRange.max)}
        onChangeText={(value) =>
          setFilters({
            ...filters,
            priceRange: { ...filters.priceRange, max: value },
          })
        }
      />
    </View>
  </View>

  {/* Brand */}
  <View style={styles.brandsection}>
    <Text style={styles.sectionTitle}>Brand</Text>
    <ScrollView style={styles.brandScrollView}>
      {brands.map((brand) => (
        <TouchableOpacity
          key={brand}
          style={styles.optionButton}
          onPress={() => toggleSelection("brand", brand)}
        >
          <Text
            style={[
              styles.optionText,
              filters.brand.includes(brand) && styles.selectedOptionText,
            ]}
          >
            {brand}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>

  {/* Rating */}
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Rating</Text>
    {ratings.map((rating) => (
      <TouchableOpacity
        key={rating}
        style={styles.optionButton}
        onPress={() => toggleSelection("rating", rating)}
      >
        <Text
          style={[
            styles.optionText,
            filters.rating.includes(rating) && styles.selectedOptionText,
          ]}
        >
          {rating} ★
        </Text>
      </TouchableOpacity>
    ))}
  </View>

  {/* Size */}
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Size</Text>
    {sizes.map((size) => (
      <TouchableOpacity
        key={size}
        style={styles.optionButton}
        onPress={() => toggleSelection("size", size)}
      >
        <Text
          style={[
            styles.optionText,
            filters.size.includes(size) && styles.selectedOptionText,
          ]}
        >
          {size}
        </Text>
      </TouchableOpacity>
    ))}
  </View>

  {/* Color */}
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Color</Text>
    <View style={styles.colorContainer}>
      {colors.map((color) => (
        <TouchableOpacity
          key={color}
          style={[
            styles.colorOption,
            { backgroundColor: color },
            filters.color.includes(color) && styles.selectedColorOption,
          ]}
          onPress={() => toggleSelection("color", color)}
        />
      ))}
    </View>
  </View>
</ScrollView>
<View style={{ alignItems: "center" , marginBottom : 5}}>
  <TouchableOpacity
    style={{
      height: 45,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ff005c",
      width: "95%",
      borderRadius: 15,
    }}
    onPress={applyFilters}
  >
    <Text>Apply Filters</Text>
  </TouchableOpacity>
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    width: width,
    height: height * 0.4, // Adjust to 60% of screen height
    padding: 16,
    justifyContent: "center",
  },
  brandsection: {
    width: width,
    height: height * 0.45, // Adjust to 60% of screen height
    padding: 16,
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  optionButton: {
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionText: {
    color: "#E91E63",
    fontWeight: "bold",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderBottomWidth: 1,
    flex: 1,
    marginHorizontal: 8,
    padding: 8,
  },
  colorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: "#E91E63",
  },
  applyButton: {
    backgroundColor: "#E91E63",
    padding: 16,
    borderRadius: 8,
  },
  applyButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  brandScrollView: {
    height: "100%", // Ensure the ScrollView for the brand fills its parent's height
  },  
});

export default FilterMenu;
