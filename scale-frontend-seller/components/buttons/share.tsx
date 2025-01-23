import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'
import SharePage from '../bottomsheet/sharepage'
import { useShareButton } from '@/context/sharebutton'


const Share = () => {

    const {toggleShared , isShared} = useShareButton()

  return (
    <>
    <TouchableOpacity onPress={toggleShared}>
        <FontAwesome name="share-alt" size={24} color="black" />
    </TouchableOpacity>
    </>
)}
export default Share

const styles = StyleSheet.create({})