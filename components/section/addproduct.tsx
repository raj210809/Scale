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
} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const AddProduct = ({ index, updateProductData }) => {
    const [selectedAvailSize, setSelectedAvailSize] = useState("S");
    const [selectedValue, setSelectedValue] = useState("10");
    const [heading, setHeading] = useState("");
    const [brief, setBrief] = useState("");
    const [features, setFeatures] = useState("");
    const [Caring_info, setCaring] = useState("");
    const [Shipping_info, setShipping] = useState("");
    const [Additional_info, setAdditional] = useState("");
  
    const updateData = () => {
      updateProductData(index, {
        heading,
        brief,
        selectedAvailSize,
        selectedValue,
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
  
    return (
      <View>
        <View style={{ borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 10, margin: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Add image/video</Text>
          <Text>related to announcement</Text>
          <View style={{ width: '98%', height: 250, marginTop: 20, borderWidth: 1, borderColor: 'black', borderRadius: 10 }}>
            <TouchableOpacity>
              <ImageBackground style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Text>Upload Image</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          placeholder="Heading in 5 words"
          style={{ borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 10, margin: 10, height: 55 }}
          value={heading}
          onChangeText={handleChange(setHeading)}
        />
        <TextInput
          placeholder="Product brief in 50 words"
          style={{ borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 10, margin: 10, height: 55 }}
          value={brief}
          onChangeText={handleChange(setBrief)}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
          <Picker
            selectedValue={selectedAvailSize}
            onValueChange={handleChange(setSelectedAvailSize)}
            style={{ width: "64%" }}
          >
            <Picker.Item label="10" value="10" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="8" value="8" />
          </Picker>
          <Picker
            selectedValue={selectedValue}
            onValueChange={handleChange(setSelectedValue)}
            style={{ width: "34%" }}
          >
            <Picker.Item label="S" value="S" />
            <Picker.Item label="M" value="M" />
            <Picker.Item label="L" value="L" />
          </Picker>
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
  const [productSections, setProductSections] = useState([{ }]);
    const [isModalVisible2, setModalVisible2] = useState(false);

  const updateProductData = (index, data) => {
    const updatedSections = [...productSections];
    updatedSections[index] = data;
    setProductSections(updatedSections);
  };

  const addNewProductSection = () => {
    setProductSections([...productSections, { heading: "", brief: "", selectedAvailSize: "S", selectedValue: "10" , features : "" , Caring_info : "" , Shipping_info : "" , Additional_info : "" }]);
  };

  const submitData = () => {
    setModalVisible2(true)
    console.log("Submitted Data:", productSections);
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
        <TouchableOpacity onPress={submitData} style={styles.submitButton}>
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
            <Text>Are you sure to send update?</Text>
            <View style={{flexDirection : "row" , justifyContent : 'space-around' , width : '100%' , marginTop : 20}}>
                <TouchableOpacity style={{flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 45,
                marginBottom: 10,
                borderWidth: 1,
                borderColor: 'red',
                width : "48%"}}>
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
                backgroundColor : "red"}}>
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
});
