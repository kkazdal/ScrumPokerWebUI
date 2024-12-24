"use client"
import { JSX, useEffect, useMemo, useState } from "react";
import * as signalR from '@microsoft/signalr';
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import getService from "@/services/GetService";
import { HttpStatus } from "@/enums/enums";
import { voteList } from "@/constants/voteList";
import { Menu } from "@/components/Menu.component";
import { Footer } from "@/components/Footer.component";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { CardComponent } from "@/components/Card.component";
import { UserComponent } from "@/components/User.component";
import { Button, CircularProgress } from "@mui/material";
import postService from "@/services/PostService";

const SessionPage = (): JSX.Element => {

    const router: any = useRouter();
    const pathname = usePathname();

    const userInfo: any = useSelector((state: any) => state.userInfoSlice);

    const [loading, setLoading] = useState(false);
    const [connection, setConnection] = useState<any>(null);
    const [roomId, setRoomId] = useState<any>(null);
    const [userList, setUserList] = useState<any>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [selectedCard, setSelectedCard] = useState<any>();
    const [cardList, setCardList] = useState<any>([]);
    const [estimateShow, setEstimateShow] = useState<boolean>(false);

    useEffect(() => {
        if (userList.length > 0) {
            const user: any = userList.filter((item: any) => item.userName == currentUser.username)[0];
            const card: boolean = user?.userVote;
            setSelectedCard(card);
        }

    }, [userList]);

    useEffect(() => {
        if (currentUser?.userId) {
            getApiUserRoomInfo(currentUser.userId)
        }
    }, [currentUser]);

    useEffect(() => {
        const id = pathname.split("/")[2];
        setRoomId(id);
    }, []);

    useEffect(() => {
        getCurrentUser();
    }, [roomId]);

    useEffect(() => {
        connectionSignalR();
    }, []);

    useEffect(() => {
        //Leave Room
        return () => {
            if (connection && currentUser && roomId) {
                connection.invoke("LeaveRoom", roomId, currentUser.username);
            }
        }
    }, [connection, currentUser, roomId]);

    // Bağlantı kurulumu
    useEffect(() => {
        if (currentUser?.username && connection && roomId) {
            connection.start()
                .then(() => {
                    // Sunucuya "UserJoined" isteği gönder
                    connection.invoke("UserJoined", roomId, currentUser.username);

                    // Kullanıcıların listesini almak için sunucudan "ActiveUsers" mesajını dinle
                    connection.invoke("GetActiveUsers", roomId);

                    connection.on("ActiveUsers", (data: any) => {
                        const newList: any = sortUsersByUserName(data);
                        setUserList(newList);
                    });

                    // Kullanıcı ayrıldığında gelen mesajı dinle
                    connection.on("UserLeft", (user: any) => {
                        setUserList((prevUsers: any[]) => prevUsers.filter((u) => u.userName !== user));  // Kullanıcıyı listeden çıkar
                    });

                    connection.on("GetShowEstimateNotify", (data: any) => {
                        setEstimateShow(data);
                    });

                })
                .catch((err: any) => console.log('error :>> ', err));
        }

    }, [connection, roomId, currentUser]);

    const getCurrentUser: any = () => {
        if (roomId) {
            const currentUserInfo: any = userInfo.filter((item: any) => item.roomUniqId == roomId)[0];

            if (currentUserInfo && currentUserInfo !== currentUser) {
                setCurrentUser(currentUserInfo);
            }
        }
    }

    //#region API
    const getApiUserRoomInfo = async (tempUserId: number) => {

        if (!loading) {
            try {
                setLoading(true);
                const params: any = {
                    tempUserId
                }

                const response = await getService("/UserRoom/GetVoteAndCardInfoByRoomIdUserInfo", params);

                if (response.status == HttpStatus.OK) {

                    const cards: any = voteList.filter((item: any) => item.id == response.data.estimationMethodId)[0];
                    setCardList(cards.list);
                }
            } catch (error) {

            } finally {
                setLoading(false);
            }
        }

    }

    const postApiVote = async (selectedCardInfo: any) => {

        if (!loading) {
            try {
                setLoading(true);
                const params: any = {
                    userId: currentUser.userId,
                    roomUniqId: parseInt(roomId),
                    userVote: selectedCardInfo,

                }

                const response = await postService("/UserRoom/UpdateUserRoom", params);

                if (response.status == HttpStatus.OK) {

                }
            } catch (error) {

            } finally {
                setLoading(false);
            }
        }

    }

    const deleteEstimate = async () => {
        if (!loading) {
            try {
                setLoading(true);
                const params: any = {
                    roomUniqId: parseInt(roomId),
                }

                const response = await postService("/UserRoom/ResetUserRoomUserVote", params);

                if (response.status == HttpStatus.OK) {
                    connection.on("ActiveUsers", (data: any) => {
                        const newList: any = sortUsersByUserName(data);
                        setUserList(newList);
                    });

                }
            } catch (error) {

            } finally {
                setLoading(false);
            }
        }

    }
    //#endregion


    const _onclickCardSelect = (card: any): void => {
        let selectCard;
        if (card == selectedCard) {
            selectCard = null;
        } else {
            selectCard = card;
        }
        postApiVote(selectCard);
    }

    const _onClickEstaimateShow = (): void => {
        connection.invoke("SetShowEstimateNotify", roomId, !estimateShow);
    }

    const _onClickDeleteEstaimate = (): void => {
        deleteEstimate();
    }

    const connectionSignalR = (): any => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5260/roomHub") // SignalR sunucu URL'si
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);

        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }

    const sortUsersByUserName = (users: any) => {
        return [...users].sort((a, b) => {
            if (a.userName < b.userName) return -1;
            if (a.userName > b.userName) return 1;
            return 0;
        });
    };

    const StoryPointLeftArea = (): JSX.Element => {

        return (
            <div className="xl:flex-[2] lg:flex-[2] md:flex-[2] sm:flex-[1] flex flex-col justify-between">
                <div>
                    <p>Test</p>

                </div>
                <div className="relative w-full lg:h-[9rem] xl:h-[9rem] md:h-[7rem] sm:h-[6rem]">
                    {
                        cardList.length == 0
                            ? <CircularProgress />
                            : cardList.map((card: any, index: number) => (
                                <CardComponent
                                    _onclickCardSelect={_onclickCardSelect}
                                    card={card}
                                    index={index}
                                    selectedCard={selectedCard}
                                    key={card}
                                />
                            ))
                    }
                </div>
            </div>
        );
    }

    const StoryPointRightArea = (): JSX.Element => {
        return (
            <div className="
                        xl:h-[96%] 
                        lg:h-[96%]
                        md:h-[97%]
                        sm:h-[40%]
                        xl:flex-[1]
                        lg:flex-[1]
                        md:flex-[1]
                        sm:flex-[5]
                        sm:w-full
                        sm:justify-center
                        overflow-auto w-[10rem]  xl:pl-5 lg:pl-5 md:pl-5 sm:pl-1 pr-3 custom-scrollbar bg-gray-300 rounded-lg p-5">
                <div className="flex flex-row bg-[#3b81f6] rounded-lg justify-center items-center p-1 mb-5">
                    <PeopleAltIcon fontSize="medium" className="text-white" />
                    <p className=" lg:text-sm md:text-xs sm:text-xs font-bold ml-2 text-white p-2  ">Participants</p>
                </div>
                {
                    userList.length == 0 ?
                        <CircularProgress />
                        :
                        userList.map((item: any, index: number) => {
                            return (
                                <UserComponent
                                    selectedCard={item.userVote}
                                    username={item.userName}
                                    key={`${item.userName}-${index}`}
                                    estimateShow={estimateShow}
                                    isCurrent={item?.userName == currentUser.username}
                                />
                            );
                        })
                }


            </div>
        );
    }

    return (
        <div className="flex flex-col justify-between h-screen">
            <Menu />
            <div className="w-full h-[80%] flex justify-center content-start p-5">
                <div className="bg-[#e2e1ec] h-full xl:w-[70%] lg:w-[80%] md:w-[85%] sm:w-[100%] rounded-md pt-5 pl-5">
                    <div className="mb-5 mr-5 flex justify-between">
                        <p className="text-xl font-bold text-[#3a80f6]">Story Points</p>
                        <div className="flex gap-3">
                            <Button
                                onClick={_onClickDeleteEstaimate}
                                variant="contained"
                                color="error"
                            >
                                Delete Estimates
                            </Button>
                            <Button variant="contained" onClick={_onClickEstaimateShow}>
                                {
                                    estimateShow ? "Hide" : "Show"
                                }
                            </Button>
                        </div>
                    </div>

                    <div className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-col xl:h-[%94] lg:h-[94%] md:h-[92%] sm:h-[90%]">

                        <StoryPointLeftArea />

                        <StoryPointRightArea />

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SessionPage;
