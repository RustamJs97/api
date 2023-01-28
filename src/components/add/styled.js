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
  margin-top: 10px;
  font-size: 10px;
  background-color: #fff;
  line-height: 0;
}
button{width: 100%; height: 40px; border-radius:6px}
.button{background-color: #0247FE; color: #fff !important}
.span{display: flex; justify-content: center; width: 100%; gap:20px}
`
