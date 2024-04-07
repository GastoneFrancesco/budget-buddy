import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { GraphService } from '../services/GraphService';

interface GraphProps {
    dataValue: Map<string, number[]>;
}

export const GraphComponent: React.FC<GraphProps> = ({ dataValue }) => {

    const [monthStartDay, setMonthStartDay] = useState<number | ''>('');
    const [labels, setLabels] = useState<string[]>([])

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend
    );

    useEffect(() => {
        const storedStartDay = localStorage.getItem('monthStartDay');
        const startDay: number = storedStartDay === null ? 1 : parseInt(storedStartDay);
        setMonthStartDay(startDay);
        setLabels(GraphService.generateLabels());

    }, []);

    const handleMonthStartDayChange = (value: string): void => {
        const parsedValue = parseInt(value);
        if (!isNaN(parsedValue)) {
            setMonthStartDay(parsedValue);
            localStorage.setItem('monthStartDay', JSON.stringify(parsedValue));
            setLabels(GraphService.generateLabels());
        } else {
            //Else used to determinate when the user delete all the numbers
            setMonthStartDay('');
            localStorage.removeItem('monthStartDay');
        }
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart',
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.0)', // White color for X-axis grid lines
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 1)', // White color for X-axis tick labels
                },
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)', // White color for Y-axis grid lines
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 1)', // White color for Y-axis tick labels
                },
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                fill: false, //se voglio fare il fill dell'area metto true ma non mi piace come viene graficamente
                label: 'Main balance',
                data: dataValue.get('main-balance'),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                fill: false,
                label: 'Savings',
                data: dataValue.get('savings'),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <>
            <Line options={options} data={data} />
            <input type='number' value={monthStartDay} onChange={e => handleMonthStartDayChange(e.target.value)} />
        </>
    );
};
