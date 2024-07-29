import { useState, useEffect } from "react";
import axios from "axios"

function App () {
  const [data, setData] = useState();
  
  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=intitle:One+Piece+inauthor:Eiichiro+Oda&maxResults=1&key="
        );
        console.log(res.data.items[0]); 
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    handleSubmit()
  }, [])

  return (
    <h1>Hola Mundo</h1>
  )
}

export default App;