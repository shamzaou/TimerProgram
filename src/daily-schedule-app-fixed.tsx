import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, ChevronLeft, ChevronRight, SkipForward, SkipBack, Moon, Sun } from 'lucide-react';

const DailyScheduleApp = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRunning, setIsRunning] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [selectedActivityId, setSelectedActivityId] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Jigsaw Activity Agenda from the provided images
  const schedule = [
    { id: 1, activity: "Welcoming", startTime: "09:00", endTime: "09:30", color: "bg-gray-100 border-gray-400" },
    { id: 2, activity: "Kick-Off", startTime: "09:30", endTime: "09:45", color: "bg-orange-100 border-orange-300" },
    { id: 3, activity: "Team Assignment & Break", startTime: "09:45", endTime: "10:00", color: "bg-orange-100 border-orange-300" },
    { id: 4, activity: "Ice Breaker", startTime: "10:00", endTime: "10:15", color: "bg-orange-100 border-orange-300" },
    { id: 5, activity: "Scavenger Hunt", startTime: "10:15", endTime: "10:45", color: "bg-orange-100 border-orange-300" },
    { id: 6, activity: "Short Break", startTime: "10:45", endTime: "10:55", color: "bg-orange-100 border-orange-300" },
    { id: 7, activity: "Individual Learning", startTime: "10:55", endTime: "11:15", color: "bg-gray-100 border-gray-400" },
    { id: 8, activity: "Vocabulary Session", startTime: "11:15", endTime: "11:30", color: "bg-orange-100 border-orange-300" },
    { id: 9, activity: "Peer to Peer Learning", startTime: "11:30", endTime: "11:50", color: "bg-orange-100 border-orange-300" },
    { id: 10, activity: "Short Break", startTime: "11:50", endTime: "12:00", color: "bg-orange-100 border-orange-300" },
    { id: 11, activity: "AI Comic Book", startTime: "12:00", endTime: "12:30", color: "bg-orange-100 border-orange-300" },
    { id: 12, activity: "Lunch Break", startTime: "12:30", endTime: "13:15", color: "bg-orange-100 border-orange-300" },
    { id: 13, activity: "Home Group", startTime: "13:15", endTime: "14:00", color: "bg-orange-100 border-orange-300" },
    { id: 14, activity: "Break", startTime: "14:00", endTime: "14:15", color: "bg-orange-100 border-orange-300" },
    { id: 15, activity: "Jigsaw Assessment", startTime: "14:15", endTime: "14:35", color: "bg-orange-100 border-orange-300" },
    { id: 16, activity: "Closing Remarks", startTime: "14:35", endTime: "14:45", color: "bg-orange-100 border-orange-300" },
    { id: 17, activity: "Concluding Event", startTime: "14:45", endTime: "15:00", color: "bg-orange-100 border-orange-300" }
  ];

  // Update time and countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      
      if (isRunning && countdownSeconds > 0) {
        setCountdownSeconds(prev => prev - 1);
      } else if (isRunning && countdownSeconds === 0) {
        setIsRunning(false);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isRunning, countdownSeconds]);

  // Calculate activity duration in minutes
  const getActivityDuration = (startTime: string, endTime: string) => {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    return endMinutes - startMinutes;
  };

  // Update countdown when activity changes
  useEffect(() => {
    const currentActivity = getCurrentActivity();
    if (currentActivity) {
      const durationMinutes = getActivityDuration(currentActivity.startTime, currentActivity.endTime);
      const durationSeconds = durationMinutes * 60;
      setTotalDuration(durationSeconds);
      setCountdownSeconds(durationSeconds);
      setIsRunning(false);
    }
  }, [selectedActivityId]);

  const startCountdown = () => {
    setIsRunning(true);
  };

  const stopCountdown = () => {
    setIsRunning(false);
  };

  const resetCountdown = () => {
    setCountdownSeconds(totalDuration);
    setIsRunning(false);
  };

  const formatCountdownTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    if (totalDuration === 0) return 0;
    return ((totalDuration - countdownSeconds) / totalDuration) * 100;
  };

  // Format time to HH:MM
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Convert time string to minutes for comparison
  const timeToMinutes = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Get selected activity
  const getCurrentActivity = () => {
    return schedule.find(item => item.id === selectedActivityId);
  };

  const selectNextActivity = () => {
    const currentIndex = schedule.findIndex(item => item.id === selectedActivityId);
    if (currentIndex < schedule.length - 1) {
      setSelectedActivityId(schedule[currentIndex + 1].id);
    }
  };

  const selectPreviousActivity = () => {
    const currentIndex = schedule.findIndex(item => item.id === selectedActivityId);
    if (currentIndex > 0) {
      setSelectedActivityId(schedule[currentIndex - 1].id);
    }
  };

  const currentActivity = getCurrentActivity();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Fixed Timer Header */}
      <div className={`fixed top-0 left-0 right-0 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-4 z-10 shadow-sm`}>
        <div className="max-w-2xl mx-auto">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="text-blue-600" size={32} />
                <div>
                  <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Literacy Unlocked</h1>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Stay on track with your day</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                
                <div>
                  <div className={`text-3xl font-mono font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {formatTime(currentTime)}
                  </div>
                  <div className={`text-lg font-mono mt-1 ${
                    countdownSeconds <= 60 && isRunning ? 'text-red-600 animate-pulse' : 'text-blue-600'
                  }`}>
                    Countdown: {formatCountdownTime(countdownSeconds)}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className={`w-48 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2 mt-2`}>
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        countdownSeconds <= 60 && isRunning ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${getProgressPercentage()}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-3">
                    <button
                      onClick={startCountdown}
                      disabled={isRunning || countdownSeconds === 0}
                      className={`flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium ${
                        isRunning || countdownSeconds === 0
                          ? `${isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                          : `${isDarkMode ? 'bg-green-900 text-green-300 hover:bg-green-800' : 'bg-green-100 text-green-700 hover:bg-green-200'}`
                      }`}
                    >
                      <Play size={16} />
                      <span>Start</span>
                    </button>
                    <button
                      onClick={stopCountdown}
                      disabled={!isRunning}
                      className={`flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium ${
                        !isRunning 
                          ? `${isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                          : `${isDarkMode ? 'bg-red-900 text-red-300 hover:bg-red-800' : 'bg-red-100 text-red-700 hover:bg-red-200'}`
                      }`}
                    >
                      <Pause size={16} />
                      <span>Stop</span>
                    </button>
                    <button
                      onClick={resetCountdown}
                      className={`flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium ${
                        isDarkMode 
                          ? 'bg-blue-900 text-blue-300 hover:bg-blue-800' 
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      <Clock size={16} />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Current Activity Banner */}
            {currentActivity && (
              <div className={`mt-4 p-4 rounded-lg border-2 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600' 
                  : currentActivity.color
              }`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Current: {currentActivity.activity}
                    </h2>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {currentActivity.startTime} - {currentActivity.endTime} 
                      <span className="ml-2 text-sm">
                        ({getActivityDuration(currentActivity.startTime, currentActivity.endTime)} minutes)
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`text-center ${
                      countdownSeconds <= 60 && isRunning ? 'animate-pulse' : ''
                    }`}>
                      <div className={`text-2xl font-mono font-bold ${
                        countdownSeconds <= 60 && isRunning ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {formatCountdownTime(countdownSeconds)}
                      </div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>remaining</div>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={selectPreviousActivity}
                        disabled={selectedActivityId === 1}
                        className={`p-2 rounded ${
                          selectedActivityId === 1 
                            ? `${isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                            : `${isDarkMode ? 'bg-blue-900 text-blue-300 hover:bg-blue-800' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`
                        }`}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={selectNextActivity}
                        disabled={selectedActivityId === schedule.length}
                        className={`p-2 rounded ${
                          selectedActivityId === schedule.length 
                            ? `${isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                            : `${isDarkMode ? 'bg-blue-900 text-blue-300 hover:bg-blue-800' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`
                        }`}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Activity Progress Bar */}
                <div className="mt-3">
                  <div className={`flex justify-between text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                    <span>Progress</span>
                    <span>{Math.round(getProgressPercentage())}%</span>
                  </div>
                  <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        countdownSeconds <= 60 && isRunning ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${getProgressPercentage()}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Agenda Header */}
      <div className={`fixed top-80 left-0 right-0 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-4 z-10 shadow-sm`}>
        <div className="max-w-2xl mx-auto">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
            <div className={`p-4 ${isDarkMode ? 'border-gray-600' : ''} border-b flex justify-between items-center`}>
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Agenda</h2>
              <div className="flex space-x-2">
                <button
                  onClick={selectPreviousActivity}
                  disabled={selectedActivityId === 1}
                  className={`flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium ${
                    selectedActivityId === 1 
                      ? `${isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                      : `${isDarkMode ? 'bg-blue-900 text-blue-300 hover:bg-blue-800' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`
                  }`}
                >
                  <SkipBack size={16} />
                  <span>Previous</span>
                </button>
                <button
                  onClick={selectNextActivity}
                  disabled={selectedActivityId === schedule.length}
                  className={`flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium ${
                    selectedActivityId === schedule.length 
                      ? `${isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                      : `${isDarkMode ? 'bg-green-900 text-green-300 hover:bg-green-800' : 'bg-green-100 text-green-700 hover:bg-green-200'}`
                  }`}
                >
                  <span>Next</span>
                  <SkipForward size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area with top padding to account for both fixed headers */}
      <div className="pt-[26rem] p-4">
        <div className="max-w-2xl mx-auto">
          {/* Schedule List */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
            <div className="p-6 space-y-4 mt-4">
              {schedule.map((item) => {
                const isCurrent = selectedActivityId === item.id;
                const isPast = item.id < selectedActivityId;
                const isUpcoming = item.id > selectedActivityId;
                
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedActivityId(item.id)}
                    className={`p-4 transition-all duration-300 cursor-pointer transform rounded-lg ${
                      isCurrent 
                        ? `${isDarkMode ? 'bg-indigo-600' : 'bg-indigo-500'} scale-105 ring-2 ring-indigo-300 shadow-2xl border-l-4 border-l-blue-500` 
                        : isPast 
                          ? `${isDarkMode ? 'bg-gray-700 opacity-60 hover:opacity-80' : 'bg-gray-50 opacity-60 hover:opacity-80'} hover:scale-102 hover:shadow-md` 
                          : `${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-50 hover:bg-blue-100'} hover:scale-102 hover:shadow-md border ${isDarkMode ? 'border-gray-600' : 'border-blue-100'}`
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-md ${
                          isCurrent 
                            ? 'bg-white text-indigo-600 ring-2 ring-indigo-200' 
                            : isPast 
                              ? `${isDarkMode ? 'bg-gray-500 text-gray-300' : 'bg-gray-400 text-white'}` 
                              : `${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`
                        }`}>
                          {item.id}
                        </div>
                        
                        <div>
                          <h3 className={`font-semibold ${
                            isCurrent 
                              ? 'text-white' 
                              : isPast 
                                ? `${isDarkMode ? 'text-gray-400' : 'text-gray-500'}` 
                                : `${isDarkMode ? 'text-white' : 'text-gray-800'}`
                          }`}>
                            {item.activity}
                          </h3>
                          <p className={`text-sm ${
                            isCurrent 
                              ? 'text-indigo-100' 
                              : isPast 
                                ? `${isDarkMode ? 'text-gray-500' : 'text-gray-400'}` 
                                : `${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`
                          }`}>
                            {item.startTime} - {item.endTime}
                          </p>
                        </div>
                      </div>
                      
                      {isCurrent && (
                        <div className="text-white font-medium text-sm bg-yellow-500 px-3 py-1 rounded-full shadow-md">
                          ACTIVE
                        </div>
                      )}
                      
                      {isPast && (
                        <div className={`font-medium text-sm px-3 py-1 rounded-full ${
                          isDarkMode ? 'text-gray-400 bg-gray-600' : 'text-gray-500 bg-gray-200'
                        }`}>
                          COMPLETED
                        </div>
                      )}
                      
                      {isUpcoming && (
                        <div className={`font-medium text-sm px-3 py-1 rounded-full ${
                          isDarkMode ? 'text-blue-400 bg-blue-900' : 'text-blue-600 bg-blue-100'
                        }`}>
                          UPCOMING
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className={`text-center mt-6 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Click on any activity to select it manually, or use Previous/Next buttons
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyScheduleApp;
