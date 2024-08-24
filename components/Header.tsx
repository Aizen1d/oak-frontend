"use client";

import { useState, useEffect } from "react";
import useAuthStore from "@/stores/AuthStore";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderLoggedOut from "./HeaderLoggedOut";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const auth = useAuthStore(state => state.isLogged);

  useEffect(() => {
    setIsLoggedIn(auth);
  }, [auth]);

  return isLoggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />;
};

export default Header;