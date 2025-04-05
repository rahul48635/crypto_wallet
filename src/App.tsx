import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Routes from "./routes/Routes";
import { MnemonicProvider } from "./contexts/MneumonicContext";

const App = () => {
  const router = createBrowserRouter(Routes());

  return (
    <MnemonicProvider>
      <RouterProvider router={router} />
    </MnemonicProvider>
  );
};

export default App;

// import "./App.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// // import { EthWallet } from "./components/eth_wallet";
// // import useMnemonicCall from "./components/mnemonic";
// // import SolanaWallet from "./components/sol_wallet";
// // import Layout from "./components/Layout";

// import Routes from "./routes/Routes";

// function App() {

//   const router = createBrowserRouter(Routes);
//   return (

//     <RouterProvider router={router} />

//     // <Layout>
//     //   <SolanaWallet />
//     //   <EthWallet mnemonic={mnemonic} />
//     // </Layout>

//     // <div className="bg-blue-500 text-black justify-center items-center">
//     //   <SolanaWallet/>
//     //   <EthWallet mnemonic={mnemonic}/>
//     // </div>
//   );
// }

// export default App;
