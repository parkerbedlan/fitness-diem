import React, { useState } from "react";
import { View } from "react-native";
import { Button, Icon } from "react-native-elements";
import { List } from "react-native-paper";
//import NewWorkoutOverlay from "../components/NewWorkoutOverlay";
import tw from "tailwind-react-native-classnames";
import { useWorkoutsStackScreen } from "../WorkoutsScreen";

export const MainWorkoutsScreenName = "MainWorkouts";

export type MainWorkoutsScreenParams = undefined;

export const MainWorkoutsScreen = () => {
  //const { navigation, route } = useRootScreen(WorkoutsScreenName);

  const [workoutList, setWorkoutList] = useState([
    {
      id: 1,
      name: "Chest and Triceps",
      exercises: [
        {
          id: 1,
          name: "Bench Press",
          sets: 3,
          repsPerSet: 10,
        },
        {
          id: 2,
          name: "Tricep Pulldowns",
          sets: 3,
          repsPerSet: 10,
        },
      ],
    },
    {
      id: 2,
      name: "Back and Biceps",
      exercises: [
        {
          id: 1,
          name: "Lat Pulldowns",
          sets: 3,
          repsPerSet: 10,
        },
        {
          id: 2,
          name: "Bicep Curls",
          sets: 3,
          repsPerSet: 10,
        },
      ],
    },
    {
      id: 3,
      name: "Leg Day",
      exercises: [
        {
          id: 1,
          name: "Squat",
          sets: 3,
          repsPerSet: 10,
        },
        {
          id: 2,
          name: "Leg Press",
          sets: 3,
          repsPerSet: 10,
        },
      ],
    },
  ]);

  function addToWorkoutList(newWorkout: any) {
    var newWorkoutList = workoutList;
    newWorkoutList.push(newWorkout);
    setWorkoutList(newWorkoutList);
    console.log(workoutList);
  }

  function renderItem(item: { name: any; exercises: any; id: any }) {
    return (
      <View key={item.id}>
        <List.Accordion
          title={item.name}
          style={{ backgroundColor: "#f0defc" }}
          titleStyle={{ fontSize: 25 }}
        >
          {item.exercises.map((exercise: any) => (
            <View key={exercise.id}>
              <View>
                <List.Item
                  title={
                    exercise.name +
                    ": " +
                    exercise.sets +
                    " sets of " +
                    exercise.repsPerSet +
                    " reps"
                  }
                ></List.Item>
              </View>
              <View
                style={{
                  borderBottomColor: "#cb81fc",
                  borderBottomWidth: 1,
                }}
              />
            </View>
          ))}
        </List.Accordion>
        <View
          style={{
            borderBottomColor: "#cb81fc",
            borderBottomWidth: 3,
          }}
        />
      </View>
    );
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

      {workoutList.map((workout) => renderItem(workout))}

      <NewPostButton />
    </View>
  );
};

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
