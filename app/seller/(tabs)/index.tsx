import { StyleSheet, Text, View,Image , TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import Mostviewedseller from '@/components/section/mostviewedseleer'
import Trendyupdates_seller from '@/components/section/trendyupdates_seller'
import { ScrollView } from 'react-native-gesture-handler'
import Allproducts from '../components/allproducts'

const Mainprofile = () => {

  return (
    <View>
    <ScrollView>
        <View style={styles.topbar}>
            <Text style={styles.heading}>Scale</Text>
            <View style={styles.innerbox}>
              <TouchableOpacity onPress={() => router.push('/Updates')}>
                <FontAwesome name="bell" size={20} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/seller/components/queryscreen')}>
                <FontAwesome name="question" size={20} />
              </TouchableOpacity>
            </View>
          </View>
      <View style={styles.profileHeader}>
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                style={styles.coverImage}
              />
              <Image
                source={{ uri: 'https://via.placeholder.com/80' }}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>Nike</Text>
              <Text style={styles.verifiedIcon}>just do it</Text>
              <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryButtonText}>#4 in fitness</Text>
              </TouchableOpacity>
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>4.6</Text>
                  <Text style={styles.statLabel}>300+ ratings</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>250k</Text>
                  <Text style={styles.statLabel}>Influencers</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>15</Text>
                  <Text style={styles.statLabel}>Item sold</Text>
                </View>
              </View>
            </View>
            <Mostviewedseller/>
            <Trendyupdates_seller type='Trendy ZUpdates'/>
            <Text style={{fontSize : 25 , fontWeight : '700' , marginLeft : 10}}>All Products</Text>
            <Allproducts/>
    </ScrollView>
  </View>
  )
}

export default Mainprofile

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    profileHeader: {
      alignItems: 'center',
      padding: 20,
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
    profileName: {
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 10,
    },
    verifiedIcon: {
      fontSize: 16,
      color: '#0095f6',
      fontWeight : '600'
    },
    profileBio: {
      textAlign: 'center',
      color: '#666',
      marginVertical: 10,
      paddingHorizontal: 15,
    },
    categoryButton: {
      backgroundColor: '#6c63ff',
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 20,
      marginVertical: 10,
    },
    categoryButtonText: {
      color: '#fff',
      fontSize: 14,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginVertical: 10,
    },
    statBox: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    statLabel: {
      fontSize: 12,
      color: '#666',
    },
    brandLogos: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 10,
    },
    brandLogo: {
      width: 50,
      height: 50,
      marginHorizontal: 5,
      borderRadius: 5,
    },
    actionsRow: {
      flexDirection: 'row',
      marginTop: 10,
    },
    actionButton: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 20,
      paddingVertical: 6,
      paddingHorizontal: 20,
      marginHorizontal: 10,
    },
    actionButtonText: {
      color: '#666',
    },
    actionButtonFollow: {
      backgroundColor: '#6c63ff',
      borderRadius: 20,
      paddingVertical: 6,
      paddingHorizontal: 20,
      marginHorizontal: 10,
    },
    actionButtonFollowText: {
      color: '#fff',
    },
    tabs: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderTopWidth: 1,
      borderColor: '#eee',
      paddingVertical: 10,
      color : '#e0e0e0'
    },
    tab: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#e0e0e0',
    },
    filterButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      //backgroundColor: '#e0e0e0',
    },
    activeFilter: {
      color : ''
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10,
        color: 'red',
      },
      innerbox: {
        flexDirection: 'row',
        width: '15%',
        justifyContent: 'space-around',
      },
      topbar: {
        flexDirection: 'row',
        height: 40,
        backgroundColor: 'beige',
        marginTop: 2,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
      },
  });