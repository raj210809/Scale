import { StyleSheet, Text, View , Image , TouchableOpacity } from 'react-native'
import React from 'react'
import { Checkbox } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons'
import Share from '../buttons/share'
import Bookmark from '../buttons/bookmark'

interface item {
    _id : string,
    images : string[],
    name : string,
    brand : string,
    price : string,
    rating : string,
    quantity : number
    onSelectionChange: (item: { _id: string; price: number; quantity: number; selected: boolean }) => void;
}

const Checkoutcard = (item : item) => {
    const [checked, setChecked] = React.useState(false);
    const [quantity, setQuantity] = React.useState(item.quantity);
    const [size, setSize] = React.useState(6);

    const handleCheckboxToggle = () => {
        const newCheckedStatus = !checked;
        setChecked(newCheckedStatus);
        item.onSelectionChange({ _id : item._id, price: parseFloat(item.price), quantity, selected: newCheckedStatus });
      };
    
      const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
        if (checked) {
          item.onSelectionChange({ _id : item._id, price: parseFloat(item.price), quantity: newQuantity, selected: true });
        }
      };
  return (
    <View style={styles.container}>
    <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
            <View>
            <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={handleCheckboxToggle}
            />
            </View>
            <View style={{flexDirection : 'row' , width : '25%' , justifyContent : 'space-between' , alignItems : 'center'}}>
                <Share/>
                <Bookmark id={item._id} type='product'/>
                <FontAwesome name="trash" size={24} color="black" />
            </View>
        </View>
    <View style={styles.card}>
    <View style={styles.details}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.price}>₹ {item.price}</Text>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
        <Image source={{ uri: item.images[0] }} style={styles.image} />
    </View>
    <View style={{flexDirection : 'row' , justifyContent : 'space-between' , width : "100%"}}>
    <View style={styles.actions}>
        <Text style={{color : "white"}}>SZ</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={()=>{setSize(size-1)}}>
            <FontAwesome name="caret-down" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{size}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={()=>{setSize(size+1)}}>
            <FontAwesome name="caret-up" size={24} color="white" />
        </TouchableOpacity>
    </View>
    <View style={styles.actions}>
        <Text style={{color : "white"}}>QT</Text>
    <TouchableOpacity style={styles.quantityButton} onPress={()=>{quantity > 1 && handleQuantityChange(quantity-1)}}>
            <FontAwesome name="caret-down" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={()=>{handleQuantityChange(quantity+1)}}>
            <FontAwesome name="caret-up" size={24} color="white" />
        </TouchableOpacity>
    </View>
    </View>
    </View>
  )
}

export default Checkoutcard

const styles = StyleSheet.create({
    container: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 10 , marginBottom: 20 },
    card: { flexDirection: 'row'},
    image: { width: 100, height: 100, marginRight: 10 },
    details: { height: 120, flex: 1 },
    title: { fontSize: 16, fontWeight: 'bold' },
    brand: { fontSize: 14, color: '#666' },
    price: { fontSize: 16, color: '#000' },
    rating: { fontSize: 14, color: '#666' },
    actions: { flexDirection: 'row', alignItems: 'center' , width : "48%" , justifyContent : "center" , backgroundColor : "black" },
    quantityButton: { padding: 10 },
    quantityText: { marginHorizontal: 10 , color : "white"},
    paymentInfo: { marginVertical: 20 },
    totalAmount: { fontWeight: 'bold', marginTop: 10 },
    placeOrderButton: { backgroundColor: '#ff0050', padding: 15, borderRadius: 5 },
    placeOrderText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  });