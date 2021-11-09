import { report } from "process";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {Picker} from '@react-native-picker/picker';



export default function ExerciseElement(props: any){
    


    //const [open, setOpen] = useState(false);
    //const [value, setValue] = useState(null);
    const [exerciseName, setExerciseNameLocal] = useState("");
    //const [numSets, setNumSets] = useState(0);
    // const [numReps, setNumReps] = useState(0);
    //var exerciseName = "";

    function setExerciseName(name:string){
        props.setExerciseName(name, props.id);
        setExerciseNameLocal(name);
    }
    
    function setNumSets(sets:number){
        props.setNumSets(sets, props.id);
    }
    function setNumReps(reps:number){
        props.setNumReps(reps, props.id);
    }

    return(
        <View style={styles.exerciseElement}>          
            <Picker
            selectedValue={exerciseName}
            onValueChange={(itemValue:string) => setExerciseName(itemValue)}
            style={styles.dropdown}>
            <Picker.Item label="Squat" value="Squat" />
            <Picker.Item label="Bench Press" value="Bench Press" />
            <Picker.Item label="Bicep Curl" value="Bicep Curl" />
            <Picker.Item label="" value="" />
            </Picker>
            <TextInput onChangeText={(itemValue:number) => setNumSets(itemValue)} keyboardType='numeric' style={{paddingBottom: 5, paddingTop: 5, marginBottom: 8, borderRadius: 5, backgroundColor: "#f9edff"}}   placeholder="Sets"/>
            <TextInput onChangeText={(itemValue:number) => setNumReps(itemValue)} keyboardType='numeric' style={{paddingBottom: 5, paddingTop: 5, marginBottom: 8, borderRadius: 5, backgroundColor: "#f9edff"}}   placeholder="Reps Per Set"/>
        </View>
    )
};

const styles = StyleSheet.create({
    exerciseElement : {
        marginBottom: 20,
    },
    dropdown : {
        paddingBottom: 8,
        paddingTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: "#f9edff",
        borderColor: "black",
        borderWidth: 2,
        height: 40
    },
    dropdownTextStyle: {
        position: "relative",
        left: 28,
        bottom: 4
    },
    placeholderStyle: {
        color: "grey"
    }
});