import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import data from './data.json';

const StateGrid = () => {
  const [tooltipState, setTooltipState] = useState(null);

  const stateTemperatures = data.states.map(state => ({
    name: state.name,
    temperature: parseInt(state.temperature.replace('°C', ''), 10),
    population: state.population
  }));

  const maxTemperature = Math.max(...stateTemperatures.map(state => state.temperature));
  const minTemperature = Math.min(...stateTemperatures.map(state => state.temperature));

  const getBoxColor = temperature => {
    if (temperature === maxTemperature) {
      return 'red';
    } else if (temperature === minTemperature) {
      return 'blue';
    } else {
      return 'white';
    }
  };

  const handleMouseOver = (name) => {
    const state = stateTemperatures.find(state => state.name === name);
    setTooltipState(state);
  };

  const handleMouseOut = () => {
    setTooltipState(null);
  };

  return (
    <div>
      <h1>State Grid</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {stateTemperatures.map(state => (
          <div
            key={state.name}
            onMouseOver={() => handleMouseOver(state.name)}
            onMouseOut={handleMouseOut}
          >
            <Link to={`/state/${state.name}`} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  border: '1px solid black',
                  padding: '20px',
                  backgroundColor: getBoxColor(state.temperature)
                }}
              >
                {state.name}
              </div>
            </Link>
            {tooltipState && tooltipState.name === state.name && (
              <div style={{ position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', padding: '5px', borderRadius: '5px' }}>
                <p>Temperature: {tooltipState.temperature}°C</p>
                <p>Population: {tooltipState.population}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StateGrid;
