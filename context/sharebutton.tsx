import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ShareButtonContextProps {
    isShared: boolean;
    toggleShared: () => void;
}

const ShareButtonContext = createContext<ShareButtonContextProps | undefined>(undefined);

export const ShareButtonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isShared, setIsShared] = useState<boolean>(false);

    const toggleShared = () => {
        setIsShared((prev)=> !prev);
    };

    return (
        <ShareButtonContext.Provider value={{ isShared, toggleShared }}>
            {children}
        </ShareButtonContext.Provider>
    );
};

export const useShareButton = (): ShareButtonContextProps => {
    const context = useContext(ShareButtonContext);
    if (!context) {
        throw new Error('useShareButton must be used within a ShareButtonProvider');
    }
    return context;
};