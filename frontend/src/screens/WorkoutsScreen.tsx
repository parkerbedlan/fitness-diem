import React, { useState } from "react";
import { Text } from "react-native-elements";
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import {List} from 'react-native-paper';

import NewWorkoutOverlay from "../components/NewWorkoutOverlay";
import tw from "tailwind-react-native-classnames";

export const WorkoutsScreenName = "Workouts";

export type WorkoutsScreenParams = { email: string };

export default function WorkoutsScreen(this: any) {
  //const { navigation, route } = useRootScreen(WorkoutsScreenName);

    const [visible, setVisible] = useState("none");

    const toggleOverlay = () => {
        console.log('flipping');
        if(visible=='none')
            setVisible('block');
        else
            setVisible('none')
    }

    const [workoutList, setWorkoutList] = useState([    
        {
            name: "Chest and Triceps",
            exercises : [
                {
                    name: "Bench Press",
                    sets: 3,
                    repsPerSet: 10
                },
                {
                    name: "Tricep Pulldowns",
                    sets: 3,
                    repsPerSet: 10
                }
            ]
        },
        {
            name: "Back and Biceps",
            exercises : [
                {
                    name: "Lat Pulldowns",
                    sets: 3,
                    repsPerSet: 10
                },
                {
                    name: "Bicep Curls",
                    sets: 3,
                    repsPerSet: 10
                }
            ]
        },
        {
            name: "Leg Day",
            exercises : [
                {
                    name: "Squat",
                    sets: 3,
                    repsPerSet: 10
                },
                {
                    name: "Leg Press",
                    sets: 3,
                    repsPerSet: 10
                }
            ]
        }]);
       
    function addToWorkoutList(newWorkout:any){
        var newWorkoutList = workoutList;
        newWorkoutList.push(newWorkout);
        setWorkoutList(newWorkoutList);
        console.log(workoutList);
    }

    function renderItem(item: { name: any; exercises: any; }){
        return(
            <View style={styles.workoutListItem}>
                <List.Accordion title={item.name} style={{backgroundColor : "#f0defc"}} titleStyle={{fontFamily : 'Tahoma', fontSize : 25}}>

                        {[...Array(item.exercises.length)].map(
                            (value: undefined, index: number) => (
                                <View>
                                    <View >
                                        <List.Item titleStyle={styles.listItemDescription} title={item.exercises[index].name + ": " + item.exercises[index].sets + " sets of " + item.exercises[index].repsPerSet + " reps"}>
                                        </List.Item>
                                    </View>
                                    <View
                                    style={{
                                        borderBottomColor: '#cb81fc',
                                        borderBottomWidth: 1,
                                    }}
                                    />
                                </View>
                            )
                        )}
                </List.Accordion>
                <View
                    style={{
                        borderBottomColor: '#cb81fc',
                        borderBottomWidth: 3
                    }}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
                {/* <ScrollView>
                
                <FlatList
                    extraData={visible}
                    data={workoutList}
                    renderItem={({item}) => renderItem(item)}
                />
                </ScrollView> */}

                    {[...Array(workoutList.length)].map(
                        (value: undefined, index: number) => (
                            renderItem(workoutList[index])
                        )
                    )}

            <View>
                <TouchableOpacity
                onPress={toggleOverlay}
                style={styles.createNewButton}
                >
                    <Text style={styles.addText}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.overlay, {display: visible}]}>
                <NewWorkoutOverlay updateVisibility={setVisible} addToWorkoutList={addToWorkoutList}/>
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: "#f0defc",
        height: "100%"
    },
    workoutListItem : {
        padding: "13px",
        backgroundColor: "#f0defc",
        fontFamily: "Tahoma",
    },
    listItemTitle : {
        fontFamily: "Tahoma",
        fontSize: 25,
        color: "#7100a6"
    },
    listItemDescription : {
        fontSize: 16,
        color: "#6d239e",
        
        paddingBottom: 5
    },
    createNewButton : {
        position: "absolute",
        width: 60,
        height: 60,
        bottom: -60,
        right: 35,
        backgroundColor: "#7100a6",
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 30,
        borderColor: "#420061",
        paddingHorizontal: 5,
        boxShadow: "4px 4px 2px 0px #adadad",
     },
     addText : {
         fontSize: 30,
         color: "pink",
         textAlign: "center",
         textAlignVertical: "center",
         fontFamily: "Arial"
     },
     overlay : {
        position: "absolute",
        width: "78%",
        //height: 650,
        top: 60,
        right: "11%",
        backgroundColor: "#e694ff",
        justifyContent: "center",
        alignContent: "center",
        borderColor: "#ca7af0",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 5
     }
});