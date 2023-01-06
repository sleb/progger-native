import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  IconButton,
  Provider as PaperProvider,
  useTheme,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot, useRecoilValue } from "recoil";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import NewProgram from "./components/NewProgram/NewProgram";
import ProgramScreen from "./components/ProgramScreen/ProgramScreen";
import RegisterScreen from "./components/RegisterScreen/RegisterScreen";
import { useAuth } from "./hooks/auth";
import { AuthStackParamList, MainStackParamList } from "./lib/props";
import { userIdState } from "./state/user";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();

const Navigator = () => {
  const userId = useRecoilValue(userIdState);
  const { logOut } = useAuth();
  const theme = useTheme();

  return (
    <NavigationContainer>
      {userId ? (
        <MainStack.Navigator
          initialRouteName="home"
          screenOptions={{
            headerTintColor: theme.colors.primary,
            headerRight: () => (
              <IconButton
                icon="logout-variant"
                onPress={logOut}
                iconColor={theme.colors.primary}
              />
            ),
          }}
        >
          <MainStack.Screen
            name="home"
            options={{ title: "Home" }}
            component={HomeScreen}
          />
          <MainStack.Screen
            name="program"
            options={{ title: "Program" }}
            component={ProgramScreen}
          />
          <MainStack.Screen
            name="new"
            options={{ title: "New Program" }}
            component={NewProgram}
          />
        </MainStack.Navigator>
      ) : (
        <AuthStack.Navigator
          initialRouteName="login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <AuthStack.Screen name="login" component={LoginScreen} />
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

const App = () => {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <PaperProvider>
          <Navigator />
        </PaperProvider>
      </SafeAreaProvider>
    </RecoilRoot>
  );
};

export default App;
