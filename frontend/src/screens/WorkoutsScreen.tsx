import React, { useState } from "react";
import { Text } from "react-native-elements";
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

import NewWorkoutOverlay from "../components/NewWorkoutOverlay";

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

    const workoutList = 
    {
        workouts : [    
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
        },
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
        },
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
        },
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
        }
        ]
    };
       
    function renderItem(item: { name: any; exercises: any; }){
        return(
            <TouchableWithoutFeedback onPress={() => console.log("Pressed Workout")}>
                <View style={styles.workoutListItem}>
                    <Text style={styles.listItemTitle}>{item.name}</Text>
                    <Text style={styles.listItemNumExercises}>{item.exercises.length} Exercises</Text>
                    {/* <Text style={styles.listItemNumSets}>{item.name}</Text> */}
                    <View
                    style={{
                        borderBottomColor: '#c9c9c9',
                        borderBottomWidth: 1,
                        marginBottom: -11
                    }}
                    />
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <View style={styles.container}>
                <ScrollView>
                
                <FlatList
                    data={workoutList.workouts}
                    renderItem={({item}) => renderItem(item)}
                />
                </ScrollView>
            <View>
                <TouchableOpacity
                onPress={toggleOverlay}
                style={styles.createNewButton}
                >
                    <Text style={styles.addText}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.overlay, {display: visible}]}>
                <NewWorkoutOverlay updateVisibility={setVisible}/>
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: "#f7f0f6"
    },
    workoutListItem : {
        padding: "13px"
    },
    listItemTitle : {
        fontFamily: "Tahoma",
        fontSize: 25,
        color: "#7100a6"
    },
    listItemNumExercises : {
        fontSize: 15,
        color: "#ca7af0",
        paddingBottom: 5
    },
    createNewButton : {
        position: "absolute",
        width: 60,
        height: 60,
        bottom: 35,
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