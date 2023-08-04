import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SHA256 } from "crypto-js";
import {
  Container,
  Box,
  Link,
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  CircularProgress,
} from "@mui/material";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import { IUserInfo } from "../../../types/User";
import ShowPost from "../../../components/ShowPost";
import { selectPosts } from "../../../store/postSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/scrollbar';
import "swiper/css";
import { Scrollbar } from 'swiper/modules';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddPostModal from "../../../components//AddPostModal"
import jwtDecode from "jwt-decode";
import { IAccessToken } from "../../../types/Token";

type IParams = {
  userName: string | undefined;
};

export default function index({userInfo}: {userInfo: IUserInfo | undefined}) {
  const [showPostModal,setShowPostModal] =useState<boolean>(false);
  const post = useSelector(selectPosts)
  const token = localStorage.getItem('accessToken')
  const { userName } = useParams<IParams>();

  const handleChangeModal = async()=>{
    if (showPostModal==true){
      setShowPostModal(false)
    }else{
      setShowPostModal(true)
    }
  }
  return userInfo!=undefined? (
    <Box>
      <Swiper 
        className="mySwiper">
      {post.map((val,key)=>{
                        return val.pinPost==true? (
                          <SwiperSlide key={key} ><ShowPost postInfo={val} userInfo={userInfo}/></SwiperSlide>
                        ):("")
                      })}
      </Swiper>
                      {post.map((val,key)=>{
                        return val.pinPost !=true? (
                          <ShowPost postInfo={val} userInfo={userInfo} key={key} />
                        ):("")
                      })}
        {token != null &&jwtDecode<IAccessToken>(token).userName === userName?<Button
          sx={{
            // height: "2.5rem",
            // width:"2.5rem",
            position: "fixed",
            bottom : "20px",
            right : "calc(50% - 200px)",
            color: "white",
            bgcolor: "#FD9340",
            borderRadius: "50%",
            mr: 1,
            textTransform: "none",
          }}
          onClick={()=>setShowPostModal(true)}
        >
          <Avatar variant="rounded" sx={{ bgcolor: "inherit", m: 0 }}>
            <AddCircleIcon fontSize="medium" />
          </Avatar>
        </Button>:""}
        {showPostModal==true?<AddPostModal userInfo={userInfo} handleChangeModal={handleChangeModal} open={showPostModal}/> : ""}
    </Box>
  ):(
    <Container component="main" maxWidth="xs">
        <Box>
            Not Have Info
        </Box>
    </Container>
  );
}