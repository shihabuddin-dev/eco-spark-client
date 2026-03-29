"use server";

import axios from "axios";

export const sendContactInquiry = async (data: { name: string; email: string; message: string }) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/contact`, data);
    return response.data;
  } catch (error: any) {
    console.error("Contact form error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to send message.");
  }
};
