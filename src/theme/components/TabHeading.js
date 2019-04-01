import variable from "./../variables/platform";

export default (variables = variable) => {
  const platform = variables.platform;

  const tabHeadingTheme = {
    flexDirection: "row",
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    ".scrollable": {
      paddingHorizontal: 20,
      flex: platform === "android" ? 0 : 1,
      minWidth: platform === "android" ? undefined : 60
    },
    "NativeBase.Text": {
      color: "#401760",
      marginHorizontal: 7
    },
    "NativeBase.Icon": {
      color: "#401760"
    },
    ".active": {
      borderBottomColor: "#401760",
      borderBottomWidth: 2,
      zIndex: 2,
      "NativeBase.Text": {
        color: "#401760",
        fontWeight: "600"
      },
      "NativeBase.Icon": {
        color: "#401760"
      }
    }
  };

  return tabHeadingTheme;
};
