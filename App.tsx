import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createTheme, ThemeProvider } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import RegisterScreen from "./components/RegisterScreen/RegisterScreen";
import { AuthStackParamList } from "./lib/props";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const theme = createTheme({
  lightColors: { primary: "#003049" },
  components: { Button: { radius: 5 } },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <AuthStack.Navigator initialRouteName="login">
            <AuthStack.Screen
              name="login"
              options={{ title: "Log In" }}
              component={LoginScreen}
            />
            <AuthStack.Screen
              name="register"
              options={{ title: "Register" }}
              component={RegisterScreen}
            />
          </AuthStack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
