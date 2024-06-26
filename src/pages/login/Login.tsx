/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { register } from "../../api";
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
    name: "",
    email: "",
    password: "",
    re_password: "",
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

  const signup = async (event: any) => {
    event.preventDefault();

    if (!user.name || user.name === "") {
      return dispatch(
        setMessage({ message: "Preencha o campo e-mail!", status: "error" })
      );
    }

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

    if (user.password != user.re_password) {
      return dispatch(
        setMessage({ message: "As senhas não coincidem!", status: "error" })
      );
    }

    const result = await register(user);

    console.log(result);

    if (result.msg === "Email já cadastrado!") {
      return dispatch(
        setMessage({ message: "Email já cadastrado!", status: "error" })
      );
    }

    if (result.message === "Usuário criado com sucesso") {
      return dispatch(
        setMessage({
          message: "Usuário criado com sucesso!",
          status: "success",
        })
      );
    }
  };

  if (isAuthenticated) return <>{children}</>;

  if (path === "/register")
    return (
      <React.Fragment>
        <Box id="login-container-box">
          <Box id="login-box-card" style={{ width }}>
            <Typography id="login-card-title-reset">Registre-se</Typography>
            <Box id="login-inputs">
              <form onSubmit={signup} id="login-form">
                <input
                  placeholder="Nome"
                  type="text"
                  id="name"
                  name="name"
                  onChange={(ev) =>
                    setUser({
                      ...user,
                      name: ev.target.value,
                    })
                  }
                />
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
                <input
                  placeholder="repetir senha"
                  type="password"
                  id="re-password"
                  name="re-password"
                  onChange={(ev) =>
                    setUser({
                      ...user,
                      re_password: ev.target.value,
                    })
                  }
                />
                <input
                  type="submit"
                  value="Registrar-ser"
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
          <Typography id="login-card-title" variant="h2">
            Login
          </Typography>
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
            <Typography id="return-login-button">
              <a href="/register">Não tem uma conta? Registre-se</a>
            </Typography>
          </Box>
        </Box>
      </Box>
      <SnackBars />
    </React.Fragment>
  );
};
