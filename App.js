import React from "react";
import Setup from "./src/boot/setup";
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

var storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24 * 7,
  enableCache: true,
  sync : {
  }
})

global.storage = storage;

export default class App extends React.Component {
  render() {
    return <Setup />;
  }
}
