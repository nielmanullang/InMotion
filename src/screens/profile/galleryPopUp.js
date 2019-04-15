import React from 'react';
import { ScrollView, Image, Dimensions, StatusBar } from 'react-native';
import { Container, Content, View } from 'native-base';
import HeaderBack from '../../theme/components/HeaderBack';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class GalleryPopUp extends React.Component {
  static navigationOptions = { header: null }

  componentWillMount = () => {

  }

  galleryImage() {
    return (
      <View>
        <Image source={{ uri: this.props.navigation.state.params.image }} style={{ width: WIDTH, height: WIDTH }} />
      </View>
    )
  }

  render() {
    return (
      <Container black>
        <HeaderBack navigation={this.props.navigation} title={'Photo Profile'} />
        <StatusBar backgroundColor="#4E1679" barStyle="light-content" />
        <Content>
          <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: HEIGHT * 0.8 }}>
            <View style={{ flexDirection: 'row' }}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={true}>
                {this.galleryImage()}
              </ScrollView>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}



export default GalleryPopUp;
