/// <reference types="vite/client" />

declare module 'jsonwebtoken';

interface listNavigationItem {
  text: string;
  link: string;
}

interface nutritionImageScroll {
  image: string;
  heading: string;
  paragraph: string;
  buttonText: string;
  buttonUrl: string;
}

interface apiResponse {
  status: number;
  valid: boolean;
  message?: string;
  json?: any;
}

interface signup {
  success: boolean;
  message: string;
}

type MealItem = {
  name: string | null;
  image: string | null;
  calories: number | null;
  quantity: number | null;
};

type Meal = {
  [key: string]: MealItem;
};

type DayMeals = {
  [key: string]: Meal;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
};

type WeekMeals = {
  [key: string]: DayMeals;
};

type Exercise = {
  type: string | null;
  description: string | null;
  duration: number | null;
  calories: number | null;
};

type DayExercises = {
  exercise_one: Exercise;
  exercise_two: Exercise;
  exercise_three: Exercise;
  exercise_four: Exercise;
};

type WeekExercises = {
  [key: string]: DayExercises;
};

type ThreeStepFormField = {
  type: string | null;
  description: string | null;
  duration: number | null;
}

type ExerciseMETs = {
  [key: string]: number;
};

type Age = {
  birthday: null;
};

type Gender = {
  gender: null;
};

type Height = {
  height: null;
};

type Weight = {
  weight: null;
};

type PersonAttributes = {
  age: Age;
  gender: Gender;
  height: Height;
  weight: Weight;
};

interface Goal {
  type: string | null;
  description: string | null;
  duration: string | null;
  percentage?: string;
}

interface Goals {
  [key: string]: Goal;
}