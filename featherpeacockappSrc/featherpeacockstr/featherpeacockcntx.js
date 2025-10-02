import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { featherpeacockrewards } from '../featherpeacockcnsts/featherpeacockrewards';

export const StoreContext = createContext();

export const useFeatherPeacockCntx = () => {
  return useContext(StoreContext);
};

export const FeatherPeacockAppContextProvider = ({ children }) => {
  const [savedPeacockTails, setSavedPeacockTails] = useState([]);
  const [featherRewards, setFeatherRewards] = useState(featherpeacockrewards);

  useEffect(() => {
    (async () => {
      const jsonValue = await AsyncStorage.getItem(
        'FeatherPeacockVibesSavedHumor',
      );
      setSavedPeacockTails(jsonValue != null ? JSON.parse(jsonValue) : []);
    })();
  }, []);

  const saveDailyFeatherTl = async data => {
    try {
      const stored = await AsyncStorage.getItem(
        'FeatherPeacockVibesSavedHumor',
      );
      let tips = stored !== null ? JSON.parse(stored) : [];

      const updatedTips = [...tips, data];

      await AsyncStorage.setItem(
        'FeatherPeacockVibesSavedHumor',
        JSON.stringify(updatedTips),
      );
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getDailyFeatherTl = async () => {
    try {
      const savedData = await AsyncStorage.getItem(
        'FeatherPeacockVibesSavedHumor',
      );
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setSavedPeacockTails(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDailyFeatherTl = async id => {
    const jsonValue = await AsyncStorage.getItem(
      'FeatherPeacockVibesSavedHumor',
    );
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    const filtered = data.filter(item => item.id !== id);

    setSavedPeacockTails(filtered);
    await AsyncStorage.setItem(
      'FeatherPeacockVibesSavedHumor',
      JSON.stringify(filtered),
    );
  };

  // feather rewards

  const saveFeatherRewards = async featherData => {
    try {
      await AsyncStorage.setItem(
        'FeatherPeacockVibesSavedReward',
        JSON.stringify(featherData),
      );
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getFeatherRewards = async () => {
    try {
      const savedData = await AsyncStorage.getItem(
        'FeatherPeacockVibesSavedReward',
      );
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setFeatherRewards(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    saveDailyFeatherTl,
    getDailyFeatherTl,
    deleteDailyFeatherTl,
    savedPeacockTails,
    featherRewards,
    saveFeatherRewards,
    getFeatherRewards,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
