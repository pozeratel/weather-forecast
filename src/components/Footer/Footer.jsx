import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import {
  Address,
  Brand,
  BrandName,
  BrandNumber,
  FooterContent,
  FooterRoot,
  Social,
  SocialLinks,
  Socials,
} from "./Footer.styled";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/", icon: FaInstagram },
  { label: "Facebook", href: "https://www.facebook.com/", icon: FaFacebookF },
  { label: "WhatsApp", href: "https://www.whatsapp.com/", icon: FaWhatsapp },
];

export default function Footer() {
  return (
    <FooterRoot id="contacts">
      <FooterContent>
        <Brand href="/" aria-label="247 Forecast — home">
          <BrandNumber>247</BrandNumber>
          <BrandName>forecast</BrandName>
        </Brand>

        <Address>
          <span>Address</span>
          <span>Shovkovychna 35</span>
          <span>Kyiv</span>
          <span>Ukraine</span>
        </Address>

        <Socials>
          <span>Contact us</span>
          <SocialLinks>
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Social
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
              >
                <Icon aria-hidden="true" />
              </Social>
            ))}
          </SocialLinks>
        </Socials>
      </FooterContent>
    </FooterRoot>
  );
}
