import "./headermenu.css";
import { Typewriter } from "react-simple-typewriter";
import { AiTwotoneAudio } from "react-icons/ai";
import Marquee from "react-fast-marquee";
import NavbarMenu from "../navbarMenu/NavbarMenu";
import { useGetAllLogosQuery } from "../../redux/features/allApis/logoApi/logoApi";
import { useGetHeadlineQuery } from "../../redux/features/allApis/headlineApi/headlineApi";

const HeaderMenu = () => {
  const { data } = useGetAllLogosQuery();
  const { data: headline } = useGetHeadlineQuery();
  const selectedLogo = data?.find((logo) => logo.isSelected === true);
  return (
    <div className="container">
      <div className="headerTopMenu">
        <div className="headerLeftImg">
          <img src={selectedLogo?.logoUrl} alt="" />
        </div>
        <div className="headerRightText">
          <Typewriter
            words={["OFFICIAL AGENT LIST"]}
            loop={0}
            cursor={true}
            cursorColor="#ffdf6e"
          />
        </div>
      </div>
      <div className="headerMarquee">
        <div className="marqueeTitle">
          <AiTwotoneAudio className="marqueeSize" />
          <h2>{headline?.title}</h2>
          <span></span>
        </div>
        <Marquee className="marqueeText">{headline?.headline}</Marquee>
      </div>
      <NavbarMenu />
    </div>
  );
};

export default HeaderMenu;
