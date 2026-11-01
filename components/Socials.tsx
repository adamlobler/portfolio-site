import Social from "./Social";
import FigmaIcon from "./icons/Figma.svg";
import LinkedinIcon from "./icons/Linkedin.svg";
import MailIcon from "./icons/Mail.svg";
import UpworkIcon from "./icons/Upwork.svg";

// Instagram (https://www.instagram.com/vallio.studio/) used to be listed here
// behind a comment that referenced an icon the repo does not contain.
const socials = [
  {
    icon: MailIcon,
    label: "Email Adam Lobler",
    url: "mailto:contact@adamlobler.com",
  },
  {
    icon: FigmaIcon,
    label: "Adam Lobler on Figma",
    url: "https://www.figma.com/@lobleradam",
  },
  {
    icon: LinkedinIcon,
    label: "Adam Lobler on LinkedIn",
    url: "https://www.linkedin.com/in/adam-lobler/",
  },
  {
    icon: UpworkIcon,
    label: "Adam Lobler on Upwork",
    url: "https://www.upwork.com/freelancers/~01ea504e62d5ca4245?s=1044578476142100545",
  },
];

export default function Socials() {
  return (
    /**
     * `shrink-0`, and deliberately not `flex-wrap`. A wrapping flex row has a
     * min-content width of *one* item, so as a flex child this row would
     * happily be squeezed to 56px and break 3 + 1 — which is what it did
     * inside the band's `w-fit` column at some widths. Four chips are 248px
     * at every density, which fits the narrowest viewport inside the band's
     * gutters, so there is nothing to wrap.
     */
    <div className="flex shrink-0 gap-inline-xs">
      {socials.map((social) => (
        <Social
          key={social.label}
          icon={social.icon}
          label={social.label}
          url={social.url}
        />
      ))}
    </div>
  );
}
