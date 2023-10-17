//Nice loading for the App
"use client";

import React from 'react'
import Lottie from 'lottie-react';
import loader from "../assets/Telegram.json";

const TelegramLoading = () => {
  return (
    <Lottie animationData={loader} loop={true} />
  )
}

export default TelegramLoading