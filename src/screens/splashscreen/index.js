import React, { Component } from "react";
import { Container, Content, View, Text } from "native-base";
import { ImageBackground, Image, Dimensions, StatusBar } from "react-native";
import { getAsyncStoreLoad, resetNavigation, getAsyncStoreSave, apiCall } from '../../redux/actions/commonAction';
import endPoint from '../../redux/service/endPoint';
import moment from 'moment';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const deviceHeight = Dimensions.get("window").height / 10;

import splash1 from '../../../assets/splash1.png';
import splash2 from '../../../assets/splash2.png';

class SplashScreen extends React.Component {
  static navigationOptions = { header: null };

  state = {
    username: '',
    password: '',
    error: false,
    JDCID: '',
    dataUser: null
  }

  componentWillMount = () => {
    getAsyncStoreLoad('dataUser', this.loadDataUser);
  }

  loadDataUser = (dataUser) => {
    if (dataUser != null) {
      const api = endPoint.checkToken;
      const data = {};
      const header = {
        headers: {
          'Content-Type': 'application/json',
          TKID: dataUser.TKID,
          JDCID: dataUser.JDCID
        }
      }

      apiCall.post(api, data, this.getHome, header);
    } else {
      setTimeout(() => {
        resetNavigation('Login', this.props.navigation)
      }, 2000);
    }
  }

  getHome = (callback) => {
    if (callback != null && callback.data.status == 1) {
      setTimeout(() => {
        resetNavigation('Home', this.props.navigation)
      }, 2000);
    } else {
      setTimeout(() => {
        resetNavigation('Login', this.props.navigation)
      }, 2000);
    }
  }

  renderSplash = () => {
    if (moment().format('a') == "am") {
      return <ImageBackground source={splash1} style={{ width: '100%', height: '100%', resizeMode: 'cover' }}>
      </ImageBackground>
    } else {
      return <ImageBackground source={splash2} style={{ width: '100%', height: '100%', resizeMode: 'cover' }}>
      </ImageBackground>
    }
  }

  render() {
    return (
      <View>
        <StatusBar backgroundColor="#4E1679" barStyle="light-content" />
        {this.renderSplash()}
      </View>
    );
  }
}

export default SplashScreen;