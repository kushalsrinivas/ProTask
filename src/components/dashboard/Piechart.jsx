import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js';
import {generateColorShades} from "../../components/ColorGen";

function PieChart(props) {
  const chartRef = useRef(null);

  useEffect(() => {


    const data = 
        [{
            labels:props.labels,
            values : props.values,
            type : 'pie',
            marker: {
              colors: generateColorShades('#F5DEB3', props.labels.length)
            }, 
            name :'total',
            hole :0.6,
        }   
      ];
      const layout = 
      { 
        annotations: [
            {
                font: {
                    size: 20
                },
                showarrow: false,
                text: props.text,
                x: 0.5,
                y: 0.5
                },],
            width : 400,
            hieght : 400,
            showlegend: false,
      }
      Plotly.newPlot(chartRef.current, data, layout, {displayModeBar: false});
  }, []);

  return (
    <div className='charts'>
      <div ref={chartRef}></div>
    </div>
  );
}

export default PieChart;
