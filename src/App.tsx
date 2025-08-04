import React from "react";
import ReadingList from "./components/ReadingList";
import Header from "./components/Header";

function App() {
  const [shareContent, setShareContent] = React.useState<string>("");
  return (
    <div className="App">
      <Header shareContent={shareContent} />
      <ReadingList setShareContent={setShareContent} />
    </div>
  );
}

export default App;
