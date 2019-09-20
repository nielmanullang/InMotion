import { Body, Container, Content, Header, Icon, Input, Left, Right, Text } from "native-base";
import { default as React } from "react";
import { ActivityIndicator, Dimensions, FlatList, Image, RefreshControl, StatusBar, View } from "react-native";
import Loading from '../../theme/components/Loading';
import { apiCall } from './../../redux/actions/commonAction';
import endPoint from './../../redux/service/endPoint';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
class Home extends React.Component {
  static navigationOptions = { header: null }

  state = {
    isRefreshing: false,
    isVisibleLoading: false,
    githubUsers: [],
    perpage: 10,
    onEndReachedCalledDuringMomentum: true,
    loading: false,
    searchText: null
  }

  componentWillMount = () => {
    console.log('a');
    this.getLoadInbox()
  }

  onMomentumScrollBegin = () => {
    let perpage = this.state.perpage
    this.setState({ onEndReachedCalledDuringMomentum: false, perpage: perpage + 10 }, () => {
      this.getLoadInbox()
    })
  }

  getLoadInbox = () => {
    console.log('b');
    let sort = 'stars';
    let order = 'desc';
    let perpage = this.state.perpage;
    let q = this.state.searchText
    let api
    if (q != '' && q != null) {
      console.log('c');
      sort = 'stars';
      order = 'desc';
      perpage = this.state.perpage;
      api = endPoint.searchUsers + '?sort' + sort + '&order=' + order + '&per_page=' + perpage + '&q=' + q;
    } else {
      console.log('d');
      sort = 'stars';
      order = 'desc';
      perpage = this.state.perpage;
      api = endPoint.users + '?sort' + sort + '&order=' + order + '&per_page=' + perpage;
    }
    console.log('sort',sort);
    console.log('order',order);
    console.log('perpage',perpage);
    console.log('api',api);
    const header = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    apiCall.get(api, header, this.responeApi);
  }

  responeApi = (callback) => {
    console.log(callback);
    let githubUsers = [];
    this.setState({ isRefreshing: false });
    if (callback && callback.status == 200) {
      if (this.state.searchText != '' && this.state.searchText != null) {
        if (callback.data.items.length > 0) {
          githubUsers = callback.data.items;
          if (this.state.isRefresh) {
            this.setState({
              githubUsers,
              isRefresh: false
            })
          } else {
            this.setState({ githubUsers });
          }
        } else {
          if (this.state.isRefresh) {
            this.setState({
              githubUsers: callback.data.items
            })
          }
        }
      } else {
        if (callback.data.length > 0) {
          githubUsers = callback.data;
          if (this.state.isRefresh) {
            this.setState({
              githubUsers,
              isRefresh: false
            })
          } else {
            this.setState(state => ({
              githubUsers: [...state.githubUsers, ...githubUsers]
            }));
          }
        } else {
          if (this.state.isRefresh) {
            this.setState({
              githubUsers: callback.data
            })
          }
        }
      }
    }
    this.setState({ loading: false });
  }

  _filter = (text) => {
    this.setState({ searchText: text, isRefresh: true, perpage: 10 }, () => { this.getLoadInbox() })
  }

  _onRefresh = () => {
    this.setState({ isRefreshing: true, isRefresh: true, perpage: 10 }, () => { this.getLoadInbox() })
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#868686' }}>
          <Left />
          <Body>
            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Github Users</Text>
          </Body>
          <Right />
        </Header>
        <StatusBar backgroundColor="#4E1679" barStyle="light-content" />
        <Content style={{ backgroundColor: '#FFF' }} refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            backgroundColor={'#868686'}
            title="Loading..."
          />
        }>
          <View>
            <View horizontalRow wrap horizontal={true}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Icon name='search' style={{ fontSize: 18, color: '#8e8e93', marginLeft: 10 }} />
                <Input
                  placeholder="Search By Username"
                  placeholderTextColor="#8e8e93"
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  keyboardType="default"
                  selectionColor="#8e8e93"
                  onChangeText={(text) => this._filter(text)}
                />
              </View>
              <View style={{ height: HEIGHT * 0.78 }}>
                {this.state.githubUsers.length == 0
                  ? <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: HEIGHT * 0.75 }}>
                    <Icon type='FontAwesome' name='inbox' style={{ width: WIDTH * 0.09, height: WIDTH * 0.09, color: '#C7C7C7', fontSize: 40 }} />
                    <Text>No Data</Text>
                  </View>
                  : <FlatList
                    data={this.state.githubUsers}
                    keyExtractor={(x, i) => i.toString()}
                    onEndThreshold={0.5}
                    onMomentumScrollBegin={this.onMomentumScrollBegin}
                    ListFooterComponent={() =>
                      this.state.loading
                        ? <ActivityIndicator size="large" animating />
                        : null}
                    renderItem={({ item, i }) =>
                      <View style={{ flexDirection: 'row' }}>
                        <View>
                          <View style={{ padding: 15 }}>
                            <Image source={{ uri: item.avatar_url }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                          </View>
                        </View>
                        <View style={{ padding: 15, alignContent: 'center', alignItems: 'center' }}>
                          <Text listTitle style={{ textAlign: 'center' }}>{item.login}</Text>
                        </View>
                      </View>
                    }
                  />}
              </View>
            </View>
          </View>
        </Content>
        <Loading
          isVisible={this.state.isVisibleLoading}
        />
      </Container>
    );
  }
}

export default Home;
