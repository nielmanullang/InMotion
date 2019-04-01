import React from 'react';
import { StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Text, View, Form, Icon } from 'native-base';
import Modal from 'react-native-modal';

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        padding: 10,
    },
    coverBtn: {
        backgroundColor: '#fff',
        marginTop: 15,
        borderRadius: 3,
    },
    content: {
        alignItems: 'center',
        // backgroundColor: '#fff', 
        marginTop: 15,
        borderRadius: 3,
        width: '100%',
        paddingTop: 20,
        paddingBottom: 20
    },
    btnNext: {
        flexDirection: 'row',
        padding: 10,
    },
    btnNextLink: {
        marginTop: 15,
        width: '100%',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFA53C',
        borderRadius: 5
    },
    btnNextText: {
        color: '#000',
        fontWeight: 'bold'
    }
});

class ProjectSubmit extends React.Component {

    renderAdd = () => {
        if (this.props.resultMenu && this.props.resultMenu.length > 0) {
            return this.props.resultMenu.map((data, i) => {
                if (data) {
                    return <TouchableOpacity
                        key={i}
                        onPress={() => this.props._submit(data && data.route)}
                        style={styles.btnNextLink}
                    >
                        <Text style={{ color: '#FFF' }}>{data && data.title}</Text>
                    </TouchableOpacity>
                }
            })
        }
    }

    render() {
        return (
            <Modal
                isVisible={this.props.modalVisible}
                onBackdropPress={() => this.props._isVisible(false)}
                onRequestClose={() => this.props._isVisible(false)}
                style={{ justifyContent: 'flex-start' }}
            >
                <StatusBar backgroundColor="#4E1679" barStyle="light-content" />
                <View horizontalColumn style={{ alignItems: 'center', paddingBottom: 42 }}>
                    {/* <View style={styles.content}> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ flex: 3, paddingLeft: 10 }}>
                        </View>
                        <View style={{ flex: 3, paddingLeft: 10 }}>
                        </View>
                        <View style={{ flex: 4, paddingLeft: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            {this.renderAdd()}
                            {/* <TouchableOpacity onPress={() => this.props._isVisible(false)} style={{height: 74, width: 74, borderRadius: 37, marginLeft:77, marginTop: 14, backgroundColor: '#FFF', borderColor: '#3d3d3d', borderWidth: 0.2, justifyContent: 'center', alignContent: 'center', alignItems: 'center', shadowOffset: { width: 3, height: 3 }, shadowColor: '3d3d3d', shadowOpacity: 0.2}}>
                                <Icon style={{fontSize: 25, padding: 25}} name='close'/>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

export default ProjectSubmit;