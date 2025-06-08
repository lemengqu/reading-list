import React from "react";
import TodoList from "./components/TodoList";

function App() {
  const [shareContent, setShareContent] = React.useState<string>("");
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          width: "100%",
        }}
      >
        <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
          Reading List
        </span>
        <button
          onClick={async () => {
            if (shareContent) {
              try {
                await navigator.clipboard.writeText(shareContent);
                alert("Copied to clipboard!");
              } catch (err) {
                console.error("Failed to copy: ", err);
                alert("Failed to copy to clipboard.");
              }
            } else {
              alert("Nothing to copy yet. Add some books!");
            }
          }}
          style={{
            marginLeft: "10px",
            cursor: "pointer",
            justifySelf: "flex-end",
          }}
        >
          Copy
        </button>
      </div>
      <TodoList setShareContent={setShareContent} />
    </div>
  );
}

export default App;
