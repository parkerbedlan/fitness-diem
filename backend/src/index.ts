import { existsSync, mkdirSync } from "fs";
import path from "path";
import "reflect-metadata";
import { corsOptions, __prod__ } from "./constants";
import { Conversation } from "./entities/Conversation";
import { Message } from "./entities/Message";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { Workout } from "./entities/Workout";
import { Exercise } from "./entities/Exercise";
import { WorkoutExercise } from "./entities/WorkoutExercise";
import { MuscleGroup } from "./entities/MuscleGroup";
import { Gym } from "./entities/Gym";
import { Machine } from "./entities/Machine";
import { WeightChart } from "./entities/WeightChart";
import { FitnessAppServer } from "./FitnessAppServer";
import { ConversationResolver } from "./resolvers/conversation";
import { HelloResolver } from "./resolvers/hello";
import { MessageResolver } from "./resolvers/message";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { WorkoutResolver } from "./resolvers/workout";
import { ExerciseResolver } from "./resolvers/exercise";
import { WorkoutExerciseResolver } from "./resolvers/workoutExercise";
import { MuscleGroupResolver } from "./resolvers/muscleGroup";
import { GymResolver } from "./resolvers/gym";
import { MachineResolver } from "./resolvers/machine";
import { WeightChartResolver } from "./resolvers/weightChart";

const main = async () => {
  const fileDirectories = ["./images", "./images/profilepic"];
  fileDirectories.forEach((directory) => {
    existsSync(path.join(__dirname, directory)) ||
      mkdirSync(path.join(__dirname, directory));
  });

  const myServer = new FitnessAppServer(
    "localhost",
    corsOptions,
    [
      HelloResolver,
      UserResolver,
      PostResolver,
      MessageResolver,
      ConversationResolver,
      WorkoutResolver,
      ExerciseResolver,
      WorkoutExerciseResolver,
      MuscleGroupResolver,
      GymResolver,
      MachineResolver,
      WeightChartResolver,
    ],
    [
      User,
      Post,
      Message,
      Conversation,
      Workout,
      Exercise,
      WorkoutExercise,
      MuscleGroup,
      Gym,
      Machine,
      WeightChart,
    ]
  );
  await myServer.setup();
  myServer.start();
  myServer.tester();
  // myServer.sendTestNotification("This is a test notification");
};

main().catch(console.error);
