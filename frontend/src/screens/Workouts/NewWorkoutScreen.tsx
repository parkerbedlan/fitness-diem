import { Field, Formik } from "formik";
import React from "react";
import { Keyboard } from "react-native";
import { Button, Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import FormikInput from "../../components/FormikInput";
import { HeaderForSubscreens } from "../../components/HeaderForSubscreens";
import {
  useStartConversationByUsernameMutation,
  useStartConversationMutation,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { useWorkoutsStackScreen } from "../WorkoutsScreen";
import { Text } from "react-native-elements";

export const NewWorkoutScreenName = "NewWorkout";
export type NewWorkoutScreenParams = undefined;

export const NewWorkoutScreen = () => {
  const {
    navigation: { navigate },
  } = useWorkoutsStackScreen();
  //const [startConvoByUsername] = useStartConversationByUsernameMutation();
  return (
    <Formik
      initialValues={{ username: "" }}
    //   onSubmit={async ({ username }, { setErrors, resetForm }) => {
    //     const response = await startConvoByUsername({
    //       variables: { username },
    //     });
    //     const convoId = response.data?.startConversationByUsername;
    //     if (convoId === -1) {
    //       setErrors(
    //         toErrorMap([{ field: "username", message: "user not found" }])
    //       );
    //     } else {
    //       // Keyboard.dismiss()
    //       resetForm();
    //       navigate("MainWorkouts");
    //     }
    //   }}
    onSubmit={() => {navigate("MainWorkouts")}}
    >
      {({ dirty, handleSubmit }) => (
        <>
          <HeaderForSubscreens
            title="New Workout"
            backLabel="Back"
            handleBack={() => navigate("MainWorkouts")}
            rightComponent={
              dirty && (
                <Button
                  title="Create"
                  type="outline"
                  buttonStyle={tw`bg-white m-2 w-24`}
                  titleStyle={tw`text-purple-700`}
                  onPress={() => handleSubmit()}
                  // icon={<Icon name="chevron-right" color="#6D28D9" />}
                  // iconRight={true}
                />
              )
            }
          />
          <FormikInput
            //leftIcon={<Icon name="alternate-email" />}
            name="workoutName"
            placeholder="Name of Workout"
            autoCapitalize="none"
            autoCorrect={true}
          />
          <FormikInput
            //leftIcon={<Icon name="alternate-email" />}
            name="exerciseName1"
            placeholder="Name of Exercise"
            autoCapitalize="none"
            autoCorrect={true}
          />
          <FormikInput
            //leftIcon={<Icon name="alternate-email" />}
            name="exerciseName2"
            placeholder="Name of Exercise"
            autoCapitalize="none"
            autoCorrect={true}
          /><FormikInput
          //leftIcon={<Icon name="alternate-email" />}
          name="exerciseName3"
          placeholder="Name of Exercise"
          autoCapitalize="none"
          autoCorrect={true}
        />
          {/* <FormikInput
            name="colorSelect"
          >
           <Field as="select" name="color">
             <option value="red"><Text>Red</Text></option>
             <option value="green"><Text>Red</Text></option>
             <option value="blue"><Text>Red</Text></option>
           </Field>
           </FormikInput> */}

        </>
      )}
    </Formik>
  );
};

