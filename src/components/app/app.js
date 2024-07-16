import './app.css';
import '../common/common.scss';

import { React, StrictMode } from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/home-page';
import DiaryPage from '../pages/diary-page';
import LoginPage from '../pages/login-page';
import RegistrationPage from '../pages/registration-page';
import CalorieCalculation from '../pages/calorie-calculation';
import ProfilePage from '../pages/profile';
import MealsItemPage from '../pages/meals-item-page'

function App() {
  return (
      <main className="main">
          <Routes>
              <Route
                  path="/"
                  element={<HomePage/>}>
              </Route>
              <Route
                  path="/login"
                  element={<LoginPage/>}>
              </Route>
              <Route
                  path="/registration"
                  element={<RegistrationPage/>}>
              </Route>
              <Route
                  path="/diary"
                  element={<DiaryPage/>}>
              </Route>
              <Route
                  path="/calorie-calculation"
                  element={<CalorieCalculation/>}>
              </Route>
              <Route
                path="/profile"
                element={<ProfilePage/>}>
              </Route>
              <Route
                  path="/diary/:mealsId"
                  element={<MealsItemPage/>}
              />
          </Routes>
      </main>
  );
}

export default App;
