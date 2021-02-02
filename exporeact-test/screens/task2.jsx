import React from 'react'
import { Text, View, StyleSheet, Button, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const task2 = () => {
    const elemArray = [2,3,10,15,26,35,50,63,90]
    const [Guess, onGuess] = React.useState('0');
    const handleGuess = () => {
        if(Guess == '90'){
            Alert.alert(
                'Congratulations!',
                'Your Guess is Correct',
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                {cancelable: false}
            )
        } else {
            Alert.alert(
                'Incorrect!',
                'Try Again ...',
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                {cancelable: false}
            )
        }
    }
    return (
        <View style={styles.container}>
            <Text>Find The Missing Number</Text>
            <View style={styles.missContainer}>
                {elemArray.map((value, index) => {
                    if(index !== elemArray.length-1){
                        return <Text style={styles.series} key={index}>{value},</Text>
                    }
                })}
                <Text style={styles.series}>?</Text>
            </View>
            <View style={styles.guessContainer}>
                <TextInput 
                    onChangeText={(text) => onGuess(text)}
                    value={Guess}
                    style={styles.TextInput}
                />
                <Button title="Guess" color="green" onPress={handleGuess}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    missContainer: {
        flexDirection:'row'
    },
    series: {marginRight: 5, fontSize: 18},
    guessContainer:{
        marginTop: 100,
        flexDirection: 'row'
    },
    TextInput: {
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#000",
        marginRight: 10,
        width: 150
    }
})

export default task2
