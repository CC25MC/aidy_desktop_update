import React from 'react';
import { MoneyIcon, CardcreditIcon, CardsIcon, PiggybankIcon, CheckIcon, OtherpaymentIcon } from "components";
import { atom } from "jotai";
export const listArticles = atom([]);
export const PERSISTOR_KEYS = {
	user: "user",
	auth: "auth",
    list: "list",
    billIds:"billids" 
};
export const paymentMethods = [
    {
        icon: <CardsIcon size={"xlarge"} color={"#000000"} />,
        iconActive: <CardsIcon size={"xlarge"} color={"#FFB800"} />,
        methods: "Debito",
    },
    {
        icon: <CardsIcon size={"xlarge"} color={"#000000"} />,
        iconActive: <CardcreditIcon size={"xlarge"} color={"#FFB800"} />,
        methods: "Credito",
    },
    {
        icon: <CheckIcon size={"xlarge"} color={"#000000"} />,
        iconActive: <CheckIcon size={"xlarge"} color={"#FFB800"} />,
        methods: "Cheque",
    },
    {
        icon: <MoneyIcon size={"xlarge"} color={"#000000"} />,
        iconActive: <MoneyIcon size={"xlarge"} color={"#FFB800"} />,
        methods: "Efectivo",
    },
    {
        icon: <PiggybankIcon size={"xlarge"} color={"#000000"} />,
        iconActive: <PiggybankIcon size={"xlarge"} color={"#FFB800"} />,
        methods: "Saldo Cliente",
    },
    {
        icon: <OtherpaymentIcon size={"xlarge"} color={"#000000"} />,
        iconActive: <OtherpaymentIcon size={"xlarge"} color={"#FFB800"} />,
        methods: "Otro",
    },
];