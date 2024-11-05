import './app.scss';
import '../common/common.scss';

import { React } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/home';
import Diary from '../pages/diary';
import Login from '../pages/login';
import Registration from '../pages/registration';
import CalorieCalculation from '../pages/calorie-calculation';
import ProfilePage from '../pages/profile';
import MealsItemPage from '../pages/meals-item';
import ChangeTargetPage from '../pages/change-target';

function App() {
  return (
      <main className="main">
          <Routes>
              <Route
                  path="/"
                  element={<Home/>}>
              </Route>
              <Route
                  path="/login"
                  element={<Login/>}>
              </Route>
              <Route
                  path="/registration"
                  element={<Registration/>}>
              </Route>
              <Route
                  path="/diary"
                  element={<Diary/>}>
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
              <Route
                  path="/change-target"
                  element={<ChangeTargetPage/>}
              />
          </Routes>
      </main>
  );
}

export default App;
