"use client"
import { JSX, useEffect, useState } from "react";
import * as signalR from '@microsoft/signalr';
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import getService from "@/services/GetService";
import { HttpStatus } from "@/enums/enums";
import { voteList } from "@/constants/voteList";
import { Menu } from "@/components/Menu.component";
import { Footer } from "@/components/Footer.component";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CheckIcon from '@mui/icons-material/Check';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const SessionPage = (): JSX.Element => {

    const router: any = useRouter();
    const pathname = usePathname();

    const userInfo: any = useSelector((state: any) => state.userInfoSlice);

    const [loading, setLoading] = useState(false);
    const [connection, setConnection] = useState<any>(null);
    const [roomId, setRoomId] = useState<any>(null);
    const [users, setUsers] = useState<any>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [selectedCard, setSelectedCard] = useState<any>();
    const [cardList, setCardList] = useState<any>([]);

    useEffect(() => {
        if (roomId) {
            getRoomInfo(roomId)
        }
    }, [roomId]);

    useEffect(() => {
        const id = pathname.split("/")[2];
        setRoomId(id);
    }, []);

    // useEffect(() => {
    //     getCurrentUser();
    // }, [roomId]);

    // useEffect(() => {
    //     connectionSignalR();
    // }, []);

    // useEffect(() => {
    //     //Leave Room
    //     return () => {
    //         if (connection && currentUser && roomId) {
    //             connection.invoke("LeaveRoom", roomId, currentUser.username);
    //         }
    //     }
    // }, [connection, currentUser, roomId]);

    // useEffect(() => {
    //     // Sayfa yenilendiğinde yapılacak aksiyon
    //     const handleBeforeUnload = () => {
    //         if (connection && currentUser && roomId) {
    //             connection.invoke("LeaveRoom", roomId, currentUser.username);
    //         }
    //     };

    //     // sayfa yenilendiğinde tetiklenmesi için event listener ekleyin
    //     window.addEventListener("beforeunload", handleBeforeUnload);

    //     // Cleanup işlemi
    //     return () => {
    //         window.removeEventListener("beforeunload", handleBeforeUnload);
    //     };
    // }, [connection, currentUser, roomId]);

    // // Bağlantı kurulumu
    // useEffect(() => {
    //     if (currentUser?.username && connection && roomId) {
    //         connection.start()
    //             .then(() => {
    //                 // Sunucuya "UserJoined" isteği gönder
    //                 connection.invoke("UserJoined", roomId, currentUser.username);

    //                 // Kullanıcıların listesini almak için sunucudan "ActiveUsers" mesajını dinle
    //                 connection.invoke("GetActiveUsers", roomId);

    //                 connection.on("ActiveUsers", (data: any) => {
    //                     setUsers(data);
    //                 });

    //                 // Kullanıcı katıldığında gelen mesajı dinle
    //                 connection.on("UserJoined", (user: any) => {
    //                     setUsers((prevUsers: any[]) => [...prevUsers, { userName: user, userVote: null }]);  // Yeni kullanıcıyı ekle
    //                 });

    //                 // Kullanıcı ayrıldığında gelen mesajı dinle
    //                 connection.on("UserLeft", (user: any) => {
    //                     setUsers((prevUsers: any[]) => prevUsers.filter((u) => u.userName !== user));  // Kullanıcıyı listeden çıkar
    //                 });

    //             })
    //             .catch((err: any) => console.log('error :>> ', err));
    //     }

    // }, [connection, roomId, currentUser]);


    // const connectionSignalR = (): any => {
    //     const newConnection = new signalR.HubConnectionBuilder()
    //         .withUrl("http://localhost:5260/roomHub") // SignalR sunucu URL'si
    //         .withAutomaticReconnect()
    //         .build();

    //     setConnection(newConnection);

    //     return () => {
    //         if (connection) {
    //             connection.stop();
    //         }
    //     };
    // }

    // const getCurrentUser: any = () => {
    //     if (roomId) {
    //         const currentUserInfo: any = userInfo.filter((item: any) => item.roomUniqId == roomId)[0];

    //         if (currentUserInfo && currentUserInfo !== currentUser) {
    //             setCurrentUser(currentUserInfo);
    //         }
    //     }
    // }

    const getRoomInfo = async (roomUniqId: number) => {

        if (!loading) {
            try {
                setLoading(true);
                const params: any = {
                    roomUniqId
                }

                const response = await getService("/Room/GetRoomUniqueByIdQuery", params);

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

    const colors = [
        "#5e9cd7",
        "#47c08d",
        "#a87fd7",
        "#d89344",
        "#dc6f9a",
        "#493272",
        "#2f9ee4",
        "#47c08d",
        "#a87fd7",
        "#d89344",
        "#dc6f9a",
        "#493272",
        "#2f9ee4",
    ];

    const CardRender = (card: any, index: any): JSX.Element => {
        return (
            <div
                key={card}
                className={`absolute 
              xl:w-[5rem] xl:h-[8rem]  // Extra large ekranlar için boyut
              lg:w-[4rem] lg:h-[7rem] // Large ekranlar için boyut
              md:w-[4rem] md:h-[6rem] // Medium ekranlar için boyut
              sm:w-[2.5rem] sm:h-[5rem]  // Small ekranlar için boyut
              rounded-md shadow-lg transform transition-all duration-200 hover:scale-105 hover:translate-y-[-20px] 
              flex items-center justify-center text-white font-bold`}
                style={{
                    left: `${index * 8}%`, // Daha yakın konumlandırma
                    zIndex: index, // Kartların sırayla üst üste binmesi için z-index
                    backgroundColor: colors[index],
                }}
            >
                <span
                    className="absolute top-2 left-2 
                xl:text-lg lg:text-md md:text-sm sm:text-xs text-[10px]" // Responsive metin boyutları
                >
                    {card}
                </span>
                <p className="xl:text-xl lg:text-lg md:text-md sm:text-sm text-[12px]">{card}</p> {/* Merkezdeki metin */}
            </div>
        );
    }

    const UserRenderComponent = (): JSX.Element => {
        return (
            <div className="flex justify-between items-center space-x-4 mb-3">
                <div className="flex flex-row items-center">
                    <div className="lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-8 sm:h-8 rounded-full lg:text-lg md:text-xs bg-[#1f2937] flex items-center justify-center text-white font-bold">
                        A
                    </div>

                    <div className="lg:text-sm md:text-xs sm:text-xs font-black pl-3 whitespace-normal">
                        Abdulkadir Kazdal
                    </div>
                </div>

                <div className="w-9 h-12 bg-white rounded-lg shadow-lg flex justify-center items-center">
                    {/* <QuestionMarkIcon color="error" fontSize="large" /> */}
                    {/* <CheckIcon color="success" fontSize="large"/> */}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-between h-screen">
            <Menu />
            <div className="w-full h-[80%] flex justify-center content-start p-5">
                <div className="bg-[#e2e1ec] h-full xl:w-[70%] lg:w-[80%] md:w-[85%] sm:w-[100%] rounded-md pt-5 pl-5">
                    <div className="mb-5">
                        <p className="text-xl font-bold text-[#3a80f6]">Story Points</p>
                    </div>

                    <div className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-col xl:h-[%94] lg:h-[94%] md:h-[92%] sm:h-[90%]">

                        <div className="xl:flex-[2] lg:flex-[2] md:flex-[2] sm:flex-[1]">
                            <div className="relative w-full">
                                {
                                    loading
                                        ? <p>Loading</p>
                                        : cardList.map((card: any, index: number) => (
                                            CardRender(card, index)
                                        ))
                                }
                            </div>
                        </div>

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
                        overflow-auto w-[10rem]  xl:pl-5 lg:pl-5 md:pl-5 sm:pl-1 pr-3 custom-scrollbar">
                            <div className="flex flex-row bg-[#3b81f6] rounded-lg justify-center items-center p-1 mb-5">
                                <PeopleAltIcon fontSize="medium" className="text-white" />
                                <p className=" lg:text-sm md:text-xs sm:text-xs font-bold ml-2 text-white p-2  ">Participants</p>
                            </div>
                            <UserRenderComponent />
                            <UserRenderComponent />
                            <UserRenderComponent />
                            <UserRenderComponent />
                            <UserRenderComponent />
                            <UserRenderComponent />
                            <UserRenderComponent />
                            <UserRenderComponent />
                            <UserRenderComponent />
                            <UserRenderComponent />
                            <UserRenderComponent />
                            <UserRenderComponent />
                            <UserRenderComponent />
                            <UserRenderComponent />
                            <UserRenderComponent />
                            <UserRenderComponent />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SessionPage;