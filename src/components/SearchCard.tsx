import { useState } from "react";
import {
  Box,
  CircularProgress,
  FormControlLabel,
  Link,
  TextField,
  Typography,
  Checkbox,
  Button,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Chip,
  Divider,
  Container,
  Modal,
  Input,
  Avatar,
} from "@mui/material";
import { PostApiCall } from "../services/Post/post";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { IUserInfo } from "../types/User";

const SearchCard = ({ userInfo }: { userInfo: Array<IUserInfo> | null }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        marginTop:"2px",
        transform: "translateX(-50%);",
        width:"80%",
        zIndex:100,
        backgroundColor: '#FD9340',
        borderRadius:"16px",
      }}
    >
      {userInfo ? userInfo.map((val, key) => {
  return (
    <Link
      sx={{
        width: "100%",
        height: "3rem",
        display:"flex",
        alignItems:"center",
        color:"white",padding:"1rem"
      }}
      key={key}
      href={`/userProfile/${val.userName}`}
    >
      <img
        src={`${import.meta.env.VITE_API_BACKEND_URL}${val?.userImg}`}
        alt=""
        style={{ width: "40px", height: "40px" }}
      />
      <h5 style={{marginLeft:"0.5rem"}}>{val?.userName}</h5>
    </Link>
  );
}):""}
    </Box>
  );
};

export default SearchCard;