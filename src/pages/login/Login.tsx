/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { SnackBars } from "../../shared/components";
import { useAuthContext } from "../../shared/contexts/AuthContext";
import { useAppDispatch } from "../../store/hooks";
import { setMessage } from "../../store/modules/SnackBarsSlice";
import "./style.css";

interface ILoginProps {
  children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
  const path = window.location.pathname;
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const width = isXs ? "90vw" : "30vw";

  const dispatch = useAppDispatch();
  const { isAuthenticated, login } = useAuthContext();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const auth = async (event: any) => {
    event.preventDefault();
    if (!user.email || user.email === "") {
      return dispatch(
        setMessage({ message: "Preencha o campo e-mail!", status: "error" })
      );
    }
    if (!user.password || user.password === "") {
      return dispatch(
        setMessage({ message: "Preencha o campo senha!", status: "error" })
      );
    }

    await login(user.email, user.password);
  };

  if (isAuthenticated) return <>{children}</>;

  if (path === "/register")
    return (
      <React.Fragment>
        <Box id="login-container-box">
          <Typography variant={"h2"}>Login</Typography>
          <Box id="login-box-card" style={{ width }}>
            <Typography id="login-card-title-reset">
              Recuperação de senha
            </Typography>
            <Typography id="login-card-caption-reset">
              Insira o e-mail cadastrado para recuperar sua senha
            </Typography>
            <Box id="login-inputs">
              <form onSubmit={() => console.log("teste")} id="login-form">
                <input
                  placeholder="E-mail"
                  type="email"
                  id="email"
                  name="email"
                  onChange={(ev) =>
                    setUser({
                      ...user,
                      email: ev.target.value,
                    })
                  }
                />
                <input
                  type="submit"
                  value="Enviar"
                  id="reset-password-button"
                />
              </form>
              <Typography id="return-login-button">
                <a href="/">Voltar ao login</a>
              </Typography>
            </Box>
          </Box>
        </Box>
        <SnackBars />
      </React.Fragment>
    );

  return (
    <React.Fragment>
      <Box id="login-container-box">
        <Box id="login-box-card" style={{ width }}>
          <Typography id="login-card-title">Login</Typography>
          <Box id="login-inputs">
            <form onSubmit={auth} id="login-form">
              <input
                placeholder="E-mail"
                type="email"
                id="email"
                name="email"
                onChange={(ev) =>
                  setUser({
                    ...user,
                    email: ev.target.value,
                  })
                }
              />
              <input
                placeholder="Senha"
                type="password"
                id="password"
                name="password"
                onChange={(ev) =>
                  setUser({
                    ...user,
                    password: ev.target.value,
                  })
                }
              />
              <input type="submit" value="Entrar" id="login-button" />
            </form>
          </Box>
        </Box>
      </Box>
      <SnackBars />
    </React.Fragment>
  );
};
