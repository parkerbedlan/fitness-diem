import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Icon, Input, Text } from "react-native-elements";
import { List } from "react-native-paper";
//import NewWorkoutOverlay from "../components/NewWorkoutOverlay";
import tw from "tailwind-react-native-classnames";
import { useRootScreen } from "../../utils/hooks/useRootScreen";
import { HomeScreenName } from "../HomeScreen";
import { useWorkoutsStackScreen } from "../WorkoutsScreen";

export const MainWorkoutsScreenName = "MainWorkouts";

export type MainWorkoutsScreenParams = undefined;

export const MainWorkoutsScreen = () => {
  const { navigation } = useRootScreen();

  const handleSubmit = () => {
    navigation.navigate(HomeScreenName);
  };

  const [amount, setAmount] = useState(1);

  return (
    <View style={tw`h-full`}>
      <ScrollView>
        {[...Array(amount)].map((_, i) => (
          <ExerciseBlock key={i} onDelete={() => setAmount(amount - 1)} />
        ))}
        <View style={tw`flex flex-row justify-end m-2 mb-28`}>
          <Button
            icon={<Icon name="add" color="white" size={20} />}
            buttonStyle={tw`rounded-lg w-12 h-12 bg-purple-600`}
            // containerStyle={tw`flex flex-end`}
            onPress={() => setAmount(amount + 1)}
          />
        </View>
      </ScrollView>
      <NewPostButton onClick={handleSubmit} />
    </View>
  );
};

const ExerciseBlock = ({ onDelete }: { onDelete: any }) => {
  return (
    <>
      <View style={tw`m-2 p-2 border`}>
        <View style={tw`flex flex-row justify-between pr-2`}>
          <View style={tw`w-11/12`}>
            <Input
              label={"Exercise"}
              placeholder={"Exercise name"}
              // style={tw`w-10`}
            />
          </View>
          <Button
            icon={<Icon name="remove" color="white" size={20} />}
            buttonStyle={tw`rounded-lg w-10 h-10 bg-purple-300`}
            // containerStyle={tw`flex flex-end`}
            onPress={onDelete}
          />
        </View>
        <View style={tw`flex flex-row`}>
          <View style={tw`w-1/2`}>
            <Input label="Sets" placeholder={"Number of sets"} />
          </View>
          <View style={tw`w-1/2`}>
            <Input label="Reps / Duration" placeholder={"Number of reps"} />
          </View>
        </View>
        <Input label="Weight (optional)" placeholder={"Weight (lbs)"} />
      </View>
    </>
  );
};

const NewPostButton = ({ onClick }: { onClick: any }) => {
  const {
    navigation: { navigate },
  } = useWorkoutsStackScreen();
  return (
    <Button
      icon={<Icon name="check" color="white" size={40} />}
      buttonStyle={tw`rounded-full w-20 h-20 bg-purple-600`}
      containerStyle={tw`absolute bottom-4 right-4`}
      onPress={onClick}
    />
  );
};
