import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
    & + & {
        margin-top: 1rem;
    }
`;

const Label = styled.div`
    font-size: 1rem;
    color: ${oc.gray[6]};
    margin-bottom: 0.25rem;
`;

const Input = styled.input`
    width: ${(props) => props.width || '97%'}; /* Default to 100% if width prop is not provided */
    height: 30px;
    border: 1px solid ${oc.gray[3]};
    outline: none;
    border-radius: 0px;
    line-height: 2.5rem;
    font-size: 1.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-top: 10px;
    margin-bottom: 10px;
    ::placeholder {
        color: ${oc.gray[3]};
    }
`;

const InputWithLabel = ({ label, width, ...rest }) => (
    <Wrapper>
        <Label>{label}</Label>
        <Input width={width} {...rest} />
    </Wrapper>
);

export default InputWithLabel;