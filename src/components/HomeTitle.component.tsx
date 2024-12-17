import { JSX } from "react";
import { HomeSection } from "./HomeSection.component";

export const HomeTitle = (): JSX.Element => {
    
    return (
        <section id="home" className="h-auto bg-gray-50 flex justify-center px-4 py-8">
            <div className="flex flex-col lg:flex-row  items-start w-full max-w-screen-xl">
                <div className="text-center lg:text-left mt-20 flex flex-col max-w-lg mx-auto mb-8 lg:mb-0">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                        Simplify Your <span className="text-blue-500">Scrum Meetings</span>
                    </h1>
                    <p className="mt-4 text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
                        Collaborate effectively, estimate with confidence, and boost team productivity
                        <br /> with our modern Scrum Poker tool.
                    </p>
                </div>

                <HomeSection />
            </div>
        </section>
    );
}