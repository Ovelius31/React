import React, { useState } from 'react';

function AddForm() {

  const [, setAddVisible] = useState(false);
  const [setData] = useState([
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

  const [formData, setFormData] = useState({
    itemName: '', 
    category: '',
    location: '',
    condition: '',
    purchaseDate: '',
    price: '',
    adjustmentDate: '',
    photo: '',
    amount: '',
  });

  const handleHideAdd = () => {
    setAddVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

  const handleAdd = () => {
    // Lakukan validasi data yang akan ditambahkan, kemudian kirimkan permintaan POST ke API.
    const newItemData = {
      itemName: formData.itemName, // Ganti dengan data yang sesuai
      // Tambahkan field data lainnya sesuai kebutuhan
    };

    fetch('/api/addData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItemData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message); // Output pesan dari server
        // Setelah penambahan data sukses, Anda dapat mereset form atau melakukan tindakan lain.
        resetForm();
        fetchData(); 
      })
      .catch((error) => {
        console.error('Terjadi kesalahan saat menambahkan data:', error);
        // Handle error jika terjadi kesalahan saat menambahkan data.
      });
  };

  const resetForm = () => {
    setFormData({
      itemName: '',
      category: '',
      location: '',
      condition: '',
      purchaseDate: '',
      price: '',
      adjustmentDate: '',
      photo: '',
      amount: '',
    });
  };

  return (
    <div className="flex">
    <div className="rounded-lg" data-te-animation-reset="true" data-te-animation="[fade-in_1s_ease-in-out]" data-te-animation-start="onHover">
        <h2 className="text-lg font-semibold mb-4">Add Data</h2>
        <form id="addDataForm" name="addDataForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="itemName" className="text-gray-600">Item Name:</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              className="form-input border w-full py-2 px-3 rounded mt-1"
              value={formData.itemName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex">
            <div className=" w-1/3 mr-2">
              <label htmlFor="category" className="text-gray-600">Category:</label>
              <select
                id="category"
                name="category"
                className="form-input border w-full py-2 px-3 rounded mt-1"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option disabled hidden value="">Category</option>
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className=" w-1/3 mr-2">
              <label htmlFor="location" className="text-gray-600">Location:</label>
              <select
                id="location"
                name="location"
                className="form-input border w-full py-2 px-3 rounded mt-1"
                value={formData.location}
                onChange={handleInputChange}
              >
                <option disabled hidden value="">Location</option>
                <option value="toko1">Toko 1</option>
                <option value="toko2">Toko 2</option>
                <option value="toko3">Toko 3</option>
              </select>
            </div>
            <div className="form-group w-1/3">
              <label htmlFor="condition" className="text-gray-600">Condition:</label>
              <select
                id="condition"
                name="condition"
                className="form-input border w-full py-2 px-3 rounded mt-1"
                value={formData.condition}
                onChange={handleInputChange}
              >
                <option disabled hidden value="">Condition</option>
                <option value="New">New</option>
                <option value="Old">Old</option>
                <option value="Repaired">Repaired</option>
                <option value="Bad">Bad</option>
                <option value="Moved">Moved</option>
              </select>
            </div>
          </div>
          <div className="flex">
            <div className=" w-1/2 mr-2">
              <label htmlFor="purchaseDate" className="text-gray-600">Date of Purchase:</label>
              <input
                type="date"
                id="purchaseDate"
                name="purchaseDate"
                className="form-input border w-full py-2 px-3 rounded mt-1"
                value={formData.purchaseDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group w-1/2">
              <label htmlFor="price" className="text-gray-600">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                className="form-input border w-full py-2 px-3 rounded mt-1"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="adjustmentDate" className="text-gray-600">Adjustment Date:</label>
            <input
              type="date"
              id="adjustmentDate"
              name="adjustmentDate"
              className="form-input border w-full py-2 px-3 rounded mt-1"
              value={formData.adjustmentDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo" className="text-gray-600">Photo (Link or Upload):</label>
            <input
              type="file"
              id="photo"
              name="photo"
              className="form-input"
            />
            <input
              type="text"
              id="photoLink"
              name="photoLink"
              placeholder="Or enter photo link"
              className="form-input mt-1 border w-full py-2 px-3 rounded"
              value={formData.photoLink}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount" className="text-gray-600">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="form-input border w-full py-2 px-3 rounded mt-1"
              value={formData.amount}
              onChange={handleInputChange}
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-green-400 hover:bg-green-500 text-white py-2 px-4 rounded"
              onClick={handleAdd}
            >
              Submit
            </button>
            <button
              className="bg-gray-400 hover-bg-gray-500 text-white py-2 px-4 rounded" onClick={handleHideAdd}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddForm;
