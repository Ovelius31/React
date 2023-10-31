import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();

    function openModal() {
        const modalContainer = document.getElementById('modalContainer');
        const backdrop = document.getElementById('backdrop');
        modalContainer.classList.remove('hidden');
        backdrop.classList.remove('hidden');
    }

    function closeModal() {
        const modalContainer = document.getElementById('modalContainer');
        const backdrop = document.getElementById('backdrop');
        modalContainer.classList.add('hidden');
        backdrop.classList.add('hidden');
    }

    function closePopup() {
        closeModal();
    }

    function removeAuthToken() {
        localStorage.removeItem('authToken');
    }

    function logout() {
        removeAuthToken();
        navigate('/login');
    }

    return (
        <aside className={`flex flex-col w-62 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-white dark:border-gray-700`} style={{ position: 'sticky', top: 0, width: 'fixed' }}>
            <div className="flex flex-col justify-between flex-1">
                <nav className="-mx-3 space-y-3">
                    <div className="space-y-1"> 
                        <a className="flex items-center px-3 py-2 text-black transition-colors duration-300 transform rounded-lg dark:text-black hover:bg-blue-700 dark:hover:bg-blue-700 dark:hover:text-white hover:text-black active:bg-blue-700 active:text-white" href="/dashboard">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"></path>
                    </svg>
                    <span className="mx-2 text-sm font-medium">Dashboard</span>
                </a>
                <a className="flex items-center px-3 py-2 text-black transition-colors duration-300 transform rounded-lg dark:text-black hover:bg-blue-700 dark:hover:bg-blue-700 dark:hover:text-white hover:text-black active:bg-blue-700 active:text-white" href="/data">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065-.21-.1-.433-.1-.664 .414 .336 .75 .75 .75 h4 .75 .75 a2 .25 .25 a2 .25 .25 a2 .25 .25 a2 .25 .25 a2 .25 .25 a2 .25 .25 a2 .25 .25 a2 .25 .25 a2 .25 .25 a2 .25 .25 a2 .25 .25 a2 .25 .25 a2"></path>
                    </svg>
                    <span className="mx-2 text-sm font-medium">DataMaster</span>
                </a>
                        <a className="flex items-center px-3 py-2 text-black transition-colors duration-300 transform rounded-lg dark:text-black hover-bg-blue-700 dark:hover-bg-blue-700 dark:hover-text-white hover-text-black active-bg-blue-700 active-text-white" href="/report">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"></path>
                            </svg>
                            <span className="mx-2 text-sm font-medium">Report</span>
                        </a>
                        <a className="flex items-center px-3 py-2 text-black transition-colors duration-300 transform rounded-lg dark:text-black hover-bg-blue-700 dark:hover-bg-blue-700 dark:hover-text-white hover-text-black active-bg-blue-700 active-text-white" href="/user">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path>
                            </svg>
                            <span className="mx-2 text-sm font-medium">Users</span>
                        </a>
                    </div>
                </nav>
            </div>
            <div className="mt-auto">
                <hr className="my-5 border-t-2 border-black px-4" />
                <a className="flex items-center px-3 py-2 text-black transition-colors duration-300 transform rounded-lg dark:text-black hover-bg-gray-100 dark:hover-bg-red-600 dark:hover-text-white hover-text-black active-bg-red-600" onClick={openModal} href=".">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="power" className="w-5 h-5" stroke="currentColor">
                        <path d="M12,9.75c-.41,0-.75-.34-.75-.75V4c0-.41,.34-.75,.75-.75s.75,.34,.75,.75v5c0,.41-.34,.75-.75,.75Z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12,21.75c-4.55,0-8.25-3.7-8.25-8.25,0-3.49,2.21-6.61,5.5-7.77,.39-.14,.82,.07,.96,.46,.14,.39-.07,.82-.46,.96-2.69,.94-4.5,3.5-4.5,6.35,0,3.72,3.03,6.75,6.75,6.75s6.75-3.03,6.75-6.75c0-2.86-1.81-5.41-4.5-6.35-.39-.14-.6-.57-.46-.96,.14-.39,.56-.60,.96-.46,3.29,1.15,5.5,4.28,5.5,7.77,0,4.55-3.7,8.25-8.25,8.25Z"></path>
                    </svg>
                    <span className="mx-2 text-sm font-medium">Logout</span>
                </a>
            </div>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity hidden" id="backdrop"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto hidden" id="modalContainer">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"></path>
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Logout From this account</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">Are you sure you want to logout your account?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover-bg-red-500 sm:ml-3 sm:w-auto" onClick={logout}>Out</button>
                            <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50 sm:mt-0 sm:w-auto" onClick={closePopup}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
