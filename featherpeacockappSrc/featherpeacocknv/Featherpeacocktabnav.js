import LinearGradient from 'react-native-linear-gradient';
import Featherpeacockcollscr from '../featherpeacockscrns/featherpeacocktbs/Featherpeacockcollscr';
import Featherpeacockhmscr from '../featherpeacockscrns/featherpeacocktbs/Featherpeacockhmscr';
import Featherpeacocksvdscr from '../featherpeacockscrns/featherpeacocktbs/Featherpeacocksvdscr';
import Featherpeacockhumscr from '../featherpeacockscrns/featherpeacocktbs/Featherpeacockhumscr';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const Featherpeacocktabnav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: featherpeackockstyles.ttb,
        tabBarActiveTintColor: '#2F1300',

        tabBarBackground: () => (
          <LinearGradient
            colors={['#FFCB45', '#ECA12A']}
            style={featherpeackockstyles.tabbg}
          ></LinearGradient>
        ),
      }}
    >
      <Tab.Screen
        name="Featherpeacockhmscr"
        component={Featherpeacockhmscr}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Image
                  source={require('../../assets/icons/featherhmact.png')}
                />
              ) : (
                <Image source={require('../../assets/icons/featherhm.png')} />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Featherpeacocksvdscr"
        component={Featherpeacocksvdscr}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Image
                  source={require('../../assets/icons/feathersvact.png')}
                />
              ) : (
                <Image source={require('../../assets/icons/feathersv.png')} />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Featherpeacockhumscr"
        component={Featherpeacockhumscr}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Image
                  source={require('../../assets/icons/featherhmract.png')}
                />
              ) : (
                <Image source={require('../../assets/icons/featherhmr.png')} />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Featherpeacockcollscr"
        component={Featherpeacockcollscr}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Image
                  source={require('../../assets/icons/feathercollact.png')}
                />
              ) : (
                <Image source={require('../../assets/icons/feathercoll.png')} />
              )}
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const featherpeackockstyles = StyleSheet.create({
  tabbg: {
    height: 111,
    borderRadius: 22,
  },
  ttb: {
    marginHorizontal: 33,
    elevation: 0,
    paddingTop: 36,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 60,
    borderRadius: 22,
    borderTopWidth: 0,
  },
});

export default Featherpeacocktabnav;
