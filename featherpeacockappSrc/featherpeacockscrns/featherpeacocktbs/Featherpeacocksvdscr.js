import { Image, StyleSheet, Text, View } from 'react-native';
import { useCallback } from 'react';
import Featherpeacockappbackgound from '../../featherpeacockcmpnts/Featherpeacockappbackgound';
import { useFocusEffect } from '@react-navigation/native';
import Featherpeacocksvdcard from '../../featherpeacockcmpnts/Featherpeacocksvdcard';
import { useFeatherPeacockCntx } from '../../featherpeacockstr/featherpeacockcntx';

const Featherpeacocksvdscr = () => {
  const { getDailyFeatherTl, savedPeacockTails } = useFeatherPeacockCntx();

  useFocusEffect(
    useCallback(() => {
      getDailyFeatherTl();
    }, []),
  );

  return (
    <Featherpeacockappbackgound>
      <View style={featherstyles.cnt}>
        <View style={featherstyles.wrp}>
          <Text style={featherstyles.ttl}>SAVED</Text>
          <View style={featherstyles.shdw}>
            <Image source={require('../../../assets/images/featherlogo.png')} />
          </View>
        </View>

        {savedPeacockTails.length === 0 && (
          <Text style={featherstyles.emptscrntxt}>
            {`Unfortunately, it's empty here.`.toUpperCase()}
          </Text>
        )}

        {savedPeacockTails.map((tail, idx) => (
          <Featherpeacocksvdcard tail={tail} key={idx} />
        ))}
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
  shdw: {
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
  },
  ttl: {
    fontFamily: 'Rowdies-Bold',
    fontSize: 20,
    color: '#2F1300',
    textAlign: 'center',
  },
  emptscrntxt: {
    fontFamily: 'Rowdies-Light',
    fontSize: 14,
    color: '#2F1300',
    textAlign: 'center',
    marginTop: 150,
  },
  wrp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default Featherpeacocksvdscr;
