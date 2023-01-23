import styled from "styled-components";
import 'react-modern-drawer/dist/index.css'


export const Container = styled.div`
width: 100%;
display: flex;
background-color:#fafbfc;
flex-direction: column;
align-items: center;
padding: 5px;
img{
  min-width: 70px;
  max-width: 70px;
  min-height: 70px;
  max-height: 70px;
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
.password{
  width: 250px;
  position: absolute;
  color: red;
  z-index: 99999;
  margin: 0 0 50px 0;
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
border-radius: 3px;
margin: 50px 0;
button{
  width: 100%;
  height: 40px; 
  outline: none;
  background-color: #2962FF;
  color: #fff;
  font-size: 20px;
  border-radius: 3px;
  margin-top: 30px;
}
`

export const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 3px;
  border: ${({ border }) => border ? '1px solid red' : '1px solid #3333'};
  outline: none;
  padding: 5px;
  font-size: 16px;
  :focus{
    background-color: #f7f9fa;
  }
`
