import { JSX } from "react";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CheckIcon from '@mui/icons-material/Check';

interface IPROPS {
    username: string,
    selectedCard: string,
    estimateShow: boolean,
    isCurrent: boolean
}

export const UserComponent = ({ username, selectedCard, estimateShow, isCurrent }: IPROPS): JSX.Element => {

    const UserCardControl = (): JSX.Element => {
        if (!selectedCard) {
            return <QuestionMarkIcon color="error" fontSize="large" />;
        }

        if (!estimateShow && selectedCard) {
            return <CheckIcon color="success" fontSize="large" />;
        }

        return <p className="font-bold">{selectedCard}</p>
    }

    return (
        <>
            <div key={username} className={`flex justify-between items-center space-x-4 mb-3 ${isCurrent && "bg-gray-400 rounded-md"}`}>
                <div className="flex flex-row items-center">
                    <div className="lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-8 sm:h-8 rounded-full lg:text-lg md:text-xs bg-[#1b8ef2] flex items-center justify-center text-white font-bold">
                        {username.at(0)}
                    </div>

                    <div className={`lg:text-sm md:text-xs sm:text-xs font-black pl-3 whitespace-normal ${isCurrent && "text-white"}`}>
                        1
                    </div>
                </div>

                <div className="w-9 h-12 bg-white rounded-lg shadow-lg flex justify-center items-center">
                    <UserCardControl />
                </div>
            </div>
            <div key={username} className={`flex justify-between items-center space-x-4 mb-3 p-1 ${isCurrent && "bg-gray-400 rounded-md"}`}>
                <div className="flex flex-row items-center">
                    <div className="lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-8 sm:h-8 rounded-full lg:text-lg md:text-xs bg-[#1b8ef2] flex items-center justify-center text-white font-bold">
                        {username.at(0)}
                    </div>

                    <div className={`lg:text-sm md:text-xs sm:text-xs font-black pl-3 whitespace-normal ${isCurrent && "text-white"}`}>
                        {username}
                    </div>
                </div>

                <div className="w-9 h-12 bg-white rounded-lg shadow-lg flex justify-center items-center">
                    <UserCardControl />
                </div>
            </div>
            <div key={username} className={`flex justify-between items-center space-x-4 mb-3 p-1 ${isCurrent && "bg-gray-400 rounded-md"}`}>
                <div className="flex flex-row items-center">
                    <div className="lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-8 sm:h-8 rounded-full lg:text-lg md:text-xs bg-[#1b8ef2] flex items-center justify-center text-white font-bold">
                        {username.at(0)}
                    </div>

                    <div className={`lg:text-sm md:text-xs sm:text-xs font-black pl-3 whitespace-normal ${isCurrent && "text-white"}`}>
                        {username}
                    </div>
                </div>

                <div className="w-9 h-12 bg-white rounded-lg shadow-lg flex justify-center items-center">
                    <UserCardControl />
                </div>
            </div>
            <div key={username} className={`flex justify-between items-center space-x-4 mb-3 p-1 ${isCurrent && "bg-gray-400 rounded-md"}`}>
                <div className="flex flex-row items-center">
                    <div className="lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-8 sm:h-8 rounded-full lg:text-lg md:text-xs bg-[#1b8ef2] flex items-center justify-center text-white font-bold">
                        {username.at(0)}
                    </div>

                    <div className={`lg:text-sm md:text-xs sm:text-xs font-black pl-3 whitespace-normal ${isCurrent && "text-white"}`}>
                        dsadsad
                    </div>
                </div>

                <div className="w-9 h-12 bg-white rounded-lg shadow-lg flex justify-center items-center">
                    <UserCardControl />
                </div>
            </div><div key={username} className={`flex justify-between items-center space-x-4 mb-3 p-1 ${isCurrent && "bg-gray-400 rounded-md"}`}>
                <div className="flex flex-row items-center">
                    <div className="lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-8 sm:h-8 rounded-full lg:text-lg md:text-xs bg-[#1b8ef2] flex items-center justify-center text-white font-bold">
                        {username.at(0)}
                    </div>

                    <div className={`lg:text-sm md:text-xs sm:text-xs font-black pl-3 whitespace-normal ${isCurrent && "text-white"}`}>
                        dsadsad
                    </div>
                </div>

                <div className="w-9 h-12 bg-white rounded-lg shadow-lg flex justify-center items-center">
                    <UserCardControl />
                </div>
            </div><div key={username} className={`flex justify-between items-center space-x-4 mb-3 p-1 ${isCurrent && "bg-gray-400 rounded-md"}`}>
                <div className="flex flex-row items-center">
                    <div className="lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-8 sm:h-8 rounded-full lg:text-lg md:text-xs bg-[#1b8ef2] flex items-center justify-center text-white font-bold">
                        {username.at(0)}
                    </div>

                    <div className={`lg:text-sm md:text-xs sm:text-xs font-black pl-3 whitespace-normal ${isCurrent && "text-white"}`}>
                        dsadsad
                    </div>
                </div>

                <div className="w-9 h-12 bg-white rounded-lg shadow-lg flex justify-center items-center">
                    <UserCardControl />
                </div>
            </div>
            <div key={username} className={`flex justify-between items-center space-x-4 mb-3 p-1 ${isCurrent && "bg-gray-400 rounded-md"}`}>
                <div className="flex flex-row items-center">
                    <div className="lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-8 sm:h-8 rounded-full lg:text-lg md:text-xs bg-[#1b8ef2] flex items-center justify-center text-white font-bold">
                        {username.at(0)}
                    </div>

                    <div className={`lg:text-sm md:text-xs sm:text-xs font-black pl-3 whitespace-normal ${isCurrent && "text-white"}`}>
                        son
                    </div>
                </div>

                <div className="w-9 h-12 bg-white rounded-lg shadow-lg flex justify-center items-center">
                    <UserCardControl />
                </div>
            </div>
        </>
    );
}