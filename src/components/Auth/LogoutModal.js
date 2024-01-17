import React, { useEffect, forwardRef } from 'react';
import { InputWithLabel, AuthButton, RightAlignedLink, AuthContent, AuthWrapper } from '../Auth';
import { useState } from 'react';
import { BackgroundOverlay, FilledBtn, ModalContent, OutlineBtn } from '../CommonStyles';
import axios from 'axios';
import oc from 'open-color';
import { API_BASE_URL } from '../../config';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

const Aligner = styled.div`
    margin-top: 1rem;
    text-align: right;
    color: ${oc.gray[6]};
    &:hover {
        color: ${oc.gray[7]};
    }
`;



const LogoutModal = ({ isVisible, onClose, logout }) => {

    const logoutConfirm = () => {
        logout()
        onClose()
    }

    return (
        <BackgroundOverlay isVisible={isVisible} onClick={onClose}>
            <ModalContent isVisible={isVisible} onClick={(e) => e.stopPropagation()}>
                <AuthContent title={'로그아웃'} width="400px">
                    <p style={{color: 'black', marginBottom: '50px', marginTop: '20px'}}>정말 로그아웃하시겠습니까?</p>
                    <Aligner>
                        <OutlineBtn onClick={onClose} width='80px' style={{ marginRight: '20px' }}>취소</OutlineBtn>
                        <FilledBtn onClick={logoutConfirm} fill='#005096' width='80px'>확인</FilledBtn>
                    </Aligner>
                    {/* <RightAlignedLink to="/register">회원가입</RightAlignedLink> */}
                </AuthContent>
            </ModalContent>
        </BackgroundOverlay>
    );
};

export default LogoutModal;