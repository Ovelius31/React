import React, { useState, useEffect } from 'react';
import Header from '../../components/common/header';
import Sidebar from '../../components/common/sidebar';

function UserTable() {
    const [users, setUsers] = useState([]);
    const [isAddUserPopupOpen, setIsAddUserPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const showEditPopup = (user) => {
        setSelectedUser(user);
        setIsEditPopupOpen(true);
    };

    const openAddUserPopup = () => {
        setIsAddUserPopupOpen(true);
    };

    const closeAddUserPopup = () => {
        setIsAddUserPopupOpen(false);
    };

    const closeEditPopup = () => {
        setIsEditPopupOpen(false);
        setSelectedUser(null);
    };

    const fetchData = () => {
        fetch("/IT%20Management%20Asset/Backend/src/user/getData.php")
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error("Error fetching user data: ", error);
            });
    };

    const updateUser = () => {

        closeEditPopup();
    };
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col flex-grow">
                <Header />
            <div className="flex-grow p-6 overflow-auto bg-gray-200">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Username
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Division
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Password
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Edit
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <td className="p-3 border text-center items-center">{user.username}</td>
                                        <td className="p-3 border text-center items-center">{user.division}</td>
                                        <td className="p-3 border text-center items-center">{user.role}</td>
                                        <td className="p-3 border text-center items-center">{user.password}</td>
                                        <td className="p-3 border text-center items-center" style={{ verticalAlign: 'middle' }}>
                                            <button onClick={() => showEditPopup(user)} className="justify-center items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-400 flex" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ cursor: 'pointer' }}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="space-x-2 ml-auto text-right">
                    <button className="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white text-sm font-medium rounded-md" onClick={() => openAddUserPopup()}>Add User</button>
                </div>
            </div>
              {/* Edit User Popup */}
            {isEditPopupOpen && selectedUser && (
                <div id="popup" className="fixed">
                    <div className="flex">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold mb-4">Edit User</h2>
                            <form id="editForm" name="editForm">
                                <div className="mb-4">
                                    <label htmlFor="usernameInput" className="block text-sm font-medium text-gray-700">Username:</label>
                                    <input type="text" id="usernameInput" name="username" className="form-input border w-full py-2 px-3 rounded mt-1" defaultValue={selectedUser.username} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="divisionInput" className="block text-sm font-medium text-gray-700">Division:</label>
                                    <input type="text" id="divisionInput" name="division" className="form-input border w-full py-2 px-3 rounded mt-1" defaultValue={selectedUser.division} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="roleInput" className="block text-sm font-medium text-gray-600">Role:</label>
                                    <input type="text" id="roleInput" name="role" className="form-input border w-full py-2 px-3 rounded mt-1" defaultValue={selectedUser.role} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="passwordInput" className="block text-sm font-medium text-gray-700">Password:</label>
                                    <input type="password" id="passwordInput" name="password" className="form-input border w-full py-2 px-3 rounded mt-1" defaultValue={selectedUser.password} />
                                </div>
                                <div className="text-right">
                                    <button type="button" onClick={() => updateUser(selectedUser)} className="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white text-sm font-medium rounded-md">Update</button>
                                    <button type="button" className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white text-sm font-medium rounded-md ml-2" onClick={closeEditPopup}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {isAddUserPopupOpen && (
                <div id="addUserPopup" className="fixed inset-0 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Add User</h2>
                        <form id="addUserForm" name="addUserForm">
                            <div className="mb-4">
                                <label htmlFor="newUsername" className="block text-sm font-medium text-gray-700">Username:</label>
                                <input type="text" id="newUsername" name="newUsername" className="form-input border w-full py-2 px-3 rounded mt-1" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="newDivision" className="block text-sm font-medium text-gray-700">Division:</label>
                                <input type="text" id="newDivision" name="newDivision" className="form-input border w-full py-2 px-3 rounded mt-1" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="newRole" className="block text-sm font-medium text-gray-700">Role:</label>
                                <input type="text" id="newRole" name="newRole" className="form-input border w-full py-2 px-3 rounded mt-1" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Password:</label>
                                <input type="password" id="newPassword" name="newPassword" className="form-input border w-full py-2 px-3 rounded mt-1" />
                            </div>
                            <div className="text-right">
                                <button type="submit" className="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white text-sm font-medium rounded-md">Submit</button>
                                <button type="button" className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm font-medium rounded-md ml-2" onClick={() => closeAddUserPopup()}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
        </div>

    );
}

export default UserTable;
