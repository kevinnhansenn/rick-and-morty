import "antd/dist/antd.css";
import "../styles/globals.css";

import React, { useState } from "react";

export const EpisodeContext = React.createContext();

function MyApp({ Component, pageProps }) {
  const [episodeId, setEpisodeId] = useState(null);

  return (
    <EpisodeContext.Provider value={episodeId}>
      <Component {...pageProps} setEpisodeId={setEpisodeId} />
    </EpisodeContext.Provider>
  );
}

export default MyApp;
