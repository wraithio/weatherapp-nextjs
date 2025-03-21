// "use client";

// import React, { createContext, useContext, useState } from "react";

// interface Context{
//     search:string;
//     setSearch: (value:string) => void;
// }
// // Creating the context
// const AppContext = createContext<Context>({
//     search: '',
//     setSearch: (value:string) => ''
// })

// // Creating the wrapper
// export function AppWrapper({children}: {children: React.ReactNode}){
//     const [search, setSearch] = useState<string>('');
//     return (
//         <AppContext.Provider value={{search, setSearch}}>
//             {children}
//         </AppContext.Provider>
//     )

// }

// // Function to allow access to data
// export function useAppContext(){
//     return useContext(AppContext)
// }