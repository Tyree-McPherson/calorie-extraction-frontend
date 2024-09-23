import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import MyRoutineComponent from './pages/my-routine.page';
import IndexComponent from './pages/index.page';
import { LayoutComponent } from './components/layout/layout.component';
import url from './json/routes.json';
import MyGoalsComponent from './pages/my-goals.page';
import WorkoutsComponent from './pages/workouts.page';
import BodyMassIndexCalculatorComponent
from './pages/body-mass-index-calculator.page';
import CalorieLossTrackerComponent from './pages/calorie-loss-tracker.page';
import EquipmentComponent from './pages/equipment.page';
import YogaComponent from './pages/yoga.page';
import BreathingExercisesComponent from './pages/breathing-exercises.page';
import MassagesComponent from './pages/massages.page';
import MyMealPlanComponent from './pages/my-meal-plan.page';
import HealthyFoodComponent from './pages/healthy-food.page';
import HealthyMealsComponent from './pages/healthy-meals.page';
import CalorieIntakeTrackerComponent
from './pages/calorie-intake-tracker.page';
import VitaminsComponent from './pages/vitamins.page';
import FaqComponent from './pages/faq.page';
import AboutComponent from './pages/about.page';
import ContactComponent from './pages/contact.page';
import TermsOfUseComponent from './pages/terms-of-use.page';
import PrivacyPolicyComponent from './pages/privacy-policy.page';
import PageNotFoundComponent from './pages/page-not-found.page';
import ProfileComponent from './pages/profile.page';
import { determineAuthState } from './functions/determine-auth-state';

const routes: Routes = [
  {
    path: url.index, component: LayoutComponent,
    children: [
      { path: url.index, component: IndexComponent, pathMatch: 'full' },
      {
        path: url.profile,
        component: ProfileComponent,
        canActivate: [determineAuthState]
      },
      { path: url.myRoutine, component: MyRoutineComponent },
      { path: url.myGoals, component: MyGoalsComponent },
      { path: url.workouts, component: WorkoutsComponent },
      {
        path: url.bodyMassIndexCalculator,
        component: BodyMassIndexCalculatorComponent
      },
      { path: url.calorieLossTracker, component: CalorieLossTrackerComponent },
      { path: url.equipment, component: EquipmentComponent },
      { path: url.yoga, component: YogaComponent },
      { path: url.breathingExercises, component: BreathingExercisesComponent },
      { path: url.massages, component: MassagesComponent },
      { path: url.myMealPlan, component: MyMealPlanComponent },
      { path: url.healthyFood, component: HealthyFoodComponent },
      { path: url.healthyMeals, component: HealthyMealsComponent },
      {
        path: url.calorieIntakeTracker,
        component: CalorieIntakeTrackerComponent
      },
      { path: url.vitamins, component: VitaminsComponent },
      { path: url.faq, component: FaqComponent },
      { path: url.about, component: AboutComponent },
      { path: url.contact, component: ContactComponent },
      { path: url.termsOfUse, component: TermsOfUseComponent },
      { path: url.privacyPolicy, component: PrivacyPolicyComponent },
      { path: url.wildcard, component: PageNotFoundComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
