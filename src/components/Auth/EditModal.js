import React, { useEffect, forwardRef } from 'react';
import { InputWithLabel, AuthButton, RightAlignedLink, AuthContent, AuthWrapper } from '../Auth';
import { useState } from 'react';
import { BackgroundOverlay, ModalContent } from '../CommonStyles';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import 'react-datepicker/dist/react-datepicker.css';

const EditModal = ({ isVisible, onClose }) => {
    const usernameo = localStorage.getItem('username');
    const userIdo = localStorage.getItem('userId');
    const emailo = localStorage.getItem('email');

    const [username, setUserName] = useState(usernameo);
    const [userid, setUserId] = useState(userIdo);
    const [email, setEmail] = useState(emailo);
    const [passwordo, setPasswordO] = useState('');
    const [password, setPassword] = useState('');
    const [passwordc, setPasswordC] = useState('');

    async function Edit() {

        if (!passwordo) {
            alert('기존 비밀번호를 입력해주세요.');
            return false;
        } else if (!password) {
            alert('새로운 비밀번호를 입력해주세요.');
            return false;
        }
        else if (!passwordc || password != passwordc) {
            alert('비밀번호가 일치하지 않습니다.');
            return false;
        }
        try {
            console.log("password")
            const response = await axios.post(`${API_BASE_URL}/user`, { userName: username, userId: userid, email: email, password: passwordo, password_new: password }, {
                withCredentials: true
            })
            console.log(" ", response.data)

            if (response.data.message === 'invalid password') {
                alert('기존 비밀번호가 일치하지 않습니다.');
            } else if (response.data.message === 'success') {
                alert('정보가 수정되었습니다.');


                localStorage.setItem('email', email);
                localStorage.setItem('userId', userid);
                localStorage.setItem('username', username);

                onClose()
                // Additional logic for successful signup, e.g., redirect or update UI
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <BackgroundOverlay isVisible={isVisible} onClick={onClose}>
            <ModalContent isVisible={isVisible} onClick={(e) => e.stopPropagation()}>
                <AuthContent title="회원정보 수정" width="400px">
                    <InputWithLabel label="이름" name="username" placeholder="이름" value={username} onChange={(e) => setUserName(e.target.value)} />
                    <InputWithLabel label="별명" name="userid" placeholder="별명" value={userid} onChange={(e) => setUserId(e.target.value)} />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <p>이메일: &nbsp;</p><p>{emailo}</p>
                    </div>
                    <InputWithLabel label="기존 비밀번호" name="passwordOriginal" placeholder="기존 비밀번호" type="password" value={passwordo} onChange={(e) => setPasswordO(e.target.value)} />
                    <InputWithLabel label="새 비밀번호" name="password" placeholder="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <InputWithLabel label="새 비밀번호 확인" name="passwordConfirm" placeholder="비밀번호 확인" type="password" value={passwordc} onChange={(e) => setPasswordC(e.target.value)} />
                    <AuthButton onClick={Edit}>저장하기</AuthButton>
                </AuthContent>
            </ModalContent>
        </BackgroundOverlay>
    );
};

export default EditModal;