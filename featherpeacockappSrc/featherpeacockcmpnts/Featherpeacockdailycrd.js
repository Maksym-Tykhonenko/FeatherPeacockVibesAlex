import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import { useFeatherPeacockCntx } from '../featherpeacockstr/featherpeacockcntx';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert,
  Image,
  Modal,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';

const Featherpeacockdailycrd = ({
  showFeatherPeacockTail,
  setShowFeatherPeacockTail,
  randomFeatherTl,
  handleFeatherUnlockRew,
}) => {
  const {
    saveDailyFeatherTl,
    getDailyFeatherTl,
    deleteDailyFeatherTl,
    savedPeacockTails,
  } = useFeatherPeacockCntx();
  const [featherButtonColor, setFeatherButtonColor] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getDailyFeatherTl();
      if (Platform.OS === 'android') Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, [isFavorite]),
  );

  useFocusEffect(
    useCallback(() => {
      getDailyFeatherTl();
      renderSavedTails(randomFeatherTl);
    }, []),
  );

  useEffect(() => {
    renderSavedTails(randomFeatherTl);
  }, [featherButtonColor]);

  const getFeatherDt = () => {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    const currentJoke = randomFeatherTl;
    const isSaved = savedPeacockTails.some(
      item => item.feathertail === currentJoke,
    );
    setIsFavorite(isSaved);
  }, [savedPeacockTails]);

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
        feathercat: `TODAY'S FEATHER:`,
        featherdate: getFeatherDt(),
        feathertail: randomFeatherTl,
      };
      saveDailyFeatherTl(newTail);
      setIsFavorite(true);
    }
  };

  const renderSavedTails = async item => {
    const jsonValue = await AsyncStorage.getItem(
      'FeatherPeacockVibesSavedHumor',
    );
    const favoritesList = JSON.parse(jsonValue);

    if (favoritesList != null) {
      let data = favoritesList.find(fav => fav.id === item.id);

      return data == null
        ? setFeatherButtonColor(false)
        : setFeatherButtonColor(true);
    }
  };

  const shareFeatherPeacockTl = async () => {
    try {
      await Share.share({
        message: randomFeatherTl,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <Modal
      visible={showFeatherPeacockTail}
      animationType="slide"
      transparent={true}
    >
      {Platform.OS === 'ios' && (
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={2}
        />
      )}
      <TouchableWithoutFeedback
        onPress={() => {
          setShowFeatherPeacockTail(false), handleFeatherUnlockRew();
        }}
      >
        <View style={[featherstyles.mdcnt]}>
          <LinearGradient
            colors={['#FFCB45', '#ECA12A']}
            style={featherstyles.mdgrcnt}
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
              showsVerticalScrollIndicator={false}
            >
              <View style={featherstyles.md}>
                <Text style={featherstyles.mdttl}>TODAY'S FEATHER:</Text>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('../../assets/images/featherhm.png')}
                    style={{ width: 220, height: 294, marginTop: 10 }}
                  />
                  <Image
                    source={require('../../assets/images/feathercld.png')}
                    style={{ position: 'absolute', left: -40, top: 10 }}
                  />
                  <Image
                    source={require('../../assets/images/feathercld1.png')}
                    style={{ position: 'absolute', left: 30, top: 240 }}
                  />
                  <Image
                    source={require('../../assets/images/feathercld2.png')}
                    style={{ position: 'absolute', right: -20, top: 210 }}
                  />
                </View>
                <Text style={featherstyles.mdtailtxt}>
                  {randomFeatherTl.toUpperCase()}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={shareFeatherPeacockTl}
                  >
                    <Image
                      source={require('../../assets/images/feathershrbt.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => toggleSavedTails(randomFeatherTl)}
                  >
                    {isFavorite ? (
                      <Image
                        source={require('../../assets/images/feathersvdbt.png')}
                      />
                    ) : (
                      <Image
                        source={require('../../assets/images/feathersvbt.png')}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
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
    width: '90%',
    borderRadius: 22,
  },
  mdcnt: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  md: {
    paddingHorizontal: 40,
    paddingVertical: 25,
  },
  mdttl: {
    fontFamily: 'Rowdies-Bold',
    fontSize: 20,
    color: '#2F1300',
    textAlign: 'center',
  },
  mdtailtxt: {
    fontFamily: 'Rowdies-Bold',
    fontSize: 14,
    color: '#2F1300',
    textAlign: 'center',
    marginTop: 25,
  },
});

export default Featherpeacockdailycrd;
