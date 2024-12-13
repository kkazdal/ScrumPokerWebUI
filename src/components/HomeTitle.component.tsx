import { JSX } from "react";

export const HomeTitle = (): JSX.Element => {
    return (
        <section id="home" className="h-auto bg-gray-50 flex items-center justify-center px-4 py-8">
            <div className="container mx-auto flex flex-col-reverse lg:flex-col-reverse items-center justify-center gap-8">
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
        </section>
    );
}