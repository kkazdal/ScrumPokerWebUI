"use client"
import { JSX, useEffect, useState } from "react";
import * as signalR from '@microsoft/signalr';
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const SessionPage = (): JSX.Element => {
    const router: any = useRouter();
    const pathname = usePathname();

    const userInfo: any = useSelector((state: any) => state.userInfoSlice);

    const [connection, setConnection] = useState<any>(null);
    const [roomId, setRoomId] = useState<any>(null);
    const [users, setUsers] = useState<any>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);


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

    useEffect(() => {
        // Sayfa yenilendiğinde yapılacak aksiyon
        const handleBeforeUnload = () => {
            if (connection && currentUser && roomId) {
                connection.invoke("LeaveRoom", roomId, currentUser.username);
            }
        };

        // sayfa yenilendiğinde tetiklenmesi için event listener ekleyin
        window.addEventListener("beforeunload", handleBeforeUnload);

        // Cleanup işlemi
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
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
                        setUsers(data);
                    });

                    // Kullanıcı katıldığında gelen mesajı dinle
                    connection.on("UserJoined", (user: any) => {
                        setUsers((prevUsers: any[]) => [...prevUsers, { userName: user, userVote: null }]);  // Yeni kullanıcıyı ekle
                    });

                    // Kullanıcı ayrıldığında gelen mesajı dinle
                    connection.on("UserLeft", (user: any) => {
                        setUsers((prevUsers: any[]) => prevUsers.filter((u) => u.userName !== user));  // Kullanıcıyı listeden çıkar
                    });

                })
                .catch((err: any) => console.log('error :>> ', err));
        }

    }, [connection, roomId, currentUser]);


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

    const getCurrentUser: any = () => {
        if (roomId) {
            const currentUserInfo: any = userInfo.filter((item: any) => item.roomUniqId == roomId)[0];

            if (currentUserInfo && currentUserInfo !== currentUser) {
                setCurrentUser(currentUserInfo);
            }
        }
    }
    return (
        <div>
            {
                users.map((item: any, index: number) => {
                    return <p key={index}>{item.userName} - {item.userVote}</p>
                })
            }
        </div>
    )
}

export default SessionPage;