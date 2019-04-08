import React from 'react';
import { View, ListView, FlatList, StyleSheet, Text } from 'react-native';
import CustomRow from '../utils/CustomRow';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

// TODO: use swipe-list for more functions using react-native-swipe-list-view
// to replace FlatList
// Also, TouchableOpacity for touch

const FloatFlatList = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
                data={itemList}
                renderItem={({ item }) => <CustomRow
                    title={item.title}
                    description={item.overview}
                    image_url={item.image_url}
                />}
            />
    </View>
);

export default FloatFlatList;
