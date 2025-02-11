import { JSX } from "react";

interface IPROPS {
    list: any,
}

export const PointTableComponent = ({ list }: IPROPS): JSX.Element => {
    const voteKeyList: any = Object.keys(list);

    return (
        voteKeyList.length > 0 &&
        voteKeyList.map((vote: any, index: number) => {
            const users: any = list[vote];

            if (vote == "null") {
                return <div key={`vote-${vote}-${index}`} ></div>
            }

            return (
                <div key={`vote-${vote}`} className="flex flex-row mb-2">
                    <div className={`w-12 h-16 p-[1rem] border-2 rounded-md`}
                        style={{
                            backgroundColor: users[0]?.color,
                        }}>
                        <p className="font-bold text-lg flex justify-center items-center w-full h-full text-white">
                            {vote}
                        </p>
                    </div>
                    <div key={`user-${vote}-${index}`} className="ml-3 flex justify-center w-[6rem]">
                        {
                            users?.length > 0 &&
                            users.map((user: any, userIndex: number) => {
                                return (
                                    <div key={`user-${vote}-${user.userName}-${userIndex}`} className="flex flex-col items-center justify-center max-w-14 mr-5">
                                        <div className="lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-8 sm:h-8 rounded-full lg:text-lg md:text-xs bg-[#1b8ef2] flex items-center justify-center text-white font-bold">
                                            {user.userName.at(0)}
                                        </div>

                                        <p className={`lg:text-xs md:text-xs sm:text-xs font-black  whitespace-normal flex justify-center items-center`}>
                                            {user.userName}
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        })
    )
}