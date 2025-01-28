import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useShareButton } from '@/context/sharebutton';

interface ShareProps {
  color: string;
  data: any;
}

const Share: React.FC<ShareProps> = ({ color, data }) => {
  const { toggleShared } = useShareButton();

  return (
    <TouchableOpacity onPress={() => toggleShared(data)}>
      <FontAwesome name="share-alt" size={24} color={color} />
    </TouchableOpacity>
  );
};

export default Share;

const styles = StyleSheet.create({});
