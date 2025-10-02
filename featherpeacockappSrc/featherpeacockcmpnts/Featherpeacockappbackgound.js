import { ImageBackground, ScrollView } from 'react-native';

const Featherpeacockappbackgound = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/featherbg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default Featherpeacockappbackgound;
