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

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEdit = () => {

        fetch(`/api/editData/${id}`, {
            method: 'PUT', // Ganti dengan metode yang sesuai
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Kirim data yang akan diperbarui.
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);
                // Lakukan tindakan sesuai kebutuhan.
            })
            .catch((error) => {
                console.error('Terjadi kesalahan saat mengedit data:', error);
                // Handle error jika terjadi kesalahan saat mengedit data.
            });
    };

    const handleDelete = () => {
        // Lakukan permintaan penghapusan data dengan menggunakan API yang sudah dibuat
        fetch(`/api/deleteData/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);

            })
            .catch((error) => {
                console.error('Terjadi kesalahan saat menghapus data:', error);
                // Handle error jika terjadi kesalahan saat menghapus data.
            });
    };

    return (
        <div className="rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Data</h2>
            <form id="updateDataForm" name="updateDataForm" onSubmit={handleSubmit}>
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
                <div className="form-group">
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
                <div className="form-group">
                    <label htmlFor="locationUpdate" className="text-gray-600">
                        Location:
                    </label>
                    <input
                        type="text"
                        id="locationUpdate"
                        name="locationUpdate"
                        className="form-input border w-full py-2 px-3 rounded mt-1"
                        value={formData.locationUpdate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="conditionUpdate" className="text-gray-600">
                        Condition:
                    </label>
                    <input
                        type="text"
                        id="conditionUpdate"
                        name="conditionUpdate"
                        className="form-input border w-full py-2 px-3 rounded mt-1"
                        value={formData.conditionUpdate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="photoLinkUpdate" className="text-gray-600">
                        Photo (Link):
                    </label>
                    <input
                        type="text"
                        id="photoLinkUpdate"
                        name="photoLinkUpdate"
                        className="form-input border w-full py-2 px-3 rounded mt-1"
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
                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                        onSubmit={handleEdit}
                    >
                        Update
                    </button>
                    <button
                        className="bg-red-400 hover:bg-red-500 text-white py-2.5 px-5 rounded"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-gray-400 hover:bg-gray-500 text-white py-2.5 px-5 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditForm;
