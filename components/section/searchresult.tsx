import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ProductCard from '../cards/productshowsmall';
import axios from 'axios';

interface Product {
    id: number;
    productImage: string;
    productName: string;
    productDescription: string;
    productBrand: string;
    productRating: number;
    productReviewCount: number;
    productPrice: number;
}

interface Props {
    searchfor: string;
}

const Searchresult = ({ searchfor }: Props) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/products/search?query=${searchfor}`);
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        if (searchfor) {
            fetchProducts();
        }
    }, [searchfor]);

    return (
        <ScrollView style={{ flex: 1 }}>
            {products.map((item) => (
                <ProductCard {...item} accessor_name="customer" key={item.id} />
            ))}
        </ScrollView>
    );
};

export default Searchresult;

const styles = StyleSheet.create({});