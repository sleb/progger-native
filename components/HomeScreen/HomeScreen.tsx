import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { FAB, IconButton, List, useTheme } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { MainStackParamList } from "../../lib/props";
import { Program } from "../../model/program";
import {
  deleteProgram,
  subscribeToProgramsForUser,
} from "../../services/program";
import { userIdState } from "../../state/user";

type Props = NativeStackScreenProps<MainStackParamList, "home">;

const HomeScreen = ({ navigation }: Props) => {
  const userId = useRecoilValue(userIdState);
  const theme = useTheme();
  const [programList, setProgramList] = useState<Program[]>([]);
  const [selectedSet, setSelectedSet] = useState<Set<string>>(new Set());

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
              style={{
                borderBottomColor: theme.colors.surfaceVariant,
                borderBottomWidth: 1,
              }}
              left={() => (
                <IconButton
                  mode="contained"
                  size={32}
                  icon="note-text-outline"
                  selected={selectedSet.has(p.id)}
                  onPress={() => {
                    if (selectedSet.has(p.id)) {
                      setSelectedSet(
                        new Set([...selectedSet].filter((id) => id !== p.id))
                      );
                    } else {
                      setSelectedSet(new Set([p.id, ...selectedSet]));
                    }
                  }}
                />
              )}
              right={() => (
                <IconButton
                  icon="trash-can-outline"
                  iconColor={theme.colors.primary}
                  size={32}
                  onPress={() => deleteProgram(p.id)}
                />
              )}
              onPress={() =>
                navigation.navigate("program", { programId: p.id })
              }
            />
          ))}
        </ScrollView>
      </SafeAreaView>
      <FAB
        icon="plus"
        onPress={() => navigation.navigate("new")}
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
