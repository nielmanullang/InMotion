import React, { Component } from "react";
import { View, StatusBar, Dimensions, TouchableOpacity, Image, RefreshControl, Keyboard } from "react-native";
import { Container, Button, Text, Header, Input, Tabs, Tab, TabHeading, Card, CardItem, Right, Thumbnail, Body, Content, Icon, Toast } from "native-base";
import { getAsyncStoreLoad, apiCall } from '../../redux/actions/commonAction';
import endPoint from '../../redux/service/endPoint';
import styles from "./styles";
import { convertToLetterCase } from '../../theme/variables/convert';
import moment from 'moment';
import Modal from 'react-native-modal';
import { uiAvatars } from '../../../app.json';
import Loading from '../../theme/components/Loading';

const logo = require("../../../assets/simplify.png");
const iconSetting = require("../../../assets/iconSetting.png");
const headtitle = require("../../../assets/headtitle.png");

class Home extends React.Component {
  static navigationOptions = { header: null }

  state = {
    username: '',
    password: '',
    error: false,
    dataUser: null,
    myProfile: null,
    implementationList: null,
    eventList: null,
    events: null,
    myTask: null,
    menu: null,
    commonCodeIscat: null,
    operationList: null,
    isRefreshing: false,
    project: null,
    search: null,
    isVisibleLoading: false,
    currentTab: 0,
    expanded: 10,
  }

  componentWillMount = () => {
    getAsyncStoreLoad('dataUser', this.loadToken);
    if (this.props.navigation.state.params && this.props.navigation.state.params.dataPass) {
      Toast.show({ text: this.props.navigation.state.params.dataPass.message, position: "bottom" })
    }
  }

  loadToken = (dataUser) => {
    this.setState({ dataUser: dataUser }, () => { this.loadHome(dataUser) });
  }

  loadHome = (dataUser) => {
    const api = endPoint.getHome;
    const data = {
      email: dataUser.email,
    };
    const header = {
      headers: {
        'Content-Type': 'application/json',
        TKID: dataUser.TKID,
        JDCID: dataUser.JDCID
      }
    }

    apiCall.post(api, data, this.getHome, header);
  }

  getHome = (callback) => {
    if (callback != null && callback.data.status == 1) {
      let implementationList = callback.data.data[0].implementationList;
      let operationList = callback.data.data[0].operationList;
      this.setState({
        myProfile: callback.data.data[0].myProfile,
        implementationList: callback.data.data[0].implementationList,
        eventList: callback.data.data[0].eventList,
        events: callback.data.data[0].eventList,
        myTask: callback.data.data[0].myTask,
        operationList: callback.data.data[0].operationList,
        project: implementationList.concat(operationList)
      }, () => { this.loadMenu() });
    }
  }

  loadMenu = () => {
    const api = endPoint.menuRoleMobile;
    const data = {
      role: this.state.dataUser.role,
    };
    const header = {
      headers: {
        'Content-Type': 'application/json',
        TKID: this.state.dataUser.TKID,
        JDCID: this.state.dataUser.JDCID
      }
    }

    apiCall.post(api, data, this.getMenu, header);
  }

  getMenu = (callback) => {
    if (callback != null && callback.data.status == 1) {
      let result = callback.data.data;
      let menus = []
      let men;
      result.map((data, i) => {
        if (data.parent == "PMG") {
          menus.push(data);
        }
      })
      this.setState({ menu: menus }, () => { this.loadDataSetting() });
    }
  }

  loadDataSetting = () => {
    const api = endPoint.getDataSettings;
    const data = {
      commoncode: "ISCAT"
    };
    const header = {
      headers: {
        'Content-Type': 'application/json',
        TKID: this.state.dataUser.TKID,
        JDCID: this.state.dataUser.JDCID
      }
    }

    apiCall.post(api, data, this.getDataSettings, header);
  }

  getDataSettings = (callback) => {
    const result = [];
    if (callback != null && callback.data.status == 1) {
      callback.data.data.map((data, i) => {
        const list = {
          text: data.commdesc1,
          value: data.commonkey
        }
        result.push(list)
      })
      this.setState({ commonCodeIscat: result, isRefreshing: false });
    }
  }

  renderPhoto = () => {
    if (this.state.myProfile != null) {
      return <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: -45 }}>
        <TouchableOpacity onPress={() => this._myProfile()}>
          {this.state.myProfile.urlPhoto && this.state.myProfile.urlPhoto.length > 43 ?
            <Image style={{ width: 80, height: 80, marginBottom: 10, borderRadius: 40, borderColor: '#E5E5E5', borderWidth: 2 }} source={{ uri: this.state.myProfile.urlPhoto }} /> :
            <Image source={{ uri: uiAvatars + this.state.myProfile.fullname }} style={{ width: 80, height: 80, marginBottom: 10, borderRadius: 40, borderColor: '#E5E5E5', borderWidth: 2 }} />}
        </TouchableOpacity>
        <Text style={{ color: '#401760', fontSize: 18, }}>{this.state.myProfile.fullname != null ? convertToLetterCase(this.state.myProfile.fullname) : null}</Text>
        <Text style={{ color: '#F15A3A', fontSize: 14 }}>{this.state.myProfile != null ? this.state.myProfile.positionName : null}</Text>
      </View>
    }
  }

  renderHeaderRight = () => {
    return <Right>
      <Button transparent
        onPress={() => this.setState({ modalVisible: true })}>
        <Thumbnail square source={iconSetting} style={{ width: 20, height: 15 }} />
      </Button>
    </Right>
  }

  renderModalHeaderRight = () => {
    return <View>
      <TouchableOpacity style={{ padding: 20, borderBottomWidth: 1, borderColor: '#e2e2e2' }} onPress={() => this._myProfile()}>
        <Text>My Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 20, borderBottomWidth: 1, borderColor: '#e2e2e2' }} onPress={() => this._logout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  }

  _myProfile = () => {
    this.props.navigation.navigate("Profile", { dataUser: this.state.dataUser, onNavigateBack: this.handleOnNavigateBack.bind(this) });
  }

  handleOnNavigateBack = (action) => {
    if (action == 'refresh') {
      this.setState({ isRefreshing: true });
      getAsyncStoreLoad('dataUser', this.loadToken);
    }
  }

  _onRefresh = () => {
    this.setState({ isRefreshing: true });
    getAsyncStoreLoad('dataUser', this.loadToken);
  }

  _changeTab = (i) => {
    if (this.state.implementationList && this.state.operationList) {
      let project = this.state.implementationList.concat(this.state.operationList);
      let eventList = this.state.events;
      this.setState({ project, eventList, search: null, currentTab: i, expanded: 10 });
    }
  }

  renderExpanded = (data) => {
    if (data != null) {
      if (this.state.expanded < data.length) {
        return <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: 10 }}>
          <Text onPress={() => this.expanded(10)} style={{ color: '#000', fontSize: 14 }}>Read more</Text>
        </View>
      }
    }
  }

  expanded = (more) => {
    this.setState({ isVisibleLoading: true });
    let expanded = this.state.expanded;
    let temp = expanded + more;
    this.setState({ expanded: temp });
    setTimeout(() => {
      this.setState({ isVisibleLoading: false });
    }, 500);
  }

  render() {
    return (
      <Container>
        <Modal
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.setState({ modalVisible: false })}>
          <View style={{ backgroundColor: 'white', position: 'absolute', top: 24, right: 0, width: '50%' }}>
            {this.renderModalHeaderRight()}
          </View>
        </Modal>
        <Header style={{ backgroundColor: '#51288A' }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 5, paddingLeft: 0 }}>
              {/* <Thumbnail square source={logo} style={{ width: '100%', height: '100%' }} /> */}
            </View>
            <View style={{ flex: 3, paddingRight: 10, height: '100%', justifyContent: 'center' }}>
            </View>
            <View style={{ flex: 2 }}>
            </View>
          </View>
        </Header>
        <StatusBar backgroundColor="#4E1679" barStyle="light-content" />
        <Content style={{ backgroundColor: '#FFF' }} refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            backgroundColor={'#51288A'}
            title="Loading..."
          />
        }>
          <Image source={headtitle} style={{ width: '100%', height: 125, resizeMode: 'stretch' }} />
          {this.renderPhoto()}
        </Content>
        <Loading
          isVisible={this.state.isVisibleLoading}
          submit={'info'}
        />
      </Container>
    );
  }
}

export default Home;
