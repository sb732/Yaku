/* eslint-disable @next/next/no-img-element */
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import autocolors from 'chartjs-plugin-autocolors';
import { capitalize, max } from 'lodash';

import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  autocolors,
  Legend
);
const StatBox = ({ stat }: any) => {
  const labels = Object.keys(stat)
    ?.filter((v) => !['hp', 'sp'].includes(v))
    .map((v) => capitalize(v));
  const data = {
    labels,
    datasets: [
      {
        data: labels.map((k) => stat[k.toLowerCase()]),
        backgroundColor: '#f38aff22',
        borderColor: '#f38aff',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    // maintainAspectRatio: false,
    responsive: true,
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255,255,255,0.2)',
        },
        grid: {
          color: 'rgba(255,255,255,0.2)',
        },
        pointLabels: {
          color: 'white',
        },
        ticks: {
          color: 'white',
          backdropColor: 'transparent',
        },
        suggestedMin: 0,
        suggestedMax: max(labels.map((k) => stat[k.toLowerCase()])) + 4,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      autocolors: {
        offset: 7,
      },
    },
  };
  return (
    <section className='profile-box bg-surface rounded-3xl overflow-hidden shadow-sm'>
      <div className='text-center px-4 pt-4 border-elevation2 rounded-3xl'>
        <Radar data={data} options={options} />
      </div>
    </section>
  );
};

export default StatBox;
