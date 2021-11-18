import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../components/Board";
import Navbar from "../components/Navbar"
import Panel from "../components/Panel";
import Stack from "../components/Stacks";
import Stats from "../components/Stats";
import Toast from "../components/Toast";
import { getAccountInfo } from "../modules/account";
import { addToast } from "../modules/toasts";

export const Main = () => {

    const dispatch = useDispatch();
    const toastsList = useSelector((state:any) => state.account);


    const ws = new WebSocket('wss://stream.binance.com:9443/ws');

    const [coinPrice, setCoinPrice] = useState(0);

    const msg = {
        method: 'SUBSCRIBE',
        params: ['btcusdt@depth'],
        id:1,
    }

    // ws.onopen = () => {
    //     console.log('Opened Connection!')
    //     ws.send(JSON.stringify(msg));
    // }

    // ws.onmessage = e => {
    
    //     const value = JSON.parse(e.data);
    //     if(Array.isArray(value.b)){
    //         setCoinPrice(value.b[0][0])
    //     }
    // }

    const handleClick = () => {
        // dispatch(addToast({
        //     type:"OK",
        //     title: 'Toast Test',
        //     text: "Hello, Text"}));
        apiTest();
    }

    const apiTest = () => {
        dispatch(getAccountInfo({coin: "USDT"}));
    }

    // ws.onclose = () => {
    //     console.log('Closed Connection!');
    // }

    return (
        <div>
            <Navbar />

            <div className="container mx-auto px-4 py-4">

            <Toast/>
                 
            
          
            <button onClick={() => handleClick()}>BUTTON</button>
            <div className="grid grid-cols-8 gap-4">
                <div className="col-span-5 flex flex-col">
                    <Board price={coinPrice}/>
                    <Stats />
                </div>
                <div className="col-span-3">
                    <Panel />
                </div>
                <div className="col-span-8">
                    <Stack />
                    </div>
            </div>
            </div>
        </div>
    )
}