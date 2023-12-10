import React, { createContext, useContext, useState } from "react";

// Create a new context with an initial value for the 'group' state
const GroupContext = createContext({
  groups: null,
  setGroups: () => {},
  selectedGroup: null,
  setSelectedGroup: () => {},
});

// Custom hook to use the GroupContext values
export const useGroupContext = () => useContext(GroupContext);

// Context Provider component
interface GroupProviderProps {
  children: React.ReactNode;
}

export const GroupProvider: React.FC<GroupProviderProps> = ({ children }) => {
  const [groups, setGroups] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  return (
    <GroupContext.Provider value={{ groups, setGroups, selectedGroup, setSelectedGroup }}>
      {children}
    </GroupContext.Provider>
  );
};
