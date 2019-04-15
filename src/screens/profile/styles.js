import { Dimensions } from 'react-native';
const {width: WIDTH} = Dimensions.get('window');

const buttonwidth = Dimensions.get('screen').width - 110;

export default {
  container: {
    backgroundColor: "#FFF"
  },
  mb10: {
    marginBottom: 10
  },
  profile: {
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  name: {
    color: "#5D3196",
  },
  button: {
    marginTop: 20,
    alignItems:'center',
    width: buttonwidth,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 4
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25
  },
};
