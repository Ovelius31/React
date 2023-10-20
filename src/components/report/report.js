import React, { useState, useEffect } from 'react';
import Header from '../../components/common/header';
import Sidebar from '../../components/common/sidebar';

const Report = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [conditionFilter, setConditionFilter] = useState('');
    const [purchaseDateFilter, setPurchaseDateFilter] = useState('');
    const [adjustmentDateFilter, setAdjustmentDateFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchText, setSearchText] = useState('');
    const [ setSearchDate] = useState('');
    const [reportDate, setReportDate] = useState('');


    useEffect(() => {
        fetchReportData();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const currentDate = new Date();
        setReportDate(formatDate(currentDate));
        // eslint-disable-next-line
    }, []);

    function formatDate(date) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    }

    const fetchReportData = async () => {
        const url = `/api/reportData?category=${categoryFilter}&location=${locationFilter}&condition=${conditionFilter}&purchaseDateFilter=${purchaseDateFilter}&adjustmentDateFilter=${adjustmentDateFilter}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Terjadi kesalahan saat mengambil data laporan.');
            }

            const data = await response.json();
            setData(data);
            setFilteredData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const filterData = () => {
        const filteredData = data.filter((item) => {
            return (
                (categoryFilter === '' || item.category.toLowerCase() === categoryFilter.toLowerCase()) &&
                (locationFilter === '' || item.location.toLowerCase() === locationFilter.toLowerCase()) &&
                (conditionFilter === '' || item.condition.toLowerCase() === conditionFilter.toLowerCase()) &&
                (purchaseDateFilter === '' || item.dateOfPurchase === purchaseDateFilter) &&
                (adjustmentDateFilter === '' || item.adjustmentDate === adjustmentDateFilter)
            );
        });

        setFilteredData(filteredData);

        // Tambahkan logika untuk navigasi ke halaman cetak di sini
        const queryParams = new URLSearchParams({ 
            category: categoryFilter,
            location: locationFilter,
            condition: conditionFilter,
            purchaseDateFilter: purchaseDateFilter,
            adjustmentDateFilter: adjustmentDateFilter,
        });

        window.location.href = `/printreport?${queryParams.toString()}`;
    };

    const resetFilters = () => {
        setCategoryFilter('');
        setLocationFilter('');
        setConditionFilter('');
        setPurchaseDateFilter('');
        setAdjustmentDateFilter('');
        setStartDate('');
        setEndDate('');
        setSearchText('');
        setSearchDate('');
        setFilteredData([]);
    };

    const searchByDate = () => {
        const filteredData = data.filter((item) => {
            const purchaseDate = new Date(item.dateOfPurchase);
            const adjustmentDate = new Date(item.adjustmentDate);
            const start = new Date(startDate);
            const end = new Date(endDate);

            return (
                (purchaseDate >= start && purchaseDate <= end) ||
                (adjustmentDate >= start && adjustmentDate <= end)
            );

        });

        setFilteredData(filteredData);
    };

    const searchByText = () => {
        const filteredData = data.filter((item) => {
            return item.codeItem.toLowerCase().includes(searchText.toLowerCase()) || item.itemName.toLowerCase().includes(searchText.toLowerCase());
        });

        setFilteredData(filteredData);
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col flex-grow">
                <Header />

                <div className="flex-grow p-5 overflow-auto bg-gray-200 custom-size">
                    <div className="flex items-center space-x-4 py-5">
                        <div className="w-full shadow p-5 rounded-lg bg-white" id="filter">
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="font-medium">Filters</h5>
                                <div className="space-x-2">
                                    <button className="px-4 py-2 bg-green-500 hover-bg-green-600 text-white text-sm font-medium rounded-md" onClick={resetFilters}>
                                        Reset Filter
                                    </button>
                                    <button id="applyFilterButton" className="px-4 py-2 bg-purple-400 hover-bg-purple-500 text-white text-sm font-medium rounded-md" onClick={filterData}>
                                        Apply Filter
                                    </button>
                                    <button className="px-4 py-2 bg-yellow-500 hover-bg-yellow-600 text-white text-sm font-medium">Print</button>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute flex items-center ml-2 h-full">
                                    <svg
                                        className="w-4 h-4 fill-current text-primary-gray-dark"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by Code Item, Item Name, ..."
                                    className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus-border-gray-500 focus-bg-white focus-ring-0 text-sm"
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-wrap gap-4 mt-5">
                                <div className="w-full md:w-1/9">
                                    <div className="flex gap-4">
                                        <div className="w-full md:w-1/3">
                                            <select
                                                className="w-full px-4 py-3 rounded-md bg-gray-100 border-transparent focus-border-gray-500 focus-bg-gray-100 focus-ring-0 text-sm"
                                                style={{ width: "100%" }}
                                                id="categoryFilter"
                                                onChange={(e) => setCategoryFilter(e.target.value)}
                                            >
                                                <option disabled hidden selected value="">
                                                    Category
                                                </option>
                                                <option value="Hardware">Hardware</option>
                                                <option value="Software">Software</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="w-full md:w-1/3"onChange={searchByDate}>
                                            <select
                                                className="w-full px-4 py-3 rounded-md bg-gray-100 border-transparent focus-border-gray-500 focus-bg-gray-100 focus-ring-0 text-sm"
                                                style={{ width: "100%" }}
                                                id="locationFilter"
                                                onChange={(e) => setLocationFilter(e.target.value)}
                                            >
                                                <option disabled hidden selected value="">
                                                    Location
                                                </option>
                                                <option value="toko1">Toko 1</option>
                                                <option value="toko2">Toko 2</option>
                                                <option value="toko3">Toko 3</option>
                                            </select>
                                        </div>
                                        <div className="w-full md:w-1/3">
                                            <select
                                                className="w-full px-4 py-3 rounded-md bg-gray-100 border-transparent focus-border-gray-500 focus-bg-gray-100 focus-ring-0 text-sm"
                                                style={{ width: "100%" }}
                                                id="conditionFilter"
                                                onChange={(e) => setConditionFilter(e.target.value)}
                                            >
                                                <option disabled hidden selected value="">
                                                    Condition
                                                </option>
                                                <option value="New">New</option>
                                                <option value="Old">Old</option>
                                                <option value="Repaired">Repaired</option>
                                                <option value="Bad">Bad</option>
                                                <option value="Moved">Moved</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-5" onChange={searchByDate}>
                                <div className="w-full md:w-1/8">
                                    <div className="flex gap-4">
                                        <div className="w-1/2">
                                            <label className="text-gray-600">Date of Purchase (Start)</label>
                                            <input
                                                type="date"
                                                id="startDateInput"
                                                className="w-full py-1 px-1 border border-gray-300 rounded-md focus-outline-none focus-border-blue-500"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <label className="text-gray-600">Date of Purchase (End)</label>
                                            <input
                                                type="date"
                                                id="endDateInput"
                                                className="w-full py-1 px-1 border border-gray-300 rounded-md focus-outline-none focus-border-blue-500"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-4 mt-4">
                                        <div className="w-1/2">
                                            <label className="text-gray-600">Adjustment Date (Start)</label>
                                            <input
                                                type="date"
                                                id="startAdjustmentDateInput"
                                                className="w-full py-1 px-1 border border-gray-300 rounded-md focus-outline-none focus-border-blue-500"
                                                value={startDate}
                                                onChange={(e) => setAdjustmentDateFilter(e.target.value)}
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <label className="text-gray-600">Adjustment Date (End)</label>
                                            <input
                                                type="date"
                                                id="endAdjustmentDateInput"
                                                className="w-full py-1 px-1 border border-gray-300 rounded-md focus-outline-none focus-border-blue-500"
                                                value={endDate}
                                                onChange={(e) => setAdjustmentDateFilter(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-8 mt-6 lg:mt-0 rounded shadow bg-white items-center">
                        <div className="space-x-4">
                            <div className="w-1/2 md:w-1/4">
                                <label className="text-gray-600">Code Item</label>
                                <input
                                    type="text"
                                    className="w-full py-2 px-2 border border-gray-300 rounded-md focus-outline-none focus-border-blue-500"
                                    id="codeItemInput"
                                />
                            </div>
                            <div className="w-1/2 md:w-1/4">
                                <label className="text-gray-600">Item Name</label>
                                <input
                                    type="text"
                                    className="w-full py-2 px-2 border border-gray-300 rounded-md focus-outline-none focus-border-blue-500"
                                    id="itemNameInput"
                                />
                            </div>
                        </div>
                        <div className="flex mt-6">
                            <button id="searchButton" className="px-4 py-2 bg-primary-dark hover-bg-primary text-white text-sm font-medium rounded-md" onClick={searchByText}>
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="w-full mt-5" id="data-table">
                        <div className="table-wrapper overflow-x-auto">
                            <h1 id="report-date" className="text-2xl font-bold mb-4">
                                Assets Data Report - {reportDate}
                            </h1>
                            <table id="resultTable" className="border-collapse border hover responsive w-full py-1">
                                <thead>
                                    <tr>
                                        <th className="p-3 border bg-gray-100">Code Item</th>
                                        <th className="p-3 border bg-gray-100">Item Name</th>
                                        <th className="p-3 border bg-gray-100">Category</th>
                                        <th className="p-3 border bg-gray-100">Date of Purchase</th>
                                        <th className="p-3 border bg-gray-100">Price</th>
                                        <th className="p-3 border bg-gray-100">Adjustment Date</th>
                                        <th className="p-3 border bg-gray-100">Location</th>
                                        <th className="p-3 border bg-gray-100">Condition</th>
                                        <th className="p-3 border bg-gray-100">Photo</th>
                                        <th className="p-3 border bg-gray-100">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((item, index) => (
                                        <tr key={index}>
                                            <td className="p-3 border text-center items-center">{item.codeItem}</td>
                                            <td className="p-3 border text-center items-center">{item.itemName}</td>
                                            <td className="p-3 border text-center items-center">{item.category}</td>
                                            <td className="p-3 border text-center items-center">{item.dateOfPurchase}</td>
                                            <td className="p-3 border text-center items-center">{item.price}</td>
                                            <td className="p-3 border text-center items-center">{item.adjustmentDate}</td>
                                            <td className="p-3 border text-center items-center">{item.location}</td>
                                            <td className="p-3 border text-center items-center">{item.condition}</td>
                                            <td className="p-3 border text-center items-center">{item.photo}</td>
                                            <td className="p-3 border text-center items-center">{item.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;
