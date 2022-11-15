import { Button } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { useAuth } from "../../hooks/auth";

type Props = {};

const HomeScreen = (props: Props) => {
  const { logOut } = useAuth();

  return (
    <View>
      <Button title="Log Out" onPress={() => logOut()} />
    </View>
  );
};

export default HomeScreen;
