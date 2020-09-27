import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { Text, useTheme, Avatar, Subheading, Caption, Paragraph, Divider, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

//styles
import styles from './styles'

//Components
import { Thumbs } from '../../components'

interface CardDetailsInfo {
    visibileAnimatable(): void
}

export function CardDetailsInfo(props: CardDetailsInfo) {

    const theme = useTheme();
    const [typeOrder, setTypeorder] = useState('1');
    const { visibileAnimatable } = props;


    return (
        <Animatable.View animation="fadeInUp" useNativeDriver={true} easing="ease-out"
            style={styles.animatableView}
        >
            <Avatar.Image size={100} source={require('../../assets/imageperfil/hebert.jpg')}
                style={styles.styleaVatar}
            />

            <View
                style={{
                    width: '100%', marginTop: '13%', flex: 1, backgroundColor: theme.colors.background, zIndex: -1,
                    borderTopRightRadius: 45, borderTopLeftRadius: 45, elevation: 10
                }}>
                <Icon size={25} name="times" style={styles.Icon} color={theme.colors.error} onPress={() => visibileAnimatable()} />
                <View style={styles.sub_body}>
                    <Subheading>
                        Hebert Felipe
                    </Subheading>
                    <Caption>
                        hebertfelipe.97@outlook.com.br
                    </Caption>
                </View>
                <View style={{ width: '100%' }}>
                    <ScrollView style={{ width: '100%' }} contentContainerStyle={{ flexGrow: 1, alignContent: "center", alignItems: "center" }}>

                        <Thumbs />

                        <Divider style={{ backgroundColor: theme.colors.accent, width: '95%', height: 1, marginTop: 15, marginBottom: 8 }} />

                        <View style={{ width: '100%', padding: '3%', flexDirection: "column" }}>
                            <View style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                                <View style={{ display: 'flex', flexDirection: 'column' }}>
                                    {typeOrder == '2' ?
                                        <View>
                                            <Title>Name:</Title>
                                            <Paragraph>
                                                Jeromel
                                            </Paragraph>
                                        </View>
                                        :
                                        null
                                    }
                                    {typeOrder == '1' ?
                                        <View style={{ marginRight: '10%', justifyContent: "center" }}>
                                            <Title>Product:</Title>
                                            <Paragraph>
                                                Clothes
                                            </Paragraph>
                                        </View>
                                        :
                                        null
                                    }

                                </View>

                                {typeOrder == '1' ?
                                    <View style={{ alignSelf: "center", alignItems: "center", alignContent: "center", justifyContent: "center" }}>
                                        <Title>Quantity/Size:</Title>
                                        <Paragraph>
                                            1
                                    </Paragraph>
                                    </View>
                                    :
                                    null
                                }

                            </View>
                            <View style={{ width: '100%', display: "flex" }}>
                                <Title>Description:  </Title>
                                <Paragraph style={{ fontStyle: "italic" }}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto nostrum consectetur eligendi sint aliquam amet aut animi praesentium. Sed pariatur porro atque omnis. Eum quis assumenda debitis amet! Iusto, natus!
                                </Paragraph>
                            </View>

                            {typeOrder == '2' ?
                                <View style={{ width: '95%', height: 500, borderColor: 'red', borderWidth: 2 }}>
                                    <Image source={require('../../assets/fotospublic/logoApp2.png')} style={{ width: '100%', height: '100%', resizeMode: "cover", alignSelf: "center" }} />
                                </View>
                                :
                                null
                            }

                        </View>

                    </ScrollView>
                </View>
            </View>
        </Animatable.View>
    )
}