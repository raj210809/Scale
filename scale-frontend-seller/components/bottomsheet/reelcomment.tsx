import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import BottomSheet,{BottomSheetView} from '@gorhom/bottom-sheet'
import { useRef } from 'react'
import FilterMenu from '@/app/components/filtermenu'
import Reelcomment from '../section/reelcomment'

interface props {
    onClose : () => void , 
    studentid : string
}

const Reelcommentsheet : React.FC<props> = ({onClose}) => {

    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleSheetChange = useCallback((index) => {
        console.log('Sheet position changed to index:', index);
      }, []);


    const snapPoints = ['60%'];

  return (
    <BottomSheet
      enablePanDownToClose
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      onClose={onClose}
    >
        <BottomSheetView style={{flex : 1}}>
                <Reelcomment/>
        </BottomSheetView>
    </BottomSheet>
  )
}

export default Reelcommentsheet

const styles = StyleSheet.create({})