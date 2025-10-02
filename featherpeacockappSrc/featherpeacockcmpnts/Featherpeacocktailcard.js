import LinearGradient from 'react-native-linear-gradient';
import { useFeatherPeacockCntx } from '../featherpeacockstr/featherpeacockcntx';
import {
  Alert,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { featherpeacocktails } from '../featherpeacockcnsts/featherpeacocktails';

const Featherpeacocktailcard = ({
  randomFeatherTl,
  currTailIdx,
  setIsVsblFeatherPopUpShare,
  isVsblFeatherPopUpShare,
}) => {
  const {
    saveDailyFeatherTl,
    getDailyFeatherTl,
    deleteDailyFeatherTl,
    savedPeacockTails,
    saveFeatherRewards,
    featherRewards,
  } = useFeatherPeacockCntx();

  const [isFavorite, setIsFavorite] = useState(false);
  const [isPopUpShown, setIsPopUpShown] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getDailyFeatherTl();
    }, [isFavorite]),
  );

  useEffect(() => {
    const currentJoke = featherpeacocktails[currTailIdx];
    const isSaved = savedPeacockTails.some(
      item => item.feathertail === currentJoke,
    );
    setIsFavorite(isSaved);
  }, [currTailIdx, savedPeacockTails]);

  const getFeatherDt = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const toggleSavedTails = selectedTail => {
    const existing = savedPeacockTails.find(
      item => item.feathertail === selectedTail,
    );

    if (existing) {
      deleteDailyFeatherTl(existing.id);
      setIsFavorite(false);
    } else {
      const newTail = {
        id: Date.now(),
        feathercat: `TAIL OF HUMOR:`,
        featherdate: getFeatherDt(),
        feathertail: selectedTail,
        featherfav: true,
      };
      saveDailyFeatherTl(newTail);
      setIsFavorite(true);
    }
  };

  const shareFeatherPeacockTl = async () => {
    try {
      await Share.share({
        message: featherpeacocktails[currTailIdx].toUpperCase(),
      });

      handleOpenFeatherTailDiff();
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleOpenFeatherTailDiff = () => {
    if (isPopUpShown) return;
    const isUnlockedTail = featherRewards.map(reward => {
      if (reward.id === 4 && !reward.featherunlocked) {
        setIsVsblFeatherPopUpShare(true);
        setIsPopUpShown(true);
        setTimeout(() => {
          setIsVsblFeatherPopUpShare(false);
        }, 5000);

        return { ...reward, featherunlocked: true };
      }
      return reward;
    });

    saveFeatherRewards(isUnlockedTail);
  };

  return (
    <View style={featherstyles.mdcnt}>
      <LinearGradient
        colors={['#FFCB45', '#ECA12A']}
        style={featherstyles.mdgrcnt}
      >
        <View style={featherstyles.md}>
          <Text style={featherstyles.mdtailtxt}>
            {featherpeacocktails[currTailIdx].toUpperCase()}
          </Text>
        </View>
      </LinearGradient>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          bottom: -40,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={shareFeatherPeacockTl}
          style={{ left: 15 }}
        >
          <Image source={require('../../assets/images/feathergrshr.png')} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => toggleSavedTails(featherpeacocktails[currTailIdx])}
        >
          {isFavorite ? (
            <Image source={require('../../assets/images/feathersvdtl.png')} />
          ) : (
            <Image source={require('../../assets/images/feathersvbttl.png')} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const featherstyles = StyleSheet.create({
  shdw: {
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
  },
  mdgrcnt: {
    width: '100%',
    borderRadius: 22,
  },
  md: {
    paddingHorizontal: 19,
    paddingVertical: 28,
    paddingBottom: 50,
  },
  mdttl: {
    fontFamily: 'Rowdies-Bold',
    fontSize: 20,
    color: '#2F1300',
    textAlign: 'center',
  },
  mdtailtxt: {
    fontFamily: 'Rowdies-Bold',
    fontSize: 16,
    color: '#2F1300',
    textAlign: 'center',
  },
});

export default Featherpeacocktailcard;
