import axios from "axios";
import { CreateContact } from "../models";
import Cors from "cors";

const cors = Cors({
  methods: ["POST"],
});

// Authentication credentials
const username = "rzp_test_0p4mTs3uyc7xCw";
const password = "VF3whITyzr6HR1gPd3SDHgJL";

const base64Credentials = btoa(`${username}:${password}`);

const axiosInstance = axios.create({
  baseURL: "https://api.razorpay.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${base64Credentials}`,
  },
});

//Authentication
export const createContactRazorpayx = async (payload: CreateContact) => {
  try {
    const res = await axiosInstance.post("/contacts", payload);
    return res.data;
  } catch (err) {
    throw err;
  }
};
