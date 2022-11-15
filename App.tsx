import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createTheme, ThemeProvider } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot, useRecoilValue } from "recoil";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import RegisterScreen from "./components/RegisterScreen/RegisterScreen";
import { AuthStackParamList, MainStackParamList } from "./lib/props";
import { userIdState } from "./state/user";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();

const theme = createTheme({
  lightColors: { primary: "#003049" },
  components: { Button: { radius: 5 } },
});

const Navigator = () => {
  const userId = useRecoilValue(userIdState);

  return (
    <NavigationContainer>
      {userId ? (
        <MainStack.Navigator initialRouteName="home">
          <MainStack.Screen
            name="home"
            options={{ title: "Home" }}
            component={HomeScreen}
          />
        </MainStack.Navigator>
      ) : (
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
      )}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <Navigator />
        </ThemeProvider>
      </SafeAreaProvider>
    </RecoilRoot>
  );
}
