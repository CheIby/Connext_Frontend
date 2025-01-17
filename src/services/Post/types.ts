import { AxiosResponse } from "axios";
import { ICreatePost } from "../../types/Post";

export interface IPostApiCall {
    createPost : (payload : ICreatePost) => Promise<AxiosResponse>;
    getPost : (_id : string | null) =>Promise<AxiosResponse>;
    getPostByUserId:(_id:string | null) =>Promise<AxiosResponse>;
    pinPost : (_id : string | null) =>Promise<AxiosResponse>;
}