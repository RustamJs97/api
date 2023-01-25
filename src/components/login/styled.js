import styled from "styled-components";
import { Input } from 'antd'
import 'react-modern-drawer/dist/index.css'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color:#fafbfc;
  flex-direction: column;
  justify-content: center;
  align-items: center;
h3{text-align: center;}
b{color: #000;}
p{
  width: 250px;
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
h2{font-size:16px; text-align: center;line-height:0;color:red}
`
export const Card = styled.form`
  width: 400px;
  padding: 20px 20px 50px 20px;
  display: flex;
  background-color: #fff;
  flex-direction: column;
  justify-content: center;
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
  border-radius: 6px;
  margin-top: 30px;
}
`

export const InputAnt = styled(Input)`
  height: 40px;
  display: flex;
  align-items: center;
  outline: none;
  /* padding: 5px ; */
  font-size: 16px;
/* :focus{ background-color: #f7f9fa;} */
`
