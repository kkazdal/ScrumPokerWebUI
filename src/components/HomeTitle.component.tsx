import { JSX } from "react";
import { HomeSection } from "./HomeSection.component";

export const HomeTitle = (): JSX.Element => {
    return (
        <section id="home" className="h-[40rem] bg-gray-50 lg:flex justify-center px-4 py-8 ">
            <div className="flex flex-col-reverse lg:flex-col-reverse justify-center">
                <div className="text-center lg:text-center flex flex-col justify-center max-w-lg">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                        Simplify Your <span className="text-blue-500">Scrum Meetings</span>
                    </h1>
                    <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
                        Collaborate effectively, estimate with confidence, and boost team productivity
                        <br /> with our modern Scrum Poker tool.
                    </p>
                </div>
            </div>
            <HomeSection />
        </section>
    );
}