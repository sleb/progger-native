import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StatusBar } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useAuth } from "../../hooks/auth";
import { required } from "../../lib/form-rules";
import { AuthStackParamList } from "../../lib/props";
import AuthFormContainer from "../AuthFormContainer";

type Props = NativeStackScreenProps<AuthStackParamList, "register">;
type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterScreen = ({ navigation }: Props) => {
  const { control, handleSubmit } = useForm<FormData>({ mode: "onBlur" });
  const { register } = useAuth();

  const onSubmit = async ({ email, password }: FormData) => {
    try {
      await register(email, password);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AuthFormContainer title="Register" subtitle="Create a new account">
        <Controller
          control={control}
          name="email"
          rules={{ required }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <TextInput
              style={{ marginTop: 10 }}
              label="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={!!error}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <TextInput
              style={{ marginTop: 10 }}
              label="Password"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              secureTextEntry
              error={!!error}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          rules={{ required }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <TextInput
              style={{ marginTop: 10 }}
              label="Confirm Password"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              secureTextEntry
              error={!!error}
            />
          )}
        />
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={{ marginTop: 10 }}
        >
          Register
        </Button>
        <Button mode="text" onPress={() => navigation.navigate("login")}>
          ... or log in
        </Button>
      </AuthFormContainer>
    </>
  );
};

export default RegisterScreen;
