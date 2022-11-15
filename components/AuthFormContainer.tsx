import { Divider } from "@rneui/base";
import { Text } from "@rneui/themed";
import React, { ReactNode } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Props = { children: ReactNode; title: string; subtitle: string };

const AuthFormContainer = ({ children, title, subtitle }: Props) => {
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      behavior="padding"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            width: "75%",
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 20,
            shadowOffset: {
              width: 5,
              height: 5,
            },
            shadowOpacity: 0.2,
            shadowRadius: 5,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text h3>{title}</Text>
            <Divider
              style={{ width: "80%", marginTop: 10, marginBottom: 5 }}
              subHeader={subtitle}
              subHeaderStyle={{ marginBottom: 10 }}
            />
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AuthFormContainer;
