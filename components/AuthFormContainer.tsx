import React, { ReactNode } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";

type Props = { children: ReactNode; title: string; subtitle: string };

const AuthFormContainer = ({ children, title, subtitle }: Props) => {
  const theme = useTheme();

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
          <View
            style={{
              alignItems: "stretch",
            }}
          >
            <Text
              variant="headlineMedium"
              style={{ alignSelf: "center", color: theme.colors.primary }}
            >
              {title}
            </Text>
            <Divider />
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AuthFormContainer;
