import React, { useState } from 'react';
import './index.css';
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { Typography } from '@material-ui/core';
function App() {
  const [hoursStudied, setHoursStudied] = useState(0);
  const [previousScores, setPreviousScores] = useState(0);
  const [extracurricularActivities, setExtracurricularActivities] = useState(0);
  const [sleepHours, setSleepHours] = useState(0);
  const [sampleQuestionPapersPracticed, setSampleQuestionPapersPracticed] = useState(0);
  const requestData = {
    "Hours Studied": hoursStudied,
    "Previous Scores": previousScores,
    "Extracurricular Activities": extracurricularActivities,
    "Sleep Hours": sleepHours,
    "Sample Question Papers Practiced": sampleQuestionPapersPracticed
  };
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      }); 
      const json = await response.json();
      setPrediction(json.predicted_performance_index);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div class="center">
      <h1 style={{ color: 'blue', fontSize: '30px' }}>Exam Performance Index Prediction</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: "column"}}>
        <label style={{ color: 'blue', fontSize: '16px' }}>Cumulative Hours Studied:</label>
        <input style={{ backgroundColor: 'lightgray', border: '2px solid blue', padding: '10px', borderRadius: '5px' }} type="number" value={hoursStudied} onChange={(e) => setHoursStudied(parseInt(e.target.value))} />
        <br></br>
        <label style={{ color: 'blue', fontSize: '16px' }}>Average of Previous Score(0-100):</label>
        <input style={{ backgroundColor: 'lightgray', border: '2px solid blue', padding: '10px', borderRadius: '5px' }} type="number" value={previousScores} onChange={(e) => setPreviousScores(parseInt(e.target.value))} />
        <br></br>
        <label style={{ color: 'blue', fontSize: '16px' }}>Participated in Extracurricular Activtities(0-1):</label>
        <input style={{ backgroundColor: 'lightgray', border: '2px solid blue', padding: '10px', borderRadius: '5px' }} type="number" value={extracurricularActivities} onChange={(e) => setExtracurricularActivities(parseInt(e.target.value))} />
        <br></br>
        <label style={{ color: 'blue', fontSize: '16px' }}>Sleep Hours on Previous Night:</label>
        <input style={{ backgroundColor: 'lightgray', border: '2px solid blue', padding: '10px', borderRadius: '5px' }} type="number" value={sleepHours} onChange={(e) => setSleepHours(parseInt(e.target.value))} />
        <br></br>
        <label style={{ color: 'blue', fontSize: '16px' }}>Practice Exam Papers Studied:</label>
        <input style={{ backgroundColor: 'lightgray', border: '2px solid blue', padding: '10px', borderRadius: '5px' }} type="number" value={sampleQuestionPapersPracticed} onChange={(e) => setSampleQuestionPapersPracticed(parseInt(e.target.value))} />
        <br></br>
        <button style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px' }} type="submit">Predict</button>
        </div>
      </form>
      <h1 style={{ color: 'blue', fontSize: '30px' }}>Predicted Performance Index: {prediction}</h1>
    </div>
  );
}

export default App;
