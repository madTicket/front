import styled, { keyframes } from 'styled-components';
import { OutlineBtn } from '../components/CommonStyles';
import { MdEdit } from 'react-icons/md';
import { API_BASE_URL } from '../config';

const slideUpAnimation = keyframes`
    from {
        margin-top: 100px;
        opacity: 0;
    }

    to {
        margin-top: 0;
        opacity: 1;
    }
`;

const WhiteBox = styled.div`
    width: 100%;
    height: 100vh;
    border-top-left-radius: 200px;
    border-top-right-radius: 200px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 20px;
    animation: ${slideUpAnimation} 0.5s ease-in-out; /* Apply the animation here */
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 auto;
    width: 70%;
`;

const MyPage = () => {
    const email = localStorage.getItem('email');

    const url = `${API_BASE_URL}/cart?email=${encodeURIComponent(email)}`;
    
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Additional headers can be set here
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("data", data);
                const dataArray = Object.values(data.result);
                console.log("dataArray", dataArray);
            })
            .catch(error => {
                console.error('Error:', error);
            });

    // Enable overflow when the component mounts
    document.body.style.overflow = 'hidden';

    const onAnimationEnd = () => {
        // After animation ends, disable further animation and enable overflow
        document.body.style.overflow = 'auto';
    };

    return (
        <WhiteBox onAnimationStart={onAnimationEnd}>
            <ContentWrapper style={{paddingTop: '70px'}}>
                <h2>{email}님 안녕하세요. &nbsp;&nbsp;</h2>
                <OutlineBtn width="150px">
                    정보 수정하기
                    <MdEdit />
                </OutlineBtn>
            </ContentWrapper>
        </WhiteBox>
    );
};

export default MyPage;