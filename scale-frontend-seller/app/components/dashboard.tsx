import React,{useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import ProductCard from '@/components/cards/productshowsmall';


const Dashboard = () => {

      const [selectedFilter, setSelectedFilter] = useState('today');

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
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sales Overview</Text>
        </View>
        <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginVertical: 2 }} />
        <View style={styles.statsRow}>
            <View style={styles.statBox}>
                <Text style={styles.statValue}>4.6 L</Text>
                <Text style={styles.statLabel}>Total Sale</Text>
            </View>
            <View style={styles.statBox}>
                <Text style={styles.statValue}>250 L</Text>
                <Text style={styles.statLabel}>MOnthly Sale</Text>
            </View>
            <View style={styles.statBox}>
                <Text style={styles.statValue}>15 L</Text>
                <Text style={styles.statLabel}>Daily Sales</Text>
            </View>
        </View>
        {/* Sales Chart */}
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{ data: [50, 100, 150, 200, 250, 300] }],
          }}
          width={350} // from react-native
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={styles.chart}
        />
  
        {/* Performance Indicators */}
        <Text style={styles.headerTitle}>Performane Indicators</Text>
        <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginVertical: 2 }} />
        <View style={styles.performanceContainer}>
            <View style={styles.statsBox}>
                <Text style={styles.statValue}>4.6 L</Text>
                <Text style={styles.statLabel}>Total Sale</Text>
            </View>
            <View style={styles.statsBox}>
                <Text style={styles.statValue}>250 L</Text>
                <Text style={styles.statLabel}>MOnthly Sale</Text>
            </View>
            <View style={styles.statsBox}>
                <Text style={styles.statValue}>15 L</Text>
                <Text style={styles.statLabel}>Daily Sales</Text>
            </View>
            <View style={styles.statsBox}>
                <Text style={styles.statValue}>15 L</Text>
                <Text style={styles.statLabel}>Daily Sales</Text>
            </View>
        </View>
  
        {/* Customer Visits */}
        <View style={styles.visitsContainer}>
          <Text style={styles.headerTitle}>Customer Visits</Text>
          <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginVertical: 2 }} />
          <View style={styles.filterContainer}>
                    <TouchableOpacity
                      style={[
                        styles.filterButton,
                        selectedFilter === 'today' && styles.activeFilter,
                      ]}
                      onPress={() => setSelectedFilter('today')}
                    >
                      <Text style={styles.filterText}>Today</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.filterButton,
                        selectedFilter === 'weekly' && styles.activeFilter,
                      ]}
                      onPress={() => setSelectedFilter('weekly')}
                    >
                      <Text style={styles.filterText}>Week</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.filterButton,
                        selectedFilter === 'monthly' && styles.activeFilter,
                      ]}
                      onPress={() => setSelectedFilter('monthly')}
                    >
                      <Text style={styles.filterText}>Month</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.filterButton,
                        selectedFilter === 'quarterly' && styles.activeFilter,
                      ]}
                      onPress={() => setSelectedFilter('quarterly')}
                    >
                      <Text style={styles.filterText}>Quarterly</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.performanceContainer}>
            <View style={styles.statsBox}>
                <Text style={styles.statValue}>4.6 L</Text>
                <Text style={styles.statLabel}>Total Sale</Text>
            </View>
            <View style={styles.statsBox}>
                <Text style={styles.statValue}>250 L</Text>
                <Text style={styles.statLabel}>MOnthly Sale</Text>
            </View>
            <View style={styles.statsBox}>
                <Text style={styles.statValue}>15 L</Text>
                <Text style={styles.statLabel}>Daily Sales</Text>
            </View>
            <View style={styles.statsBox}>
                <Text style={styles.statValue}>15 L</Text>
                <Text style={styles.statLabel}>Daily Sales</Text>
            </View>
        </View>
        </View>
  
        {/* Top 5 Bestselling */}
        <View style={styles.bestsellingContainer}>
          <Text style={styles.headerTitle}>Top 5 Bestselling</Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginVertical: 2 }} />
          {dummyData.map((item) => (
            <ProductCard {...item} accessor_name='seller' key={item.id}/>
          ))}
        </View>
      </ScrollView>
    );
  };
  
  export default Dashboard;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    bottomNavContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#fff',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderColor: '#ddd',
    },
    navItem: {
      alignItems: 'center',
    },
    header: {
    },
    headerTitle: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    headerSubtitle: {
      color: '#888',
    },
    chart: {
      marginVertical: 20,
    },
    performanceContainer: {
      padding: 10,
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      marginBottom: 20,
      flexWrap : 'wrap',
      flexDirection : 'row',
    },
    performanceTitle: {
      fontWeight: 'bold',
    },
    visitsContainer: {
      padding: 10,
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      marginBottom: 20,
    },
    visitsTitle: {
      fontWeight: 'bold',
    },
    visitStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    bestsellingContainer: {
      padding: 10,
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
    },
    bestsellingTitle: {
      fontWeight: 'bold',
      marginBottom: 10,
    },
    bestsellingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    bestsellingImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '100%',
        marginVertical: 10,
      },
      statBox: {
        alignItems: 'center',
      },
      statValue: {
        fontSize: 22,
        fontWeight: 'bold',
      },
      statLabel: {
        fontSize: 15,
        color: '#666',
      },
      statsBox: {
        alignItems: 'center',
        width : "50%",
        marginTop : 15
      },
      filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        marginTop: 10,
      },
      filterButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
      },
      activeFilter: {
        backgroundColor: '#d9534f',
      },
      filterText: {
        color: '#fff',
        fontWeight: 'bold',
      },
  });
  