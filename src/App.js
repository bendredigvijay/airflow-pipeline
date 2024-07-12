import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Pipeline from './components/pipeline';
import AirflowPipeline from './components/AirflowPipeline';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Pipeline />} />
            <Route path="/airflow-pipeline" element={<AirflowPipeline />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
