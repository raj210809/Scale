import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'

interface OrderDetails {
    name: string;
    description: string;
    brand: string;
    rating: number;
    reviews: number;
    price: string;
    size: string;
    quantity: string;
    image: string;
    delivery: string;
    orderTime: string;
    status: string;
    address: string;
    payment: {
      totalMRP: string;
      discount: string;
      shippingFee: string;
      totalAmount: string;
    };
  }

const Orderextension = (orderDetails : OrderDetails) => {
  return (
    <View>
      <View style={styles.statusContainer}>
          <View style={styles.statusTrack}>
            <View style={styles.circleFilled} />
            <View style={styles.line} />
            <View style={styles.circleFilled} />
            <View style={styles.line} />
            <View style={styles.circleEmpty} />
          </View>
          <Text style={styles.deliveryStatus}>{orderDetails.status}</Text>
          <Text style={styles.deliveryTime}>{orderDetails.delivery}</Text>
        </View>
        {orderDetails.status === "delivered" ? (<View style={{marginVertical : 10}}>
            <TouchableOpacity style={{height : 45 , justifyContent : "center" , alignItems : "center" , borderWidth : 1 , borderColor : "red" , marginTop : 5 , borderRadius : 4}}>
                <Text>Rate this Product</Text>
            </TouchableOpacity>
        </View>) : null}

        {/* Delivery Address */}
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <Text style={styles.address}>{orderDetails.address}</Text>
        <TouchableOpacity style={styles.changeAddressButton}>
          <Text style={styles.changeAddressText}>Change Address</Text>
        </TouchableOpacity>

        {/* Payment Information */}
        <Text style={styles.sectionTitle}>Payment Information</Text>
        <View style={styles.paymentInfo}>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Total MRP</Text>
            <Text style={styles.paymentValue}>{orderDetails.payment.totalMRP}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Discount (if any)</Text>
            <Text style={styles.paymentValue}>{orderDetails.payment.discount}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Shipping fee</Text>
            <Text style={styles.paymentValue}>{orderDetails.payment.shippingFee}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabelTotal}>Total Amount</Text>
            <Text style={styles.paymentValueTotal}>{orderDetails.payment.totalAmount}</Text>
          </View>
          {orderDetails.status === "delivered" ? (<View>
            <TouchableOpacity style={{height : 45 , justifyContent : "center" , alignItems : "center" , backgroundColor : "#000" , borderRadius : 4}}>
                <Text style={{color : "#fff"}}>Return Product</Text>
            </TouchableOpacity>
          </View>) : (<View>
            <TouchableOpacity style={{height : 45 , justifyContent : "center" , alignItems : "center" , backgroundColor : "#000" , borderRadius : 4}}>
                <Text style={{color : "#fff"}}>Cancel Order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{height : 45 , justifyContent : "center" , alignItems : "center" , borderWidth : 1 , borderColor : "red" , marginTop : 5 , borderRadius : 4}}>
                <Text>Change Phone Number for Updates</Text>
            </TouchableOpacity>
          </View>)}
        </View>
    </View>
  )
}

export default Orderextension

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
      },
      card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        margin: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        borderWidth: 1,
        borderColor: "#E0E0E0",
      },
      orderTime: {
        fontSize: 14,
        color: "#888",
        marginBottom: 12,
        textAlign: "center",
      },
      header: {
        flexDirection: "row",
        marginBottom: 10,
      },
      title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 4,
      },
      subtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
      },
      brand: {
        fontSize: 14,
        fontWeight: "500",
        color: "#888",
      },
      details: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
        justifyContent: "space-between",
      },
      ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
      },
      rating: {
        backgroundColor: "#FFEB3B",
        color: "#333",
        fontWeight: "bold",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        fontSize: 14,
        marginRight: 4,
      },
      reviews: {
        fontSize: 14,
        color: "#888",
      },
      price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
      },
      sizeQuantity: {
        fontSize: 14,
        color: "#666",
      },
      statusContainer: {
        alignItems: "center",
        marginVertical: 16,
      },
      statusTrack: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
      },
      circleFilled: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#E91E63",
      },
      circleEmpty: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#E91E63",
        backgroundColor: "#fff",
      },
      line: {
        height: 2,
        flex: 1,
        backgroundColor: "#E91E63",
      },
      deliveryStatus: {
        fontSize: 14,
        color: "#333",
      },
      deliveryTime: {
        fontSize: 12,
        color: "#888",
      },
      sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginTop: 16,
        marginBottom: 8,
      },
      address: {
        fontSize: 14,
        color: "#666",
        marginBottom: 8,
      },
      changeAddressButton: {
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        borderRadius: 4,
        backgroundColor: "#F8BBD0",
        marginVertical: 8,
      },
      changeAddressText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#E91E63",
      },
      paymentInfo: {
        marginTop: 8,
      },
      paymentRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
      },
      paymentLabel: {
        fontSize: 14,
        color: "#666",
      },
      paymentValue: {
        fontSize: 14,
        color: "#333",
      },
      paymentLabelTotal: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
      },
      paymentValueTotal: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#E91E63",
      },
      paymentButton: {
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        borderRadius: 4,
        backgroundColor: "#E91E63",
        marginVertical: 16,
      },
      paymentButtonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff",
      },
})