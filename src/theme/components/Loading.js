import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Text, View } from 'native-base';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'absolute', 
        height: '100%', 
        width: '100%', 
        backgroundColor: '#000', 
        opacity: 0.8
    },
    cover: {
        alignItems: 'center', 
        justifyContent: 'center'
    },
    loading: {
        marginBottom: 10
    },
    text: {
        color: '#fff', 
        fontSize: 13
    }
});

class Loading extends React.Component {

    render() {
        return (
            this.props.isVisible && <View style={styles.container}>
                <View horizontalColumn style={styles.cover}>
                    <ActivityIndicator size="large" color="#CE9D3C" style={styles.loading}/>
                        {this.props.submit=='submit' && <Text style={styles.text}>Submitting Your Request</Text>}
                </View>
            </View>
        )
    }
}

export default Loading;