import React, { useEffect, useState, useContext } from 'react';
import { Alert, Platform, SafeAreaView, ScrollView, View, TouchableOpacity } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Callout, Circle, MarkerAnimated } from 'react-native-maps';
import { Button, Divider, FAB, List, Text, Title, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


//styles
import { styles } from './styles'

//components
import { ButtonComponent } from '../../components';

//translate
import translate from '../../services/translate/translate';

//context
import AuthContext from '../../context/auth';


function StatusScreen() {

    const theme = useTheme();
    const { user } = useContext(AuthContext);
    const { navigate } = useNavigation()

    const [enableButton, setEnableButton] = useState(false)

    useFocusEffect(
        React.useCallback(() => {

            //services
            
            return () => {
                //do something when screen are unfocused
                null
            }

        }, [])
    );

    return (
        <SafeAreaView style={styles.safeView}>
            <View style={{ width: "95%", height: "30%" }}>
                <Title style={{ marginTop: '5%', alignSelf: "center" }}>
                    Status Items
                </Title>
                <LottieView source={require('../../assets/lottiefiles/status.json')} autoPlay loop speed={0.7} resizeMode="contain"
                    style={{ width: "100%", height: "85%", alignSelf: "center", marginTop: "1%" }}
                />
            </View>

            <Divider style={{ backgroundColor: theme.colors.accent, width: '95%', height: 1, marginBottom: 8 }} />

            <ScrollView style={{ width: '95%', marginTop: '1%' }} contentContainerStyle={{ flexGrow: 1 }}>
                <List.Section>
                    <List.Accordion
                        title="Doações feitas"
                        left={props => <List.Icon {...props} icon={() => <Icon name="hands-helping" size={20} />} />}
                    >
                        <List.Item title={translate("lst_product_4")}
                            description={"kdsjfksdfkdjsghfkjsdgfkhsdgf"}
                            right={props => <List.Icon {...props} icon={() => <Icon name="user-check" size={15} color={theme.colors.onSurface} />} />}
                        />
                    </List.Accordion>
                    <List.Accordion
                        title="Doações pedidas"
                        left={props => <List.Icon {...props} icon={() => <Icon name="hand-holding" size={20} />} />}

                    >
                        <List.Item title="First item" />
                        <List.Item title="Second item" />
                    </List.Accordion>
                    <List.Accordion
                        title="Desabrigados Informados"
                        left={props => <List.Icon {...props} icon={() => <Icon name="user-injured" size={20} />} />}
                    >
                        <List.Item title="First item" />
                        <List.Item title="Second item" />
                    </List.Accordion>
                </List.Section>
            </ScrollView>
            <View style={styles.bottomMenus}>
                <Button mode="text"
                    onPress={() => navigate('OptionsScreens')}
                    style={{ width: "50%", height: 35, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: theme.colors.text }}
                    color={theme.colors.text}
                    disabled={enableButton}
                >
                    {translate("back")}
                </Button>
                <FAB
                    style={{ position: "absolute", bottom: 7, backgroundColor: theme.colors.onSurface }}
                    icon="sync"
                    onPress={() => console.log('Pressed')}
                    disabled={enableButton}
                />
                <Button mode="text"
                    onPress={() => navigate('OptionsScreens')}
                    style={{ width: "50%", height: 35, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: theme.colors.surface }}
                    color={theme.colors.surface}
                    disabled={enableButton}
                >
                    {translate("clean")}
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default StatusScreen;