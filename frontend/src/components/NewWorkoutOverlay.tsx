import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Alert, Button, Picker, StyleSheet, TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import ExerciseElement from "./ExerciseElement";

export default function NewWorkoutOverlay(props: any){

    // const [workout, setWorkout] = useState({
    //     "WorkoutName" : "",
    //     "Exercises" : [{}]
    // });

    const [workoutName, setWorkoutName] = useState("");
    const [exerciseList, setExerciseList] = useState([{
        "name" : "",
        "sets" : 0,
        "repsPerSet" : 0
    }]);

    function setExerciseName(newName:string, id:number){
        exerciseList[id].name = newName;
    }

    function setExerciseSets(newNumSets:number, id:number){
        exerciseList[id].sets = newNumSets;
    }

    function setExerciseReps(newNumReps:number, id:number){
        exerciseList[id].repsPerSet = newNumReps;
    }


    const [exercises, setExercises] = useState(1);

    const addExercise = () => {
        setExercises(exercises + 1);
        exerciseList.push({
            "name" : "",
            "sets" : 0,
            "repsPerSet" : 0
        });
    }

    const deleteExercise = () => {
        setExercises(exercises - 1);
        exerciseList.pop();
    }

    return(
            <form>
                <TextInput
                placeholder="New Workout Name"
                style={{paddingBottom: 10, paddingTop: 10, paddingLeft: 15, marginBottom: 8, borderRadius: 5, backgroundColor: "#f9edff"}}
                onChangeText={setWorkoutName}
                />

                {[...Array(exercises)].map(
                    (value: undefined, index: number) => (
                        <ExerciseElement id={index} key={index} setExerciseName={setExerciseName} exerciseName={exerciseList[index].name} setNumReps={setExerciseReps} setNumSets={setExerciseSets}/>
                    )
                )}

                <View style={styles.button}>
                    <Button
                    title="Add exercise"
                    onPress={addExercise}
                    color="#ca7af0"
                    />
                </View>
                <View style={styles.button}>
                    <Button
                    title="Delete exercise"
                    onPress={deleteExercise}
                    color="#ca7af0"
                    />
                </View>
                <View style={styles.button}>
                    <Button
                    title="Create Workout"
                    onPress={() => {console.log(exerciseList);
                                    props.updateVisibility('none')
                                    props.addToWorkoutList({"name" : workoutName, "exercises" : exerciseList});
                                    }}
                    color="#ca7af0"
                    />
                </View>
            </form>
    )
}


const styles = StyleSheet.create({
    dropdown : {
        marginBottom: 8
    },
    button : {
        paddingBottom: 5,
        paddingTop: 5,
        marginBottom: 8
    },
    exerciseElement : {
        marginBottom: 20
    }
});


