import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Header, Left, Body, Right, Text, View, Icon } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
  
class HeaderProject extends React.Component {
    render() {
        return (
            <LinearGradient colors={['#7C48B5', '#51288A']} angle={90} style={{flex: 1, overflow: 'hidden', borderRadius: 5}}>
                <View style={{padding: 20}}>
                <View>
                    <Text style={{color: '#FFFFFF', fontSize: 12, fontWeight: 'bold'}}>PROJECT NAME</Text>
                    <Text style={{color: '#FFFFFF', fontSize: 12}}>{this.props.projectName}</Text>
                </View>
                <View style={{flexDirection: "row", paddingTop: 15}}>
                    <View style={{flexDirection: "column", marginRight: 15}}>
                        <Text style={{color: '#FFFFFF', fontSize: 12, fontWeight: 'bold'}}>PROJECT NUMBER</Text>
                        <Text style={{color: '#FFFFFF', fontSize: 12}}>{this.props.projectNumber}</Text>
                    </View>
                    <View style={{flexDirection: "column"}}>
                        <Text style={{color: '#FFFFFF', fontSize: 12, fontWeight: 'bold'}}>CLIENT</Text>
                        <Text style={{color: '#FFFFFF', fontSize: 12}}>{this.props.customerName}</Text>
                    </View>
                    </View>
                </View>
            </LinearGradient>
        )
    }
}

export default HeaderProject;