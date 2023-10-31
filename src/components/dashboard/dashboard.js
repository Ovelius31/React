import React, { useEffect, useState, useRef } from 'react';
import Header from '../../components/common/header';
import Sidebar from '../../components/common/sidebar';
import * as d3 from 'd3'; 

function Dashboard() {
    const chartLabels = ['New', 'Old', 'Repaired', 'Bad', 'Moved'];
    const chartRef = useRef(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const chartWidth = 400; 
    const chartHeight = 300; 
    const chartColors = ['#4299e1', '#ecc94b', '#f6ad55', '#f56565', '#98FB98'];

    useEffect(() => {
        initializeChart();
        // eslint-disable-next-line
    }, []);

    fetch('http://localhost:3000/api/detailData')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('detailDataContainer');
        data.forEach(item => {
            const div = container.querySelector(`div[data-condition="${item.Condition}"]`);
            if (div) {
                const h3 = div.querySelector('h3');
                h3.textContent = item.total_amount;
            }
        });
    })
    .catch(error => console.error('Error:', error));


    const initializeChart = () => {
        const chartData = chartLabels.map(label => 0);

        const svg = d3.select(chartRef.current);

        // Menentukan skala
        const xScale = d3.scaleBand()
            .domain(chartLabels)
            .range([0, chartWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(chartData)])
            .range([chartHeight, 0]);

        // Menggambar batang-batang grafik
        svg.selectAll("rect")
            .data(chartData)
            .enter()
            .append("rect")
            .attr("x", (d, i) => xScale(chartLabels[i]))
            .attr("y", d => yScale(d))
            .attr("width", xScale.bandwidth())
            .attr("height", d => chartHeight - yScale(d))
            .attr("fill", (d, i) => chartColors[i]);

        // Label sumbu x
        svg.selectAll(".x-axis-label")
            .data(chartLabels)
            .enter()
            .append("text")
            .text(d => d)
            .attr("x", (d, i) => xScale(chartLabels[i]) + xScale.bandwidth() / 2)
            .attr("y", chartHeight + 20)
            .style("text-anchor", "middle");

        // Label sumbu y
        svg.append("text")
            .text("Count")
            .attr("transform", "rotate(-90)")
            .attr("x", -chartHeight / 2)
            .attr("y", -30)
            .style("text-anchor", "middle");
    };

    //grafik
    const updateChart = () => {
        fetch(`http://localhost:4000/api/graph?startDate=${startDate}&endDate=${endDate}`)
            .then(response => response.json())
            .then(data => {
                // Ubah data menjadi format yang sesuai untuk grafik
                const chartLabels = ['New', 'Old', 'Repaired', 'Bad', 'Moved'];
                const detailData = {};
                chartLabels.forEach(label => {
                    const item = data.find(i => i.Condition === label);
                    detailData[label] = { count: item ? item.total_amount : 0 };
                });

                // Panggil fungsi untuk menginisialisasi grafik
                initializeChart();
            })
            .catch(error => console.error('Error:', error));
    };

    useEffect(() => {
        updateChart();
        // eslint-disable-next-line
    }, [startDate, endDate]);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col flex-grow">
                <Header />
                <div className="flex-grow p-6 overflow-auto bg-gray-200">
                    <div className="flex items-center space-x-4" id="detailDataContainer">
                        <div className="p-6 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md flex items-center w-full" data-condition="New">
                            <div className="text flex-grow">
                                <h3 className="text-3xl font-semibold text-white">00</h3>
                                <p className="text-white">New stuff</p>
                            </div>
                        </div>
                        <div className="p-6 bg-yellow-400 hover:bg-yellow-500 rounded-lg shadow-md flex items-center w-full " data-condition="Old">
                            <div className="text flex-grow">
                                <h3 className="text-3xl font-semibold text-white">00</h3>
                                <p className="text-white">Old stuff</p>
                            </div>
                        </div>
                        <div className="p-6 bg-orange-500 hover:bg-orange-600 rounded-lg shadow-md flex items-center w-full" data-condition="Repaired">
                            <div className="text flex-grow">
                                <h3 className="text-3xl font-semibold text-white">00</h3>
                                <p className="text-white">Repaired stuff</p>
                            </div>
                        </div>
                        <div className="p-6 bg-red-500 hover:bg-red-600 rounded-lg shadow-md flex items-center w-full" data-condition="Bad">
                            <div className="text flex-grow">
                                <h3 className="text-3xl font-semibold text-white">00</h3>
                                <p className="text-white">Bad stuff</p>
                            </div>
                        </div>
                        <div className="p-6 bg-green-500 hover:bg-green-600 rounded-lg shadow-md flex items-center w-full" data-condition="Moved">
                            <div className="text flex-grow">
                                <h3 className="text-3xl font-semibold text-white">00</h3>
                                <p className="text-white">Moved stuff</p>
                            </div>
                        </div>
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
