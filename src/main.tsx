import React from 'react'
import ReactDOM from 'react-dom/client'
import DailyScheduleApp from './daily-schedule-app.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DailyScheduleApp />
  </React.StrictMode>,
)
