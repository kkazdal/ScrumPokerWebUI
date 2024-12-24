
import { JSX } from "react";
import { Menu } from "@/components/Menu.component";
import { Footer } from "@/components/Footer.component";
import SessionComponent from "@/components/SessionComponent";


const SessionPage = (): JSX.Element => {


    return (
        <div className="flex flex-col justify-between h-screen">
            <Menu />

            <SessionComponent />

            <Footer />

        </div>
    )
}

export default SessionPage;
