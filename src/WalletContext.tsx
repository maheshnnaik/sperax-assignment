// WalletContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface WalletContextProps {
    isConnected: boolean;
    setIsConnected: (isConnected: boolean) => void;
    accountAddress: string;
    setAccountAddress: (address: string) => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [accountAddress, setAccountAddress] = useState("");

    return (
        <WalletContext.Provider value={{ isConnected, setIsConnected, accountAddress, setAccountAddress }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
};
