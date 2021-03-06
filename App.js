import React, { useState } from "react";
import { StyleSheet } from "react-native";
import MainNavigator from "./app/navigation/MainNavigator";
import { AppLoading } from "expo";

import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./app/navigation/rootNavigation";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState();

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer ref={navigationRef}>
        {!user ? <AuthNavigator /> : <MainNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
