import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useState } from 'react';
import Featherpeacockappbackgound from '../../featherpeacockcmpnts/Featherpeacockappbackgound';
import { featherpeacocktails } from '../../featherpeacockcnsts/featherpeacocktails';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Featherpeacocktailcard from '../../featherpeacockcmpnts/Featherpeacocktailcard';
import Featherpeacockpopup from '../../featherpeacockcmpnts/Featherpeacockpopup';
import { useFeatherPeacockCntx } from '../../featherpeacockstr/featherpeacockcntx';

const Featherpeacockhumscr = () => {
  const [isVisibleTails, setIsVisibleTails] = useState(false);
  const [isVsblFeatherPopUp, setIsVsblFeatherPopUp] = useState(false);
  const [isVsblFeatherPopUpDiffJokes, setIsVsblFeatherPopUpDiffJokes] =
    useState(false);
  const [isVsblFeatherPopUpRead, setIsVsblFeatherPopUpRead] = useState(false);
  const [isVsblFeatherPopUpShare, setIsVsblFeatherPopUpShare] = useState(false);
  const { getFeatherRewards, featherRewards, saveFeatherRewards } =
    useFeatherPeacockCntx();

  const [currTailIdx, setCurrTailIdx] = useState(0);
  const [randomFeatherTl, setRandomFeatherTl] = useState(
    () =>
      featherpeacocktails[
        Math.floor(Math.random() * featherpeacocktails.length)
      ],
  );

  useFocusEffect(
    useCallback(() => {
      getFeatherRewards();
    }, []),
  );

  const handleNextFeatherTail = () => {
    if (currTailIdx === featherpeacocktails.length - 1) return;
    if (currTailIdx === 9) handleOpenFeatherTail();
    if (currTailIdx === 25) handleOpenFeatherTailDiff();
    if (currTailIdx === 50) handleOpenFeatherTailRead();
    else setCurrTailIdx(currTailIdx + 1);
  };

  const handlePrevFeatherTail = () => {
    if (!currTailIdx) return;
    else setCurrTailIdx(currTailIdx - 1);
  };

  const handleOpenFeatherTail = () => {
    const isUnlockedTail = featherRewards.map(reward => {
      if (reward.id === 2 && !reward.featherunlocked) {
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

  const handleOpenFeatherTailDiff = () => {
    const isUnlockedTail = featherRewards.map(reward => {
      if (reward.id === 5 && !reward.featherunlocked) {
        setIsVsblFeatherPopUpDiffJokes(true);
        setTimeout(() => {
          setIsVsblFeatherPopUpDiffJokes(false);
        }, 4000);

        return { ...reward, featherunlocked: true };
      }
      return reward;
    });

    saveFeatherRewards(isUnlockedTail);
  };

  const handleOpenFeatherTailRead = () => {
    const isUnlockedTail = featherRewards.map(reward => {
      if (reward.id === 6 && !reward.featherunlocked) {
        setIsVsblFeatherPopUpRead(true);
        setTimeout(() => {
          setIsVsblFeatherPopUpRead(false);
        }, 4000);

        return { ...reward, featherunlocked: true };
      }
      return reward;
    });

    saveFeatherRewards(isUnlockedTail);
  };

  return (
    <Featherpeacockappbackgound>
      <View style={featherstyles.cnt}>
        {isVsblFeatherPopUp && (
          <Featherpeacockpopup
            visible={true}
            featherPropTtl={'Feather of Laughter!'.toUpperCase()}
            featherPropSbt={'For 10 opened jokes in the "Tail of Humor"'.toUpperCase()}
            featherPrpImg={require('../../../assets/images/featherrew2.png')}
            onClose={() => setIsVsblFeatherPopUp(false)}
          />
        )}
        {isVsblFeatherPopUpDiffJokes && (
          <Featherpeacockpopup
            visible={true}
            featherPropTtl={'Feather of Collector!'.toUpperCase()}
            featherPropSbt={'For opening 25 different jokes."'.toUpperCase()}
            featherPrpImg={require('../../../assets/images/featherrew5.png')}
            onClose={() => setIsVsblFeatherPopUp(false)}
          />
        )}
        {isVsblFeatherPopUpRead && (
          <Featherpeacockpopup
            visible={true}
            featherPropTtl={'Feather of Gold!'.toUpperCase()}
            featherPropSbt={`It's given when you read 50 jokes and become the real master of the "Tail of Humor."`.toUpperCase()}
            featherPrpImg={require('../../../assets/images/featherrew6.png')}
            onClose={() => setIsVsblFeatherPopUp(false)}
          />
        )}
        {isVsblFeatherPopUpShare && (
          <Featherpeacockpopup
            visible={true}
            featherPropTtl={'Feather of Mood!'.toUpperCase()}
            featherPropSbt={'For the first time sharing a joke with a friend."'.toUpperCase()}
            featherPrpImg={require('../../../assets/images/featherrew4.png')}
            onClose={() => setIsVsblFeatherPopUp(false)}
          />
        )}
        {isVisibleTails ? (
          <View style={{}}>
            <Featherpeacocktailcard
              randomFeatherTl={randomFeatherTl}
              currTailIdx={currTailIdx}
              isVsblFeatherPopUpShare={isVsblFeatherPopUpShare}
              setIsVsblFeatherPopUpShare={setIsVsblFeatherPopUpShare}
            />

            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../../assets/images/featherhumr.png')}
                style={{ width: 388, height: 388, marginTop: 44 }}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              disabled={!currTailIdx}
              onPress={() => {
                handlePrevFeatherTail();
              }}
            >
              <LinearGradient
                colors={['#FFCB45', '#ECA12A']}
                style={featherstyles.prevbt}
              >
                <Text style={featherstyles.prevbttxt}>PREVIOUS</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                handleNextFeatherTail();
              }}
            >
              <LinearGradient
                colors={['#F3FF45', '#2ACFEC']}
                style={featherstyles.nxtbt}
              >
                <Text style={featherstyles.btntxt}>NEXT</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Text style={featherstyles.txt}>{`WELCOME TO 
MY TAIL OF HUMOR!`}</Text>
            <Image source={require('../../../assets/images/featherhumr.png')} />

            <LinearGradient
              colors={['#FFCB45', '#ECA12A']}
              style={featherstyles.txtcnt}
            >
              <Text style={featherstyles.cnttxt}>
                {`Here are all the jokes I've collected for you from around the world.`.toUpperCase()}
              </Text>
            </LinearGradient>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setIsVisibleTails(true);
              }}
            >
              <LinearGradient
                colors={['#F3FF45', '#2ACFEC']}
                style={featherstyles.bt}
              >
                <Text style={featherstyles.btntxt}>START!</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Featherpeacockappbackgound>
  );
};

const featherstyles = StyleSheet.create({
  cnt: {
    paddingTop: 70,
    padding: 20,
    paddingBottom: 140,
  },
  txt: {
    fontFamily: 'Rowdies-Bold',
    fontSize: 20,
    color: '#2F1300',
    textAlign: 'center',
    marginBottom: 68,
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
    justifyContent: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
  },
  nxtbt: {
    width: 108,
    height: 71,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
    position: 'absolute',
    right: 13,
    bottom: 20,
  },
  prevbt: {
    width: 128,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
    left: 33,
    bottom: 25,
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
  txtcnt: {
    width: 249,
    height: 90,
    borderRadius: 22,
    justifyContent: 'center',
    marginBottom: 20,
  },
  cnttxt: {
    fontFamily: 'Rowdies-Bold',
    fontSize: 13,
    color: '#2F1300',
    textAlign: 'center',
  },
  prevbttxt: {
    fontFamily: 'Rowdies-Bold',
    fontSize: 16,
    color: '#2F1300',
    textAlign: 'center',
  },
});

export default Featherpeacockhumscr;
