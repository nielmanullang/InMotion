const React = require("react-native");
const { Dimensions, Platform } = React;
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  logoContainer: {
    flex: 1,
    marginTop: HEIGHT / 8,
    marginBottom: 30
  },
  logo: {
    position: "absolute",
    left: Platform.OS === "android" ? 40 : 50,
    top: Platform.OS === "android" ? 35 : 60,
    width: 280,
    height: 100
  },
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5
  },
  mb: {
    marginBottom: 15,
    borderBottomLeftRadius: 25, 
    borderBottomRightRadius: 25, 
    overflow: 'hidden',
    backgroundColor: '#571987'
  },
  button: {
    justifyContent: 'center', 
    alignContent: 'center', 
    alignItems: 'center',
    backgroundColor: "#01B3BD", 
    borderRadius: 4,
    height: 28,
    width: 100
  },
  linearGradient: {
    height: 75,
    flex: 1,
    overflow: 'hidden',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  searchView: {
    backgroundColor: '#F8F6F9',
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    borderColor: '#F15A3A',
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 5,
    height: 40
  },
  searchViewActive: {
    backgroundColor: '#F8F6F9',
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    borderColor: '#F15A3A',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    height: 40,
    marginLeft: 15,
    marginRight: 15
  },
  linearGradientEvent: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 5
  },
};
