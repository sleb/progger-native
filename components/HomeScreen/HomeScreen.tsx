import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { FAB, List } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { MainStackParamList } from "../../lib/props";
import { Program } from "../../model/program";
import {
  createProgram,
  subscribeToProgramsForUser,
} from "../../services/program";
import { userIdState } from "../../state/user";

type Props = NativeStackScreenProps<MainStackParamList, "home">;

const HomeScreen = ({ navigation }: Props) => {
  const userId = useRecoilValue(userIdState);
  const [programList, setProgramList] = useState<Program[]>([]);

  useEffect(() => {
    if (userId) {
      return subscribeToProgramsForUser(userId, setProgramList, console.error);
    }
  }, [userId]);

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          {programList.map((p, i) => (
            <List.Item
              key={i}
              title={p.title}
              description="#sacrament, #program"
              onPress={() =>
                navigation.navigate("program", { programId: p.id })
              }
            />
          ))}
        </ScrollView>
      </SafeAreaView>
      <FAB
        icon="plus"
        onPress={() =>
          createProgram({ create: new Date(), title: "blah blah" })
        }
        style={{
          position: "absolute",
          margin: 50,
          right: 0,
          bottom: 0,
        }}
      />
    </>
  );
};

export default HomeScreen;
