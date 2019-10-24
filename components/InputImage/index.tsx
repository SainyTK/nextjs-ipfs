import { useState } from "react";

const emptyImage = 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg';

const InputFile = props => {

    const [imageUrl, setImageUrl] = useState(emptyImage);

    const handleChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        const readerArray = new FileReader();

        reader.onload = (e) => {
            const result = e.target.result;
            setImageUrl(result.toString());
        }

        readerArray.onload = (e) => {
            const result = e.target.result as ArrayBuffer;
            props.onChange && props.onChange(Buffer.from(result));
        }

        reader.readAsDataURL(file);
        readerArray.readAsArrayBuffer(file);

    }

    return (
        <div className='container'>
            <label>
                <img src={imageUrl}/>
                <input type='file' onChange={handleChange} accept='image/*'/>
            </label>
            <style jsx>{`
                img {
                    cursor: pointer;
                    width: 300px;
                    height: 200px;
                    border: solid black 5px;
                    border-radius: 6px;
                }
                input {
                    display: none;
                }
            `}</style>
        </div>
    )
}

export default InputFile