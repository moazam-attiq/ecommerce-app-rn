import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { useToast } from 'react-native-toast-notifications';

function LandingPage() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const Toast = useToast();

  useEffect(() => {
    const getProducts = async () => {
      const productOutput = await fetch('https://dummyjson.com/products/?limit=50');
      const productData = await productOutput.json();
      console.log(productData.products);
      setProducts(productData.products);
    };
    getProducts();
  }, []);

  const handleAddToCart = productName => {
    Toast.show(`${productName} has been added to your cart.`, {
        type: 'success',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
        offset: 30,
      });
  };

  return (
    <View style={styles.container}>
      <Header title='Home' showDrawer={true} showSearch={true}/>
      <View style={styles.scrollContainer}>
        <FlatList
          data={products}
          renderItem={({item}) => (
            <ProductCard
              name={item.title}
              price={item.price}
              description={item.description}
              imageUri={item.images[0]}
              onAddToCart={() => handleAddToCart(item.title)}
            />
          )}
          keyExtractor={item =>  item.id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 15,
    paddingBottom: 30,
  },
});

export default LandingPage;
