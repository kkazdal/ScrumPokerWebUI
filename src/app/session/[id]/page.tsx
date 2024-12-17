"use client"
import { JSX, useEffect, useState } from "react";
import * as signalR from '@microsoft/signalr';
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const SessionPage = (): JSX.Element => {
    const userInfo: any = useSelector((state: any) => state.userInfoSlice);

    const [connection, setConnection] = useState<any>(null);
    const [roomId, setRoomId] = useState<any>(null);
    const [users, setUsers] = useState<any>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);

    const pathname = usePathname();

    useEffect(() => {
        const id = pathname.split("/")[2];
        setRoomId(id);
    }, [pathname]);

    useEffect(() => {
        getCurrentUser();
    }, [roomId]);

    useEffect(() => {
        connectionToRoom();
    }, [currentUser]);

    const connectionToRoom = async (): Promise<void> => {
        if (roomId != null) {
            const newConnection = new signalR.HubConnectionBuilder()
                .withUrl('http://localhost:5260/roomHub')
                .withAutomaticReconnect()
                .build();

            if (connection) {
                await connection.stop();
            }

            newConnection.start()
                .then(() => {
                    newConnection.invoke("ReceiveRoomData", currentUser.roomUniqId, currentUser.username);

                    newConnection.on("ReceiveRoomData", (data) => {
                        setUsers(data);
                    });

                    newConnection.on('UserJoined', (user) => {
                        console.log(`${user} UserJoined the room.`);
                    });

                    newConnection.on('UserLeft', (user) => {
                        console.log(`${user} left the room.`);
                    });

                    setConnection(newConnection);
                })
                .catch((err) => console.error('Connection failed: ', err));

        }
    }

    const getCurrentUser: any = () => {
        const currentUserInfo: any = userInfo.filter((item: any) => item.roomUniqId == roomId)[0];
        setCurrentUser(currentUserInfo);
    }

    return (
        <div>
            {/* {
                users.map((item: any, index: number) => {
                    return <p key={index}>{item.userName} - {item.userVote}</p>
                })
            } */}
        </div>
    )
}

export default SessionPage;