import React, { useEffect, useState, useRef } from 'react';
import Header from '../../components/common/header';
import Sidebar from '../../components/common/sidebar';
import Chart from 'chart.js/auto';

function Dashboard() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const chartLabels = ['New', 'Old', 'Repaired', 'Bad', 'Moved'];

    const [detailData, setDetailData] = useState({
        'New': { count: 0, label: 'New stuff' },
        'Old': { count: 0, label: 'Old stuff' },
        'Repaired': { count: 0, label: 'Repaired stuff' },
        'Bad': { count: 0, label: 'Bad stuff' },
        'Moved': { count: 0, label: 'Moved stuff' },
    });

    const chartRef = useRef(null);

    const [chart, setChart] = useState(null);

    const initializeChart = () => {
        const graphArea = chartRef.current.getContext('2d');

        const chartData = {
            labels: chartLabels,
            datasets: [
                {
                    label: 'Condition',
                    backgroundColor: ['#4299e1', '#ecc94b', '#f6ad55', '#f56565', '#98FB98'],
                    data: chartLabels.map(label => detailData[label].count),
                }
            ]
        };

        const chartConfig = {
            type: 'bar',
            data: chartData,
            options: {
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                    },
                },
            },
        };

        if (chart) {
            chart.destroy();
        }

        const newChart = new Chart(graphArea, chartConfig);
        setChart(newChart);
    };

    const updateDetailData = async () => {
        try {
            const startDateDatabaseFormat = convertDateFormatToDatabase(startDate);
            const endDateDatabaseFormat = convertDateFormatToDatabase(endDate);

            const response = await fetch(`http://localhost:4000/api/dashboardData?startDate=${startDateDatabaseFormat}&endDate=${endDateDatabaseFormat}`);
            if (response.ok) {
                const data = await response.json();
                setDetailData(data);
                initializeChart();
            } else {
                console.error('Failed to fetch data:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const convertDateFormatToDatabase = (inputDate) => {
        const parts = inputDate.split("-");
        if (parts.length === 3) {
            const year = parts[0];
            const month = parts[1];
            const day = parts[2];
            return `${year}-${month}-${day}`;
        }
        return inputDate;
    };

    useEffect(() => {
        // Inisialisasi tanggal default saat komponen dimuat
        const today = new Date();
        const todayFormatted = today.toISOString().substr(0, 10);
        setStartDate(todayFormatted);
        setEndDate(todayFormatted);

        initializeChart();
        // eslint-disable-next-line
    }, []);

    const updateChart = () => {
        if (!startDate || !endDate) {
            alert('Both start and end dates must be set.');
            return;
        }

        if (startDate > endDate) {
            alert('Start date must be earlier than end date.');
            return;
        }

        updateDetailData();
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col flex-grow">
                <Header />
                <div className="flex-grow p-6 overflow-auto bg-gray-200">
                    <div className="flex items-center space-x-4" id="detailDataContainer">
                        {chartLabels.map(condition => (
                            <div
                                key={condition}
                                className={`p-6 rounded-lg shadow-md flex items-center w-full`}
                                data-condition={condition}
                            >
                                <div className="text flex-grow">
                                    <h3 className="text-3xl font-semibold">{detailData[condition].count}</h3>
                                    <p>{detailData[condition].label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center space-x-4 py-5">
                        <label className="text-gray-600">Sort by Date:</label>
                        <input
                            type="date"
                            className="py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                            type="date"
                            className="py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <button onClick={updateChart}>Update Chart</button>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md mt-2">
                        <canvas ref={chartRef} className="chart-canvas"></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
