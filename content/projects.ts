import ViddlDesktop from "../public/img/viddl_desktop.png";
import ViddlMobile from "../public/img/viddl_mobile.png";
import HsupDesktop from "../public/img/hsup_desktop.png";
import HsupMobile from "../public/img/hsup_mobile.png";
import HereforyouDesktop from "../public/img/hereforyou_desktop.png";
import HereforyouMobile from "../public/img/hereforyou_mobile.png";
import DinobookingDesktop from "../public/img/dinobooking_desktop.png";
import DinobookingMobile from "../public/img/dinobooking_mobile.png";
import DigidojoDesktop from "../public/img/digidojo_desktop.png";
import DigidojoMobile from "../public/img/digidojo_mobile.png";
import WiaDesktop from "../public/img/wia_desktop.png";
import WiaMobile from "../public/img/wia_mobile.png";
import CogitoDesktop from "../public/img/cogito_desktop.png";
import CogitoMobile from "../public/img/cogito_mobile.png";
import EvitaDesktop from "../public/img/evita_desktop.png";
import EvitaMobile from "../public/img/evita_mobile.png";
import { StaticImageData } from "next/image";
import ViddLAdmin1 from "../public/img/viddl/Admin_1.png";
import ViddlAdmin2 from "../public/img/viddl/Admin_2.png";
import ViddlButtons from "../public/img/viddl/viddl_buttons.png";
import ViddLCourier from "../public/img/viddl/viddl_courier.png";
import ViddLDesignSystem from "../public/img/viddl/viddl_design_system.png";
import ViddLParcelTracking from "../public/img/viddl/viddl_parceltracking.png";
import HsupDashboard from "../public/img/hsup/dashboard.png"
import HsupMobileMockup from "../public/img/hsup/mobile_screens.png"
import HsupMobileScreens from "../public/img/hsup/mobile_screens2.png"

export type Project = {
        id: string,
        path?: string,
        title: string,
        link?: string,
        tags: string[],
        description: string,
        desktopImage: StaticImageData,
        mobileImage: StaticImageData,
        images?: StaticImageData[],
}

const projects: Project[] = [
        {
          id: "viddl",
          path: "viddl",
          title: "VIDDL - Last mile delivery startup",
          link: "https://viddl.hu",
          tags: ["Web application", "Mobile application", "Package tracking"],
          description:
            "ViddL provides last-mile delivery service for big delivery companies. The startup has an admin UI for offices where they can manage the parcels and couriers and a mobile app for delivery.",
          desktopImage: ViddlDesktop,
          mobileImage: ViddlMobile,
          images: [ ViddLDesignSystem,ViddlButtons,ViddLCourier,ViddLParcelTracking,ViddLAdmin1,ViddlAdmin2],
        },
        {
          id: "hsup",
          path: "/works/hsup",
          title: "Hungarian startup university program",
          link: "https://hsup.nkfih.gov.hu",
          tags: ["Web application", "Mobile application", "Landing page"],
          description:
            "HSUP is an online education platform where students can learn about startups. It’s available on almost every hungarian university and used by thousands of students every semester.",
          desktopImage: HsupDesktop,
          mobileImage: HsupMobile,
          images: [HsupMobileMockup,HsupDashboard,HsupMobileScreens]
        },
        {
          id: "hereforyou",
          title: "Hereforyou - online platform for  psychologists",
          tags: ["Web application", "Landing page"],
          description:
            "Hereforyou is a web application for psychologists where they can manage their appointments and make tests and homeworks for their clients. (Development in progress...)",
          desktopImage: HereforyouDesktop,
          mobileImage: HereforyouMobile,
        },
        {
          id: "evita",
          title: "Evita - Online platform for parents",
          tags: ["Web application", "landing page"],
          link: "https://evita.hu",
          description:
            "Evita is an online education platform for parents where they can learn about how to raise a child.",
          desktopImage: EvitaDesktop,
          mobileImage: EvitaMobile,
        },
        {
          id: "dinobooking",
          title: "Dino Booking - Booking service for small businesses",
          tags: ["Web application", "Landing page"],
          description:
            "Dinobooking provides the most simple booking service for small businesses. The startup makes a booking website and a admin interface for subscribers where they can manage their business. (Development in progress...)",
          desktopImage: DinobookingDesktop,
          mobileImage: DinobookingMobile,
        },
        {
          id: "wia",
          title: "Wia electric yachts - Landing page for yacht company",
          link: "http://elektromosyacht.hu",
          tags: ["Landing page"],
          description:
            "Mobile friendly landing page UI design for luxury yacht manufacture company.",
          desktopImage: WiaDesktop,
          mobileImage: WiaMobile,
        },
        {
          id: "digidojo",
          title: "Digidojo - Hungary’s first gamer coaching platform",
          tags: ["Web application", "Landing page", "Admin UI"],
          description:
            "Digidojo is an online platform where gamers can book appointments to mentors who help them evolve their skills in gaming.",
          desktopImage: DigidojoDesktop,
          mobileImage: DigidojoMobile,
        },
        {
          id: "cogito",
          title: "Cogito - Online e-learning platform for universities",
          tags: ["Web application"],
          description:
            "Cogito is an online learning platform for universities, where students can create, update and read notes together collaboratively.",
          desktopImage: CogitoDesktop,
          mobileImage: CogitoMobile,
        },  
];

export default projects;