import React from "react";
import Social from "../components/Social";

const socials = [
  {
    image: "/img/social/Mail.svg",
    altText: "mail",
    url: "mailto: adam.lobler@vallio.studio",
  },
  {
    image: "/img/social/Linkedin.svg",
    altText: "linkedin",
    url: "https://www.linkedin.com/in/adam-lobler/",
  },
  {
    image: "/img/social/Upwork.svg",
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
