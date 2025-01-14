import { StyleSheet, Text, View , TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import UpdateDraft from '@/components/section/updatedraft'
import ProductCard from '@/components/cards/productshowsmall'
import { ScrollView } from 'react-native-gesture-handler'

const Drafts = () => {

    const [page , setpage] = useState("Update")

    const dummyData = [
        {
            id: 1,
            productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Wireless Headphones",
            productDescription: "High-quality wireless headphones with noise cancellation.",
            productBrand: "SoundPro",
            productRating: 4.5,
            productReviewCount: 145,
            productPrice: 99,
        },
        {
            id: 2,
            productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Wireless Headphones",
            productDescription: "High-quality wireless headphones with noise cancellation.",
            productBrand: "SoundPro",
            productRating: 4.5,
            productReviewCount: 145,
            productPrice: 99,
        },
        {
            id: 3,
            productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Wireless Headphones",
            productDescription: "High-quality wireless headphones with noise cancellation.",
            productBrand: "SoundPro",
            productRating: 4.5,
            productReviewCount: 145,
            productPrice: 99,
        },
        {
            id: 4,
            productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            productName: "Wireless Headphones",
            productDescription: "High-quality wireless headphones with noise cancellation.",
            productBrand: "SoundPro",
            productRating: 4.5,
            productReviewCount: 145,
            productPrice: 99,
        },
    ];

  return (
    <ScrollView>
      <View style={{flexDirection : 'row' , justifyContent : 'space-around' , marginTop : 20}}>
        <TouchableOpacity style={[styles.filterButton , page === "Update" && styles.activeFilter]} onPress={() => setpage("Update")}>
        <Text style={[styles.headtext , page === "Update" && styles.activeheadtext]}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton , page === "Products" && styles.activeFilter]} onPress={() => setpage("Products")}>
            <Text style={[styles.headtext , page === 'Products' && styles.activeheadtext]}>Products</Text>
        </TouchableOpacity>
      </View>
      {page === "Update" ? <UpdateDraft/> : dummyData.map((item) => {
        return (
            <ProductCard {...item} accessor_name='sellerdraft' key={item.id}/>
        )
      })}
    </ScrollView>
  )
}

export default Drafts

const styles = StyleSheet.create({
    filterButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: 'grey',
        width : "48%",
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'row'
      },
      activeFilter: {
        backgroundColor: '#000',
      },
      headtext : {
        color : 'black',
      },
      activeheadtext : {
        color : 'white'
      }
})