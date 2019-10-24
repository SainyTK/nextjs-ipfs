import { useState } from "react"

const InputVideo = props => {

    const handleChange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            props.onChange && props.onChange(Buffer.from(e.target.result as ArrayBuffer))
        }

        reader.readAsArrayBuffer(file);
    }

    return (
        <div>
            <label>
                <input type='file' onChange={handleChange} accept='video/*' />
            </label>
        </div>
    )
}

export default InputVideo;