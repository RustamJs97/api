import styled from "styled-components";

export const Card = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  p{
  width: 100%;
  line-height: 10px;
  color: red;
  z-index: 99999;
  margin-top: 20px;
  font-size: 10px;
  background-color: #fff;
}
  margin: 0;
  line-height: 0;
  align-items: center;
button{width: 100%; height: 40px;}
.button{background-color: #0247FE; color: #fff !important}
span{display: flex; justify-content: center; width: 100%; gap:20px}

`
export const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 3px;
  border: ${({ border }) => border ? '1px solid red' : '1px solid #3333'};
  outline: none;
  padding: 5px;
  font-size: 16px;
:focus{background-color: #f7f9fa;}
`
