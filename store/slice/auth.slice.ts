
export const createAuthSlice = (set: any) => ({
    userInfo: undefined, //userId de diyo
    setUserInfo: (userInfo: any) => set({ userInfo }), 
})