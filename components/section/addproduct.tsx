import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
  ScrollView,
  Modal,
  Image,
  Alert,
} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as MediaPicker from 'expo-image-picker';
import { Cloudfronturl } from '@/constants/contants';
import { FlatList } from 'react-native-gesture-handler';

interface UploadFile {
  uri: string;
  type: string;
}

const AddProduct = ({ index, updateProductData }) => {
  const [draft, setDraft] = useState(false);
    const [sizeAvailable, setSelectedAvailSize] = useState([""]);
    const [colorAvailable, setSelectedValue] = useState([""]);
    const [name, setHeading] = useState("");
    const [brief, setBrief] = useState("");
    const [features, setFeatures] = useState("");
    const [Caring_info, setCaring] = useState("");
    const [Shipping_info, setShipping] = useState("");
    const [Additional_info, setAdditional] = useState("");
    const [price, setPrice] = useState("");
  
    const updateData = () => {
      updateProductData(index, {
        draft,
        price,
        brand,
        images,
        name,
        brief,
        sizeAvailable:
        colorAvailable,
        features,
        Caring_info,
        Shipping_info,
        Additional_info,
      });
    };
  
    // Update the parent every time a state changes
    const handleChange = (setter) => (value) => {
      setter(value);
      updateData();
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [images , setImages] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const brand = "nike" ;
    const colorOptions = ["Red", "Blue", "Green", "Yellow", "Black", "White"];
    const handleColorSelection = (color) => {
      setSelectedValue((prev) =>
        prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
      );
    };
    const sizeOptions = ["6", "7", "8", "9", "10", "11"];
    const handleSizeSelection = (color) => {
      setSelectedAvailSize((prev) =>
        prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
      );
    };
    const pickMedia = async () => {
        try {
          const result = await MediaPicker.launchImageLibraryAsync({
            mediaTypes: MediaPicker.MediaTypeOptions.All, // Allow both images and videos
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
          });
    
          if (!result.canceled) {
            const files = result.assets.map((item: any) => ({
              uri: item.uri,
              type: item.mimeType,
            }));
    
            uploadToAWS(files);
          }
        } catch (error) {
          console.error('Error picking media:', error);
        }
      };

    // Step 2: Request Pre-signed URLs and Upload Files
    const uploadToAWS = async (files: UploadFile[]) => {
      try {
        setUploading(true);
  
        console.log(files)
        const response = await axios.post('http://192.168.13.61:3000/products/get-presignedurls', {
          fileTypes: files.map((file) => file.type),
        });
  
        const { urls } = response.data;
  
        // Step 2: Upload each file directly to S3 using the pre-signed URLs
        await Promise.all(
          urls.map(async (item: any, index: number) => {
            const file = files[index];
  
            // Fetch the file content from its URI
            const fileContent = await fetch(file.uri);
            const blob = await fileContent.blob(); // Convert to Blob for S3 upload
  
            // Perform the PUT request to upload the file to S3
            const uploadResponse = await fetch(item.presignedUrl, {
              method: 'PUT',
              body: blob,
              headers: {
                'Content-Type': file.type,
              },
            });
            if (uploadResponse.status == 200){
              setImages((prevImages) => [...prevImages, `${Cloudfronturl}${item.key}`])
            }
            
          })
        );
  
        alert('Files uploaded successfully to S3.');
      } catch (error) {
        console.error('Error uploading to S3:', error);
        alert('Failed to upload files to S3.');
      } finally {
        setUploading(false);
      }
    };
  
    return (
      <View>
        <View style={{ borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 10, margin: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Add image/video</Text>
          <Text>related to announcement</Text>
          <View style={{ width: '98%', height: 250, marginTop: 20, borderWidth: 1, borderColor: 'black', borderRadius: 10 }}>
                      <View style={{height : "100%" , width : "100%"}}>
                        { images.length === 0 ? <ImageBackground style={styles.imageBackground}>
                          <TouchableOpacity style={styles.overlay} onPress={pickMedia}>
                            <Text>Upload Image/Video</Text>
                          </TouchableOpacity>
                        </ImageBackground> : <ScrollView horizontal pagingEnabled style={{height : "100%" , width : "100%"}}>
                          {images.map((item , index)=>{
                            return ( 
                              <View key={index} style={{width : 335}}>
                              <Image source={{uri : item}} style={styles.image}/>
                              <TouchableOpacity style={styles.overlay} onPress={pickMedia}>
                                <Text>Change Image/Video</Text>
                              </TouchableOpacity>
                              </View>
                            )
                          })}
                          </ScrollView>}
                      </View>
          </View>
        </View>
        <TextInput
          placeholder="Heading in 5 words"
          style={{ borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 10, margin: 10, height: 55 }}
          value={name}
          onChangeText={handleChange(setHeading)}
        />
        <TextInput
          placeholder="Product brief in 50 words"
          style={{ borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 10, margin: 10, height: 55 }}
          value={brief}
          onChangeText={handleChange(setBrief)}
        />
        <TextInput
          placeholder="Price"
          style={{ borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 10, margin: 10, height: 55 }}
          value={price}
          onChangeText={handleChange(setPrice)}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
        <TouchableOpacity
        style={styles.multiSelect}
        onPress={() => setModalVisible2(true)}
      >
        <Text>
          {sizeAvailable.length > 0
            ? sizeAvailable.join(", ")
            : "Select Size"}
        </Text>
      </TouchableOpacity>

      {/* Modal for Color Selection */}
      <Modal
        transparent
        animationType="slide"
        visible={modalVisible2}
        onRequestClose={() => setModalVisible2(false)}
      >
        <View style={styles.modalContainer2}>
          <View style={styles.modalContent2}>
            <Text style={styles.modalTitle}>Select Colors</Text>
            <FlatList
              data={sizeOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.colorOption,
                    colorAvailable.includes(item) && styles.selectedOption,
                  ]}
                  onPress={() => handleColorSelection(item)}
                >
                  <Text style={{ color: "black" }}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
          <TouchableOpacity
        style={styles.multiSelect}
        onPress={() => setModalVisible(true)}
      >
        <Text>
          {colorAvailable.length > 0
            ? colorAvailable.join(", ")
            : "Select Colors"}
        </Text>
      </TouchableOpacity>

      {/* Modal for Color Selection */}
      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer2}>
          <View style={styles.modalContent2}>
            <Text style={styles.modalTitle}>Select Colors</Text>
            <FlatList
              data={colorOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.colorOption,
                    colorAvailable.includes(item) && styles.selectedOption,
                  ]}
                  onPress={() => handleColorSelection(item)}
                >
                  <Text style={{ color: "black" }}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        </View>
        <TextInput
          placeholder="Features"
          style={{ borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 10, margin: 10, height: 55 }}
          value={features}
          onChangeText={handleChange(setFeatures)}
        />
        <TextInput
          placeholder="Caring info"
          style={{ borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 10, margin: 10, height: 55 }}
          value={Caring_info}
          onChangeText={handleChange(setCaring)}
        />
        <TextInput
          placeholder="Shipping Info"
          style={{ borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 10, margin: 10, height: 55 }}
          value={Shipping_info}
          onChangeText={handleChange(setShipping)}
        />
        <TextInput
          placeholder="Additional Info"
          style={{ borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 10, margin: 10, height: 55 }}
          value={Additional_info}
          onChangeText={handleChange(setAdditional)}
        />
        <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginVertical: 10 }} />
      </View>
    );
  };  

const AddProductSection = () => {
  const [productSections, setProductSections] = useState([{}]);
    const [isModalVisible2, setModalVisible2] = useState(false);

  const updateProductData = (index, data) => {
    const updatedSections = [...productSections];
    updatedSections[index] = data;
    setProductSections(updatedSections);
  };
  const brand = "nike" ;

  const addNewProductSection = () => {
    setProductSections([...productSections, {images : [] , name: "", brief: "", sizeAvailable: "S", colorAvailable: "10" , features : "" , Caring_info : "" , Shipping_info : "" , Additional_info : "" , price : "" , brand , draft : false}]);
  };

  const submitData =async () => {
    try {
      const response = await axios.post('http://192.168.13.61:3000/products/add-products', {
        products : productSections
      });
      if (response.status == 200){
        Alert.alert("Products added successfully")
      }
    } catch (error) {
      console.log("error : " , error)
    }
  };

  const handleSubmit = () => {
    console.log({product : productSections})
  }

  const handlesaveforlater = async () => {
    productSections.map((item)=>{
      item.draft = true
    })
      try {
        const response = await axios.post('http://192.168.13.61:3000/products/add-products', {
          products : productSections
        });
        if (response.status == 200){
          Alert.alert("Products added successfully")
        }
      } catch (error) {
        console.log("error : " , error)
      }
    };


  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.uploadButton}>
        <FontAwesome name="amazon" size={24} color="black" />
        <Text>Upload multiple Items</Text>
      </TouchableOpacity>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginVertical: 10 }} />

      <Text style={{fontSize : 20, fontWeight : "200" , alignSelf : 'center', textAlign : 'center'}}>Add Manually</Text>
      {productSections.map((_, index) => (
        <AddProduct
          key={index}
          index={index}
          updateProductData={updateProductData}
        />
      ))}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={addNewProductSection} style={styles.addButton}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setModalVisible2(true)} style={styles.submitButton}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <Modal
      visible={isModalVisible2}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible2(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Are you sure to upload {productSections.length} products?</Text>
            <View style={{flexDirection : "row" , justifyContent : 'space-around' , width : '100%' , marginTop : 20}}>
                <TouchableOpacity style={{flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 45,
                marginBottom: 10,
                borderWidth: 1,
                borderColor: 'red',
                width : "48%"}}
                onPress={handlesaveforlater}>
                    <Text>Save for Later</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 45,
                marginBottom: 10,
                borderWidth: 1,
                borderColor: 'red',
                width : "48%",
                backgroundColor : "red"}}
                onPress={submitData}>
                    <Text style={{color : '#fff'}}>Confirm</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default AddProductSection;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  productSection: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  uploadButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'red',
  },
  imageBackground: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadImageContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    height: 55,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  picker: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height : 50,
    marginBottom : 100
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    height : 45,
    width : "45%"
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    height : 45,
    width : "45%"
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    height: '20%',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf : "center"
  },
  image : {
    height : "100%",
    width : "100%",
    resizeMode : "contain"
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: 45,
  },
  multiSelect: {
    width : "40%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  modalContainer2: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent2: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  colorOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedOption: {
    backgroundColor: "#ddd",
  },
  modalButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
