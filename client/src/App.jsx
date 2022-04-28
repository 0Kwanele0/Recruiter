import { useState, useEffect } from "react";

function App() {
  const [img, setImg] = useState();
  function changing(e) {
    setImg(e.target.value);
  }
  function submit(e) {
    e.preventDefault();
    fetch("http://localhost:3001/", {
      method: "POST",
      body: { filename: img },
    });
    console.log(img);
  }

  return (
    <div>
      <form onSubmit={submit} action="submit">
        <input onChange={changing} value={img} name="image" type="file" />
        <button
          type="submit
        "
        >
          send
        </button>
      </form>
    </div>
  );
}

export default App;
