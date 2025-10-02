import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFeatherPeacockCntx } from '../featherpeacockstr/featherpeacockcntx';
import { useState } from 'react';

const Featherpeacocksvdcard = ({ tail }) => {
  const { deleteDailyFeatherTl } = useFeatherPeacockCntx();
  const [showDeleteFeatherCrd, setShowDeleteFeatherCrd] = useState(false);

  return (
    <LinearGradient
      colors={
        showDeleteFeatherCrd ? ['#FF4545', '#EC2A2A'] : ['#FFCB45', '#ECA12A']
      }
      style={featherstyles.mdgrcnt}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onLongPress={() => setShowDeleteFeatherCrd(true)}
        style={[featherstyles.md, showDeleteFeatherCrd && { paddingBottom: 4 }]}
      >
        {showDeleteFeatherCrd ? (
          <>
            <Text style={featherstyles.delttltxt}>DO YOU WANT TO DELETE?</Text>
            <Text style={featherstyles.delsbttxt}>
              This decision cannot be reversed.
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 13,
                alignItems: 'center',
                gap: 8,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => deleteDailyFeatherTl(tail.id)}
              >
                <Image source={require('../../assets/images/featherdlt.png')} />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                style={{ top: -8, padding: 5, paddingVertical: 10 }}
                onPress={() => setShowDeleteFeatherCrd(false)}
              >
                <Text style={featherstyles.cnctxt}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={featherstyles.mdtailtxt}>
                {tail.feathercat.toUpperCase()}
              </Text>

              <View
                style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
              >
                <Image
                  source={require('../../assets/images/featherdtic.png')}
                />
                <Text style={featherstyles.dttxt}>{tail.featherdate}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 26,
                alignItems: 'center',
              }}
            >
              <Text style={featherstyles.tltxt}>
                {tail.feathertail.toUpperCase()}
              </Text>

              <View activeOpacity={0.6}>
                <Image
                  source={require('../../assets/images/feathersvdtl.png')}
                />
              </View>
            </View>
          </>
        )}
      </TouchableOpacity>
    </LinearGradient>
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
    marginBottom: 10,
  },
  md: {
    paddingHorizontal: 19,
    paddingVertical: 24,
    paddingBottom: 25,
  },
  mdttl: {
    fontFamily: 'Rowdies-Bold',
    fontSize: 20,
    color: '#2F1300',
    textAlign: 'center',
  },
  mdtailtxt: {
    fontFamily: 'Rowdies-Light',
    fontSize: 16,
    color: '#2F1300',
  },
  dttxt: {
    fontFamily: 'Rowdies-Light',
    fontSize: 10,
    color: '#000000',
    opacity: 0.5,
  },
  tltxt: {
    fontFamily: 'Rowdies-Bold',
    fontSize: 16,
    color: '#2F1300',
    width: 220,
  },
  delttltxt: {
    fontFamily: 'Rowdies-Bold',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  delsbttxt: {
    fontFamily: 'Rowdies-Bold',
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    marginTop: 12,
  },
  cnctxt: {
    fontFamily: 'Rowdies-Light',
    fontSize: 14,
    color: '#fff',
  },
});

export default Featherpeacocksvdcard;
