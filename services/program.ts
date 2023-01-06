import { Program, ProgramData } from "../model/program";

export const getProgramsForUser = (id: string): Program[] => {
  return idToFakePrograms[id] || [];
};

export const subscribeToProgramsForUser = (
  id: string,
  cb: (programs: Program[]) => void,
  error: (e: Error) => void
): (() => void) => {
  callbacks.push(cb);
  fireCallbacks();
  return () => {
    console.log("unsubscribed subscribeToProgramsForUser");
  };
};

export const deleteProgram = async (id: string): Promise<void> => {
  const index = fakePrograms.findIndex((p) => p.id === id);
  if (index >= 0) {
    fakePrograms.splice(index, 1);
    fireCallbacks();
  }
};

export const getProgramForId = (id: string): Program | undefined => {
  return fakePrograms.find((p) => p.id === id);
};

export const createProgram = async (
  programData: ProgramData
): Promise<void> => {
  fakePrograms.push({ id: `${fakePrograms.length}`, ...programData });
  fireCallbacks();
};

const callbacks: ((programs: Program[]) => void)[] = [];
const fireCallbacks = () => {
  for (const callback of callbacks) {
    callback([...fakePrograms]);
  }
};

const fakePrograms: Program[] = [
  { id: "22", create: new Date(1), title: "Sacrament 2/23" },
  { id: "443", create: new Date(0), title: "Sacrament 3/22" },
];

const idToFakePrograms: Record<string, Program[]> = {
  "1": fakePrograms,
};
