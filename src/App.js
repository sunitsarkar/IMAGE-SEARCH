import './App.css';
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function App() {
  const [data, setData] = useState('');
  const [imageData, setImageData] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const navigate=useNavigate();

  const bookmark=()=>{
    navigate('/bookmark')
  }
  const imgArr=[];
  const add=(img)=>{
    imgArr.push(img);
  }


  useEffect(() => {
    const params = {
      method: "flickr.photos.search",
      api_key: "ba6f8883a71c6b12e5f9d81f542a9590",
      text: data,
      sort: "",
      per_page: 10,
      license: '4',
      extras: "sunit sarkar, license",
      format: "json",
      nojsoncallback: 1
    }
    const parametes = new URLSearchParams(params);
    const url = `https://api.flickr.com/services/rest/?${parametes}`
    axios.get(url)
      .then((res) => {
        console.log(res.data)
        const arr = res.data.photos.photo.map((img) => {
          return Images(img, 'q')
        });
        setImageData(arr);
      })
      .catch((e) => {
        console.log(e.message)
      })
  }, [data]);
  const Images = (picture, size) => {
    let url = `https://live.staticflickr.com/${picture.server}/${picture.id}_${picture.secret}`
    if (size) {
      url += `_${size}`
    }
    url += '.jpg'
    return url
  }
  return (
    <div>
      <div id="heading">
        <span className="heading">React Photo Search</span>
        <button className="book" onClick={bookmark}>BookMarks</button>
      </div>
      <input type="text" placeholder='Search high-resolution images' onChange={(e) => setSearch(e.target.value)} />
      <button className="search" onClick={() => {
        setData(search)
        setShow(true)
      }}>Search</button>
      {show &&
        <section className='images-section'>
          {imageData.map((img, index) => {
            return (
              <div className='main'>
                <img src={img} key={index} alt="" onClick={add(img)}/>
              </div>
            )
          })}
        </section>
      }
    </div >);
}

export default App;
