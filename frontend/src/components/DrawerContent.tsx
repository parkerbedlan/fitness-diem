import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {  StyleSheet, View } from "react-native";
import {  Title } from "react-native-paper";
import { Icon } from "react-native-elements/dist/icons/Icon";




export default function DrawerContent(props: { navigation: { navigate: (arg0: string) => void; }; }) {

    return(
        <DrawerContentScrollView>
            <View>
                <View style={styles.Avatar}>
                </View>
                <Title style={styles.Username}>Justin Klopfer</Title>
            </View>
            <View style={styles.MenuItem}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon type="font-awesome-5" name="rss" color={color} size={size}/>
                    )}
                    label="Social Feed"
                    onPress= {() => props.navigation.navigate("Social Feed")}
                />
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon type="font-awesome-5" name="house-user" color={color} size={size}/>
                    )}
                    label="Home"
                    onPress= {() => props.navigation.navigate("Home")}
                />
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon type="font-awesome-5" name="dumbbell" color={color} size={size}/>
                    )}
                    label="Workout Library"
                    onPress= {() => props.navigation.navigate("Workout Library")}
                />
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon type="font-awesome-5" name="users" color={color} size={size}/>
                    )}
                    label="Friends"
                    onPress= {() => props.navigation.navigate("Friends")}
                />
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon type="font-awesome-5" name="list" color={color} size={size}/>
                    )}
                    label="Routine Library"
                    onPress= {() => props.navigation.navigate("Routine Library")}
                />
            </View>
        </DrawerContentScrollView>
        
    )
};

const styles = StyleSheet.create({
    Avatar: {

    },
    Username: {
        marginLeft: 22,
        marginTop: 16
    },
    MenuItem: {
        marginLeft: 25
    }
})