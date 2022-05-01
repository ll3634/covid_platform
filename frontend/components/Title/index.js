import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import tw from 'twrnc';

const Title = ({text}) => {
	return (
		<Text style = {tw`text-2xl font-bold tracking-wide p-2 text-center`}>{text}</Text>
	);
};

export default Title;