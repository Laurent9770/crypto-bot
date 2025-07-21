import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EthereumProvider from "@walletconnect/ethereum-provider";

const platforms = [
  { name: "MetaMask", type: "wallet" },
  { name: "Trust Wallet", type: "wallet" },
  { name: "Binance", type: "exchange" },
  { name: "Binance US", type: "exchange" },
  { name: "Bybit", type: "exchange" },
  { name: "Kucoin", type: "exchange" },
];

const APIAccess = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Access</h1>
      <p>This is a placeholder for the API access and documentation page.</p>
    </div>
  );
};

export default APIAccess;
