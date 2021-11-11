import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import * as mime from "react-native-mime-types";
import tw from "tailwind-react-native-classnames";
import { useCacheyImage } from "../../utils/hooks/cacheyImage/useCacheyImage";
import CenteredContainer from "../../components/CenteredContainer";
import FormikInput from "../../components/FormikInput";
import { HeaderForSubscreens } from "../../components/HeaderForSubscreens";
import { ModalCancelConfirm } from "../../components/ModalCancelConfirm";
import { ModalTapOutsideToClose } from "../../components/ModalTapOutsideToClose";
import {
  useEditProfileMutation,
  useEditProfilePicMutation,
  useMeProfileQuery,
} from "../../generated/graphql";
import { generateRNFile } from "../../utils/generateRNFile";
import { getProfilePicUri } from "../../utils/getProfilePicUri";
import { toErrorMap } from "../../utils/toErrorMap";
import { urltoFile } from "../../utils/urlToFile";
import { useProfileStackNavigation } from "../ProfileScreen";

export const EditProfileScreen = () => {
  const { navigate } = useProfileStackNavigation();
  const [isEditPicModalVisible, setIsEditPicModalVisible] = useState(false);
  const [isCancelModalVisible, setisCancelModalVisible] = useState(false);
  const { data: profileData, loading: profileLoading } = useMeProfileQuery();

  if (profileLoading)
    return (
      <CenteredContainer>
        <ActivityIndicator size="large" color="#10B981" />
      </CenteredContainer>
    );

  if (!profileData || !profileData.me)
    return (
      <CenteredContainer>
        <Text h1>You are not logged in.</Text>
      </CenteredContainer>
    );

  const profilePicUri = getProfilePicUri(profileData.me.id);
  const [, , setImage] = useCacheyImage(profilePicUri);

  const { displayName, username, email, bio } = profileData.me;
  const initialValues = { displayName, username, email, bio };

  const [editProfile] = useEditProfileMutation();

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          let changedValues = { ...values };
          Object.keys(values).forEach((key) => {
            if (changedValues[key] === initialValues[key])
              delete changedValues[key];
          });
          console.log("submitted", changedValues);
          const response = await editProfile({
            variables: { options: changedValues },
          });
          if (response.data?.editProfile.errors) {
            setErrors(toErrorMap(response.data.editProfile.errors));
          } else if (response.data?.editProfile.user) {
            navigate("ViewProfile");
          }
        }}
      >
        {({ handleSubmit, isSubmitting, dirty }) => (
          <>
            <HeaderForSubscreens
              title="Edit Profile"
              backLabel="Cancel"
              handleBack={() => {
                if (dirty) {
                  setisCancelModalVisible(true);
                } else {
                  navigate("ViewProfile");
                }
              }}
              rightComponent={
                <Button
                  title="Save changes"
                  buttonStyle={tw`bg-green-600`}
                  onPress={handleSubmit as () => void}
                  loading={isSubmitting}
                />
              }
            />
            <ScrollView>
              <EditableProfilePic
                uri={profilePicUri}
                onPress={() => setIsEditPicModalVisible(true)}
              />
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
                title="Save changes"
                buttonStyle={tw`bg-green-600`}
                onPress={handleSubmit as () => void}
                loading={isSubmitting}
              />
            </ScrollView>
          </>
        )}
      </Formik>
      <EditProfilePicModal
        visible={isEditPicModalVisible}
        onRequestClose={() => setIsEditPicModalVisible(false)}
        setImage={setImage}
      />
      <CancelEditsModal
        visible={isCancelModalVisible}
        onRequestClose={() => setisCancelModalVisible(false)}
        onCancel={() => navigate("ViewProfile")}
      />
    </>
  );
};

const EditableProfilePic = ({
  uri,
  onPress,
}: {
  uri: string;
  onPress: () => void;
}) => {
  const [CacheyProfilePic] = useCacheyImage(uri);
  return (
    <View
      style={tw`rounded-lg border-4 border-purple-700 m-2 w-56 h-56 flex items-center justify-center`}
    >
      <TouchableOpacity onPress={onPress}>
        <View
          style={tw`absolute w-full h-full z-10 flex items-center justify-center`}
        >
          <Icon name="edit" color="white" size={40} />
        </View>
        <CacheyProfilePic style={tw`w-52 h-52 opacity-80`} />
      </TouchableOpacity>
    </View>
  );
};

const EditProfilePicModal = ({
  visible,
  onRequestClose,
  setImage,
}: {
  visible: boolean;
  onRequestClose: () => void;
  setImage: (cacheyUri: string) => void;
}) => {
  const [editProfilePic] = useEditProfilePicMutation();

  const pickImage = async (location: "camera" | "library") => {
    let picker: typeof ImagePicker.launchCameraAsync;

    if (location === "camera") {
      await ImagePicker.requestCameraPermissionsAsync();
      picker = ImagePicker.launchCameraAsync;
    } else {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      picker = ImagePicker.launchImageLibraryAsync;
    }

    let result = await picker({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      if (Platform.OS === "web") {
        const file = await urltoFile(
          result.uri,
          "newProfilePic.png",
          mime.lookup(result.uri) || "image"
        );
        console.log("file", file);
        editProfilePic({ variables: { fileUpload: file } });
      } else {
        const file = generateRNFile(result.uri, "newProfilePic.png");
        console.log("file", file);
        editProfilePic({ variables: { fileUpload: file } });
      }
    }
  };

  return (
    <ModalTapOutsideToClose
      {...{ visible, onRequestClose }}
      animationType="fade"
    >
      <View style={tw`bg-gray-300 rounded-lg p-4 flex`}>
        <Button
          title="Take photo"
          icon={<Icon name="photo-camera" color="white" />}
          buttonStyle={tw`mb-2 bg-purple-700`}
          onPress={() => {
            pickImage("camera");
            onRequestClose();
          }}
        />
        <Button
          title="Choose existing photo"
          icon={<Icon name="file-upload" color="white" />}
          buttonStyle={tw`bg-purple-700`}
          onPress={() => {
            pickImage("library");
            onRequestClose();
          }}
        />
      </View>
    </ModalTapOutsideToClose>
  );
};

const CancelEditsModal = ({
  visible,
  onRequestClose,
  onCancel,
}: {
  visible: boolean;
  onRequestClose: () => void;
  onCancel: () => void;
}) => {
  return (
    <ModalCancelConfirm
      {...{ visible, onRequestClose, onCancel }}
      questionText="Are you sure you want to cancel your changes?"
      cancelText="Cancel changes"
      confirmText="Keep editing"
      onConfirm={onRequestClose}
    />
  );
};
