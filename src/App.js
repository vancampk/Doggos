import { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState();
  const [isChecked, setIsChecked] = useState(false);

 useEffect(() => {
    let url = "https://dog.ceo/api/breeds/image/random";

    fetch(url)
    .then(response => response.json())
    .then(data => setData(data.message))
    .catch((error) => {console.log(error);});
  },[])  

  const getImage = useCallback(() => {
    let url = "https://dog.ceo/api/breeds/image/random";

    if(isChecked){
      url="https://cataas.com/cat?json=true";      
    }     
   
setData(undefined);

    fetch(url)
    .then(response => response.json())
    .then(data => {
      if(data.message){
        setData(data.message);
      }
      else{
          setData("https://cataas.com" + data.url);
      }         
    })
    .catch((error) => {console.log(error);});    

  }, [isChecked]);

  useEffect(() => {
        getImage();
    },[isChecked, getImage])

 const handleChange = event => {
    setIsChecked(event.target.checked);    
  };

  return (
    <div className={isChecked ? "App-dark" : "App"}>
      <header className="App-header">
        <div>Get them doggos!</div>
       <div className='toggle-control'>
        <label className="switch">
          <input type="checkbox" checked={isChecked} onChange={handleChange}/>
          <span className="slider round"></span>
        </label>
         <span>Cat Mode</span>        
        </div>
      </header>
      <section className="App-body">
        <img className='image' alt="doggoImage" src={data}></img>
        <button className='search-button' onClick = {getImage}>
           {!isChecked && <span>Get Doggo</span> }
        {isChecked && <span>Get Catto</span> }
        </button>
      </section>      
    </div>    
  );
}

export default App;
