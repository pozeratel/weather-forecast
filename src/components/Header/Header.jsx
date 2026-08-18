import { useEffect, useState } from "react";
import "./Header.css";
import { HeaderModal } from "../HeaderModal/HeaderModal";

const navigation = ["Who we are", "Contacts", "Menu"];

export default function Header() {
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
    <header className="site-header">
      <div className="site-header__content">
        <a className="brand" href="/" aria-label="247 Forecast — home">
          <span className="brand__number">247</span>
          <span className="brand__name">forecast</span>
        </a>

        <nav className="site-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a href={`#${item.toLowerCase().replaceAll(" ", "-")}`} key={item}>
              {item}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          {user ? (
            <p>{user.name}</p>
          ) : (
            <button
              type="button"
              className="sign-up"
              onClick={() => setIsModalOpen(true)}
            >
              Sign Up
            </button>
          )}

          <button
            className="profile-button"
            type="button"
            aria-label="Open profile"
          >
            <span className="profile-button__head" />
            <span className="profile-button__body" />
          </button>
        </div>
      </div>

      <HeaderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setUser={setUser}
      />
    </header>
  );
}
