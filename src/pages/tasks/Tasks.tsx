/* eslint-disable @typescript-eslint/no-unused-vars */
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";

import React, { useState } from "react";

import { SnackBars } from "../../shared/components";
import AppBarHeader from "../../shared/components/appbarheader/AppBarHeader";
import { useAuthContext } from "../../shared/contexts";
import { NewTaskType } from "../../shared/types";
import { useAppDispatch } from "../../store/hooks";

const Tasks: React.FC = () => {
  const { logout } = useAuthContext();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState({ detail: "", arquived: false });
  const [tasksTotalCount, setTasksTotalCount] = useState(0);
  const [tasksArquivedCount, setTasksArquivedCount] = useState(0);
  const [task, setTask] = useState<NewTaskType>({
    title: "",
    description: "",
  });

  const loggedUserName = () => {
    const result = localStorage.getItem("APP_ACCESS_TOKEN") || "";

    const payloadBase64 = result.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));

    return payload.name;
  };

  const HandleClearTask = () => {
    setTask({
      title: "",
      description: "",
    });
  };

  return (
    <React.Fragment>
      <AppBarHeader
        titleHeader={"Tasks"}
        actionLogout={logout}
        logedUser={loggedUserName()}
        taskArquivedLength={tasksArquivedCount}
        taskLength={tasksTotalCount}
      />
      <Container
        maxWidth={false}
        sx={{
          backgroundColor: "#212836",
          height: "auto",
          paddingBottom: "10px",
        }}
      >
        <Grid container rowSpacing={1} columnSpacing={2}>
          <SnackBars />
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Título"
              value={task.title}
              onChange={(ev) => {
                setTask({
                  title: ev.target.value,
                  description: task.description,
                });
              }}
              variant="filled"
              color="info"
              InputProps={{
                style: { color: "#fff" }, // Altere 'red' para a cor desejada
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Descrição"
              value={task.description}
              onChange={(ev) => {
                setTask({
                  title: task.title,
                  description: ev.target.value,
                });
              }}
              variant="filled"
              color="info"
              InputProps={{
                style: { color: "#fff" }, // Altere 'red' para a cor desejada
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              // onClick={HandleAddTask}
            >
              SALVAR
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" onClick={HandleClearTask}>
              LIMPAR
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ textAling: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                maxWidth: "100%",
              }}
            >
              <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                variant="standard"
                fullWidth
                label="Buscar.."
                onChange={(ev) =>
                  setSearch({
                    detail: ev.target.value,
                    arquived: search.arquived,
                  })
                }
                id="fullWidth"
                color="info"
                InputProps={{
                  style: { color: "#fff" }, // Altere 'red' para a cor desejada
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={search.arquived}
                    // onChange={handleChangeCheckBox}
                    color="secondary"
                  />
                }
                label="Arquivados"
                color="secondary"
                title="exibir recados arquivados"
              />
            </Box>
          </Grid>

          {/* {taskData

            .slice(0)
            .reverse()
            .map((item) => (
              <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxHeight: 430 }}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                      title={`Detalhes: ${item.detail}`}
                    >
                      {item.detail}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ minHeight: "282.66px", wordWrap: "break-word" }}
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <DialogAction
                      actionEdit={handleEditConfirm}
                      actionToFile={() => veriFyFile(item)}
                      actionDelete={handleDeleteConfirm}
                      Task={item}
                    />
                  </CardActions>
                </Card>
              </Grid>
            ))} */}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Tasks;
