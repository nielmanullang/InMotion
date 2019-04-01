import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Text, View, Footer } from 'native-base';
import Modal from 'react-native-modal';
import moment from 'moment';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    contentDisModal: {
        backgroundColor: "#fff", 
        width: WIDTH*0.9,
    },
    titleDisModal: {
        marginTop: 30,
        marginLeft: WIDTH*0.075,
        justifyContent: 'center', 
        alignContent: 'center', 
        alignItems: 'center',
        marginBottom: 30,
    },
    descDisModal: { 
        marginLeft: WIDTH*0.075,
        marginRight: WIDTH*0.05,
    },
    descDisListModal: {
        marginBottom: 15,
        marginLeft: WIDTH*0.075,
        marginRight: WIDTH*0.05,
    },
    footerDisModal:{
        width: "100%",
        backgroundColor: '#fff',
        borderTopColor: '#E5E5E5',
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'flex-end',
    },
    footerDisBtnModal: {
        marginRight: WIDTH*0.075,
    },
    footerDisText: {
        color: '#CE9D3C'
    },
    footerDisModal2: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: '#EEEEEE',
        borderTopWidth: 1,
    },
    footerDisText2: {
        color: '#000'
    },
});

class ConfirmationCancel extends React.Component {

    render() {
        return (
            <Modal
                isVisible={this.props.modalVisible}
                onBackdropPress={() => this.props._isVisible(false)}
                onRequestClose={() => this.props._isVisible(false)}
                >
                <View style={styles.contentDisModal}>
                    <View>
                        <View style={styles.titleDisModal}>
                            <Text title>CONFIRMATION</Text>
                        </View>
                        <View style={{height: HEIGHT*0.20}}>
                            <ScrollView>
                                <View padderBottom>
                                <Text style={styles.descDisModal}>
                                    Are you sure you want to cancel Event: { this.props.detailEvent.subject }?
                                </Text>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                    <Footer>
                    <TouchableOpacity
                        onPress={() => this.props._isVisible(false)}
                        style={styles.footerDisModal2}
                    >
                        <Text autoCapitalize="words" style={styles.footerDisText2}>
                        NO
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props._goToApiCancel()}
                        style={styles.footerDisModal2}
                    >
                        <Text autoCapitalize="words" style={styles.footerDisText2}>
                        YES
                        </Text>
                    </TouchableOpacity>
                    </Footer>
                </View>
            </Modal>
        )
    }
}

export default ConfirmationCancel;