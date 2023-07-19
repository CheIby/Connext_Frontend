import { useState } from "react";
import { useDispatch } from "react-redux";
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
  Avatar
} from "@mui/material";
import {PostApiCall} from "../services/Post/post"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {IPostInfo} from '../types/Post'
import { fetchPostByUserId } from "../store/postSlice";
import {ThunkDispatch} from "@reduxjs/toolkit";

const PostOption = ({
  handleChangeModal,
  open,
  postInfo
}: {
  handleChangeModal: () => void;
  open: boolean;
  postInfo : IPostInfo | null
}) => {
    const [loading, setIsLoading] = useState<boolean>(false);
    const [isAddImage,setIsAddImage] = useState<boolean>(false);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  
  const pinPost=async()=>{
    if(postInfo!=null){
      await PostApiCall.pinPost(postInfo?._id).then(res=>{
        dispatch(fetchPostByUserId(postInfo.owner));
      })
    }
  }
  

  return (
    <Modal
      open={open}
      onClose={handleChangeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          bottom:0,
          left: "50%",
          transform: "translateX(-50%)",
          transition:"1s",
          width: "100%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          maxWidth: "400px",
          borderTopLeftRadius:"16px",
          borderTopRightRadius:"16px"
        }}
      >
      <Button onClick={pinPost}>Pin Post</Button>
      </Box>
    </Modal>
  );
};

export default PostOption;
