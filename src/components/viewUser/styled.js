import styled from "styled-components";
import { Input } from 'antd'
import 'react-modern-drawer/dist/index.css'
import MaskedInput from 'react-text-mask'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:#fafbfc;
  box-shadow: 0 0 10px silver;
  border-radius: 6px;
`
export const Card = styled.div`
  width: 300px;
  height: 500px;
  display: flex;
  flex-direction: column;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color:#a4a68d;
  border-radius: 6px 0 0 6px;
img{
  width: 200px;
  height: 250px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0,0,0,.1);
}
h1{
  margin-top: 20px;
  color: #fff;
}
h6{color: #fff; margin-top:20px}
.border{width: 60%; height: 1px; background-color:silver}
`
export const Wrapper = styled.div`
  width: 400px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius:0 6px 6px 0;
  position: relative;
  text-align: start;
  h1{
    font-weight: 550;
    margin-bottom: 200px;
    position: absolute;
    margin-left: 100px;
  }
  p{font-weight: 600; margin-left: 70px}
  .abaut{
    width: 300px;
    height: 200px;
    background-color: #ebe9da;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 100px;
    border-radius: 6px 0 0 6px;
  }
  .abaut:focus{

    background-color: red;

  }
`

