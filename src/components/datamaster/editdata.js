import React, { useState } from 'react';

function EditForm({ id }) {

    const [formData, setFormData] = useState({
        codeUpdate: '',
        nameUpdate: '',
        categoryUpdate: '',
        locationUpdate: '',
        conditionUpdate: '',
        dateOfPurchaseUpdate: '',
        priceUpdate: '',
        adjustmentDateUpdate: '',
        photoLinkUpdate: '',
        amountUpdate: '',
    });

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

   // Fungsi untuk mengirim permintaan edit data
const handleEdit = (id, updatedData) => {
    return fetch(`/api/editData/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Gagal mengedit data');
        }
      });
  };
  
  // Fungsi untuk mengirim permintaan hapus data
  const handleDelete = (id) => {
    return fetch(`/api/deleteData/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Gagal menghapus data');
        }
      });
  };
  
  const handleHideEdit = () => {
    const backdropElement = document.getElementById("backdrop");
    if (backdropElement) {
        backdropElement.style.display = "none";
    }
  }

    return (
        <div id="backdrop">
            <div  className="fixed inset-0 bg-gray-600 opacity-50 z-50"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg z-50 ">
                <h2 className="text-lg font-semibold mb-4">Edit Data</h2>
                <form id="editDataForm" name="editDataForm" onSubmit={handleSubmit} className="max-h-[calc(100vh-100px)] overflow-y-auto p-4">
                    <div className="form-group">
                        <label htmlFor="codeUpdate" className="text-gray-600">
                            Code Item:
                        </label>
                        <input
                            type="text"
                            id="codeUpdate"
                            name="codeUpdate"
                            className="form-input border w-full py-2 px-3 rounded mt-1"
                            value={formData.codeUpdate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nameUpdate" className="text-gray-600">
                            Item Name:
                        </label>
                        <input
                            type="text"
                            id="nameUpdate"
                            name="nameUpdate"
                            className="form-input border w-full py-2 px-3 rounded mt-1"
                            value={formData.nameUpdate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <div className="flex">
                            <div className="w-1/3 mr-2">
                                <label htmlFor="categoryUpdate" className="text-gray-600">
                                    Category:
                                </label>
                                <select
                                    id="categoryUpdate"
                                    name="categoryUpdate"
                                    className="form-input border w-full py-2 px-3 rounded mt-1"
                                    value={formData.categoryUpdate}
                                    onChange={handleInputChange}
                                >
                                    <option disabled hidden value="">
                                        Category
                                    </option>
                                    <option value="Hardware">Hardware</option>
                                    <option value="Software">Software</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="w-1/3 mr-2">
                                <label htmlFor="locationUpdate" className="text-gray-600">
                                    Location:
                                </label>
                                <select
                                    id="locationUpdate"
                                    name="locationUpdate"
                                    className="form-input border w-full py-2 px-3 rounded mt-1"
                                    value={formData.locationUpdate}
                                    onChange={handleInputChange}
                                >
                                    <option disabled hidden value="">
                                        Location
                                    </option>
                                    <option value="toko1">Toko 1</option>
                                    <option value="toko2">Toko 2</option>
                                    <option value="toko3">Toko 3</option>
                                </select>
                            </div>
                            <div className="w-1/3">
                                <label htmlFor="conditionUpdate" className="text-gray-600">
                                    Condition:
                                </label>
                                <select
                                    id="conditionUpdate"
                                    name="conditionUpdate"
                                    className="form-input border w-full py-2 px-3 rounded mt-1"
                                    value={formData.conditionUpdate}
                                    onChange={handleInputChange}
                                >
                                    <option disabled hidden value="">
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
                    <div className="form-group">
                        <div className="flex">
                            <div className="w-1/2 mr-2">
                                <label htmlFor="adjustmentDateUpdate" className="text-gray-600">
                                    Adjustment Date:
                                </label>
                                <input
                                    type="date"
                                    id="adjustmentDateUpdate"
                                    name="adjustmentDateUpdate"
                                    className="form-input border w-full py-2 px-3 rounded mt-1"
                                    value={formData.adjustmentDateUpdate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="priceUpdate" className="text-gray-600">
                                    Price:
                                </label>
                                <input
                                    type="number"
                                    id="priceUpdate"
                                    name="priceUpdate"
                                    className="form-input border w-full py-2 px-3 rounded mt-1"
                                    value={formData.priceUpdate}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfPurchaseUpdate" className="text-gray-600">
                            Date of Purchase:
                        </label>
                        <input
                            type="date"
                            id="dateOfPurchaseUpdate"
                            name="dateOfPurchaseUpdate"
                            className="form-input border w-full py-2 px-3 rounded mt-1"
                            value={formData.dateOfPurchaseUpdate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="photoLinkUpdate" className="text-gray-600">
                            Photo (Link or Upload):
                        </label>
                        <input
                            type="file"
                            id="photoUpdate"
                            name="photoUpdate"
                            className="form-input"
                        />
                        <input
                            type="text"
                            id="photoLinkUpdate"
                            name="photoLinkUpdate"
                            placeholder="Or enter photo link"
                            className="form-input mt-1 border w-full py-2 px-3 rounded"
                            value={formData.photoLinkUpdate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amountUpdate" className="text-gray-600">
                            Amount:
                        </label>
                        <input
                            type="number"
                            id="amountUpdate"
                            name="amountUpdate"
                            className="form-input border w-full py-2 px-3 rounded mt-1"
                            value={formData.amountUpdate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="text-right pt-6">
                        <button
                            type="submit"
                            className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded mr-2"
                            onClick={handleEdit}
                        >
                            Update
                        </button>
                        <button
                            className="bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded mr-2"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                        <button
                            className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
                            onClick={handleHideEdit}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditForm;
