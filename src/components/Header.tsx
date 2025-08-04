import React from 'react';

interface HeaderProps {
  shareContent?: string;
}

const Header: React.FC<HeaderProps> = ({ shareContent }) => {
  const handleCopyClick = async () => {
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
  };

  return (
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
        onClick={handleCopyClick}
        style={{
          marginLeft: "10px",
          cursor: "pointer",
          justifySelf: "flex-end",
        }}
      >
        Copy
      </button>
    </div>
  );
};

export default Header;
