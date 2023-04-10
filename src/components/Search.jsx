import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import searchIcon from "../images/searchiconsvg.svg";
import { useNavigate } from "react-router-dom";
import mic from "../images/mic.png";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  useEffect(() => {
    if (!listening) {
      handleSearchResult();
    }
  }, [listening]);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/searched/${searchTerm}`);
  };

  const handleSearch = () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }
    SpeechRecognition.startListening();
  };

  const handleSearchResult = () => {
    if (transcript) {
      setSearchTerm(transcript);
      resetTranscript();
      navigate(`/searched/${transcript}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="nav__input">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={searchIcon} alt="" />
        <button onClick={handleSearch}>
          <img src={mic} alt="" />
        </button>
      </div>
    </form>
  );
};

export default Search;

// ! important hai bc
// import React, { useState } from "react";
// import searchIcon from "../images/searchiconsvg.svg";
// import { useNavigate } from "react-router-dom";
// import mic from "../images/mic.png";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

// const Search = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const { transcript, resetTranscript } = useSpeechRecognition();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     navigate(`/searched/${searchTerm}`);
//   };

//   const handleSearch = () => {
//     if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//       alert("Speech recognition is not supported in your browser.");
//       return;
//     }
//     SpeechRecognition.startListening();
//   };

//   const handleSearchResult = () => {
//     setSearchTerm(transcript);
//     resetTranscript();
//     navigate(`/searched/${transcript}`);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="nav__input">
//         <input
//           type="text"
//           placeholder="Search"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <img src={searchIcon} alt="" />
//         <button onClick={handleSearch}>
//           <img src={mic} alt="" />
//         </button>
//       </div>
//       {transcript && (
//         <div>
//           <p>{transcript}</p>
//           <button onClick={handleSearchResult}>Search</button>
//         </div>
//       )}
//     </form>
//   );
// };

// export default Search;
