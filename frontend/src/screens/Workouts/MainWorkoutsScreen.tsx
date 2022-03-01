import React, { useState } from "react";
import { Button, Icon, Text } from "react-native-elements";
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import {List} from 'react-native-paper';

//import NewWorkoutOverlay from "../components/NewWorkoutOverlay";
import tw from "tailwind-react-native-classnames";
import { useWorkoutsStackScreen } from "../WorkoutsScreen";

export const MainWorkoutsScreenName = "MainWorkouts";

export type MainWorkoutsScreenParams = undefined;

export const MainWorkoutsScreen = () => {
  //const { navigation, route } = useRootScreen(WorkoutsScreenName);


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
            <View style={tw``}>
                <List.Accordion title={item.name} style={{backgroundColor : "#f0defc"}} titleStyle={{fontSize : 25}}>

                        {[...Array(item.exercises.length)].map(
                            (value: undefined, index: number) => (
                                <View>
                                    <View >
                                        <List.Item titleStyle={tw``} title={item.exercises[index].name + ": " + item.exercises[index].sets + " sets of " + item.exercises[index].repsPerSet + " reps"}>
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
        <View style={tw`h-full`}>
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


                <NewPostButton/>

        </View>
  );
}


const NewPostButton = () => {
    const {
      navigation: { navigate },
    } = useWorkoutsStackScreen();
    return (
      <Button
        icon={<Icon name="add-comment" color="white" size={40} />}
        buttonStyle={tw`rounded-full w-20 h-20 bg-purple-600`}
        containerStyle={tw`absolute bottom-4 right-4`}
        onPress={() => navigate("NewWorkout")}
      />
    );
  };