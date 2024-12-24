import { JSX } from "react";

export const Footer = (): JSX.Element => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center">
                    {/* Logo and Brand */}
                    <div className="text-xl font-semibold">YourBrand</div>

                </div>

                {/* Footer Links */}
                <div className="mt-6 flex justify-center space-x-8 text-sm">
                    <a href="#" className="hover:text-indigo-400">About Us</a>
                    <a href="#" className="hover:text-indigo-400">Privacy Policy</a>
                    <a href="#" className="hover:text-indigo-400">Terms of Service</a>
                    <a href="#" className="hover:text-indigo-400">Support</a>
                </div>

                {/* Copyright */}
                <div className="mt-6 text-center text-sm text-gray-400">
                    <p>&copy; 2024 YourBrand. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}