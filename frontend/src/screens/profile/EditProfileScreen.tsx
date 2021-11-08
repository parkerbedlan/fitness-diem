import { Formik } from "formik";
import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity, Modal } from "react-native";
import { Icon, Button } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { CachelessImage } from "../../components/CachelessImage";
import FormikInput from "../../components/FormikInput";
import { HeaderForSubscreens } from "../../components/HeaderForSubscreens";
import { getProfilePicUri } from "../../utils/getProfilePicUri";
import { fakeResult, useProfileStackNavigation } from "../ProfileScreen";

export const EditProfileScreen = () => {
  const navigation = useProfileStackNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    data: { profile },
  } = fakeResult;
  const profilePicUri = getProfilePicUri(profile.username);

  return (
    <>
      <ScrollView>
        <Formik
          initialValues={{
            displayName: profile.displayName,
            username: profile.username,
            email: profile.email,
            bio: profile.bio,
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {() => (
            <>
              <View
                style={tw`rounded-lg border-4 border-purple-700 m-2 w-56 h-56 flex items-center justify-center`}
              >
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                  <View
                    style={tw`absolute w-full h-full z-10 flex items-center justify-center`}
                  >
                    <Icon name="edit" color="white" size={40} />
                  </View>
                  <CachelessImage
                    uri={profilePicUri}
                    style={tw`w-52 h-52 opacity-80`}
                  />
                </TouchableOpacity>
              </View>
              <View style={tw`flex flex-row`}>
                <View style={tw`w-6/12`}>
                  <FormikInput
                    name="displayName"
                    label="Display Name"
                    placeholder="Joe Mama"
                    leftIcon={<Icon name="badge" />}
                    autoCompleteType="name"
                    autoCapitalize="words"
                  />
                </View>
                <View style={tw`w-6/12`}>
                  <FormikInput
                    name="username"
                    label="Username"
                    placeholder="joemama123"
                    leftIcon={<Icon name="alternate-email" />}
                    autoCapitalize="none"
                  />
                </View>
              </View>
              <FormikInput
                name="email"
                label="Email"
                placeholder="joe@mama.edu"
                leftIcon={<Icon name="email" />}
                autoCompleteType="email"
              />
              <FormikInput
                name="bio"
                label="Bio"
                placeholder="I love reaching my fitness goals with Fitness Dium!"
                multiline
              />
              <Button
                icon={<Icon name="check" color="white" />}
                title="accept changes"
                buttonStyle={tw`bg-green-600`}
                onPress={() => navigation.navigate("ViewProfile")}
              />
            </>
          )}
        </Formik>
      </ScrollView>
      <EditProfilePicModal
        username={profile.username}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      />
    </>
  );
};

const EditProfilePicModal = ({
  username,
  visible,
  onRequestClose,
}: {
  username: string;
  visible: boolean;
  onRequestClose: () => void;
}) => {
  return (
    <Modal animationType="slide" {...{ visible, onRequestClose }}>
      <HeaderForSubscreens
        title="Edit Profile Picture"
        backLabel="Close"
        handleBack={onRequestClose}
      />
    </Modal>
  );
};
