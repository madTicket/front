import styled from "styled-components";

export const WhiteBox = styled.div`
    display: flex;
    
    flex-direction: column;
    justify-content: center;
    border-radius: ${props => props.rad || '20px'};
    padding: 20px;
    background-color: rgba(255, 255, 255, ${props => props.opacity || 1});
    width: ${props => props.width || '500px'};
    height: ${props => props.height};
    margin: 0 auto;
    z-index: 5;
`;

export const BackgroundOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); // Adjust the transparency as needed
    z-index: 1000; // Make sure it's on top of other elements
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const BackgroundImg = styled.img`
position: absolute;
top: 50;
left: 0;
width: 100%;
height: calc(100vh + 400px);
object-fit: cover;
// transform: translateY(-30px);
margin: 0 auto;
filter: blur(8px); /* 블러 효과 크기 조절 가능 */
z-index: -1;
opacity: 0.5
`;

export const OutlineBtn = styled.button`
    font-weight: 600;
    border-style: groove;
    // border-width: medium;
    border-radius:30px;
    color: white;
    background-color: #150026;
    overflow: hidden;
    transition: 0.3s;
    width: ${props => props.width || '100px'};
    height: ${props => props.height || '30px'};

    &:hover {
        transform: scale(1.1);
    }
`;


export const DateBtn = styled.button`
border-radius: 40px;
border-color: transparent;
background: transparent;
color: #1864ab;
border: 1px solid #1864ab;
width: 100px
`;

export const FilledBtn = styled.button`
// color: white;
background-color: rgb(12, 86, 129);
color: white;
font-weight: 300;
border: none;
border-radius:30px;
overflow: hidden;
transition: 0.3s;
width: ${props => props.width || '100px'};
height: ${props => props.height || '30px'};

&:hover {
    transform: scale(1.1);
}
`;

export const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1001; // Make sure it's on top of the overlay
`;