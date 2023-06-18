import React, {useState} from 'react';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';       

const TestProfile = () => {
    const [image, setImage] = useState('');

    return (
        <div className='profile_img text-center p-4'>
            <div className="flex flex-column justify-content-center align-items-center">
                <img className='' />
                <InputText type='file'
                accept='/image/'
                onChange={(event) => {
                    const file = event.target.files;
                    if(file && file.type.substring(0,5) === 'image'){
                        setImage(file);
                    } else {
                        setImage(null);
                    }
                }}/>
            </div>
        </div>
    )
}

export default TestProfile;