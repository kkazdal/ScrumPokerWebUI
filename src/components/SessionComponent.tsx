"use client"
import { JSX, useEffect, useMemo, useState } from "react";
import * as signalR from '@microsoft/signalr';
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import getService from "@/services/GetService";
import { HttpStatus } from "@/enums/enums";
import { voteList } from "@/constants/voteList";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { CardComponent } from "@/components/Card.component";
import { UserComponent } from "@/components/User.component";
import { Button, CircularProgress } from "@mui/material";
import postService from "@/services/PostService";
import { colors } from "@/constants/cardColorList";
import { PointTableComponent } from "@/components/PointDetail.component";

const SessionComponent = (): JSX.Element => {

    const router: any = useRouter();
    const pathname = usePathname();

    const userInfo: any = useSelector((state: any) => state.userInfoSlice);

    const [loading, setLoading] = useState({
        post: false,
        get: false,
        delete: false
    });
    const [connection, setConnection] = useState<any>(null);
    const [roomId, setRoomId] = useState<any>(null);
    const [userList, setUserList] = useState<any>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [selectedCard, setSelectedCard] = useState<any>();
    const [cardList, setCardList] = useState<Array<any>>([]);
    const [estimateShow, setEstimateShow] = useState<boolean | null>(null);
    const [pointTableList, setPointTableList] = useState<any>([]);

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
                    //Oyların açık olup olup olmadığını bildirir
                    connection.invoke("SetShowEstimateNotify", roomId);

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

    useEffect(() => {
        if (userList?.length > 0 && cardList.length > 0) {
            const voteList: any[] = [];

            // User listesi üzerinden işlem yapıyoruz
            userList.map((item: any, index: number) => {
                const cardIdIndex = cardList.findIndex((cardItem: any) => cardItem == item?.userVote);

                // Her bir kullanıcı için oyu ve renk bilgisini ekliyoruz
                voteList.push({
                    userName: item?.userName,
                    vote: item?.userVote,
                    color: colors[cardIdIndex],
                    id: index
                });
            });

            // voteList'i vote değerine göre gruplayıp doğrudan gruplar oluşturuyoruz
            const groupedVoteList = voteList.reduce((acc: any, current: any) => {
                // Eğer bu oy değeri daha önce grupta yoksa, yeni bir grup oluşturuyoruz
                if (!acc[current.vote]) {
                    acc[current.vote] = [];  // Yeni grup başlatıyoruz
                }

                // Gruplamaya ekliyoruz
                acc[current.vote].push(current);

                return acc;
            }, {});

            // Gruplandıktan sonra, groupedVoteList'e set ediyoruz
            setPointTableList(groupedVoteList);

        }

    }, [userList, cardList]);

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

        if (!loading.get) {
            try {
                setLoading(((prevState: any) => ({ ...prevState, get: true })));
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
                setLoading(((prevState: any) => ({ ...prevState, get: false })));

            }
        }

    }

    const postApiVote = async (selectedCardInfo: any) => {

        if (!loading.post) {
            try {
                setLoading(((prevState: any) => ({ ...prevState, post: true })));

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
                setLoading(((prevState: any) => ({ ...prevState, post: false })));

            }
        }

    }

    const deleteEstimate = async () => {
        if (!loading.delete) {
            try {
                setLoading(((prevState: any) => ({ ...prevState, delete: true })));

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
                setLoading(((prevState: any) => ({ ...prevState, delete: false })));
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
        connection.invoke("UpdateEstimateNotify", roomId, !estimateShow);
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
            <div className="flex flex-col justify-between flex-[2] overflow-auto">
                <p className="text-xl font-bold text-[#3a80f6] mb-2">Story Points</p>
                <div className="
            xl:flex-[2] 
            lg:flex-[2] 
            md:flex-[2] 
            sm:flex-[1] 
            flex 
            flex-col 
            justify-between overflow-auto">
                    <div className="overflow-auto lg:h-[32rem] xl:h-[35rem] md:h-[28rem] sm:h-[25rem]">
                        <PointTableComponent list={pointTableList} />
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
            </div>

        );
    }

    const StoryPointRightArea = (): JSX.Element => {
        return (
            <div className="h-full overflow-auto flex flex-col gap-3 flex-[1]">
                <div className="flex gap-3 mr-2 sm:mt-2 md:mt-2 justify-end">
                    <Button
                        onClick={_onClickDeleteEstaimate}
                        variant="contained"
                        color="error"
                        style={{
                            padding: "5px"
                        }}
                    >
                        <p className="xl:text-[0.8rem] lg:text-[0.7rem] sm:text-[0.7rem] md:text-[0.7rem] font-bold">Delete Estimates</p>
                    </Button>
                    {
                        estimateShow == null ?
                            <CircularProgress />
                            :
                            <Button
                                variant="contained"
                                onClick={_onClickEstaimateShow}
                                style={{
                                    padding: "5px"
                                }}>

                                <p className="xl:text-[0.8rem] lg:text-[0.7rem] sm:text-[0.7rem] md:text-[0.7rem] font-bold">

                                    {
                                        estimateShow ? "Hide" : "Show"
                                    }
                                </p>
                            </Button>
                    }
                </div>
                <div className="
                        w-full
                        sm:justify-center
                        overflow-auto   xl:pl-5 lg:pl-5 md:pl-5 sm:pl-1 pr-3 custom-scrollbar bg-gray-300 rounded-lg p-5">
                    <div className="flex flex-row bg-[#3b81f6] rounded-lg justify-center items-center p-1 mb-5">
                        <PeopleAltIcon fontSize="medium" className="text-white" />
                        <p className=" lg:text-sm md:text-xs sm:text-xs ml-2 text-white p-1 font-bold">Participants</p>
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
            </div>

        );
    }

    return (
        <div className="w-full h-[50rem] flex justify-center p-5">
            <div className="bg-[#e2e1ec] h-full xl:w-[60%] lg:w-[70%] md:w-[75%] sm:w-[100%] rounded-md pt-5 pl-5">
                <div className="flex justify-between xl:flex-row lg:flex-row md:flex-col sm:flex-col h-full">

                    <StoryPointLeftArea />

                    <StoryPointRightArea />

                </div>
            </div>
        </div>
    )
}

export default SessionComponent;
