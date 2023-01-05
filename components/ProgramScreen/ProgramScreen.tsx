import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, Text } from "react-native";
import { MainStackParamList } from "../../lib/props";
import { getProgramForId } from "../../services/program";

type Props = NativeStackScreenProps<MainStackParamList, "program">;

const ProgramScreen = ({ route }: Props) => {
  const programId = route.params.programId;

  return (
    <ScrollView>
      <Text>Welcome</Text>
      <Text>ProgramId: {programId}</Text>
      <Text>{JSON.stringify(getProgramForId(programId))}</Text>
    </ScrollView>
  );
};

export default ProgramScreen;
