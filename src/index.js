import "./styles/styles.css"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/antd.css'
import { AuthContextProvider } from './context/AuthContext';
import { AllDataSchedulesProvider } from './context/AllDataSchedules'
import { InfoUserContextProvider } from './context/InfoUserContext'
import { GetDataOneScheduleProvider } from "./context/GetDataOneSchedule";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <InfoUserContextProvider>
        <AllDataSchedulesProvider>

            <GetDataOneScheduleProvider>

              <App />
            </GetDataOneScheduleProvider>

        </AllDataSchedulesProvider>
      </InfoUserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
