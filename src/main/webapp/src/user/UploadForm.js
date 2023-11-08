import React, { useRef, useState,axios } from 'react';
import { Link } from 'react-router-dom';

import styles from '../css/UploadForm.module.css';
import mainImg from '../image/망상토끼.gif';
import cameraImg from '../image/camera.png'; 

const UploadForm = () => {
    const imgRef = useRef()

    const [userUploadDTO,setUserUploadDTO] = useState({
        imageName: '',
        imageContent: '',
        imageFileName: '',
        imageOriginalName: ''

    })  
        const { imageName, imageContent ,imageFileName , imageOriginalName } = userUploadDTO

    const [imgList, setImgList] = useState([])
    const [file, setFile] = useState('')
    const [showImgSrc, setShowImgSrc] = useState('')
    

    const onInput = (e) =>{
        const { name, value } = e.target
        

        setUserUploadDTO({
            ...userUploadDTO,
            [name]: value
        })
    }

    const onCamera = () => {
        imgRef.current.click()
    }

    const onImgInput = (e) => {
        const files = Array.from(e.target.files)//파일을 배열에 담는다.
        var imgArray = [] //임시배열의 변수를 잡아서

        files.map(item => {
            const objectUrl = URL.createObjectURL(item)
            imgArray.push(objectUrl)
        }) //map 돌아가는거 안에 차곡차곡 담아라.

        setImgList(imgArray) 
    }

    const onUploadSubmit = (e) => {
        e.preventDefault()

        var formData = new FormData()
        formData.append('userUploadDTO', userUploadDTO)
        formData.append('img', imgList)

        axios.post('/user/upload', formData,{
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        }) 
        .then(alert('이미지 업로드 완료'))
        .catch(error=> console.log(error)) 

    }

    const onReset = (e) => {
        e.preventDefault()

        setUserUploadDTO({
            imageName: '',
            imageContent: '',
            imageFileName: '',
            imageOriginalName: ''
        })

        setImgList([])
        setShowImgSrc('')
        imgRef.current.value = ''
    }

    const readURL = (input) => {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0])

        reader.onload = () => {
            console.log(input.files[0])
            setShowImgSrc(reader.result)
            setFile(input.files[0])

        }

    }

    return (
        <div>
            <h3>
        		<Link to='/'>
        		    <img src={ mainImg } alt='망상토끼' width='50' height='50' />
        		</Link>
        	</h3>

            <form>
                <table border={1}>
                    <thead/>
                    <tbody>
                        <tr>
                            <th>상품명</th>
                            <td>
                                <input type="text" name="imageName" value={imageName} size={35} onChange={ onInput }/>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2} align='center'>
                                <textarea name='imageContent' rows='10' cols='60' value={ imageContent } onChange={ onInput }></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2}>
                                <span>
                                     {
                                        // 선택한 이미지를 미리보기
                                        // imgList.map((item,index) => <img key={ index } 
                                        //                                  src={ item } 
                                        //                                  style={{ width: '100px' , height: '100px' }} />)
                                        //이미지 크기를 최대크기 45px로 제한 // 코파일럿 주석으로 코딩 함. 밑에서 tab누르면 반영됨./
                                        imgList.map((item,index) => <img key={ index } 
                                                                         src={ item } 
                                                                         style={{ width: '45px' , height: '45px' }} />)
                                     }
                                </span>

                                <img src={ cameraImg } alt="카메라"
                                     onClick={ onCamera }
                                     style={{ width: 30, height: 30, borderRadius: 20 }} />
                                <input type="file" name="img[]" multiple='multiple'
                                       ref={ imgRef } 
                                       onChange={ onImgInput }
                                       style={{ visibility: 'hidden' }} />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2} align="center">
                                <button onClick={ onUploadSubmit }>이미지 업로드</button> &nbsp;
                                <button onClick={ onReset }>취소</button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot/>
                </table>
            </form>
        </div>
    );
};

export default UploadForm;