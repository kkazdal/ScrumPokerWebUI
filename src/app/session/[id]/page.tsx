"use client"
import { JSX, useEffect, useState } from "react";
import * as signalR from '@microsoft/signalr';
import { usePathname } from "next/navigation";

const SessionPage = (): JSX.Element => {

    const [connection, setConnection] = useState<any>(null);
    const [roomId, setRoomId] = useState<any>(null);
    const [users, setUsers] = useState<any>([]);
    const [currentUser, setCurrentUser] = useState("");

    const pathname = usePathname();

    useEffect(() => {
        const id = pathname.split("/")[2];
        setRoomId(id);
    }, [pathname]);

    useEffect(() => {
        connectionToRoom();
    }, [roomId]);

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
                    newConnection.invoke("ReceiveRoomData", roomId, "John Doe");

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