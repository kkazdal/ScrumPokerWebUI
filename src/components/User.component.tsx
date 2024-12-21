import { JSX } from "react";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CheckIcon from '@mui/icons-material/Check';

interface IPROPS {
    username: string,
    selectedCard: string,
    estimateShow: boolean
}

export const UserComponent = ({ username, selectedCard, estimateShow }: IPROPS): JSX.Element => {

    const UserCardControl = (): JSX.Element => {
        if (!estimateShow) {
            if (selectedCard) {
                return <CheckIcon color="success" fontSize="large" />;
            }

            return <QuestionMarkIcon color="error" fontSize="large" />;
        }

        return <></>
    }

    return (
        <div key={username} className="flex justify-between items-center space-x-4 mb-3">
            <div className="flex flex-row items-center">
                <div className="lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-8 sm:h-8 rounded-full lg:text-lg md:text-xs bg-[#1b8ef2] flex items-center justify-center text-white font-bold">
                    {username.at(0)}
                </div>

                <div className="lg:text-sm md:text-xs sm:text-xs font-black pl-3 whitespace-normal">
                    {username}
                </div>
            </div>

            <div className="w-9 h-12 bg-white rounded-lg shadow-lg flex justify-center items-center">
                <UserCardControl />
            </div>
        </div>
    );
}