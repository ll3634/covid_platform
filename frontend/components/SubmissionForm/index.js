import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import tw from 'twrnc';
import FormLabel from '../FormLabel';
import FormInput from '../FormInput';
import FormButton from '../FormButton';

const FormInputGroup = ({children}) => {
  return (
    <View style={tw`my-3`}>
      {children}
    </View>
  );
}

const SubmissionForm = ({onSubmit}) => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

	return (
    <View>
      <FormInputGroup>
        <FormLabel text='Phone'></FormLabel>
        <FormInput onChangeText={(text) => {
          setPhone(text);
        }}></FormInput>
        <Text>{phone}</Text>
      </FormInputGroup>
      <FormInputGroup>
        <FormLabel text='Password'></FormLabel>
        <FormInput onChangeText={(text) => {
          setPassword(text);
        }}></FormInput>
        <Text>{password}</Text>
      </FormInputGroup>
      <FormButton primary={true} text='Login as New User' 
        onPress={() => onSubmit(phone, password)}></FormButton>
    </View>
	);
};

export default SubmissionForm;