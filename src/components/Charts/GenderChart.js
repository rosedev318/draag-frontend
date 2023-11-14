import React from 'react';
import { Chart } from 'react-google-charts';

export const options = {
  title: 'Gender',
  pieHole: 0.6,
  is3D: false,
  legend: {
    position: 'bottom',
    alignment: 'center',
    textStyle: {
      color: '233238',
      fontSize: 14,
      alignment: 'center'
    }
  },
  colors: ['#A5C43C', '#FD49F4', '#4994FD'],
  chartArea: {
    top: 0,
    width: '70%'
    // height: '70%'
  }
};

const GenderChart = (props) => {
  const { gender } = props;

  let result = gender?.length > 0 && gender.map(Object.values);

  if (!result) {
    return;
  }
  result = [['Gender', 'gender']].concat(result);

  return (
    <div>
      <Chart
        chartType="PieChart"
        width={'100%'}
        height={'500px'}
        data={result}
        options={options}
      />
    </div>
  );
};

export default GenderChart;
