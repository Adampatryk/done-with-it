import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Card from "../components/Card";
import colours from "../config/colours";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import useApi from "../hooks/useApi";

function ListingsScreen({ props }) {
  const { data: listings, error, loading, request: loadListings } = useApi(
    listingsApi.getListings
  );

  useEffect(() => {
    loadListings();
  }, []);

  const navigator = useNavigation();
  return (
    <>
      <ActivityIndicator animating={loading} size="large" color="red" />
      <Screen style={styles.screen}>
        {error && (
          <>
            <AppText>Couldn't retrieve listings.</AppText>
            <AppButton onPress={loadListings}>Retry</AppButton>
          </>
        )}
        {/* <ActivityIndicator visible={loading} /> */}
        <FlatList
          data={listings}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() =>
                navigator.navigate(routes.LISTING_DETAILS, {
                  listingId: item.id,
                  title: item.title,
                  price: item.price,
                  images: item.images,
                  userId: item.userId,
                })
              }
            >
              <Card
                title={item.title}
                subTitle={item.price}
                imageUrl={item.images[0].url}
                thumbnailUrl={item.images[0].thumbnailUrl}
              />
            </TouchableWithoutFeedback>
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 50,
    backgroundColor: colours.light,
  },
});

export default ListingsScreen;
