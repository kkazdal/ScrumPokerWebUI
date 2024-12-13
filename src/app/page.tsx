import { JSX } from "react";
import { HomeTitle } from "@/components/HomeTitle.component";
import { HowItWorks } from "@/components/HowItWorks.component";
import { Menu } from "@/components/Menu.component";
import { Features } from "@/components/Features.component";
import { Contacts } from "@/components/Contacts.component";
import { Footer } from "@/components/Footer.component";

const Home = (): JSX.Element => {
  return (
    <div>

      <Menu />
      <HomeTitle />
      <HowItWorks />
      <Features />
      <Contacts />
      <Footer/>
    </div>
  )
}

export default Home;