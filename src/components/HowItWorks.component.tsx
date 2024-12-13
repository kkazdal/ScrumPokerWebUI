import { JSX } from "react";
import Image from 'next/image';

export const HowItWorks = (): JSX.Element => {
    const steps = [
        {
            id: 1,
            title: 'Create a Room',
            description:
                'The team leader initiates the planning process by creating a virtual room within the Scrum Poker application. A unique invitation link is generated, which can be shared with all team members. Once the room is set up, the leader populates it with the list of tasks or user stories that need to be estimated, preparing everyone for a productive session.',
            image: '/images/image2.png',
        },
        {
            id: 2,
            title: 'Vote on Tasks',
            description:
                'Each team member evaluates the presented task or user story and selects a card that reflects their estimation of its complexity, effort, or size. The voting process ensures anonymity, allowing participants to provide honest and unbiased assessments without the influence of others’ opinions. This step promotes diverse perspectives and fair participation.',
            image: '/images/image3.png',
        },
        {
            id: 3,
            title: 'Review Results',
            description:
                'After all team members have submitted their votes, the estimates are revealed to the group. Any discrepancies or outliers in the votes are discussed collaboratively, enabling team members to clarify misunderstandings, address knowledge gaps, and align on a shared understanding of the task requirements.',
            image: '/images/image4.png',
        },
        {
            id: 4,
            title: 'Finalize Estimates',
            description:
                'The team works together to agree on a final estimate for each task or user story. This agreed estimate is recorded and used for sprint planning, ensuring a realistic and achievable workload. If consensus is not achieved during the first round, the team can repeat the voting process until they reach an agreement.',
            image: '/images/image5.png',
        },
    ];

    return (
        <section id="how-it-works" className="py-16">
            <div className="text-center  relative">
                <h2 className="text-5xl font-extrabold tracking-wide leading-tight">
                    How It Works
                </h2>
                <p className="mt-4 text-xl">
                    Here’s a quick overview of how everything works. Follow these simple steps and experience<br></br> the smooth journey to success."
                </p>
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-800"></h2>
            <div className="container mx-auto px-6 md:px-12">
                {
                    steps.map((step: any, index: number) => {
                        return (
                            <div className={`w-full flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center gap-10 px-4 sm:px-8 md:px-16 lg:px-56 py-8 ${index % 2 == 0 ? "md:flex-row lg:flex-row" : "md:flex-row-reverse lg:flex-row-reverse"} `}>

                                <div className="flex justify-center md:justify-start lg:justify-start">
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        width={350}
                                        height={300}
                                        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
                                    />
                                </div>

                                <div className="w-full flex flex-col justify-center">
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-700 mb-4 text-center md:text-center lg:text-left">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm sm:text-base md:text-lg text-center md:text-left lg:text-left leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>

                            </div>
                        )
                    })
                }

            </div>
        </section>
    );
}