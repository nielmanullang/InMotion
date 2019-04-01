import {Dimensions} from "react-native";
const {width: WIDTH} = Dimensions.get('window');

export default {
  backgroundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:null,
    height:null
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50
  },
  logo: {
    width: 120,
    height: 50
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.5
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#571745',
    marginHorizontal: 25,
    overflow: 'hidden'
  },
  inputIcon: {
    position: 'absolute',
    top: 10,
    left: 37
  },
  inputRoot: {
    marginTop: '50%'
  },
  inputContainer: {
    marginTop: 10
  },
  btnEye: {
    position: 'absolute',
    top: 10,
    right: 37,
    color: '#F1732D'
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 10,
    backgroundColor: '#F15A3A',
    justifyContent: 'center',
    marginTop: 20
  },
  text: {
    color: '#FEEFEB',
    fontSize: 16,
    textAlign: 'center'
  }
};
