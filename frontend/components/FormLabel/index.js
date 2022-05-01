import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import tw from 'twrnc';

const FormLabel = ({text}) => {
	return (
		<Text style = {tw`text-lg font-semibold mb-2`}>{text}</Text>
	);
};

export default FormLabel;