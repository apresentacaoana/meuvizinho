'use client'
import { useState } from "react";
import Form from "./Form";

function UI({ reload, setReload }) {
    return (
        <div className="flex w-full h-screen">
            <Form reload={reload} setReload={setReload} />
            <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
                <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-green-400 to-green-900 animate-spin"/> 
                <div className="w-full h-1/2 absolute bottom-0 bg-white-900/10 backdrop-blur-lg" />
            </div>
        </div>
    );
}

export default UI;