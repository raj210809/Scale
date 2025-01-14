import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

const dummyData = [
  {
    id: "1",
    name: "Abhinav Gulati",
    message: "Sure! This looks good. Let’s buy...",
    profileImage:
      "https://via.placeholder.com/150/000000/FFFFFF/?text=Abhinav", // Replace with actual URLs
    time: "15 min",
  },
  {
    id: "2",
    name: "Akriti",
    message: "This shoe doesn’t look good :(",
    profileImage:
      "https://via.placeholder.com/150/000000/FFFFFF/?text=Akriti",
    time: "15 min",
  },
  {
    id: "3",
    name: "Akriti",
    message: "This shoe doesn’t look good :(",
    profileImage:
      "https://via.placeholder.com/150/000000/FFFFFF/?text=Akriti",
    time: "15 min",
  },
];

interface SharePageProps {
  onClose: () => void;
  studentid: string | null;
}

const SharePage: React.FC<SharePageProps> = ({ onClose, studentid }) => {
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [searchText, setSearchText] = useState("");

  const handleSheetChange = useCallback((index: number) => {
    console.log("Sheet position changed to index:", index);
  }, []);

  const toggleSelection = (id: string) => {
    setSelectedPeople((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((personId) => personId !== id) // Remove from selection
        : [...prevSelected, id] // Add to selection
    );
  };

  const renderItem = ({ item }: { item: typeof dummyData[0] }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => toggleSelection(item.id)}
    >
      <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
      <View style={styles.userDetails}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userMessage}>{item.message}</Text>
      </View>
      <Ionicons
        name={
          selectedPeople.includes(item.id)
            ? "checkbox"
            : "checkbox-outline"
        }
        size={24}
        color={selectedPeople.includes(item.id) ? "#E63946" : "#ccc"}
      />
    </TouchableOpacity>
  );

  const filteredData = dummyData.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleShare = () => {
    console.log("Sharing with:", selectedPeople);
    onClose(); // Close the bottom sheet
  };

  const snapPoints = ["80%"];

  return (
    <BottomSheet
      enablePanDownToClose
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      onClose={onClose}
    >
      <BottomSheetView style={styles.container}>
        <Text style={styles.headerText}>Share to</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name..."
          placeholderTextColor="#ccc"
          value={searchText}
          onChangeText={setSearchText}
        />
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        <Button
          title={`Share with ${selectedPeople.length} ${
            selectedPeople.length === 1 ? "person" : "people"
          }`}
          onPress={handleShare}
          disabled={selectedPeople.length === 0} // Disable button if no one is selected
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "#F6F6F6",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 8,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  userMessage: {
    fontSize: 14,
    color: "#777",
  },
});

export default SharePage;
