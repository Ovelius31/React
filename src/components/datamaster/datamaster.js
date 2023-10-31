import React, { useState, useEffect } from 'react';
import EditForm from './editdata';
import AddForm from './adddata';
import Header from '../../components/common/header';
import Sidebar from '../../components/common/sidebar';

function DataMaster() {
  const [editVisible, setEditVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [data, setData] = useState([
    {
      codeItem: '-',
      itemName: '-',
      category: '-',
      dateOfPurchase: '-',
      price: '-',
      adjustmentDate: '-',
      location: '-',
      condition: '-',
      photo: '-',
      amount: '-',
      action: '-',
    },
  ]);

  const [filter, setFilter] = useState({
    category: '',
    location: '',
    condition: '',
    purchaseDate: '',
    adjustmentDate: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const resetFilter = () => {
    setFilter({
      category: '',
      location: '',
      condition: '',
      purchaseDate: '',
      adjustmentDate: '',
    });

    fetchData();
  };

  const fetchData = () => {
    fetch('/api/filterData', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((error) => {
        console.error('Terjadi kesalahan:', error);
      });
  };

  const applyFilter = () => {
    fetch(
      `/api/filterData?category=${filter.category}&location=${filter.location}&condition=${filter.condition}&purchaseDateFilter=${filter.purchaseDate}&adjustmentDateFilter=${filter.adjustmentDate}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }   
    )
      .then((response) => response.json())
      .then((filteredData) => {
        setData(filteredData);
      })
      .catch((error) => {
        console.error('Terjadi kesalahan:', error);
      });
  };

  const handleShowEdit = () => {
    setEditVisible(!editVisible); 
  };

  const handleShowAdd = () => {
    setAddVisible(!addVisible); 
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
                  <button
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-md"
                    onClick={resetFilter}
                  >
                    Reset Filter
                  </button>
                  <button
                    className="px-4 py-2 bg-purple-400 hover:bg-purple-500 text-white text-sm font-medium rounded-md"
                    onClick={applyFilter}
                  >
                    Apply Filter
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-400 hover-bg-blue-500 text-white text-sm font-medium rounded-md"
                    onClick={handleShowAdd}
                  >
                    Add Data
                  </button>
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
                    <path
                      d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by Code Item, Item Name, ..."
                  className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus-border-gray-500 focus-bg-white focus-ring-0 text-sm"
                />
              </div>
              <div className="flex flex-wrap gap-4 mt-5">
                <div className="w-full md:w-1/9">
                  <div className="flex gap-4">
                    <div className="w-full md:w-1/3">
                      <select
                        className="w-full px-4 py-3 rounded-md bg-gray-100 border-transparent focus-border-gray-500 focus-bg-gray-100 focus-ring-0 text-sm"
                      >
                        <option disabled hidden selected value="">
                          Category
                        </option>
                        <option value="Hardware">Hardware</option>
                        <option value="Software">Software</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="w-full md:w-1/3">
                      <select
                        className="w-full px-4 py-3 rounded-md bg-gray-100 border-transparent focus-border-gray-500 focus-bg-gray-100 focus-ring-0 text-sm"
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
              <div className="flex flex-wrap gap-4 mt-5">
                <div className="w-full md:w-1/8">
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="text-gray-600">Date of Purchase (Start)</label>
                      <input
                        type="date"
                        id="startDateInput"
                        className="w-full py-1 px-1 border border-gray-300 rounded-md focus-outline-none focus-border-blue-500"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="text-gray-600">Date of Purchase (End)</label>
                      <input
                        type="date"
                        id="endDateInput"
                        className="w-full py-1 px-1 border border-gray-300 rounded-md focus-outline-none focus-border-blue-500"
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
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="text-gray-600">Adjustment Date (End)</label>
                      <input
                        type="date"
                        id="endAdjustmentDateInput"
                        className="w-full py-1 px-1 border border-gray-300 rounded-md focus-outline-none focus-border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-8 mt-6 lg:mt-0 rounded shadow bg-white items-center">
            <div class="table-wrapper overflow-x-auto">
              <table id="data-table" class="border-collapse border hover responsive w-full py-1">
                <thead>
                  <tr>
                    <th class="p-3 border bg-gray-100">Code Item</th>
                    <th class="p-3 border bg-gray-100">Item Name</th>
                    <th class="p-3 border bg-gray-100">Category</th>
                    <th class="p-3 border bg-gray-100">Date of Purchase</th>
                    <th class="p-3 border bg-gray-100">Price</th>
                    <th class="p-3 border bg-gray-100">Adjustment Date</th>
                    <th class="p-3 border bg-gray-100">Location</th>
                    <th class="p-3 border bg-gray-100">Condition</th>
                    <th class="p-3 border bg-gray-100">Photo</th>
                    <th class="p-3 border bg-gray-100">Amount</th>
                    <th class="p-3 border bg-gray-100">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td class="p-3 border text-center items-center">{item.codeItem}</td>
                      <td class="p-3 border text-center items-center">{item.itemName}</td>
                      <td class="p-3 border text-center items-center">{item.category}</td>
                      <td class="p-3 border text-center items-center">{item.dateOfPurchase}</td>
                      <td class="p-3 border text-center items-center">{item.price}</td>
                      <td class="p-3 border text-center items-center">{item.adjustmentDate}</td>
                      <td class="p-3 border text-center items-center">{item.location}</td>
                      <td class="p-3 border text-center items-center">{item.condition}</td>
                      <td class="p-3 border text-center items-center">{item.photo}</td>
                      <td class="p-3 border text-center items-center">{item.amount}</td>
                      <td class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border border-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={handleShowEdit}>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span class="text-xs xs:text-sm text-gray-900">Showing 1 to 1 of 1 Entries</span>
              <div class="inline-flex mt-2 xs:mt-0">
                <div class="flex justify-center space-x-1 dark:text-gray-100">
                  <button title="previous" type="button" class="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-blue-500 dark:border-blue-700"><svg viewbox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="w-4">
                    <polyline points="15 18 9 12 15 6"></polyline></svg></button>
                  <button type="button" title="Page 1" class="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-blue-500 dark:text-white dark:border-blue-700">1</button> <button title="next" type="button" class="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-blue-500 dark:border-blue-700"><svg viewbox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="w-4">
                    <polyline points="9 18 15 12 9 6"></polyline></svg></button>
                </div>
              </div>
            </div>
          </div>
          {editVisible && <EditForm />}
          {addVisible && <AddForm />}
        </div>
      </div>
    </div>
  );
}

export default DataMaster;