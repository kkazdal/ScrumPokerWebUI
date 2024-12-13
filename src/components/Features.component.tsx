import { JSX } from "react";

export const Features = (): JSX.Element => {
    return (
        <div className="bg-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center  relative">
                    <h2 className="text-5xl font-extrabold tracking-wide leading-tight">
                        Features
                    </h2>
                    <p className="mt-4 text-xl">
                        Discover the innovative features designed to improve your workflow and bring<br></br> efficiency to your fingertips.
                    </p>
                </div>

                {/* Özellikler Grid */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-blue-100 hover:bg-blue-200 p-6 rounded-lg shadow-md transition duration-300 ease-in-out">
                        <h3 className="text-xl font-semibold text-blue-800">User-Friendly Interface</h3>
                        <p className="mt-4 text-gray-700">
                            Our platform is designed with a focus on simplicity and ease of use, ensuring that users can navigate effortlessly.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-green-100 hover:bg-green-200 p-6 rounded-lg shadow-md transition duration-300 ease-in-out">
                        <h3 className="text-xl font-semibold text-green-800">High Performance</h3>
                        <p className="mt-4 text-gray-700">
                            Fast and efficient, our platform is optimized for speed, ensuring seamless performance under any load.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-yellow-100 hover:bg-yellow-200 p-6 rounded-lg shadow-md transition duration-300 ease-in-out">
                        <h3 className="text-xl font-semibold text-yellow-800">Customizable Options</h3>
                        <p className="mt-4 text-gray-700">
                            Personalize your experience with flexible settings that allow you to tailor the platform to your needs.
                        </p>
                    </div>

                    {/* Feature 5 */}
                    <div className="bg-purple-100 hover:bg-purple-200 p-6 rounded-lg shadow-md transition duration-300 ease-in-out">
                        <h3 className="text-xl font-semibold text-purple-800">24/7 Support</h3>
                        <p className="mt-4 text-gray-700">
                            Our dedicated support team is available around the clock to assist you with any issues or questions.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}