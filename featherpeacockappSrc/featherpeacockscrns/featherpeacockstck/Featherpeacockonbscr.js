import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Featherpeacockappbackgound from '../../featherpeacockcmpnts/Featherpeacockappbackgound';
import LinearGradient from 'react-native-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Featherpeacockonbscr = () => {
  const feathernav = useNavigation();
  const [featherVsblInfo, setFeatherVsblInfo] = useState(0);
  const featherFadeAnim = useRef(new Animated.Value(0)).current;
  const featherSlideAnim = useRef(new Animated.Value(-40)).current;

  const runFeatherAnim = () => {
    featherFadeAnim.setValue(0);
    featherSlideAnim.setValue(-50);

    Animated.parallel([
      Animated.timing(featherFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(featherSlideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    runFeatherAnim();
  }, []);

  const nextFeatherAnimSlide = () => {
    if (featherVsblInfo === 2) feathernav.replace('Featherpeacocktabnav');
    else setFeatherVsblInfo(featherVsblInfo + 1), runFeatherAnim();
  };

  return (
    <Featherpeacockappbackgound>
      <View style={featherstyles.cnt}>
        <Animated.View
          style={[
            featherstyles.crd,
            {
              opacity: featherFadeAnim,
              transform: [{ translateX: featherSlideAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={['#BA8600', '#543D00']}
            style={{ borderRadius: 22 }}
          >
            <View style={featherstyles.gradcnt}>
              <Text style={featherstyles.txt}>
                {featherinfo[featherVsblInfo].feathertxt}
              </Text>
              <Text style={featherstyles.sctxt}>
                {featherinfo[featherVsblInfo].feathersctxt}
              </Text>
            </View>
          </LinearGradient>
          <View>
            <Image
              source={featherinfo[featherVsblInfo].featheri}
              style={{ top: -10 }}
            />
            {featherVsblInfo === 1 && (
              <>
                <Image
                  source={require('../../../assets/images/featheron4.png')}
                  style={{ position: 'absolute', right: 30, top: -30 }}
                />
                <Image
                  source={require('../../../assets/images/featheron5.png')}
                  style={{
                    position: 'absolute',
                    left: -30,
                    top: 230,
                  }}
                />
                <Image
                  source={require('../../../assets/images/featheron6.png')}
                  style={{ position: 'absolute', right: -10, top: 280 }}
                />
              </>
            )}
          </View>
        </Animated.View>

        <TouchableOpacity
          activeOpacity={0.6}
          style={{ position: 'absolute', bottom: 20 }}
          onPress={() => nextFeatherAnimSlide()}
        >
          <Image source={require('../../../assets/images/feathernxtbtn.png')} />
        </TouchableOpacity>
      </View>
    </Featherpeacockappbackgound>
  );
};

const featherstyles = StyleSheet.create({
  cnt: { paddingTop: 58, padding: 23, alignItems: 'center', flex: 1 },
  gradcnt: {
    padding: 40,
    paddingHorizontal: 35,
  },
  txt: {
    fontFamily: 'Rowdies-Bold',
    fontSize: 36,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  sctxt: {
    fontFamily: 'Rowdies-Light',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 27,
  },
});

const featherinfo = [
  {
    featheri: require('../../../assets/images/featheron.png'),
    feathertxt: `Hello! I’m your 
peacock-friend`,
    feathersctxt:
      'Every day I’ll open my tail and give you a colorful feather of mood!',
  },
  {
    featheri: require('../../../assets/images/featheron1.png'),
    feathertxt: `Collect feathers 
into a collection`,
    feathersctxt: 'Each feather hides a joke, a fact or a small prediction.',
  },
  {
    featheri: require('../../../assets/images/featheron2.png'),
    feathertxt: `Share the vibe 
with your friends`,
    feathersctxt: 'Let them get their feather of joy too!',
  },
];

export default Featherpeacockonbscr;
