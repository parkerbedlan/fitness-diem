import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Conversation = {
  __typename?: 'Conversation';
  id: Scalars['Float'];
  lastMessagePreview: MessagePreview;
  members: Array<User>;
  messages: Array<Message>;
  title?: Maybe<Scalars['String']>;
};

export type EditProfileInput = {
  bio?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  body: Scalars['String'];
  conversation: Conversation;
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  sender: User;
};

export type MessagePreview = {
  __typename?: 'MessagePreview';
  createdAt: Scalars['String'];
  display: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  approveNotifications: Scalars['Boolean'];
  changePassword: UserResponse;
  createPost: Post;
  deletePost: Scalars['Boolean'];
  editProfile: UserResponse;
  editProfilePic: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  sendMessage: Scalars['Boolean'];
  sendMyselfANotification: Scalars['Boolean'];
  startConversation: Scalars['Int'];
  updatePost: Post;
  uploadTestImage: Scalars['Boolean'];
};


export type MutationApproveNotificationsArgs = {
  pushToken: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreatePostArgs = {
  options: PostOptions;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationEditProfileArgs = {
  options: EditProfileInput;
};


export type MutationEditProfilePicArgs = {
  fileUpload: Scalars['Upload'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationSendMessageArgs = {
  body: Scalars['String'];
  conversationId: Scalars['Int'];
};


export type MutationSendMyselfANotificationArgs = {
  messageText: Scalars['String'];
};


export type MutationStartConversationArgs = {
  memberIds: Array<Scalars['Int']>;
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int'];
  text: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUploadTestImageArgs = {
  fileUpload: Scalars['Upload'];
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  id: Scalars['Float'];
  text: Scalars['String'];
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PostOptions = {
  text: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getConversation: Conversation;
  getConversationPreviews: Array<Conversation>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: Array<Post>;
};


export type QueryGetConversationArgs = {
  conversationId: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};

export type RegisterInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type PostSnippetFragment = { __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, textSnippet: string, creator: { __typename?: 'User', id: number, username: string } };

export type ProfileUserFragment = { __typename?: 'User', id: number, username: string, email: string, bio?: string | null | undefined, displayName?: string | null | undefined };

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string } | null | undefined };

export type ApproveNotificationsMutationVariables = Exact<{
  pushToken: Scalars['String'];
}>;


export type ApproveNotificationsMutation = { __typename?: 'Mutation', approveNotifications: boolean };

export type EditProfileMutationVariables = Exact<{
  options: EditProfileInput;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: number, username: string, email: string, bio?: string | null | undefined, displayName?: string | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type EditProfilePicMutationVariables = Exact<{
  fileUpload: Scalars['Upload'];
}>;


export type EditProfilePicMutation = { __typename?: 'Mutation', editProfilePic: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string } | null | undefined } };

export type SendMessageMutationVariables = Exact<{
  body: Scalars['String'];
  conversationId: Scalars['Int'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: boolean };

export type SendMyselfANotificationMutationVariables = Exact<{
  messageText: Scalars['String'];
}>;


export type SendMyselfANotificationMutation = { __typename?: 'Mutation', sendMyselfANotification: boolean };

export type StartConversationMutationVariables = Exact<{
  memberIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type StartConversationMutation = { __typename?: 'Mutation', startConversation: number };

export type UploadTestImageMutationVariables = Exact<{
  fileUpload: Scalars['Upload'];
}>;


export type UploadTestImageMutation = { __typename?: 'Mutation', uploadTestImage: boolean };

export type GetConversationQueryVariables = Exact<{
  conversationId: Scalars['Int'];
}>;


export type GetConversationQuery = { __typename?: 'Query', getConversation: { __typename?: 'Conversation', id: number, title?: string | null | undefined, members: Array<{ __typename?: 'User', id: number, username: string, displayName?: string | null | undefined }>, messages: Array<{ __typename?: 'Message', id: number, body: string, createdAt: string, sender: { __typename?: 'User', id: number, username: string, displayName?: string | null | undefined } }> } };

export type GetConversationPreviewsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConversationPreviewsQuery = { __typename?: 'Query', getConversationPreviews: Array<{ __typename?: 'Conversation', id: number, title?: string | null | undefined, members: Array<{ __typename?: 'User', id: number, username: string, displayName?: string | null | undefined }>, lastMessagePreview: { __typename?: 'MessagePreview', createdAt: string, display: string } }> };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string } | null | undefined };

export type MeProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type MeProfileQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, email: string, bio?: string | null | undefined, displayName?: string | null | undefined } | null | undefined };

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, text: string, creator: { __typename?: 'User', id: number, username: string } } | null | undefined };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, textSnippet: string, creator: { __typename?: 'User', id: number, username: string } }> };

export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  createdAt
  updatedAt
  title
  textSnippet
  creator {
    id
    username
  }
}
    `;
export const ProfileUserFragmentDoc = gql`
    fragment ProfileUser on User {
  id
  username
  email
  bio
  displayName
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ApproveNotificationsDocument = gql`
    mutation ApproveNotifications($pushToken: String!) {
  approveNotifications(pushToken: $pushToken)
}
    `;
export type ApproveNotificationsMutationFn = Apollo.MutationFunction<ApproveNotificationsMutation, ApproveNotificationsMutationVariables>;

/**
 * __useApproveNotificationsMutation__
 *
 * To run a mutation, you first call `useApproveNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveNotificationsMutation, { data, loading, error }] = useApproveNotificationsMutation({
 *   variables: {
 *      pushToken: // value for 'pushToken'
 *   },
 * });
 */
export function useApproveNotificationsMutation(baseOptions?: Apollo.MutationHookOptions<ApproveNotificationsMutation, ApproveNotificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveNotificationsMutation, ApproveNotificationsMutationVariables>(ApproveNotificationsDocument, options);
      }
export type ApproveNotificationsMutationHookResult = ReturnType<typeof useApproveNotificationsMutation>;
export type ApproveNotificationsMutationResult = Apollo.MutationResult<ApproveNotificationsMutation>;
export type ApproveNotificationsMutationOptions = Apollo.BaseMutationOptions<ApproveNotificationsMutation, ApproveNotificationsMutationVariables>;
export const EditProfileDocument = gql`
    mutation EditProfile($options: EditProfileInput!) {
  editProfile(options: $options) {
    user {
      ...ProfileUser
    }
    errors {
      ...RegularError
    }
  }
}
    ${ProfileUserFragmentDoc}
${RegularErrorFragmentDoc}`;
export type EditProfileMutationFn = Apollo.MutationFunction<EditProfileMutation, EditProfileMutationVariables>;

/**
 * __useEditProfileMutation__
 *
 * To run a mutation, you first call `useEditProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfileMutation, { data, loading, error }] = useEditProfileMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useEditProfileMutation(baseOptions?: Apollo.MutationHookOptions<EditProfileMutation, EditProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument, options);
      }
export type EditProfileMutationHookResult = ReturnType<typeof useEditProfileMutation>;
export type EditProfileMutationResult = Apollo.MutationResult<EditProfileMutation>;
export type EditProfileMutationOptions = Apollo.BaseMutationOptions<EditProfileMutation, EditProfileMutationVariables>;
export const EditProfilePicDocument = gql`
    mutation EditProfilePic($fileUpload: Upload!) {
  editProfilePic(fileUpload: $fileUpload)
}
    `;
export type EditProfilePicMutationFn = Apollo.MutationFunction<EditProfilePicMutation, EditProfilePicMutationVariables>;

/**
 * __useEditProfilePicMutation__
 *
 * To run a mutation, you first call `useEditProfilePicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfilePicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfilePicMutation, { data, loading, error }] = useEditProfilePicMutation({
 *   variables: {
 *      fileUpload: // value for 'fileUpload'
 *   },
 * });
 */
export function useEditProfilePicMutation(baseOptions?: Apollo.MutationHookOptions<EditProfilePicMutation, EditProfilePicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProfilePicMutation, EditProfilePicMutationVariables>(EditProfilePicDocument, options);
      }
export type EditProfilePicMutationHookResult = ReturnType<typeof useEditProfilePicMutation>;
export type EditProfilePicMutationResult = Apollo.MutationResult<EditProfilePicMutation>;
export type EditProfilePicMutationOptions = Apollo.BaseMutationOptions<EditProfilePicMutation, EditProfilePicMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($body: String!, $conversationId: Int!) {
  sendMessage(body: $body, conversationId: $conversationId)
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      body: // value for 'body'
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const SendMyselfANotificationDocument = gql`
    mutation SendMyselfANotification($messageText: String!) {
  sendMyselfANotification(messageText: $messageText)
}
    `;
export type SendMyselfANotificationMutationFn = Apollo.MutationFunction<SendMyselfANotificationMutation, SendMyselfANotificationMutationVariables>;

/**
 * __useSendMyselfANotificationMutation__
 *
 * To run a mutation, you first call `useSendMyselfANotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMyselfANotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMyselfANotificationMutation, { data, loading, error }] = useSendMyselfANotificationMutation({
 *   variables: {
 *      messageText: // value for 'messageText'
 *   },
 * });
 */
export function useSendMyselfANotificationMutation(baseOptions?: Apollo.MutationHookOptions<SendMyselfANotificationMutation, SendMyselfANotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMyselfANotificationMutation, SendMyselfANotificationMutationVariables>(SendMyselfANotificationDocument, options);
      }
export type SendMyselfANotificationMutationHookResult = ReturnType<typeof useSendMyselfANotificationMutation>;
export type SendMyselfANotificationMutationResult = Apollo.MutationResult<SendMyselfANotificationMutation>;
export type SendMyselfANotificationMutationOptions = Apollo.BaseMutationOptions<SendMyselfANotificationMutation, SendMyselfANotificationMutationVariables>;
export const StartConversationDocument = gql`
    mutation StartConversation($memberIds: [Int!]!) {
  startConversation(memberIds: $memberIds)
}
    `;
export type StartConversationMutationFn = Apollo.MutationFunction<StartConversationMutation, StartConversationMutationVariables>;

/**
 * __useStartConversationMutation__
 *
 * To run a mutation, you first call `useStartConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startConversationMutation, { data, loading, error }] = useStartConversationMutation({
 *   variables: {
 *      memberIds: // value for 'memberIds'
 *   },
 * });
 */
export function useStartConversationMutation(baseOptions?: Apollo.MutationHookOptions<StartConversationMutation, StartConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartConversationMutation, StartConversationMutationVariables>(StartConversationDocument, options);
      }
export type StartConversationMutationHookResult = ReturnType<typeof useStartConversationMutation>;
export type StartConversationMutationResult = Apollo.MutationResult<StartConversationMutation>;
export type StartConversationMutationOptions = Apollo.BaseMutationOptions<StartConversationMutation, StartConversationMutationVariables>;
export const UploadTestImageDocument = gql`
    mutation UploadTestImage($fileUpload: Upload!) {
  uploadTestImage(fileUpload: $fileUpload)
}
    `;
export type UploadTestImageMutationFn = Apollo.MutationFunction<UploadTestImageMutation, UploadTestImageMutationVariables>;

/**
 * __useUploadTestImageMutation__
 *
 * To run a mutation, you first call `useUploadTestImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadTestImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadTestImageMutation, { data, loading, error }] = useUploadTestImageMutation({
 *   variables: {
 *      fileUpload: // value for 'fileUpload'
 *   },
 * });
 */
export function useUploadTestImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadTestImageMutation, UploadTestImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadTestImageMutation, UploadTestImageMutationVariables>(UploadTestImageDocument, options);
      }
export type UploadTestImageMutationHookResult = ReturnType<typeof useUploadTestImageMutation>;
export type UploadTestImageMutationResult = Apollo.MutationResult<UploadTestImageMutation>;
export type UploadTestImageMutationOptions = Apollo.BaseMutationOptions<UploadTestImageMutation, UploadTestImageMutationVariables>;
export const GetConversationDocument = gql`
    query GetConversation($conversationId: Int!) {
  getConversation(conversationId: $conversationId) {
    id
    title
    members {
      id
      username
      displayName
    }
    messages {
      id
      body
      createdAt
      sender {
        id
        username
        displayName
      }
    }
  }
}
    `;

/**
 * __useGetConversationQuery__
 *
 * To run a query within a React component, call `useGetConversationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationQuery({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useGetConversationQuery(baseOptions: Apollo.QueryHookOptions<GetConversationQuery, GetConversationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConversationQuery, GetConversationQueryVariables>(GetConversationDocument, options);
      }
export function useGetConversationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConversationQuery, GetConversationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConversationQuery, GetConversationQueryVariables>(GetConversationDocument, options);
        }
export type GetConversationQueryHookResult = ReturnType<typeof useGetConversationQuery>;
export type GetConversationLazyQueryHookResult = ReturnType<typeof useGetConversationLazyQuery>;
export type GetConversationQueryResult = Apollo.QueryResult<GetConversationQuery, GetConversationQueryVariables>;
export const GetConversationPreviewsDocument = gql`
    query GetConversationPreviews {
  getConversationPreviews {
    id
    title
    members {
      id
      username
      displayName
    }
    lastMessagePreview {
      createdAt
      display
    }
  }
}
    `;

/**
 * __useGetConversationPreviewsQuery__
 *
 * To run a query within a React component, call `useGetConversationPreviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationPreviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationPreviewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetConversationPreviewsQuery(baseOptions?: Apollo.QueryHookOptions<GetConversationPreviewsQuery, GetConversationPreviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConversationPreviewsQuery, GetConversationPreviewsQueryVariables>(GetConversationPreviewsDocument, options);
      }
export function useGetConversationPreviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConversationPreviewsQuery, GetConversationPreviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConversationPreviewsQuery, GetConversationPreviewsQueryVariables>(GetConversationPreviewsDocument, options);
        }
export type GetConversationPreviewsQueryHookResult = ReturnType<typeof useGetConversationPreviewsQuery>;
export type GetConversationPreviewsLazyQueryHookResult = ReturnType<typeof useGetConversationPreviewsLazyQuery>;
export type GetConversationPreviewsQueryResult = Apollo.QueryResult<GetConversationPreviewsQuery, GetConversationPreviewsQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MeProfileDocument = gql`
    query MeProfile {
  me {
    ...ProfileUser
  }
}
    ${ProfileUserFragmentDoc}`;

/**
 * __useMeProfileQuery__
 *
 * To run a query within a React component, call `useMeProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeProfileQuery(baseOptions?: Apollo.QueryHookOptions<MeProfileQuery, MeProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeProfileQuery, MeProfileQueryVariables>(MeProfileDocument, options);
      }
export function useMeProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeProfileQuery, MeProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeProfileQuery, MeProfileQueryVariables>(MeProfileDocument, options);
        }
export type MeProfileQueryHookResult = ReturnType<typeof useMeProfileQuery>;
export type MeProfileLazyQueryHookResult = ReturnType<typeof useMeProfileLazyQuery>;
export type MeProfileQueryResult = Apollo.QueryResult<MeProfileQuery, MeProfileQueryVariables>;
export const PostDocument = gql`
    query Post($id: Int!) {
  post(id: $id) {
    id
    createdAt
    updatedAt
    title
    text
    creator {
      id
      username
    }
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts {
  posts {
    ...PostSnippet
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;