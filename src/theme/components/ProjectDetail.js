import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image, StatusBar } from 'react-native';
import { Text, View, Footer, Left, Right, Card, CardItem, Icon, Body, Header } from 'native-base';
import Modal from 'react-native-modal';
import moment from 'moment';
import { uiAvatars } from '../../../app.json';
import { convertNumberString } from '../../theme/variables/convert';
import LinearGradient from 'react-native-linear-gradient';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    contentDisModal: {
        backgroundColor: "#fff",
        width: WIDTH * 0.9,
    },
    titleDisModal: {
        // flexDirection: 'column',
        marginTop: 30,
        // marginLeft: WIDTH*0.075,
        alignContent: 'center',
        alignItems: 'center'
    },
    descDisModal: {
        marginLeft: WIDTH * 0.075,
        marginRight: WIDTH * 0.05,
    },
    descDisListModal: {
        marginBottom: 15,
        marginLeft: WIDTH * 0.075,
        marginRight: WIDTH * 0.05,
    },
    footerDisModal: {
        width: "100%",
        backgroundColor: '#fff',
        borderTopColor: '#E5E5E5',
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    footerDisBtnModal: {
        marginRight: WIDTH * 0.075,
    },
    footerDisText: {
        color: '#CE9D3C'
    },
    footerDisModal2: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: '#E5E5E5',
        borderTopWidth: 1,
    },
    footerDisText2: {
        color: '#000'
    },
});

class ProjectDetail extends React.Component {

    renderMilestone = () => {
        if (this.props.project.milestoneList != null) {
            return this.props.project.milestoneList.map((data, i) => {
                if (i < this.props.project.milestoneList.length - 1) {
                    return <CardItem key={i} style={{ borderBottomWidth: 0.5, borderLeftWidth: 0.5, borderRightWidth: 0.5, borderColor: '#000' }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ width: '95%' }}>
                                <Text style={{ color: '#525252', fontSize: 12, fontWeight: 'bold' }}>Phase {data.phase}</Text>
                                <Text style={{ color: '#525252', fontSize: 12, marginTop: 5 }}>Plan: {data.dofEndPlan != '' ? moment(new Date(data.dofEndPlan)).format('DD MMM YYYY') : data.dofEndPlan} | Actual: {data.dofEndActual != '' ? moment(new Date(data.dofEndActual)).format('DD MMM YYYY') : data.dofEndActual}</Text>
                            </View>
                        </View>
                    </CardItem>
                } else {
                    return <CardItem key={i} style={{ overflow: 'hidden', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomWidth: 0.5, borderRightWidth: 0.5, borderLeftWidth: 0.5, borderColor: '#000' }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ width: '95%' }}>
                                <Text style={{ color: '#525252', fontSize: 12, fontWeight: 'bold' }}>Phase {data.phase}</Text>
                                <Text style={{ color: '#525252', fontSize: 12, marginTop: 5 }}>Plan: {data.dofEndPlan != '' ? moment(new Date(data.dofEndPlan)).format('DD MMM YYYY') : data.dofEndPlan} | Actual: {data.dofEndActual != '' ? moment(new Date(data.dofEndActual)).format('DD MMM YYYY') : data.dofEndActual}</Text>
                            </View>
                        </View>
                    </CardItem>
                }
            })
        }
    }

    renderHeader = () => {
        if (this.props.title == 'TIMELINE') {
            return <Header style={{ backgroundColor: this.props.color.timeline }}>
                <Left>
                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{this.props.title}</Text>
                </Left>
                <Right>
                    <Icon name="times" type="FontAwesome5" style={{ color: '#FFF' }} onPress={() => this.props._isVisible(false)} />
                </Right>
            </Header>
        } else if (this.props.title == 'BUDGET') {
            return <Header style={{ backgroundColor: this.props.color.budget }}>
                <Left>
                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{this.props.title}</Text>
                </Left>
                <Right>
                    <Icon name="times" type="FontAwesome5" style={{ color: '#FFF' }} onPress={() => this.props._isVisible(false)} />
                </Right>
            </Header>
        } else if (this.props.title == 'RESOURCE') {
            return <Header style={{ backgroundColor: this.props.color.resource }}>
                <Left>
                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{this.props.title}</Text>
                </Left>
                <Right>
                    <Icon name="times" type="FontAwesome5" style={{ color: '#FFF' }} onPress={() => this.props._isVisible(false)} />
                </Right>
            </Header>
        } else {

        }
    }
    renderView = () => {
        if (this.props.title == 'TIMELINE') {
            return <View style={{ padding: 15 }}>
                <Card style={{ marginLeft: 10, marginRight: 10 }}>
                    <View style={{ flexDirection: "row", padding: 15, justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ color: '#828282', fontSize: 14, marginLeft: 10 }}>Progress GAP</Text>
                            <Text style={{ color: '#828282', fontSize: 14, marginLeft: 10 }}>Baseline</Text>
                        </View>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ color: '#828282', fontSize: 16, marginLeft: 10 }}>{this.props.project.scurveGap != null ? this.props.project.scurveGap + ' %' : '-'}</Text>
                            <Text style={{ color: '#828282', fontSize: 16, marginLeft: 10 }}>{this.props.project.baselineScurve}</Text>
                        </View>
                    </View>
                </Card>
                <Card transparent style={{ marginTop: 10, paddingLeft: 15, paddingRight: 15 }}>
                    <LinearGradient colors={['#FFA53C', '#EFC519']} angle={90} style={{ flex: 1, overflow: 'hidden', borderRadius: 5 }}>
                        <View style={{ flexDirection: "row", padding: 15, justifyContent: "space-between" }}>
                            <Text style={{ color: '#FFFFFF' }}>MILESTONE</Text>
                            <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{this.props.project.milestoneList.length}</Text>
                        </View>
                    </LinearGradient>
                    {this.renderMilestone()}
                </Card>
            </View>
        } else if (this.props.title == 'BUDGET') {
            let budgetInformation = this.props.project.budgetInformation;
            return <View>
                <Card style={{ marginLeft: 10, marginRight: 10 }}>
                    <View style={{ flexDirection: "row", padding: 15, justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ color: '#828282', fontSize: 18, marginLeft: 10, fontWeight: 'bold' }}>Mandays</Text>
                            <Text style={{ color: '#828282', fontSize: 18, marginLeft: 10 }}>Actual</Text>
                            <Text style={{ color: '#828282', fontSize: 18, marginLeft: 10 }}>Plan</Text>
                        </View>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ color: '#828282', fontSize: 18, marginLeft: 10 }}>{budgetInformation.totalMandaysCostPlan != 0 ? parseFloat(budgetInformation.totalMandaysCostActual / budgetInformation.totalMandaysCostPlan * 100).toFixed(2) + ' %' : 'No Data'}</Text>
                            <Text style={{ color: '#828282', fontSize: 18, marginLeft: 10 }}>IDR {convertNumberString(budgetInformation.totalMandaysCostActual)}</Text>
                            <Text style={{ color: '#828282', fontSize: 18, marginLeft: 10 }}>IDR {convertNumberString(budgetInformation.totalMandaysCostPlan)}</Text>
                        </View>
                    </View>
                </Card>
                <Card style={{ marginLeft: 10, marginRight: 10 }}>
                    <View style={{ flexDirection: "row", padding: 15, justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ color: '#828282', fontSize: 18, marginLeft: 10, fontWeight: 'bold' }}>Overhead</Text>
                            <Text style={{ color: '#828282', fontSize: 18, marginLeft: 10 }}>Actual</Text>
                            <Text style={{ color: '#828282', fontSize: 18, marginLeft: 10 }}>Plan</Text>
                        </View>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ color: '#828282', fontSize: 18, marginLeft: 10 }}>{budgetInformation.totalOverheadPlan != 0 ? parseFloat(budgetInformation.totalOverheadActual / budgetInformation.totalOverheadPlan * 100).toFixed(2) + ' %' : 'No Data'}</Text>
                            <Text style={{ color: '#828282', fontSize: 18, marginLeft: 10 }}>IDR {convertNumberString(budgetInformation.totalOverheadActual)}</Text>
                            <Text style={{ color: '#828282', fontSize: 18, marginLeft: 10 }}>IDR {convertNumberString(budgetInformation.totalOverheadPlan)}</Text>
                        </View>
                    </View>
                </Card>
                <Card style={{ marginLeft: 10, marginRight: 10 }}>
                    <View style={{ flexDirection: "row", padding: 15, justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ color: '#828282', fontSize: 18, marginLeft: 10, fontWeight: 'bold' }}>Total Cost</Text>
                            <Text style={{ color: '#828282', fontSize: 18, marginLeft: 10 }}>Actual</Text>
                            <Text style={{ color: '#828282', fontSize: 18, marginLeft: 10 }}>Plan</Text>
                        </View>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ color: '#828282', fontSize: 18, marginLeft: 10 }}>{budgetInformation.budgetPlan != 0 ? parseFloat(budgetInformation.budgetActual / budgetInformation.budgetPlan * 100).toFixed(2) + ' %' : 'No Data'}</Text>
                            <Text style={{ color: '#828282', fontSize: 18, marginLeft: 10 }}>IDR {convertNumberString(budgetInformation.budgetActual)}</Text>
                            <Text style={{ color: '#828282', fontSize: 18, marginLeft: 10 }}>IDR {convertNumberString(budgetInformation.budgetPlan)}</Text>
                        </View>
                    </View>
                </Card>
            </View>
        } else if (this.props.title == 'RESOURCE') {
            let resourceInformation = this.props.project.resourceInformation;
            return <View>
                <Card style={{ marginLeft: 10, marginRight: 10 }}>
                    <CardItem>
                        <Body>
                            <Text style={{ color: "#7644B0", fontSize: 19, fontWeight: 'bold' }}>Total Consultant {resourceInformation.resourcesJuniorPlan + resourceInformation.resourcesMiddlePlan + resourceInformation.resourcesSeniorPlan}/{resourceInformation.resourcesJuniorActual + resourceInformation.resourcesMiddleActual + resourceInformation.resourcesSeniorActual}</Text>
                        </Body>
                    </CardItem>
                    <View style={{ flexDirection: "row", paddingLeft: 15, paddingRight: 15, paddingBottom: 15, justifyContent: "space-between" }}>
                        <View style={{ paddingRight: 15 }}>
                            <Text style={{ color: '#828282', fontSize: 12, marginLeft: 10 }}>Junior</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: "#3B3B3B", fontSize: 12 }}>{resourceInformation.resourcesJuniorPlan}/{resourceInformation.resourcesJuniorActual}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ color: '#828282', fontSize: 12 }}>Middle</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: "#3B3B3B", fontSize: 12 }}>{resourceInformation.resourcesMiddlePlan}/{resourceInformation.resourcesMiddleActual}</Text>
                            </View>
                        </View>
                        <View style={{ paddingLeft: 15 }}>
                            <Text style={{ color: '#828282', fontSize: 12 }}>Senior</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: "#3B3B3B", fontSize: 12 }}>{resourceInformation.resourcesSeniorPlan}/{resourceInformation.resourcesSeniorActual}</Text>
                            </View>
                        </View>
                    </View>
                </Card>
                {this.props.project.memberList.map((data, i) => {
                    if (data.url != null && data.url != '') {
                        memberPhoto = <Image style={{ width: 60, height: 60, marginBottom: 3, borderRadius: 5, borderColor: '#E5E5E5', borderWidth: 2 }} source={{ uri: data.url }} />;
                    } else {
                        memberPhoto = <Image style={{ width: 60, height: 60, marginBottom: 3, borderRadius: 5, borderColor: '#E5E5E5', borderWidth: 2 }} source={{ uri: uiAvatars + data.fullname }} />
                    }
                    return <View key={i} style={{ backgroundColor: '#571987', borderBottomLeftRadius: 11, borderTopLeftRadius: 11, overflow: 'hidden', marginBottom: 10, paddingRight: 5, marginLeft: 5, marginRight: 10 }}>
                        <View style={{ backgroundColor: '#F6EEFA', borderBottomLeftRadius: 10, borderTopLeftRadius: 10, overflow: 'hidden' }}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ paddingLeft: 5, paddingRight: 5 }}>
                                    {memberPhoto}
                                </View>
                                <View>
                                    <Text>{data.fullname != null ? data.fullname : '-'}</Text>
                                    <Text>{data.levelName != null ? data.levelName : '-'}</Text>
                                    <Text>{data.email != null ? data.email : '-'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                })}
            </View>
        } else {

        }
    }

    render() {
        return (
            <Modal
                isVisible={this.props.modalVisible}
                onBackdropPress={() => this.props._isVisible(false)}
                onRequestClose={() => this.props._isVisible(false)}
            >
                <StatusBar backgroundColor="#4E1679" barStyle="light-content" />
                <View style={styles.contentDisModal}>
                    <View>
                        {this.renderHeader()}
                        <View style={{ height: HEIGHT * 0.75 }}>
                            <ScrollView>
                                <View padderBottom>
                                    {this.renderView()}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

export default ProjectDetail;