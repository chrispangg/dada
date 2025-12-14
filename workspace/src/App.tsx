import React from 'react';
import { Calculator } from './Calculator';
import './App.css';

export const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Calculator</h1>
      <Calculator />
    </div>
  );
};
