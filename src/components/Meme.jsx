import {useEffect,useState} from 'react';
export default function Meme(){
    const [meme,setMeme] =useState({
        topText:'',
        bottomText:'',
        randomImg:'http://i.imgflip.com/1bij.jpg'
    })

    const [img,setImg] = useState([])

    useEffect(()=>{
        async function getMeme(){
            const res = await fetch('https://api.imgflip.com/get_memes')
            const data = await res.json()
            setImg(data.data.memes)
        }
        getMeme()
    },[])

    function getImage(){
        const number = Math.floor(Math.random()*img.length)
        const url = img[number].url
        setMeme(prevMeme=>({
            ...prevMeme,
            randomImg: url
        }))
    }

    function handleChange(event){
        const {name,value} =event.target;
        setMeme(prevMeme=>({
            ...prevMeme,
            [name]:value
        }))
    }
    return(
        <div className="meme-container">
            <div className="form">
                <label htmlFor="topText">Type the Top text</label>
                <input
                    type="text" 
                    id="topText"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <label htmlFor="bottomText">Type the Bottom text</label>
                <input
                    type="text" 
                    id="bottomText"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
            </div>
            <button
                onClick={getImage}
            >
                Get image for the meme
            </button>
            <div className="memeImageContainer">
                <img src={meme.randomImg} className="memeImage" />
                <h1 className='memeText top'>{meme.topText}</h1>
                <h1 className='memeText bottom'> {meme.bottomText}</h1>
            </div>
        </div>
    )
}