import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import Featherpeacockappbackgound from '../../featherpeacockcmpnts/Featherpeacockappbackgound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { featherpeacockdlfeathrs } from '../../featherpeacockcnsts/featherpeacockdlfeathrs';
import Featherpeacockdailycrd from '../../featherpeacockcmpnts/Featherpeacockdailycrd';
import Featherpeacockpopup from '../../featherpeacockcmpnts/Featherpeacockpopup';
import { useFeatherPeacockCntx } from '../../featherpeacockstr/featherpeacockcntx';

const featherday = 24 * 60 * 60 * 1000;

const Featherpeacockhmscr = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isVsblFeatherPopUp, setIsVsblFeatherPopUp] = useState(false);
  const [showFeatherPeacockTail, setShowFeatherPeacockTail] = useState(false);
  const [randomFeatherTl, setRandomFeatherTl] = useState(
    () =>
      featherpeacockdlfeathrs[
        Math.floor(Math.random() * featherpeacockdlfeathrs.length)
      ],
  );
  const { featherRewards, saveFeatherRewards, getFeatherRewards } =
    useFeatherPeacockCntx();

  useEffect(() => {
    checkButtonStatus();
    getFeatherRewards();

    const interval = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const checkButtonStatus = async () => {
    const storedTime = await AsyncStorage.getItem('featherpeacocktimer');
    if (storedTime) {
      const elapsed = Date.now() - parseInt(storedTime, 10);
      if (elapsed >= featherday) {
        setIsAvailable(true);
        setTimeLeft(0);
      } else {
        setIsAvailable(false);
        setTimeLeft(featherday - elapsed);
      }
    } else {
      setIsAvailable(true);
    }
  };

  const updateCountdown = async () => {
    const storedTime = await AsyncStorage.getItem('featherpeacocktimer');
    if (!storedTime) return;

    const elapsed = Date.now() - parseInt(storedTime, 10);
    if (elapsed >= featherday) {
      setIsAvailable(true);
      setTimeLeft(0);
    } else {
      setTimeLeft(featherday - elapsed);
    }
  };

  const handleStart = async () => {
    const now = Date.now().toString();
    await AsyncStorage.setItem('featherpeacocktimer', now);
    setIsAvailable(false);
    setTimeLeft(featherday);
  };

  const formatTime = ms => {
    if (ms <= 0) return '00:00:00';

    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    return `${String(h).padStart(2, '0')}:${String(m).padStart(
      2,
      '0',
    )}:${String(s).padStart(2, '0')}`;
  };

  const handleOpenFeatherTail = () => {
    setShowFeatherPeacockTail(true), handleStart();
  };

  const handleFeatherUnlockRew = () => {
    const isUnlockedTail = featherRewards.map(reward => {
      if (reward.id === 1 && !reward.featherunlocked) {
        setIsVsblFeatherPopUp(true);
        setTimeout(() => {
          setIsVsblFeatherPopUp(false);
        }, 4000);

        return { ...reward, featherunlocked: true };
      }
      return reward;
    });

    saveFeatherRewards(isUnlockedTail);
  };

  return (
    <Featherpeacockappbackgound>
      <View
        style={[
          featherstyles.cnt,
          showFeatherPeacockTail && { filter: 'blur(2px)' },
        ]}
      >
        {isVsblFeatherPopUp && (
          <Featherpeacockpopup
            visible={true}
            featherPropTtl={'Feather of Joy!'.toUpperCase()}
            featherPropSbt={'You get it for the first opened feather with a joke.'.toUpperCase()}
            featherPrpImg={require('../../../assets/images/featherrew1.png')}
            onClose={() => setIsVsblFeatherPopUp(false)}
          />
        )}

        <View style={featherstyles.shdw}>
          <Image source={require('../../../assets/images/featherlogo.png')} />
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={featherstyles.txt}>TODAY'S FEATHER:</Text>
          <Image source={require('../../../assets/images/featherhm.png')} />

          {isAvailable ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handleOpenFeatherTail()}
            >
              <LinearGradient
                colors={['#F3FF45', '#2ACFEC']}
                style={featherstyles.bt}
              >
                <Text style={featherstyles.btntxt}>OPEN THE TAIL</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <View>
              <LinearGradient
                colors={['#FFCB45', '#ECA12A']}
                style={featherstyles.bt}
              >
                <Text style={featherstyles.btntxt}>{formatTime(timeLeft)}</Text>
              </LinearGradient>
            </View>
          )}
        </View>
      </View>

      <Featherpeacockdailycrd
        randomFeatherTl={randomFeatherTl}
        showFeatherPeacockTail={showFeatherPeacockTail}
        setShowFeatherPeacockTail={setShowFeatherPeacockTail}
        handleFeatherUnlockRew={handleFeatherUnlockRew}
      />
    </Featherpeacockappbackgound>
  );
};

const featherstyles = StyleSheet.create({
  cnt: {
    paddingTop: 70,
    padding: 20,
    paddingBottom: 130,
  },
  txt: {
    fontFamily: 'Rowdies-Bold',
    fontSize: 20,
    color: '#2F1300',
    textAlign: 'center',
    marginTop: 38,
    marginBottom: 8,
  },
  btntxt: {
    fontFamily: 'Rowdies-Bold',
    fontSize: 20,
    color: '#2F1300',
    textAlign: 'center',
  },
  bt: {
    width: 223,
    height: 75,
    alignItems: 'center',
    top: -40,
    justifyContent: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
  },
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
    paddingHorizontal: 60,
    paddingVertical: 43,
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
    marginTop: 45,
  },
});

export default Featherpeacockhmscr;
