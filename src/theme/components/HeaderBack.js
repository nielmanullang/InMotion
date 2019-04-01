import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Header, Left, Body, Right, Text, View, Icon } from 'native-base';
  
class HeaderBack extends React.Component {
    render() {
        return (
            <Header style={{backgroundColor: '#51288A', borderBottomLeftRadius: 25, overflow: 'hidden'}}>
                <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, paddingLeft: 10 }}>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.goBack(null)}
                            style={{width:'100%',height:'100%',justifyContent:'center'}}>
                            <Icon name="arrow-back" style={{color: '#FFF'}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 6, paddingRight: 10, height:'100%', justifyContent:'center' }}>
                        {this.props.title!=undefined &&
                            <Text style={{color: '#FFF', fontSize: 18, fontWeight: 'bold'}}>{this.props.title}</Text>
                        }
                    </View>
                    <View style={{ flex: 2, paddingRight: 10 }}>
                        {this.props.title!=undefined &&
                            <Text style={{textAlign:'center',width:'100%'}}>{this.props.right}</Text>
                        }
                    </View>
                </View>
            </Header>
        )
    }
}

export default HeaderBack;
