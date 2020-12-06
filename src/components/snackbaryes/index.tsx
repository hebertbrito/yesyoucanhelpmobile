import React, { memo } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { Snackbar } from 'react-native-paper'
import { Text } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar'
import translate from '../../services/translate/translate'

interface SnackBarYes {
    isVisible: boolean,
    onDismiss(): void,
    onPress(): void,
    title?: string,
    text: string
    style: StyleProp<ViewStyle>,
    textcolor?: string,
    subcolorButton?: string
}

const SnackBarYesComponente = (props: SnackBarYes) => {

    const { isVisible, style, onDismiss, onPress, text, subcolorButton, textcolor, title } = props;

    return (
        <Snackbar
            theme={{ colors: { accent: subcolorButton, surface: textcolor } }}
            style={style}
            visible={isVisible}
            onDismiss={onDismiss}
            duration={2500}
            action={{
                label: 'Undo',
                onPress: () => {
                    onPress()
                },
            }}>

            {translate(`${text}`)}
        </Snackbar>
    )
}

export const SnackBarYes = memo(SnackBarYesComponente)