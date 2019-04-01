import React from 'react';
import {View, Icon} from 'native-base';
import DatePicker from "react-native-datepicker";
  
class DatePickerComponent extends React.Component {
    renderDatePicker = () => {
        if(this.props.mode == 'date'){
            return <DatePicker style={{width: 180}}
                date={this.props.date}
                mode="date"
                format="DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                        dateIcon: {
                        position: "relative",
                        width: 25,
                        height: 25,
                    },
                    dateInput: {
                        margin: 0,
                        height: 45,
                        borderColor: '#E5E5E5',
                        borderRadius: 10
                    }
                }}
                onDateChange={(date) => {this.props.onDateChange(date)}}
            />
        }else if(this.props.mode == 'time'){
            return <DatePicker style={{width: 150}}
                date={this.props.date}
                mode="time"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: "relative",
                        width: 25,
                        height: 25
                    },
                    dateInput: {
                        margin: 0,
                        height: 45,
                        borderColor: '#E5E5E5',
                        borderRadius: 10
                    }
                }}
                iconComponent={
                    <Icon 
                        name='clock-o' 
                        type="FontAwesome" 
                        size={20}
                        color='#333333'
                        style={{ marginLeft: 10 }} 
                    />
                }
                onDateChange={(date) => {this.props.onDateChange(date)}}
                />
        }
    }
    render() {
        return (
            <View>
                {this.renderDatePicker()}
            </View>
        )
    }
}

export default DatePickerComponent;
