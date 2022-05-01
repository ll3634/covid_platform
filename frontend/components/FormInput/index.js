import React from 'react';
import {SafeAreaView, View, Text, TextInput} from 'react-native';
import tw from 'twrnc'

const FormInput = (props) => {
  let {...other} = props

	return (
    <TextInput style={tw`border border-blue-400 rounded px-3 py-2`} {...other}/>
  	);
};

export default FormInput;