import React, { Component } from "react";
import { Container, Header, Content, Icon, Right, Text, CardItem, List, Left, Toast, View } from "native-base";
import { Image, TouchableOpacity, Keyboard, TextInput, StatusBar } from "react-native";
import styles from "./styles";
import { getAsyncStoreSave, resetNavigation, apiCall } from '../../redux/actions/commonAction';
import endPoint from '../../redux/service/endPoint';
import PhotoUploadPicker from './PhotoUploadPicker';
import ImagePicker from 'react-native-image-crop-picker';
import Loading from '../../theme/components/Loading';
import { convertToLetterCase } from '../../theme/variables/convert';
import { uiAvatars } from '../../../app.json';

class Profile extends Component {
  static navigationOptions = { header: null }

  state = {
    error: false,
    myProfile: null,
    dataUser: null,
    modalPhotoUploadVisible: false,
    listPhotoUpload: [
      {
        'value': 'Gallery'
      },
      {
        'value': 'Camera'
      },
      {
        'value': 'Remove Photo'
      }
    ],
    isVisibleLoading: false,
    refresh: false,
  }

  componentWillMount = () => {
    let dataUser = this.props.navigation.state.params.dataUser;
    this.setState({ dataUser: dataUser }, this.loadScreen(dataUser));
  }

  loadScreen = (dataUser) => {
    const api = endPoint.getProfile;
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
      this.setState({
        myProfile: callback.data.data[0]
      });
    }
  }

  _isVisiblePhotoUpload = (visible) => {
    Keyboard.dismiss()
    this.setState({ modalPhotoUploadVisible: visible })
  }

  renderListPhotoUpload = () => {
    return this.state.listPhotoUpload.map((data, i) => {
      return <TouchableOpacity
        key={i}
        onPress={() => this.props._linkToUploadMethod(data)}
      >
        <Text style={styles.btnNextText}>{data.value}</Text>
      </TouchableOpacity>
    })
  }

  _linkToUploadMethod = (item) => {
    Keyboard.dismiss()
    if (item.value == 'Gallery') {
      this._isVisiblePhotoUpload(false)
      setTimeout(() => {
        //your code to be executed after 1 second
        this._openGallery()
      }, 500);
    } else if ((item.value == 'Camera')) {
      this._isVisiblePhotoUpload(false)
      setTimeout(() => {
        //your code to be executed after 1 second
        this._openCamera()
      }, 800);
    } else {
      this._isVisiblePhotoUpload(false)
      setTimeout(() => {
        //your code to be executed after 1 second
        this._removePhoto()
      }, 500);
    }
  }

  _openGallery = () => {
    Keyboard.dismiss()
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      isVideo: false,
      cropping: false,
      cropperCircleOverlay: false,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.5,
      includeExif: true,
      mediaType: 'photo'
    }).then(image => {
      this.setState({ isVisibleLoading: true });
      const formData = new FormData();
      formData.append('photo', {
        //filename, fileResource, fileType
        uri: image.path,
        type: image.mime,
        name: image.filename != undefined ? image.filename : 'jpg'
      });
      const api = endPoint.uploadPhotoProfile;
      const header = {
        headers: {
          'Content-Type': 'multipart/form-data',
          TKID: this.state.dataUser.TKID,
          JDCID: this.state.dataUser.JDCID
        },
      }
      apiCall.post(api, formData, this.getResponseImage, header, image);
    }).catch(e => {
      // Alert.alert(e.message ? e.message : e);
    });
  }

  _openCamera = () => {
    Keyboard.dismiss()
    ImagePicker.openCamera({
      cropping: false,
      width: 500,
      height: 500,
      includeExif: true,
      compressImageQuality: 0.5,
      mediaType: 'photo'
    }).then(image => {
      this.setState({ isVisibleLoading: true })
      const formData = new FormData();
      formData.append('photo', {
        //filename, fileResource, fileType
        uri: image.path,
        type: image.mime,
        name: image.filename != undefined ? image.filename : 'jpg'
      });
      const api = endPoint.uploadPhotoProfile;
      const header = {
        headers: {
          'Content-Type': 'multipart/form-data',
          TKID: this.state.dataUser.TKID,
          JDCID: this.state.dataUser.JDCID
        },
      }
      apiCall.post(api, formData, this.getResponseImage, header, image);
    }).catch(e => {
      // Alert.alert(e.message ? e.message : e);
    });
  }

  _removePhoto = () => {
    let myProfile = this.state.myProfile;
    myProfile.urlPhoto = null,
      this.setState({ myProfile: myProfile, refresh: true }, this.updateRemovePhotoMyProfile());
  }

  getResponseImage = (callback) => {
    this.setState({ isVisibleLoading: false });
    if (callback != null && callback.data.status == 1) {
      let myProfile = this.state.myProfile;
      myProfile.urlPhoto = callback.data.message.fileUrl,
        this.setState({ myProfile: myProfile, refresh: true }, this.updateMyProfile());
    } else {
      Toast.show({ text: callback.data.message.message, position: "bottom" });
    }
  }

  _logout = () => {
    getAsyncStoreSave('dataUser', null, () => {
      getAsyncStoreSave('memberList', null, () =>
        resetNavigation('Login', this.props.navigation))
    });
  }

  _popUpEvent = () => {
    this.props.navigation.navigate('GalleryPopUp', { image: this.state.myProfile.urlPhoto != null ? this.state.myProfile.urlPhoto : uiAvatars + this.state.myProfile.fullname })
  }

  renderPhoto = () => {
    console.log('this.state.myProfile',this.state.myProfile);
    if (this.state.myProfile != null) {
      return <View style={{ flexDirection: "column", justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingTop: 5 }}>
        <TouchableOpacity onPress={() => this._popUpEvent()}>
          {this.state.myProfile.urlPhoto && this.state.myProfile.urlPhoto.length > 43 ?
            <Image style={{ width: 80, height: 80, marginBottom: 10, borderRadius: 40, borderColor: '#E5E5E5', borderWidth: 2 }} source={{ uri: this.state.myProfile.urlPhoto }} />
            :
            <Image source={{ uri: uiAvatars + this.state.myProfile.fullname }} style={{ width: 80, height: 80, marginBottom: 10, borderRadius: 40, borderColor: '#E5E5E5', borderWidth: 2 }} />
          }
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._isVisiblePhotoUpload(true)}>
          <View style={{ marginTop: -30, marginLeft: 50, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#51288A', borderRadius: 20 }}>
            <Icon type="FontAwesome" name="camera" style={{ color: '#FFF', fontSize: 14, padding: 10 }} />
          </View>
        </TouchableOpacity>
        <Text style={styles.name}>{this.state.myProfile.fullname != null ? convertToLetterCase(this.state.myProfile.fullname) : null}</Text>
        <Text>{this.state.myProfile != null ? this.state.myProfile.email : null}</Text>
      </View>
    }
  }

  _changeMobilePhone = (value) => {
    let myProfile = this.state.myProfile;
    myProfile.mobilePhone = value.nativeEvent.text;
    this.setState({ myProfile });
  }

  _changePhone = (value) => {
    let myProfile = this.state.myProfile;
    myProfile.phone = value.nativeEvent.text;
    this.setState({ myProfile });
  }

  _changeAddress = (value) => {
    let myProfile = this.state.myProfile;
    myProfile.address = value.nativeEvent.text;
    this.setState({ myProfile });
  }

  updateRemovePhotoMyProfile = () => {
    this.setState({ isVisibleLoading: true })
    let header = {
      headers: {
        'Content-Type': 'application/json',
        TKID: this.state.dataUser.TKID,
        JDCID: this.state.dataUser.JDCID
      }
    }
    api = endPoint.updateProfile;
    data = {
      vid: this.state.myProfile.vid
    };

    apiCall.post(api, data, this.getUpdateProfile, header);
  }

  updateMyProfile = () => {
    this.setState({ isVisibleLoading: true });
    let header = {
      headers: {
        'Content-Type': 'application/json',
        TKID: this.state.dataUser.TKID,
        JDCID: this.state.dataUser.JDCID
      }
    }
    api = endPoint.updateProfile;
    data = {
      vid: this.state.myProfile.vid,
      address: this.state.myProfile.address,
      phone: this.state.myProfile.phone,
      mobilePhone: this.state.myProfile.mobilePhone,
      urlPhoto: this.state.myProfile.urlPhoto
    };

    apiCall.post(api, data, this.getUpdateProfile, header);
  }

  getUpdateProfile = (callback) => {
    if (callback != null && callback.data.status == 1) {
      Toast.show({ text: callback.data.message.message, position: "bottom" });
    } else {
      Toast.show({ text: callback.data.message.message, position: "bottom" });
    }
    this.setState({ isVisibleLoading: false })
  }

  goBack = () => {
    if (this.state.refresh == true) {
      this.props.navigation.state.params.onNavigateBack('refresh');
      this.props.navigation.goBack();
    } else {
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#51288A', borderBottomLeftRadius: 25, overflow: 'hidden' }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <TouchableOpacity
                onPress={() => this.goBack()}
                style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
                <Icon name="arrow-back" style={{ color: '#FFF' }} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 8, paddingRight: 10, height: '100%', justifyContent: 'center' }}>
              <Text style={{ color: '#FFF', fontSize: 22, fontWeight: 'bold' }}>My Profile</Text>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => this.updateMyProfile()}
                style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
                <Icon type='MaterialIcons' name='save' style={{ color: '#FFF' }} />
              </TouchableOpacity>
            </View>
          </View>
        </Header>
        <StatusBar backgroundColor="#4E1679" barStyle="light-content" />
        <Content>
          {this.renderPhoto()}
          <List>
            <CardItem footer bordered style={{ backgroundColor: '#E5E5E5', height: 60, marginTop: 5 }}>
              <Left>
                <Text>PERSONAL INFORMATION</Text>
              </Left>
            </CardItem>
            <CardItem header bordered>
              <Left>
                <Text>Mobile Phone</Text>
              </Left>
              <Right>
                <TextInput
                 
                  textAlign={'right'}
                  value={this.state.myProfile != null ? this.state.myProfile.mobilePhone : null}
                  placeholder={'Mobile Phone'}
                  keyboardType='numeric'
                  placeholderTextColor={'#929090'}
                  underlineColorAndroid='transparent'
                  onChange={mobilePhone => this._changeMobilePhone(mobilePhone)}
                />
              </Right>
            </CardItem>
            <CardItem header bordered>
              <Left>
                <Text>Phone</Text>
              </Left>
              <Right>
                <TextInput
                 
                  textAlign={'right'}
                  value={this.state.myProfile != null ? this.state.myProfile.phone : null}
                  placeholder={'Phone'}
                  keyboardType='numeric'
                  placeholderTextColor={'#929090'}
                  underlineColorAndroid='transparent'
                  onChange={phone => this._changePhone(phone)}
                />
              </Right>
            </CardItem>
            <CardItem header bordered>
              <Left>
                <Text>Address</Text>
              </Left>
              <Right>
                <TextInput
                 
                  multiline
                  textAlign={'right'}
                  value={this.state.myProfile != null ? this.state.myProfile.address : null}
                  placeholder={'Address'}
                  placeholderTextColor={'#929090'}
                  underlineColorAndroid='transparent'
                  onChange={address => this._changeAddress(address)}
                />
              </Right>
            </CardItem>
          </List>
          <List>
            <CardItem footer bordered style={{ backgroundColor: '#E5E5E5', height: 60 }}>
              <Left>
                <Text>ORGANIZATION</Text>
              </Left>
            </CardItem>
            <CardItem header bordered>
              <Left>
                <Text>NPK</Text>
              </Left>
              <Right>
                <Text style={{ textAlign: 'right' }}>{this.state.myProfile != null ? this.state.myProfile.npk : null}</Text>
              </Right>
            </CardItem>
            <CardItem header bordered>
              <Left>
                <Text>Department</Text>
              </Left>
              <Right>
                <Text style={{ textAlign: 'right' }}>{this.state.myProfile != null ? this.state.myProfile.departmentName : null}</Text>
              </Right>
            </CardItem>
            <CardItem header bordered>
              <Left>
                <Text>Company</Text>
              </Left>
              <Right>
                <Text style={{ textAlign: 'right'}}>PT AGIT</Text>
              </Right>
            </CardItem>
            <CardItem header bordered>
              <Left>
                <Text>Direct Head</Text>
              </Left>
              <Right>
                <Text style={{ textAlign: 'right'}}>{this.state.myProfile != null ? this.state.myProfile.managementName : null}</Text>
              </Right>
            </CardItem>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, paddingBottom: 15 }}>
              <View style={{ flex: 3 }}>
              </View>
              <View style={{ flex: 6, height: '100%', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this._logout()}>
                  <Text style={{ textAlign: 'center', fontSize: 14, color: 'red'}}>LOG OUT</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 3, paddingRight: 10 }}>
                <Text style={{ textAlign: 'right', fontSize: 12, color: '#000'}}>Version 1.1.1</Text>
              </View>
            </View>
          </List>
        </Content>
        <PhotoUploadPicker
          listPhotoUpload={this.state.listPhotoUpload}
          modalVisible={this.state.modalPhotoUploadVisible}
          _isVisible={this._isVisiblePhotoUpload}
          _linkToUploadMethod={this._linkToUploadMethod}
        />
        <Loading
          isVisible={this.state.isVisibleLoading}
          submit={'submit'}
        />
      </Container>
    );
  }
}

export default Profile;
