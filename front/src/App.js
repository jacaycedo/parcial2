import "./App.scss";
import React from "react";
import { AppRouter } from "./router/AppRouter";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

function App() {
  return (
    <>
      <main>
        <AppRouter />
      </main>
    </>
  );
}

serviceWorkerRegistration.register();

export default App;
