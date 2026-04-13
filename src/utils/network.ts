import NetInfo from '@react-native-community/netinfo';

export const subscribeNetwork = (callback: (isOnline: boolean) => void) => {
  return NetInfo.addEventListener(state => {
    const isOnline = !!state.isConnected;
    callback(isOnline);
  });
};
