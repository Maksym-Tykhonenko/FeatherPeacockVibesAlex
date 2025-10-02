import { createStackNavigator } from '@react-navigation/stack';
import Featherpeacocktabnav from './Featherpeacocktabnav';
import Featherpeacockonbscr from '../featherpeacockscrns/featherpeacockstck/Featherpeacockonbscr';

const Stack = createStackNavigator();

const Featherpeacockstacknav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Featherpeacockonbscr"
        component={Featherpeacockonbscr}
      />
      <Stack.Screen
        name="Featherpeacocktabnav"
        component={Featherpeacocktabnav}
      />
    </Stack.Navigator>
  );
};

export default Featherpeacockstacknav;
