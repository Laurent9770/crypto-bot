import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import WalletConnectProvider from "@walletconnect/web3-provider";

const platforms = [
  { name: "MetaMask", type: "wallet" },
  { name: "Trust Wallet", type: "wallet" },
  { name: "Binance", type: "exchange" },
  { name: "Binance US", type: "exchange" },
  { name: "Bybit", type: "exchange" },
  { name: "Kucoin", type: "exchange" },
];

const APIAccess: React.FC = () => {
  const [apiKey, setApiKey] = useState("");
  const [usage, setUsage] = useState(0);
  const [recentCalls, setRecentCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectModal, setConnectModal] = useState<{ open: boolean; platform: string | null }>({ open: false, platform: null });
  const [connections, setConnections] = useState<{ [platform: string]: boolean }>({});
  const [walletAddress, setWalletAddress] = useState<{ [platform: string]: string | null }>({});

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/api_keys`)
      .then(res => res.json())
      .then(data => setApiKey(data.key || ""));
    fetch(`${import.meta.env.VITE_API_URL}/api/api_usage`)
      .then(res => res.json())
      .then(data => {
        setUsage(data.usage || 0);
        setRecentCalls(data.recent || []);
        setLoading(false);
      });
  }, []);

  const handleConnect = async (platform: string) => {
    if (platform === "MetaMask" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress({ ...walletAddress, [platform]: accounts[0] });
        setConnections({ ...connections, [platform]: true });
        setConnectModal({ open: false, platform: null });
      } catch (err) {
        alert("MetaMask connection failed");
      }
      return;
    }
    if (platform === "Trust Wallet") {
      // WalletConnect logic
      const provider = new WalletConnectProvider({
        rpc: { 1: "https://mainnet.infura.io/v3/" },
      });
      await provider.enable();
      setWalletAddress({ ...walletAddress, [platform]: provider.accounts[0] });
      setConnections({ ...connections, [platform]: true });
      setConnectModal({ open: false, platform: null });
      return;
    }
    setConnectModal({ open: true, platform });
  };
  const handleDisconnect = (platform: string) => {
    setConnections({ ...connections, [platform]: false });
    setWalletAddress({ ...walletAddress, [platform]: null });
  };
  const handleConnectSubmit = (platform: string, apiKey?: string, apiSecret?: string) => {
    // TODO: Integrate real connection logic (WalletConnect, MetaMask, or API key submission)
    setConnections({ ...connections, [platform]: true });
    setConnectModal({ open: false, platform: null });
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">API Access</h1>
      {loading ? (
        <div>Loading API data...</div>
      ) : (
        <>
          <div className="mb-8">
            <div className="font-semibold">API Key:</div>
            <div className="bg-muted rounded p-2 font-mono break-all mb-2">{apiKey}</div>
            <div className="text-sm text-muted-foreground mb-2">Usage: {usage} calls</div>
          </div>
          <div>
            <div className="font-semibold mb-2">Recent API Calls</div>
            <ul className="text-xs">
              {recentCalls.map((call, i) => (
                <li key={i}>{call.endpoint} - {call.timestamp}</li>
              ))}
            </ul>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Connect Your Wallets & Exchanges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platforms.map((p) => (
                <div key={p.name} className="flex items-center justify-between p-4 border rounded-lg bg-card/40">
                  <span className="font-semibold">{p.name}</span>
                  {connections[p.name] ? (
                    <div className="flex flex-col gap-1 items-end">
                      {walletAddress[p.name] && <span className="text-xs text-muted-foreground">{walletAddress[p.name]}</span>}
                      <button className="text-destructive underline text-xs" onClick={() => handleDisconnect(p.name)}>Disconnect</button>
                    </div>
                  ) : (
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded font-semibold hover:bg-primary/80" onClick={() => handleConnect(p.name)}>
                      Connect
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <Dialog open={connectModal.open} onOpenChange={open => setConnectModal({ open, platform: connectModal.platform })}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Connect to {connectModal.platform}</DialogTitle>
              </DialogHeader>
              {connectModal.platform && (platforms.find(p => p.name === connectModal.platform)?.type === "wallet") ? (
                <div className="space-y-4">
                  <p>To connect your {connectModal.platform}, please use your wallet app or browser extension. (WalletConnect/MetaMask integration coming soon.)</p>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded font-semibold w-full" onClick={() => handleConnectSubmit(connectModal.platform!)}>
                    Simulate Wallet Connect
                  </button>
                </div>
              ) : connectModal.platform ? (
                <div className="space-y-4">
                  <p>Enter your API Key and Secret for {connectModal.platform}:</p>
                  <input type="text" placeholder="API Key" className="w-full border rounded p-2" id="apiKeyInput" />
                  <input type="password" placeholder="API Secret" className="w-full border rounded p-2" id="apiSecretInput" />
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded font-semibold w-full" onClick={() => {
                    const apiKey = (document.getElementById('apiKeyInput') as HTMLInputElement)?.value;
                    const apiSecret = (document.getElementById('apiSecretInput') as HTMLInputElement)?.value;
                    handleConnectSubmit(connectModal.platform!, apiKey, apiSecret);
                  }}>
                    Connect
                  </button>
                </div>
              ) : null}
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default APIAccess; 