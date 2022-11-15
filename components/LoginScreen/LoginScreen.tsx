import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Input, useTheme } from "@rneui/themed";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { required } from "../../lib/form-rules";
import { AuthStackParamList } from "../../lib/props";
import AuthFormContainer from "../AuthFormContainer";

type FormData = { email: string; password: string };
type Props = NativeStackScreenProps<AuthStackParamList, "login">;

const LoginScreen = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const { control, handleSubmit } = useForm<FormData>({ mode: "onBlur" });

  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data));
  };

  return (
    <AuthFormContainer title="Log In" subtitle="Log in to an existing account">
      <Controller
        control={control}
        name="email"
        rules={{ required }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            placeholder="Email"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            errorStyle={{ color: theme.colors.error }}
            errorMessage={error?.message}
            renderErrorMessage={true}
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
          <Input
            placeholder="Password"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            secureTextEntry
            errorStyle={{ color: theme.colors.error }}
            errorMessage={error?.message}
            renderErrorMessage={true}
          />
        )}
      />
      <Button title="Log In" onPress={handleSubmit(onSubmit)} />
      <Button
        title="... or register"
        type="clear"
        onPress={() => navigation.navigate("register")}
      />
    </AuthFormContainer>
  );
};

export default LoginScreen;
