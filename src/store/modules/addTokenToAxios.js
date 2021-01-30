import axios from "axios";

export default function AddHeaderToken(){
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`
}