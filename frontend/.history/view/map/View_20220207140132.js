import React, { Component } from 'react'
import { View, Text, WebView } from 'react-native-webview'

export default class Map extends Component {
    render() {
        return (
            // <View>
            //     <Text>Map</Text>
            // </View>
            <WebView
        source={{uri: 'https://www.llhmap.com/'}}
        style={{ marginTop: 20 }}
      />
        )
    }
}