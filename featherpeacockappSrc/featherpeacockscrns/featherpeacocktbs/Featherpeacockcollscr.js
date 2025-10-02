import { useCallback, useState } from 'react';
import Featherpeacockappbackgound from '../../featherpeacockcmpnts/Featherpeacockappbackgound';
import { useFocusEffect } from '@react-navigation/native';
import {
  Alert,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { featherpeacockrewards } from '../../featherpeacockcnsts/featherpeacockrewards';
import { useFeatherPeacockCntx } from '../../featherpeacockstr/featherpeacockcntx';

const Featherpeacockcollscr = () => {
  const [currCollSlide, setCurrCollSlide] = useState(0);
  const [currFeatherDt, setCurrFeatherDt] = useState('');

  const { getDailyFeatherTl, getFeatherRewards, featherRewards } =
    useFeatherPeacockCntx();

  useFocusEffect(
    useCallback(() => {
      getDailyFeatherTl();
      getFeatherRewards();
      getFeatherDt();
    }, []),
  );

  const nextFeatherSlide = () => {
    if (currCollSlide === featherpeacockrewards.length - 1) return;
    setCurrCollSlide(currCollSlide + 1);
  };

  const prevFeatherSlide = () => {
    if (currCollSlide === 0) return;
    setCurrCollSlide(currCollSlide - 1);
  };

  const shareFeatherPeacockTl = async () => {
    try {
      await Share.share({
        message: `${featherRewards[currCollSlide].featherrew}
${featherRewards[currCollSlide].featherdesc}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const getFeatherDt = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    setCurrFeatherDt(`${day}.${month}.${year}`);
  };

  return (
    <Featherpeacockappbackgound>
      <View style={featherstyles.cnt}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <View>
            <Text style={featherstyles.ttl}>COLLECTION</Text>
            <Text style={featherstyles.sbtl}>
              {`All your feathers for jokes are collected here!`.toUpperCase()}
            </Text>
          </View>
          <View style={featherstyles.shdw}>
            <Image
              source={require('../../../assets/images/feathercollscr.png')}
            />
          </View>
        </View>

        <View style={featherstyles.shdw}>
          <LinearGradient
            colors={['#FFCB45', '#ECA12A']}
            style={featherstyles.mdgrcnt}
          >
            <View style={featherstyles.md}>
              <View style={{ alignItems: 'center' }}>
                {featherRewards[currCollSlide].featherunlocked ? (
                  <Image
                    source={featherRewards[currCollSlide].featherim}
                    style={{ width: 95, height: 200 }}
                  />
                ) : (
                  <Image
                    source={featherRewards[currCollSlide].featheriminact}
                    style={{ width: 95, height: 200 }}
                  />
                )}
              </View>
              <Text
                style={[
                  featherstyles.mdttl,
                  !featherRewards[currCollSlide].featherunlocked && {
                    opacity: 0.5,
                  },
                ]}
              >
                {featherRewards[currCollSlide].featherrew.toUpperCase()}
              </Text>
              <View style={{ alignItems: 'center' }}>
                {featherRewards[currCollSlide].featherunlocked && (
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 8,
                      alignItems: 'center',
                      marginTop: 12,
                    }}
                  >
                    <Image
                      source={require('../../../assets/images/featherdtic.png')}
                    />
                    <Text style={featherstyles.dttxt}>{currFeatherDt}</Text>
                  </View>
                )}
              </View>

              <Text
                style={[
                  featherstyles.mdtailtxt,
                  !featherRewards[currCollSlide].featherunlocked && {
                    opacity: 0.5,
                  },
                ]}
              >
                {featherRewards[currCollSlide].featherdesc.toUpperCase()}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={prevFeatherSlide}
                >
                  <Image
                    source={require('../../../assets/images/featherprv.png')}
                  />
                </TouchableOpacity>

                {featherRewards[currCollSlide].featherunlocked && (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={shareFeatherPeacockTl}
                  >
                    <Image
                      source={require('../../../assets/images/feathergrshr.png')}
                    />
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={nextFeatherSlide}
                >
                  <Image
                    source={require('../../../assets/images/feathernxt.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
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
    marginTop: 38,
    marginBottom: 8,
  },
  btntxt: {
    fontFamily: 'Rowdies-Bold',
    fontSize: 20,
    color: '#2F1300',
    textAlign: 'center',
  },
  dttxt: {
    fontFamily: 'Rowdies-Light',
    fontSize: 12,
    opacity: 0.5,
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
    shadowOffset: { width: 6, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 9,
    elevation: 10,
  },
  mdgrcnt: {
    width: '100%',
    borderRadius: 22,
  },
  mdcnt: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  md: {
    paddingHorizontal: 40,
    paddingBottom: 15,
    paddingTop: 5,
  },
  ttl: {
    fontFamily: 'Rowdies-Bold',
    fontSize: 20,
    color: '#2F1300',
  },
  sbtl: {
    fontFamily: 'Rowdies-Light',
    fontSize: 13,
    color: '#2F1300',
    marginTop: 12,
    width: 240,
  },

  mdttl: {
    fontFamily: 'Rowdies-Bold',
    fontSize: 24,
    color: '#2F1300',
    textAlign: 'center',
  },
  mdtailtxt: {
    fontFamily: 'Rowdies-Bold',
    fontSize: 14,
    color: '#2F1300',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 4,
    minHeight: 50,
  },
});

export default Featherpeacockcollscr;
