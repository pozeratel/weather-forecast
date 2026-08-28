import { useEffect, useState } from "react";
import { HeaderModal } from "../HeaderModal/HeaderModal";
import {
  Actions,
  Brand,
  BrandName,
  BrandNumber,
  HeaderContent,
  HeaderRoot,
  Nav,
  ProfileButton,
  ProfileHead,
  ProfileBody,
  SignUpButton,
} from "./Header.styled";

const navigation = ["Who we are", "Contacts", "Menu"];

export default function Header({ themeName = "light", onToggleTheme }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <HeaderRoot>
      <HeaderContent>
        <Brand href="/" aria-label="247 Forecast — home">
          <BrandNumber>247</BrandNumber>
          <BrandName>forecast</BrandName>
        </Brand>

        <Nav aria-label="Main navigation">
          {navigation.map((item) => (
            <a href={`#${item.toLowerCase().replaceAll(" ", "-")}`} key={item}>
              {item}
            </a>
          ))}
        </Nav>

        <Actions>
          <SignUpButton
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            {themeName === "dark" ? "Light" : "Dark"}
          </SignUpButton>

          {user ? (
            <p>{user.name}</p>
          ) : (
            <SignUpButton
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              Sign Up
            </SignUpButton>
          )}

          <ProfileButton
            type="button"
            aria-label="Open profile"
          >
            <ProfileHead />
            <ProfileBody />
          </ProfileButton>
        </Actions>
      </HeaderContent>

      <HeaderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setUser={setUser}
      />
    </HeaderRoot>
  );
}
