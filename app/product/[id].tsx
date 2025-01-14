import ProductCard from '@/components/cards/productshowsmall';
import Reviewcard from '@/components/cards/reviewcard';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Modal } from 'react-native';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';

interface SimilarProduct {
  id: number;
  productImage: string;
  productName: string;
  productDescription: string;
  productBrand: string;
  productRating: number;
  productReviewCount: number;
  productPrice: number;
}

interface Review {
  id: string;
  name: string;
  images: string[];
  rating: string;
  comment: string;
  date: string;
  image: string;
}

interface mainproduct {
  inventory : string;
  restock_date : string;
  itemsld :string;
  avg_delivery_day : string;
  item_returned : string;
  image : string[];
  colorAvail : string[]
  name : string;
  rating : string;
  numberOfRating : string;
  brand : string;
  description : string;
  sizeAvail : number[];
  price : number;
  features : string;
  similarProduct : SimilarProduct[];
  reviews : Review[];
}

const ProductDetails = () => {

    const {accessor ,id} = useLocalSearchParams()

    const colorAvail = ["red" , "green" , "black" , "brown" ,"blue" , "pink"]

    const [size , setsize] = useState(6)
    const [color , setColor] = useState(colorAvail[0])
    const [quantity , setquantity] = useState(1)
    const [isModalVisible1, setModalVisible1] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [newprice , setnewprice] = useState("5555")
    const [newinfo , setnewinfo] = useState({
      brief : "",
      size : "",
      shipping : "",
      additional : ""
    })
    const 
    image = ["data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAygMBEQACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xAA7EAABAwIEAgYIBQIHAAAAAAABAAIDBBEFEiExBkETIlFhcYEjMkKRobHB4QcUM1JiJNEVRFPC0vDx/8QAGwEBAQADAQEBAAAAAAAAAAAAAAECAwQFBgf/xAAwEQACAgEEAAQEBQQDAAAAAAAAAQIDEQQSITEFE0FhIjJRoRRCgZHwcbHB8RUj0f/aAAwDAQACEQMRAD8A4deafp4BATGqMjJgKGIWUA0AIBWQAQgIkKlJBQgwEIPKgyGUoTI23B1KFyWjVQwE5UqKyhURQyIqlEVUVEUBFCggGgBAJANASCEZMFQmAuoQV0BIIAQAgCyAegQxJXCAYUISshANmgm9rDcoTOOTm8Q4geXllGMrG+0Rq5dcKElyfNavxme7bSsI3lDK+WmjMv6hGq1WQ28o9zS3Ssri5dljgtR2IihkRVAiEKRVKRQoIACAaASAYQDQgwUAFMAagwSBUMRoAQAEIOyDJJrddSoRkhZDHI0BrsfqOgwySxs6Q5B9fhdbaY5meb4rd5WleO3x/P0OSjLTIwvGmYLuPkYYys/U7Wg60o16trrmseEz7CjnGDKkjtfsXLk9CLKSLKmaEQhSJCFIuFlUUgqUEA0AIBIAQDCAYQAhB3QBdRjBNqhGSAQhJCAhDIoqSevq4KOlbmnneGMHIdpPcBcrOuDnJI5NbqVp6XYzMq+B8cpW543QTXdYGOYA3tf2rD3E8jsu10HzcfFlnPT/AJ/OjmpK6eiqpKasbaSI5XMJFwfEaLROn6Ho0eJ55lyjVcQ1RquidG0iJg1vycVnTFRycPi+od7i4/Kv7mlvot54rfB2eDOLmxF2t2Lku+Vn2GjeVHP0/wAG/jHW1t9lyS6PST5Ka6kMPpGD0Z5XvlUhPPD7Nph2WwBlQpFzEGSkhZIzFZANACASASAkEBJCCQAgGFATbsoQkEINCDAuUIQpMcnwvEhLSSRxSR3bmlZnBB+Wml+wldulgl8TljJ874va7f8Aq2ZSeeOzY1nHmJzUj2OhifOGObDU07gDHmsT1XAg3yi/mNLru8ueHjD90z5zy69yXK9mv8o8+6KeVzi1lySTrYLjfudyjZJfCi5lPPazgA06EFwUybo12tc/3Md2GVWpEYcO5wWamjkl4fqO0vujpsIHRPhYSLhpB9xXNd8rPpdH8O2L7OkbDJCIZJGFrZmZ483ttuRf3gj4965pJpcnoRsjKTUXlrh+zM9kbJIddiCFoa9TapGiqYDBM5h25LdF5RmUrIEXmwQpQVTIiSqUV0AXQDKAQQEwgAlAJACAYQFjdliYsaEJBAOR4hifIRo0XtfdEsvBqtsUIOTOWrKmpqn9M6NodbTlZd0YqCwfJ6jUW3S3yRrnTSZrOcW+AWeEee7rN2JPBdE+SN4eyXMOYPJR9G+E5xakpZRmZ3utY781rzg7VKT69TMgY52hcWrXKzHR1VVt+uDecK4PUYnjMNDE3WV1i8bMZ7TvIfRY582SijfOz8JXK2fodHxJVQ1WN1DKYf01OG00AbyYzT55j5rC5rfx0jd4dXKGnTl80vif9X/ERpJdOuSWnu59uy5mz0cN8mFixDpIw0XdY3t5W+q2VRcs4Ni6NdK10Tix4LXDcFZtNPDCeSiQqGSKSVkZEUAIAQDKAYQDugBACAEAwgLW7LEjHZDEsYFCM1HEbTK1jWv0aCcjXWLibWv8Vv06aPD8XTklFPrPHqzSzWj0f0jR+5rrhdfZ4tiUOJZ/qVNjFy/pg9oGl1Ga4wz8W7KE2J/SZwMzewfZTJFW925dGdTZsgJyEb2vqFqk+T0KU9qyZkGbLoLtcb5rmwWuT5OuvGOD1HhZowXgXE8beDFWTxdFSlwsbHqhw7sxJ8GrdVF11SsOLXS/F6uvTrlLv/P2OFZVOpw25L7bkclxqOT3fNcO+TLbiIs27HEGwAbvdY+Xng3q9cMy6KGXEcZipYetY2kLdu8eA29679LTzj9zO25Qrc5dI6T8RcKipKegqo2gSE9E+3PS4+RWWvgsqR5PhGqlbOyL67ODkNguFHvopVKCAEAICSASAAgGFQNACAYCgLGrEhYAhGKeZtPE5xLQ+3Va42uVYxcmc+ouVUG2+fT3OWfTvdPJK6YSvJ3dzXanhYwfJ+TN2Sm5Zfv98exjvkAdkkBZ3g3CyNM5pPZJYE5oDmtksB7LgNCo+CbVnDL4ow+Q9chwFwdrrFywjorrzLsyujcP1coPIgalanI61Br5/sdFwlg0nEGMU+HwyENvne8+ywbn6eYUhBzlg2X6laelzznHXuzufxWxGCGPDsCg9EKdgke0C4A2YPmVu1TSxBdHB4NTvc75+vH+WeZPnHTZCQXEDKWjfuXOo5WT1JWfFt9TNaySicIwc1c7QBuoiH/L5LZGDzwuTqri18zPT/w/4d/wylNVVC0rwN+Q7F6tVSqgeJ4pr1PFcOjB/EutbIaWlbqc5kcOywsPn8F5+slwkdngNLW6z9Dz6VcSPpipUAgBACAZQCQDVKMIQEA1ATAUBNqhCwclCHNY65s9Xl6Vgy6F5d8AOX1XZSsRyfI+KvzL9u79c/ZL+ZMTI2Jlw4yjnYm4W3k5dsYR45JMcHOEsbhI0D1XDUI1wWEtz3ReSD2F9nZhlvpY2sopGMq93Pob/hjChimJU2GSOEb6gkMlLb2NiQLab2stcVvnhHW3+HpcpRyxy0E1HiUlFLC+KdrshYW3N+zxPxutUk18Pqd1e2S8yPytd/z1PZ+DMCi4awCSoxKNkVVIwy1DyfUaBo2/hqe8lehp4OqDkz5rXX/i71GtcLhf+/qeR45itRimI1NXVA553FzTsQLWaPcAvPslvlvPpaa1RTGp+iMaHpKcxuy3q3j0bbXyX5+KzjHnC7N0FLiUuz0DgfhQRgV+IdaQm9ncvuvUooUFl9nl6/xDatlZ12PYzTYVhzsxBJ6rWA7lZW2RrjuZ5Oi01mruxH/R5NX1k1bUSVFQ673nbs7l4c5ucss+/wBPRCitQguvua+Q6qI3kEAIAQAgGhQVAIQaAEBIKMFgWIJtQgqkSflZeiLWvyHKXGwukXiSyaNS5KqWzvHBzQw9sTnuM2Z+YjMOa7d7+h8stGotycsv6mHJLkkySAOHJ40KzXJxTs2z2yWfcUoc3qsbdu+YDUoJblwl+pdBdjgXNzM9rmbLGXRtq4fK4N3hFVJR1dPU0znOMMgewE7EHb6ea0btrz6npqpW1uv0f2PomgqaPFaSmxNkUbukYHMlyDM2/K+48F6sNs0pI+RshZTKVUsrD/n7nL/ipjH5DARhzZB0tebb6hgN3e/bzK06qe2GPqej4RR5l+/0j/c8gzEtbJI0Ode0TLese3wC8+McPj1PqG9/Z3XBvC+S1fiWsjjfrDUd69bT0KC3S7PJ1+u2rZA6jGMYp8Kp+s65t1YwdSexbbbY1RzI8vS6S7WW7Y/uecYniE1fUGaodcnZvJq8S66V0t0j7rR6OvS17If7Ne9y1JHWUlUAgBACAEBJCgqQEAIBoCQKxYJBQFjQgNdjDWSPjBe4ObvYrdTlcnj+JRhJpNmjlMrH2gc57ed10p57PAsU4y+B5IiV0ZINNdx30ujwY75QfycmVE90p9JEYha1r7rB+x01zc/mjgvDSwkx2IO4AWD57Nyi4/L6lkJy6uHUOu2y1zN9fHfR0OA8TYngIdHhdVlidq+GQZm+IHIqwtnX8ov0Wn1OHNcr35NfiNZUYziMtTXzPfI4XfIT6rRyt2cgO9N0py3SZnCiuteXBYR0vBWAnEKgYhUMIhZpCw8gF6Okp/PI5dfqlTDZHs6nG8apsLgAY4PkI9GwLouvjUsvs8rRaCzW2e3qzz+srZauZ00zy57t9fgvEsslbLdI+40+nr09fl1rCMRzrrDBvIFUEUAIAQAgBASVKCEBACAaAYUKWNCxZCupqBE3K3V559i2Qrzyzk1GpUFiPZqp3F7iTut+McHi2yc3llWUDb3oalHHRJjCDfUG+luaGxJ9mS25/bbstzWtpehtWX2SEB3DbeBv/wCLDebFS3yi+KNrW2uHdo2usJNPlm2ENv0IvZGx1wLEbAph9ExBPK4NhguFy4piDKKMdW4dO7/b/wB5rropc5Y9DVbaqq3Yz0fFsRpuHMJEULR0wGVjBprb5L1LrY1QPA01E9fqMv5fU8zqqiSomdLM7M9x1K8ScnN5kfaUVRpgoQWEU3WJ0AhRFACAFACAEAICSpkCAEISsoAQDYEGcEJ5xGC1u62whjlnBqNTt4Rr3SZidVsPLlPcyBu42GxVMcNkhHffQ8lM4KoouZFfs89rrXKRujDKJlrQ0jQ9iwTeTLbx0GcNItmZ2EI1kbto3yk6uII5G2oUUfoWdrxl8jhJcWSZc7jpAwjVzu3wHxW2MWujVnf/AEPUeGMOg4bwM1da4NkcC973Dn2L1qq1TDn9Tw9dfLU3Kqvo8/xvFpMXxGWqkJyk2jaeTeS8q612y3H0+h00dNUoL9TAzLUd6GCoZDBQyQIUEAIAQAoAQElTIEA0BIICxrAfWJA7uSnKNUrYropmZIGEgks19VbYSh+pw3Oz1fBhFpeb5XOOy28I4ZZk+iPRjYs581jlDZn0LGReybeSwczYodIta3SwbfLrqFrbybEsFgkGW17dxGhWtxNiksclL3RkXIy/yaVklJGEnBrPXuY8kgPVi67jyA1WyKbOWyyK6JRxhrw2QdJMTpAw31/kR8vetiWXhcmuMW3l8HfcJcMmJzcUxa3SAXYw7MXo6fTbfjl2cOt1qivLrMHjviYYlIKCjf8A00ZBc4e277Ln1eo3/BHo6PCtE6l51nzM5IHvXCe9FkwUNsWSCGZIIVDChkgQoIAQAoAQDWRkNAO6BDN8ptvZBLO14Nf09dGwkxPdG3cgZgPcs9mT5uWpsg/iRFuKZSMze24vso6wtcvQtGJQyD0rde1qw8tr5TctZW18f2F+cidoJBble6u1+oWog+iL62Fm5tfXTZZKLZhLUQiuTHkxGLXKD2WHIKqs55a2GeCH5yab1Iz3nl7+SqrwYfi5T4SGGNJBfMXu/ZEL/G391lwTEp+pucLwLEK0hsMJpYDu4nV3mdSt1ennZ7IrsrpXLOxwzDMH4ejM072vmA1e8rvhVXSvc8+3VWXPbX0aLiPjGWuaaWiJjh9pw0LvBcuo1Tl8MDp0mijB77OWcuH32XDg9mMmy1l1izfDJc1Q6YomAhsSJDRDIYUKgQoIAUAIUEBJZFBACAd9LHmqiPGOTVVERhkuyUtJ2IdZbEvofPamtwlyYk7Hy3MgzO/eN/us8s4J0RkVNp/5PHdlCZ9jX5El1ItZROcerHM89wsssP6DyfqzLhwesf6lDI4H/UcfpZVVzfoNkF2/uZ1Pw5XE3LYYPLVbFp7GN1MfU2EXDVJH1q+uv3A2WxaaP5mR6iK6WTNiqcBwpt4WNc4aXOqzTqr6RhKd8+uEYGIcavN2UjQ0X0ssJ6l+hrVUM/E8mgqMQqa9+aaQu7lyTnKXbO6mMfyoI43HcFasnoV1SZeyIqNnVCkvZHZYnVGvBYGoblEnZDLAWQuB2UAkAKAEKCoGgGqAQAhRWuqYsxKqgbUG+ZwPcqm0efqfD43ct4MQ4TO39Oe3is9/scD8ItXyWfuIUFc09WWM+IKyU0a34ZrF+aL/AHL44sSZtJH5ErLzcE/4vUvvaXB+LAWE7PeVfxDH/EXP6fcCMUd/m2jwBWPnsyXg9v1X7NlTqCqk1fWO8m/3U832Ni8Gn6z+xEYMw/qTyP8AMLF2MzXglf5ptlzMKpWci7xKxc2dMPCdND0yXNpomeqyywydcdLVDpEujFtkM/LQwxDNQJAIZYHZCiQAhAUAkAKEGhQVAIBoQFSggAFAO5QgXKuQF0yBpkEbqZAIAQAhQKASgBAMKjIXQCQZBACASgBCAoAQAgBUDQEiqQLIUAgBAI7IQbUA3ICPNCjKAQQEwEMWMgWVCK+ahkIoCTUAigEoUFSAUKJQgIBqAEAKgEB//9k=","data:image/jpeg;base64,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"]
    const sizeAvail = [6,7,8,9]

    const productDescription = `Introducing the Nike Red Casual Shoes, a perfect blend of style, comfort, and durability. These shoes are designed to cater to the needs of modern individuals who seek both fashion and functionality in their footwear. The vibrant red color adds a bold statement to your outfit, making you stand out in any crowd. Crafted with high-quality materials, these shoes ensure long-lasting wear and exceptional comfort throughout the day.

    The Nike Red Casual Shoes feature a cushioned insole that provides excellent support and reduces foot fatigue, making them ideal for daily wear. The breathable upper material keeps your feet cool and dry, while the sturdy outsole offers superior traction on various surfaces. Whether you're heading to work, running errands, or enjoying a casual day out, these shoes are your go-to choice for any occasion.

    With a sleek and modern design, the Nike Red Casual Shoes effortlessly complement a wide range of outfits, from jeans and t-shirts to casual dresses. The lace-up closure ensures a secure fit, while the padded collar and tongue add extra comfort. Experience the perfect combination of style and practicality with these versatile shoes that are sure to become a staple in your wardrobe. Don't miss out on the opportunity to elevate your footwear collection with the Nike Red Casual Shoes.`;

  const similarProducts = [
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
  ];

  const reviews = [
    {
      id: '1',
      name: 'Riya Sharma',
      images :  ["https://via.placeholder.com/80" , "https://via.placeholder.com/50" , "https://via.placeholder.com/20" , "https://via.placeholder.com/75" , "https://via.placeholder.com/150" , "https://via.placeholder.com/300"],
      rating: '4.0',
      comment: 'Super comfortable and stylish! Perfect for daily wear.',
      date: '7 Nov 2021',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: '2',
      name: 'Shivam Kaushal',
      images : ["https://via.placeholder.com/80" , "https://via.placeholder.com/50"],
      rating: '2.0',
      comment: 'Finishing is not proper!',
      date: '3 Aug 2021',
      image: 'https://via.placeholder.com/80',
    },
  ];
  const wordLimit = 50;
  const [isExpanded, setIsExpanded] = useState(false);
  const words = productDescription.split(' ');
  const shouldShowReadMore = words.length > wordLimit;
  const truncatedText = words.slice(0, wordLimit).join(' ');


  const handleInputChange = (key, value) => {
    setnewinfo((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <ScrollView style={styles.container}>
      {accessor === "seller" && (<View style={styles.performanceContainer}>
        <View style={styles.statsBox}>
          <Text style={styles.statValue}>4.6 L</Text>
          <Text style={styles.statLabel}>Inventory</Text>
          <Text style={styles.statLabel}>Restock | 1 Aug 2024</Text>
          </View>
        <View style={styles.statsBox}>
          <Text style={styles.statValue}>250 L</Text>
          <Text style={styles.statLabel}>Item Sold</Text>
          <Text style={styles.statLabel}>Dropping Trend</Text>
        </View>
      <View style={styles.statsBox}>
        <Text style={styles.statValue}>15</Text>
        <Text style={styles.statLabel}>Avg Delivery Days</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.statValue}>15</Text>
          <Text style={styles.statLabel}>Item Returned</Text>
          </View>
      </View>)}
      <View style={styles.productSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={true} style={{width : "100%" , height : 250}}>
          {image.map((item , index)=>{
            return (
              <View key={index}>
                <Image source={{uri : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}} style={styles.productImage} key={index}/>
              </View>)
          })}
        </ScrollView>
        <View style={{flexDirection : "row" , marginTop : 8 , justifyContent : 'flex-start'}}>
          {colorAvail.map((item)=>{
            return (
              <TouchableOpacity key={item} style={[{height : 30 , width : 30 ,backgroundColor : item , marginLeft : 3 , marginRight : 3} , item === color && {borderWidth : 2 , borderColor : "black"}]} onPress={()=> setColor(item)}></TouchableOpacity>
            )
          })}
        </View>
        <Text style={styles.productTitle}>Nike Red Casual Shoes</Text>
        <Text style={styles.productRating}>⭐ 4.3 (210)</Text>
        <Text style={{fontSize : 16 , fontWeight : "500" , marginVertical : 6}}>NIke</Text>
        <Text style={styles.productDescription}>
          Stay comfy and stylish with the Puma Red Casual Shoes! Designed for maximum comfort and durability. These shoes
          are perfect for casual outings and everyday wear.
        </Text>
        <Text style={{fontSize : 20 , fontWeight : "500"}}>SIze</Text>
        <View style={styles.sizeSelector}>
          {sizeAvail.map((item)=>{
              return (
                <TouchableOpacity style={[styles.sizeBox , item === size && styles.choosedSize]} onPress={()=>{setsize(item)}} key={item}>
                    <Text style={styles.sizeText}>{item}</Text>
                </TouchableOpacity>
              )
          })}
        </View>
        <View style={styles.priceSection}>
          <View style={{flexDirection : "row" , justifyContent : "space-between" , width : "100%" , alignItems : "center"}}>
            <View style={{flexDirection : "row" , alignItems : "center" , justifyContent : "center" , width : "48%"}}>
            <Text style={styles.price}>₹ 5555</Text>
            </View>
          {accessor === "seller" && (
            <TouchableOpacity style={{height : 50 , backgroundColor : "black" , justifyContent : "center" , alignItems : "center", width : "48%"}} onPress={()=>setModalVisible1(true)}>
              <Text style={{color : "#fff"}}>Edit Price</Text>
            </TouchableOpacity>
          )}
          </View>
          <View style={{flexDirection : "row" , alignItems : "center" , justifyContent :"space-between" , width : "100%" }}>
          <View style={styles.quantitySelector}>
            <TouchableOpacity style={styles.quantityButton} onPress={()=>{if (quantity >=2) setquantity(quantity-1)}}>
              {/* <Text style={{color : "#fff"}}>-</Text> */}
              <FontAwesome name="minus" size={13} color="#fff"/>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={()=>{setquantity(quantity+1)}}>
              {/* <Text style={{color : "#fff"}}>+</Text> */}
              <FontAwesome name="plus" size={13} color="#fff"/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Go to Bag</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>

    <View style ={{padding : 20}}>
      <Text style={styles.text}>
        {isExpanded || !shouldShowReadMore ? productDescription : `${truncatedText}...`}
      </Text>
      {shouldShowReadMore && (
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
          <Text style={styles.readMore}>
            {isExpanded ? 'Read Less' : 'Read More'}
          </Text>
        </TouchableOpacity>
      )}
      {accessor === "seller" && (
        <TouchableOpacity style={{height : 50 , backgroundColor : "black" , justifyContent : "center" , alignItems : "center", width : "50%" , marginTop : 10}} onPress={()=>setModalVisible2(true)}>
          <Text style={{color : "#fff"}}>Edit Info</Text>
        </TouchableOpacity>
      )}
    </View>

      <View style={styles.similarProductsSection}>
        <Text style={styles.sectionTitle}>Similar Top Picks</Text>
        {similarProducts.map((product) => (
          <ProductCard {...product} key={product.id} accessor_name='customer'/>
        ))}
      </View>

      <View style={styles.reviewsSection}>
        <Text style={styles.sectionTitle}>Customer Reviews</Text>
        <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginVertical: 2 , marginBottom : 2 }} />
        {reviews.map((review) => (
          <Reviewcard {...review} key={review.id} />
        ))}
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.sectionTitle}>FAQs</Text>
        <Text style={styles.faqQuestion}>1. Do sole has the good finish?</Text>
        <Text style={styles.faqAnswer}>
          Yes, the sole is crafted with a nice inner material which makes it comfy and stylish.
        </Text>
        <Text style={styles.faqQuestion}>2. Can I customize it?</Text>
        <Text style={styles.faqAnswer}>
          Yes, you can visit the store to customize your shoes.
        </Text>
        <TextInput style={styles.queryInput} placeholder="Have a query? Ask here related to the product" />
      </View>
      <Modal
        visible={isModalVisible1}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible1(false)} // Close the modal on back press
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
              <Text style={{fontSize : 18}}>Enter</Text>
              <Text style={{fontSize : 17}}>New Price</Text>
            <TextInput placeholder="Enter New Price" style={{height : 50 , borderWidth : 1 , width : "97%" , marginTop : 25}} onChangeText={(text)=> setnewprice(text)}/>
            <TouchableOpacity style={{flexDirection : "row" , justifyContent : "center" , alignItems : "center" , width : "97%" , borderRadius : 15 , marginTop : 25, backgroundColor : "#ff005c" , height : 50}} onPress={()=>{console.log(newprice) 
              setModalVisible1(false)}}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
      visible={isModalVisible2}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible2(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent2}>
          <Text style={{fontSize : 18}}>Edit Product Info</Text>
            <TextInput placeholder="Product Brief in %0 words" style={{height : 50 , borderWidth : 1 , width : "97%" , marginTop : 25}} onChangeText={(text)=> handleInputChange("brief" , text)}/>
            <TextInput placeholder="Select Available Size" style={{height : 50 , borderWidth : 1 , width : "97%" , marginTop : 25}} onChangeText={(text)=> handleInputChange("size",text)}/>
            <TextInput placeholder="Shipping Info" style={{height : 50 , borderWidth : 1 , width : "97%" , marginTop : 25}} onChangeText={(text)=> handleInputChange("shipping",text)}/>
            <TextInput placeholder="Additional info" style={{height : 50 , borderWidth : 1 , width : "97%" , marginTop : 25}} onChangeText={(text)=> handleInputChange("additional",text)}/>
            <TouchableOpacity style={{flexDirection : "row" , justifyContent : "center" , alignItems : "center" , width : "97%" , borderRadius : 15 , marginTop : 25, backgroundColor : "#ff005c" , height : 50}} onPress={()=>{console.log(newinfo)
              setModalVisible2(false)
            }}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  productSection: { padding: 20 , width : "100%" },
  productImage: { width: '100%', height: 250, resizeMode: 'contain' },
  productTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  productRating: { fontSize: 14, color: '#666' },
  productDescription: { fontSize: 14, color: '#666', marginVertical: 10 },
  sizeSelector: { flexDirection: 'row', marginVertical: 10 },
  sizeBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  sizeText: { fontSize: 14 },
  priceSection: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  price: { fontSize: 18, fontWeight: 'bold' },
  quantitySelector: { flexDirection: 'row', alignItems: 'center' , width : "48%" , marginTop : 20 , backgroundColor : "#000" , justifyContent : "space-evenly" , height : 50},
  quantityButton: { padding: 10 },
  quantity: { paddingHorizontal: 10 , color : "#fff"},
  buyButton: { backgroundColor: '#ff005c', padding: 15, borderRadius: 5, marginTop: 20 , width : "48%" , height : 50},
  buyButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  similarProductsSection: { padding: 20 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 2 },
  similarProduct: { flexDirection: 'row', marginBottom: 20 },
  similarProductImage: { width: 80, height: 80, marginRight: 10 },
  similarProductInfo: { flex: 1 },
  similarProductName: { fontSize: 16, fontWeight: 'bold' },
  similarProductBrand: { fontSize: 14, color: '#666' },
  similarProductPrice: { fontSize: 16, color: '#000' },
  similarProductRating: { fontSize: 14, color: '#666' },
  similarProductButtons: { flexDirection: 'row', marginTop: 10 },
  viewProductButton: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginRight: 10 },
  viewProductButtonText: { fontSize: 12 },
  addToBagButton: { backgroundColor: '#6c63ff', padding: 10, borderRadius: 5 },
  addToBagButtonText: { color: '#fff', fontSize: 12 },
  reviewsSection: { padding: 20 },
  review: { flexDirection: 'row', marginBottom: 20 },
  reviewImage: { width: 50, height: 50, marginRight: 10, borderRadius: 25 },
  reviewContent: { flex: 1 },
  reviewName: { fontSize: 14, fontWeight: 'bold' },
  reviewRating: { fontSize: 12, color: '#666' },
  reviewComment: { fontSize: 12, color: '#666', marginVertical: 5 },
  reviewDate: { fontSize: 12, color: '#999' },
  faqSection: { padding: 20 },
  faqQuestion: { fontSize: 14, fontWeight: 'bold', marginVertical: 5 },
  faqAnswer: { fontSize: 14, color: '#666', marginBottom: 10 },
  queryInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginTop: 10 },
  choosedSize : {
      backgroundColor : "#ff005c"
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  readMore: {
    fontSize: 14,
    color: '#007BFF',
    marginTop: 5,
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
    height: '30%',
    flexDirection : "column",
  },
  modalContent2: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    height: '55%',
    flexDirection : "column",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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

export default ProductDetails;
