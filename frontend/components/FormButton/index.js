import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

const FormButton = (props) => {
  let { text, primary, ...other} = props

  // let primaryStyle = primary ? tw`bg-blue-500 px-6 py-2 rounded text-white` : tw`bg-white text-blue-500`
  let primaryStyle = tw`bg-blue-500 px-6 py-3 rounded my-3`
  let secondStyle = tw`border-blue-500 border bg-transparent px-6 py-3 rounded my-3`
  let primaryText = tw`text-center text-white font-bold`
  let secondText = tw`text-center text-blue-500 font-bold`

	return (
    <TouchableOpacity {...other} style={primary ? primaryStyle : secondStyle}>
      <Text style={primary? primaryText : secondText}>{text}</Text>
    </TouchableOpacity>
	);
};

export default FormButton;