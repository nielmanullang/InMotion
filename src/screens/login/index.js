import React, { Component } from "react";
import { ImageBackground, View, Image, TextInput, Text, TouchableOpacity, Alert, Dimensions, KeyboardAwareScrollView, Linking, StatusBar } from 'react-native';
import { Icon, Container, Content } from "native-base";
import moment from 'moment';
import base64 from "react-native-base64";
import styles from "./styles";
import {
  getAsyncStoreLoad,
  getAsyncStoreSave,
  resetNavigation,
  apiCall
} from '../../redux/actions/commonAction';
import endPoint from '../../redux/service/endPoint';
import { userManual } from '../../../app.json';

import logo from '../../../assets/simplify.png';

class Login extends React.Component {
  static navigationOptions = { header: null }

  state = {
    username: '',
    password: '',
    error: false,
    JDCID: '',
    dataUser: null,
    showPass: true,
    press: false
  }

  componentWillMount = () => {
  }

  uOnchange(e) {
    this.setState({ username: e.nativeEvent.text });
  }

  pOnchange(e) {
    this.setState({ password: e.nativeEvent.text });
  }

  genNc(b) {
    var c = [], e = "0123456789", a = e.length;
    for (var d = 0; d < b; ++d) {
      c.push(e[Math.random() * a | 0])
    }
    return c.join("")
  };

  genRes(b) {
    var c = [], e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", a = e.length;
    for (var d = 0; d < b; ++d) {
      c.push(e[Math.random() * a | 0])
    }
    return c.join("")
  };

  doLogin = () => {
    var realm = 'JDC';
    var nonce = this.genRes(32);
    var cnonce = this.genRes(8);
    var nc = this.genNc(8);
    var qop = 'auth';
    var res = base64.encode(realm + ":" + this.state.password + ":" + nonce);

    const api = endPoint.login;
    const data = {};
    const header = {
      headers: {
        // 'Access-Control-Allow-Origin': '*',
        'Authorization': 'Digest username="' + this.state.username + '", realm="' + realm
          + '", nonce="' + nonce + '", uri="' + api + '", cnonce="'
          + cnonce + '", nc="' + nc + '", qop="' + qop + '", response="'
          + res + '"',
        'Content-Type': 'application/json'
      }
    }

    apiCall.post(api, data, this.getDoLogin, header);
  }

  getDoLogin = (callback) => {
    if (callback != null && callback.data.status == 1) {
      Alert.alert("Welcome", " You have succesfully logged in");
      getAsyncStoreSave('dataUser', callback.data.message, () => {
        resetNavigation('Home', this.props.navigation);
      });
    } else {
      Alert.alert("Failed", " You have failed logged in");
    }
  }

  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true })
    } else {
      this.setState({ showPass: true, press: false })
    }
  }

  openNeedHelp = () => {
    let url = userManual;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {

        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  }

  getDay = () => {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return weekday[d.getDay()];
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="#4E1679" barStyle="light-content" />
        <Content>
          <View style={{ backgroundColor: '#571987', height: 331 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ width: '65%', alignItems: 'center', paddingTop: 85 }}>
                <Image source={logo} style={{ width: 200, height: 60, marginBottom: 3, borderRadius: 5 }} />
              </View>
              <View style={{ paddingTop: 95 }}>
                <View style={{ backgroundColor: '#F15A3A', padding: 10, borderBottomLeftRadius: 5, borderTopLeftRadius: 5 }}><Text style={{ color: '#FFF' }} onPress={() => this.openNeedHelp()}>Need Help?</Text></View>
              </View>
            </View>
            <View style={{ marginLeft: 113 }}>
              <Text style={{ color: '#FFF' }}>{this.getDay()}</Text>
              <Text style={{ color: '#FFF' }}>{moment(new Date()).format('DD MMMM YYYY')}</Text>
            </View>
          </View>
          <View style={{ marginTop: -100, backgroundColor: '#F6F3F2', height: Dimensions.get('window').height - 231, borderTopRightRadius: 100, overflow: 'hidden' }}>
            <View style={{ marginLeft: 40, paddingTop: 20 }}>
              <Text style={{ color: '#571745', fontSize: 36 }}>Hello Again</Text>
              <Text style={{ color: '#571745', fontSize: 14 }}>Please login to enter the system</Text>
            </View>
            <Text style={{ color: '#F1732D', fontSize: 14, fontWeight: 'bold', marginLeft: 25, paddingTop: 40, paddingLeft: 17, paddingEnd: 15, paddingBottom: 10 }}>Username :</Text>
            <View>
              <View style={{ position: 'absolute', top: 18, left: 22, backgroundColor: '#571745', width: 7, height: 7, zIndex: 1, borderRadius: 3 }} />
              <TextInput
                autoFocus={true}
                style={styles.input}
                placeholder={'Enter Username'}
                autoCapitalize='none'
                placeholderTextColor={'rgba(0, 0, 0, 0.35)'}
                underlineColorAndroid='transparent'
                returnKeyType={"next"}
                onSubmitEditing={() => { this.secondTextInput.focus() }}
                blurOnSubmit={false}
                borderColor={'#F1732D'}
                onChange={username => this.uOnchange(username)} />
              <Icon
                name="person"
                size={26}
                color={'#F1732D'}
                style={styles.btnEye} />
            </View>
            <Text style={{ color: '#F1732D', fontSize: 14, fontWeight: 'bold', marginLeft: 25, paddingLeft: 17, paddingBottom: 10, paddingTop: 15 }}>Password :</Text>
            <View>
              <View style={{ position: 'absolute', top: 18, left: 22, backgroundColor: '#571745', width: 7, height: 7, zIndex: 1, borderRadius: 3 }} />
              <TextInput
                style={styles.input}
                placeholder={'Enter Password'}
                autoCapitalize='none'
                secureTextEntry={this.state.showPass}
                placeholderTextColor={'rgba(0, 0, 0, 0.35)'}
                underlineColorAndroid='transparent'
                ref={(input) => { this.secondTextInput = input }}
                borderColor={'#F1732D'}
                onChange={passowrd => this.pOnchange(passowrd)} />
              <TouchableOpacity style={styles.btnEye}
                onPress={this.showPass.bind(this)}>
                <Icon
                  name={this.state.press == false ? 'md-eye' : 'md-eye-off'}
                  size={26}
                  style={{ color: '#F1732D' }} />
              </TouchableOpacity>
            </View>
            <View style={{ paddingLeft: 25, paddingTop: 20 }}>
              <TouchableOpacity style={styles.btnLogin} onPress={this.doLogin}>
                <Text style={styles.text}>
                  LOGIN
                  </Text>
              </TouchableOpacity>
            </View>

          </View>
        </Content>
      </Container>
    );
  }
}

export default Login;
