import React, { useState, useEffect } from 'react';

const PrintReport = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Tambahkan logika untuk mengambil data dari server berdasarkan parameter yang diberikan
        const queryParams = new URLSearchParams(window.location.search);
        const category = queryParams.get('category');
        const location = queryParams.get('location');
        const condition = queryParams.get('condition');
        const purchaseDateFilter = queryParams.get('purchaseDateFilter');
        const adjustmentDateFilter = queryParams.get('adjustmentDateFilter');

        fetchReportData(category, location, condition, purchaseDateFilter, adjustmentDateFilter);
    }, []);

    const fetchReportData = async (category, location, condition, purchaseDateFilter, adjustmentDateFilter) => {
        const url = `/api/reportData?category=${category}&location=${location}&condition=${condition}&purchaseDateFilter=${purchaseDateFilter}&adjustmentDateFilter=${adjustmentDateFilter}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Terjadi kesalahan saat mengambil data laporan.');
            }

            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Laporan Cetak</h1>
            <table>
                <thead>
                    <tr>
                        <th>Code Item</th>
                        <th>Item Name</th>
                        <th>Category</th>
                        <th>Date of Purchase</th>
                        <th>Price</th>
                        <th>Adjustment Date</th>
                        <th>Location</th>
                        <th>Condition</th>
                        <th>Photo</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
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
    );
};

export default PrintReport;
