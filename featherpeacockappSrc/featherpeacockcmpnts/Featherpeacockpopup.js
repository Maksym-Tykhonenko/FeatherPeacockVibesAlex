import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Featherpeacockpopup = ({
  visible,
  onClose,
  featherPrpImg,
  featherPropTtl,
  featherPropSbt,
}) => {
  const slideAnim = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -200,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.feathercontainer,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <View style={styles.shdw}>
        <Image source={featherPrpImg} style={styles.featherimg} />
        <LinearGradient
          colors={['#FFCB45', '#ECA12A']}
          style={styles.feathercontent}
        >
          <View style={styles.feathercnt}>
            <Text style={styles.featherttl}>{featherPropTtl}</Text>
            <Text style={styles.feathersbttl}>{featherPropSbt}</Text>
          </View>
          <TouchableOpacity
            style={{ position: 'absolute', right: 7, top: 7 }}
            onPress={onClose}
            activeOpacity={0.6}
          >
            <Image source={require('../../assets/images/featherclspop.png')} />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  feathercontainer: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  shdw: {
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 22,
    elevation: 10,
    width: '100%',
    alignItems: 'center',
  },
  feathercontent: {
    backgroundColor: '#333',
    borderRadius: 12,
    width: '80%',
  },
  feathercnt: {
    padding: 20,
    paddingVertical: 38,
    left: 65,
  },
  featherttl: {
    fontFamily: 'Rowdies-Bold',
    fontSize: 16,
    color: '#2F1300',
    marginBottom: 7,
    flexShrink: 1,
    width: '80%',
  },
  feathersbttl: {
    fontFamily: 'Rowdies-Light',
    fontSize: 14,
    color: 'rgba(47, 19, 0, 0.56)',
    flexShrink: 1,
    width: '70%',
  },
  featherimg: {
    width: 61,
    height: 125,
    position: 'absolute',
    zIndex: 100,
    left: 60,
    top: -14,
  },
});

export default Featherpeacockpopup;
