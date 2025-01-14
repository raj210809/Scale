import { StyleSheet, Text, View , TouchableOpacity , Image} from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { router } from 'expo-router'

const Main = () => {
  return (
    <View style={{flex: 1 , padding : 10}}>
      <View style={{alignItems: 'center',marginTop : 20}}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.coverImage}
      />
      <Image
        source={{ uri: 'https://via.placeholder.com/80' }}
        style={styles.profileImage}
      />
      </View>
      <View style={styles.bottomNavContainer}>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/components/yourorders')}>
        <FontAwesome5 name="home" size={20} color="black" />
        <Text style={styles.textstyle}>Your Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/seller/components/orders&customer')}>
        <FontAwesome5 name="list-alt" size={20} color="black" />
        <Text style={styles.textstyle}>Help Centre</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => {}}>
        <FontAwesome5 name="list-alt" size={20} color="black" />
        <Text style={styles.textstyle}>Promotions and Discounts</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => {}}>
        <FontAwesome5 name="chart-bar" size={20} color="black" />
        <Text style={styles.textstyle}>Manage Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => {}}>
        <FontAwesome5 name="cog" size={20} color="black" />
        <Text style={styles.textstyle}>Settings</Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
  bottomNavContainer: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  navItem: {
    alignItems: 'center',
    flexDirection: "row",
    height: 50,
    marginTop: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: -40,
  },
  textstyle : {
    marginLeft : 10,
    fontSize : 16,
    fontWeight : '600'
  }
})