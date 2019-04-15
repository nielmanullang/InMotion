import React, { Component } from "react";
import { Container, Content, Icon, Right, Text, CardItem, List, Left } from "native-base";
import { Image, TouchableOpacity, View, Linking, StatusBar } from "react-native";
import styles from "./styles";
import { convertToLetterCase } from '../../theme/variables/convert';
import HeaderBack from '../../theme/components/HeaderBack';

class Profile extends Component {
  static navigationOptions = { header: null }

  state = {
    item: null,
  }

  componentWillMount = () => {
    let item = this.props.navigation.state.params.item;
    this.setState({ item });
  }

  _popUpEvent = () => {
    this.props.navigation.navigate('GalleryPopUp', { image: this.state.item && this.state.item.url })
  }

  renderPhoto = () => {
    if (this.state.item != null) {
      return <View style={{ flexDirection: "column", justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingTop: 5 }}>
        <TouchableOpacity onPress={() => this._popUpEvent()}>
          <Image style={{ width: 80, height: 80, marginBottom: 10, borderRadius: 40, borderColor: '#E5E5E5', borderWidth: 2 }} source={{ uri: this.state.item.url }} />
        </TouchableOpacity>
        <Text style={styles.name}>{this.state.item.fullname != null ? convertToLetterCase(this.state.item.fullname) : null}</Text>
        <Text>{this.state.item != null ? this.state.item.email : null}</Text>
        <Text>{this.state.item != null ? this.state.item.positionName : null}</Text>
      </View>
    }
  }

  handleCall = (phoneNo) => {
    let url = "tel:" + phoneNo;
    Linking.openURL(url)
  }

  render() {
    return (
      <Container>
        <HeaderBack
          navigation={this.props.navigation}
          title={'Profile'}
        />
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
                <TouchableOpacity onPress={() => this.handleCall(this.state.item.mobilePhone)}>
                  {this.state.item != null && this.state.item.mobilePhone != null && this.state.item.mobilePhone != '' && <Icon name="phone-square" type="FontAwesome" style={{ color: 'green', fontSize: 14 }}>
                    <Text style={{ textAlign: 'right' }}> {this.state.item != null ? this.state.item.mobilePhone : null}</Text>
                  </Icon>}
                </TouchableOpacity>
              </Right>
            </CardItem>
            <CardItem header bordered>
              <Left>
                <Text>Phone</Text>
              </Left>
              <Right>
                <TouchableOpacity onPress={() => this.handleCall(this.state.item.phone)}>
                  {this.state.item != null && this.state.item.phone != null && this.state.item.phone != '' && <Icon name="phone-square" type="FontAwesome" style={{ color: 'green', fontSize: 14 }}>
                    <Text style={{ textAlign: 'right' }}> {this.state.item != null ? this.state.item.phone : null}</Text>
                  </Icon>}
                </TouchableOpacity>
              </Right>
            </CardItem>
            <CardItem header bordered>
              <Left>
                <Text>Address</Text>
              </Left>
              <Right>
                <Text style={{ textAlign: 'right' }}>{this.state.item != null ? this.state.item.address : null}</Text>
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
                <Text style={{ textAlign: 'right' }}>{this.state.item != null ? this.state.item.npk : null}</Text>
              </Right>
            </CardItem>
            <CardItem header bordered>
              <Left>
                <Text>Department</Text>
              </Left>
              <Right>
                <Text style={{ textAlign: 'right' }}>{this.state.item != null ? this.state.item.departmentName : null}</Text>
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
                <Text>{this.state.item != null ? this.state.item.managementName : null}</Text>
              </Right>
            </CardItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default Profile;
