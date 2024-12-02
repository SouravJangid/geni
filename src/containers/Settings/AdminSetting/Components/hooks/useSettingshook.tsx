import { useState } from 'react';

export const useSettings = () => {
  const [selectedSection, setSelectedSection] = useState<string>('profile');

  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
  };

  return {
    selectedSection,
    handleSectionSelect,
  };
};
