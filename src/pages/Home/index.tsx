import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IAccessToken } from "../../types/Token";
import { UserApiCall } from "../../services/User/user";
import { IUserInfo } from "../../types/User";
import SearchCard from "../../components/SearchCard";
import { Container, Box, Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type Props = {};

function index({}: Props) {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [resSearch, setResSeach] = useState<Array<IUserInfo> | null>(null);

  const linkToUserProfile = async () => {
    const token = await localStorage.getItem("accessToken");
    if (token != null) {
      navigate(`/userProfile/${jwtDecode<IAccessToken>(token).userName}`);
    }
  };

  useEffect(() => {
    UserApiCall.search(search).then((res) => {
      console.log(search);
      setResSeach(res.data);
    });
    if (search.length == 0) {
      setResSeach(null);
    }
  }, [search]);

  return localStorage.getItem("accessToken") ? (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ position: "relative" }}
    >
      <Box sx={{ minHeight: "100vh", paddingTop: "1rem" }}>
        <Input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            borderRadius: "16px",
            backgroundColor: "#FD9340",
            paddingX: "1rem",
            "&::before": {
              borderBottom: "none",
            },
            "&::after": {
              borderBottom: "none",
            },
            width: "100%",
          }}
          startAdornment={
            <InputAdornment position="start">{<SearchIcon />}</InputAdornment>
          }
        />
        <Box
          sx={{
            borderBottom: "1px solid black",
            width: "100%",
            marginY: "3px",
          }}
        ></Box>
        <SearchCard userInfo={resSearch} />
        <div style={{ color: "blue", textAlign: "center" }}>
          HOME
          <div onClick={() => linkToUserProfile()}>Profile</div>
        </div>
      </Box>
    </Container>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default index;
