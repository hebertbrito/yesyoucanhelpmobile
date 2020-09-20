import React from 'react';
import { FAB, Portal, Provider, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

export function FabButton({ ...props }) {

    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state

    const styles = {
        alignSelf: "center",
        alignItems: "center"
    }

    return (

        <FAB.Group visible={true}
            open={open}
            icon={open ? 'calendar-today' : 'plus'}

            actions={[
                { icon: 'plus', onPress: () => console.log('Pressed add') },
                {
                    icon: 'star',
                    label: 'Star',
                    onPress: () => console.log('Pressed star'),
                },
                {
                    icon: 'email',
                    label: 'Email',
                    onPress: () => console.log('Pressed email'),
                },
                {
                    icon: 'bell',
                    label: 'Remind',
                    onPress: () => console.log(props),
                },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
                if (open) {
                    // do something if the speed dial is open
                }
            }}
        />
    )
}