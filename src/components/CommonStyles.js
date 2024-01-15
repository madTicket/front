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

export const BackgroundColor = styled.div`

display: flex;
min-height: calc(100vh - 130px);
position: absolute;
top: 0;
left: 0;
z-index: -1;
width: 100%;
margin: 0 auto;
background-color:${props => props.color || '#150026' };
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