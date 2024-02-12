import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'chart.js/auto';
import data from './data.json';
import './StateDetail.css';

const StateDetail = () => {
  const { name } = useParams();
  const stateData = data.states.find((state) => state.name === name);
  const assetAllocationData = stateData ? Object.entries(stateData.asset_allocation) : [];
  const companies = stateData ? stateData.companies : [];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19AF', '#19FFA5'];

  const createCharts = () => {
    createPieChart();
    createLineChart();
  };

  const createPieChart = () => {
    const ctxPie = document.getElementById('pieChart');
    if (window.pieChartInstance) {
      window.pieChartInstance.destroy();
    }

    window.pieChartInstance = new Chart(ctxPie, {
      type: 'doughnut',
      data: {
        labels: assetAllocationData.map(([sector, _]) => sector),
        datasets: [{
          data: assetAllocationData.map(([_, value]) => value),
          backgroundColor: COLORS,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: true,
          },
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      }
    });
  };

  const createLineChart = () => {
    const ctxLine = document.getElementById('lineChart');
    if (window.lineChartInstance) {
      window.lineChartInstance.destroy();
    }

    // Example line chart data
    const years = ['2019', '2020', '2021', '2022'];
    const performance = [100, 150, 120, 180];

    window.lineChartInstance = new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: years,
        datasets: [{
          label: 'Fund Performance',
          data: performance,
          borderColor: '#FF5733',
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: true,
          },
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      }
    });
  };

  useEffect(() => {
    createCharts();
  }, []);

  return (
    <div>
      {stateData && (
        <div>
          <div >
          <h1>{stateData.name} Details</h1>
          <p>Temperature: {stateData.temperature}</p>
          <p>Population: {stateData.population}</p>
          </div>
          <div className='canvases'>
            <h2>Asset Allocation</h2>
            <canvas id="pieChart" className='canvas' height='150'></canvas>
            <h2>Fund Performance</h2>
            <canvas id="lineChart" className='canvas' height='150'></canvas>
          </div>
          <div>
            <h2>Company Details</h2>
            <table id="customers">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Change</th>
                  <th>Change (%)</th>
                  <th>Volume</th>
                  <th>Market Capture</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company, index) => (
                  <tr key={index}>
                    <td>{company.name}</td>
                    <td>{company.stock_price_change}</td>
                    <td>{company.stock_price_change}</td>
                    <td>{company.volume}</td>
                    <td>{company.market_capture}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StateDetail;
