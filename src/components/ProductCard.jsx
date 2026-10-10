import React from 'react';
import {Pressable, Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProductCard({
  name = 'Product Name',
  price = '$0',
  description = 'No description available',
  imageUri = null,
  onAddToCart = () => {},
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.outerContainer}>
      <View style={styles.itemContainer}>
        <View style={styles.itemImageContainer}>
          <Image
            style={styles.itemImage}
            source={
              imageUri ? {uri: imageUri} : require('../images/productImage.png')
            }
            resizeMode="cover"
          />
        </View>
        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionSubContainer}>
            <Text style={styles.nameText} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.priceText}>${price}</Text>
          </View>
          <Text style={styles.descriptionText} numberOfLines={2}>
            {description}
          </Text>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={onAddToCart}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Pressable onPress={() => {navigation.replace('Reviews')}}>
      <Text style={styles.reviewText}>Give us a rating</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    height: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  itemContainer: {
    overflow: 'hidden',
    flexDirection: 'row',
    height: 150,
  },
  itemImageContainer: {
    padding: 6,
    width: 120,
    height: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    borderBottomLeftRadius: 0,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    borderBottomLeftRadius: 0,
  },
  descriptionContainer: {
    padding: 15,
    flex: 1,
    justifyContent: 'space-between',
  },
  descriptionSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    marginRight: 10,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  descriptionText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 5,
  },
  addToCartButton: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 0,
  },
  addToCartText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  reviewText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    padding: 10,
    letterSpacing: 0.5,
    borderTopWidth: 0.5,
    borderTopColor: 'grey',
    
  }
});
