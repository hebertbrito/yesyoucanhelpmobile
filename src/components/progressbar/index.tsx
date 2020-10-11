import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, useTheme, ProgressBar } from 'react-native-paper';

//services
import translate from '../../services/translate/translate'

interface Props {
    title: string,
    value: number,
}

export const ProgressBarComponent = (props: Props) => {

    const paperTheme = useTheme()

    return (
        <View style={styles.progressBarContainer}>
            <View style={{ width: '30%' }}>
                <Text style={{ color: paperTheme.colors.text, alignSelf: "flex-start" }}>{translate(props.title)}</Text>
            </View>
            <View style={{ width: "35%" }}>
                <ProgressBar color="#ef6c00" progress={props.value * 0.1} style={styles.progressBar} />
            </View>
            <View style={{ width: '25%' }}>
                <Text style={{ color: paperTheme.colors.text, alignSelf: "flex-end", textAlign: "center" }}>{props.value * 10}%</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    progressBarContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
        padding: 5,
        marginTop: 2,
        elevation: 3
    },
    progressBar: {
        width: "100%",
        alignSelf: "center",
    }
})

