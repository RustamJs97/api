import styled from "styled-components";
import 'react-modern-drawer/dist/index.css'


export const Container = styled.div`
  width: 100%;
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
img{
  min-width: 70px;
  max-width: 70px;
  min-height: 70px;
  max-height: 70px;
  border-radius: 50%;
  object-fit: contain;
  margin-right: auto;
}
h3{text-align: center;}
b{color: #000;}
p{
  width: 100%;
  line-height: 10px;
  color: red;
  z-index: 99999;
  margin-top: 20px;
  font-size: 10px;
  background-color: #fff;
}
`
export const Card = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 20px 20px 50px 20px;
  display: flex;
  background-color: #fff;
  flex-direction: column;
  justify-content: center;
  text-align: start;
  align-items: center;
  box-shadow: 0 0 10px rgba(0,0,0,.1);
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 6px;
  margin: 50px 0;
button{
  width: 100%;
  height: 40px; 
  outline: none;
  background-color: #2962FF;
  color: #fff;
  font-size: 20px;
  border-radius: 6px;
  margin-top: 30px;
}
.span{display: flex; justify-content: center; width: 100%; gap:20px; }
`