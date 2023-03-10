import React from "react";
import Instagram from "../images/social/instagram.png";
import Linkedin from "../images/social/linkedin.png";
import Mail from "../images/social/mail.png";
import Upwork from "../images/social/upwork.png";
import Social from "../components/Social";

const socials = [
  {
    image: Mail,
    altText: "mail",
    url: "mailto: adam.lobler@vallio.studio",
  },
  {
    image: Linkedin,
    altText: "linkedin",
    url: "https://www.linkedin.com/in/adam-lobler/",
  },
  {
    image: Upwork,
    altText: "upwork",
    url: "https://www.upwork.com/freelancers/~01ea504e62d5ca4245?s=1044578476142100545",
  },
];

{
  /*
  {
    image: Instagram,
    altText: "instagram",
    url: "https://www.instagram.com/vallio.studio/",
  },
*/
}

const Socials: React.FC = () => {
  return (
    <div className="flex space-x-4">
      {socials.map((social) => (
        <Social
          key={social.altText}
          image={social.image}
          alt={social.altText}
          url={social.url}
        />
      ))}
    </div>
  );
};

export default Socials;
