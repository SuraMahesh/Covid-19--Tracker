import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";

function LineGraph() {
    const [data, setData] = useState({});

    const buildChartData = (data, casesType='cases') => {
        const chartData =[];
        let lastDataPoint;
        data[casesType].forEach((date) => {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][data];
        }) 
        return chartData;
    };

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(response => response.json())
        .then(data => {
            const chartData = buildChartData(data, 'cases'); 
            setData(chartData);
        });
    }, []);

   
    return (
        <div>
            <h2>Graph</h2>
            <Line data={{
                datasets: [
                    {
                        backgroundColor: "rgba(204, 16, 52",
                        borderColor: "#CC1034",
                        data: data,
                    }],
            }}></Line>
        </div>
    );
}

export default LineGraph
