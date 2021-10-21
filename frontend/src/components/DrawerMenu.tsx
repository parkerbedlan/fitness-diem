import React from "react";
import HomeScreen from "../screens/HomeScreen";
import WorkoutLibrary from "../screens/WorkoutLibrary";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";


const Drawer = createDrawerNavigator();

export default function DrawerMenu(){
    return(
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="Workout Library" component={WorkoutLibrary}/>
            <Drawer.Screen name="Routine Library" component={WorkoutLibrary}/>
            <Drawer.Screen name="Social Feed" component={WorkoutLibrary}/>
            <Drawer.Screen name="Friends" component={WorkoutLibrary}/>
        </Drawer.Navigator> 
    )
}
