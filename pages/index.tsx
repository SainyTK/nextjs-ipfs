import { useState, useEffect } from "react";
import { IPFSService } from '../services/ipfs';
import InputImage from "../components/InputImage";
import InputVideo from "../components/InputVideo";
import axios from 'axios';

const ipfsService = new IPFSService();

const jsonData = {
    cat: {
        name: 'bubby',
        age: 2,
        child: [{ name: 'bubboo' }]
    },
    dog: {
        name: 'puppy',
        age: 5,
    }
}

export default props => {

    useEffect(() => {
        axios.get('https://gateway.ipfs.io/ipfs/QmS5fs4y3SHUFvjfYvrpcgvbndaeYDpR8vbV91X6v7JpSD').then((res) => {
            console.log(res.data);
            setData(res.data);
        });
    }, [])

    const [imageData, setImageData] = useState(null);
    const [videoData, setVideoData] = useState(null);
    const [textData, setTextData] = useState('');
    const [data, setData] = useState(null);

    const submitImage = () => {
        ipfsService.addData(imageData).then(console.log)
    }

    const submitText = () => {
        const data = Buffer.from(textData);
        ipfsService.addData(data).then(console.log)
    }

    const submitJson = () => {
        const data = Buffer.from(JSON.stringify(jsonData));
        ipfsService.addData(data).then(console.log)
    }

    const submitVideo = () => {
        console.log('sent')
        ipfsService.addData(videoData).then(console.log)
    }

    return (
        <div className='container'>
            <div className='box'>
                <InputImage onChange={imageData => setImageData(imageData)} />
                <button onClick={submitImage}>Send Image</button>
            </div>
            <div className='box'>
                <InputVideo onChange={videoData => setVideoData(videoData)} />
                <button onClick={submitVideo}>Send Video</button>
            </div>
            <div className='box'>
                <input type='text' onChange={(e) => setTextData(e.target.value)} />
                <button onClick={submitText}>Send Text</button>
            </div>
            <div className='box'>
                <p>{JSON.stringify(jsonData)}</p>
                <button onClick={submitJson}>Send JSON</button>
            </div>
            <div className='box'>
                <video width='600' controls>
                    <source src='https://gateway.ipfs.io/ipfs/QmX1YYb1DJNwXTwEZ4v7kLjHX9DtE88akVZXdJTZXsXx7q'></source>
                </video>
            </div>
            <div className='box'>
                {data && (
                    <h2>{data.cat.name} {data.cat.age}</h2>
                )}
            </div>
            <style jsx>{`
                .box {
                    border: 1px solid #cecece;
                    border-radius: 6px;
                    padding: 20px;
                    margin: 10px;
                }    
            `}</style>
        </div>
    )
}
