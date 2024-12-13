"use client"
import React, { JSX, useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IosShareIcon from '@mui/icons-material/IosShare';

export const HomeSection = (): JSX.Element => {
    const [activeTab, setActiveTab] = useState("new"); // Default olarak 'new' tab'ı aktif

    return (
        <section id="home" className="bg-gray-50 flex justify-center px-4 py-8 w-[30rem]">
            <div className="max-w-4xl w-full flex flex-col items-center">
                <div className="flex space-x-4">
                    <button
                        onClick={() => setActiveTab("new")}
                        className={`flex items-center px-6 py-2 rounded-t-lg ${activeTab === "new"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        <AddCircleOutlineIcon className="mr-2" />
                        <p>New Session</p>
                    </button>
                    <button
                        onClick={() => setActiveTab("join")}
                        className={`flex items-center px-6 py-2 rounded-t-lg justify-center items-center ${activeTab === "join"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        <IosShareIcon className="mr-2" />
                        <p>Join Session</p>
                    </button>
                </div>

                {/* Tab İçeriği */}
                {activeTab === "new" && (
                    <div className="w-full bg-white p-6 rounded-lg shadow-md">
                        <div className="space-y-4">
                            {/* New Session Inputlar */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Session Name</label>
                                <input
                                    type="text"
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Your Name</label>
                                <input
                                    type="text"
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Seçenekler - Checkboxlar */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Choose Estimation Method</label>
                                <div className="mt-2 space-y-2">
                                    <div className="flex items-center">
                                        <input type="checkbox" id="fibonacci" className="mr-2" />
                                        <label htmlFor="fibonacci" className="text-gray-600">
                                            Fibonacci (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89)
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="shortFibonacci" className="mr-2" />
                                        <label htmlFor="shortFibonacci" className="text-gray-600">
                                            Short Fibonacci (0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100)
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="tshirt" className="mr-2" />
                                        <label htmlFor="tshirt" className="text-gray-600">
                                            T-Shirt (XXS, XS, S, M, L, XL, XXL)
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="tshirtAndNumbers" className="mr-2" />
                                        <label htmlFor="tshirtAndNumbers" className="text-gray-600">
                                            T-Shirt & Numbers (S, M, L, XL, 1, 2, 3, 4, 5)
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="custom" className="mr-2" />
                                        <label htmlFor="custom" className="text-gray-600">
                                            Custom
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Buton */}
                            <div>
                                <button className="w-full py-3 mt-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    Start New Session
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "join" && (
                    <div className="w-full bg-white p-6 rounded-lg shadow-md">
                        <div className="space-y-4">
                            {/* Join Session Inputlar */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Session ID</label>
                                <input
                                    type="text"
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Your Name</label>
                                <input
                                    type="text"
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Buton */}
                            <div>
                                <button className="w-full py-3 mt-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    Join Session
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
