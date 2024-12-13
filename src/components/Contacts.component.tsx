import { JSX } from "react";

export const Contacts = (): JSX.Element => {
    return (
        <div className="bg-gradient-to-r bg-[#D1E7FF] py-16">
            <div className="max-w-7xl mx-auto px-6">
           
                <div className="text-center  relative">
                    <h2 className="text-5xl font-extrabold tracking-wide leading-tight">
                        Get In Touch
                    </h2>
                    <p className="mt-4 text-xl">
                        We're here to help. Please send us your inquiries or feedback.
                    </p>
                </div>

                <div className="mt-12 max-w-lg mx-auto bg-white p-10 rounded-2xl shadow-xl">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-lg font-medium text-gray-700">Your Message</label>
                            <textarea
                                id="message"
                                rows={4}
                                className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Write your message here"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-4 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}