import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ShareButtonContextProps {
    isShared: boolean;
    toggleShared: (data : any) => void;
    setData : (data : any) => void
    data : any
}

const ShareButtonContext = createContext<ShareButtonContextProps | undefined>(undefined);

export const ShareButtonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isShared, setIsShared] = useState<boolean>(false);

    const [data , setData] = useState([])

    const toggleShared = (data : any) => {
        setIsShared((prev)=> !prev);
        setData(data)
    };


    return (
        <ShareButtonContext.Provider value={{ isShared, toggleShared , setData , data}}>
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