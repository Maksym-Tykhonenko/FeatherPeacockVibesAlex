import { NavigationContainer } from '@react-navigation/native';
import Featherpeacockstacknav from './featherpeacockappSrc/featherpeacocknv/Featherpeacockstacknav';
import Featherpeacockloader from './featherpeacockappSrc/featherpeacockcmpnts/Featherpeacockloader';
import { FeatherPeacockAppContextProvider } from './featherpeacockappSrc/featherpeacockstr/featherpeacockcntx';
import { useEffect, useState } from 'react';

const App = () => {
  const [featherPeacockLdr, setFeatherPeacockLdr] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFeatherPeacockLdr(true);
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <FeatherPeacockAppContextProvider>
        {featherPeacockLdr ? (
          <Featherpeacockstacknav />
        ) : (
          <Featherpeacockloader />
        )}
      </FeatherPeacockAppContextProvider>
    </NavigationContainer>
  );
};

export default App;
