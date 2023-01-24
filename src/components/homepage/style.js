import styled from "styled-components";
import { Input, Drawer, Button } from 'antd';

export const Container = styled.div`
  width: 100%;
  padding: 20px;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #fafbfc;
.img{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid silver;
}
.edit-img{
  margin-top: 5px;
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.logout{
  width: 35px;
  height: 35px;
  object-fit: cover;
}
`
export const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
`
export const Navbar = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid #3333;
  background-color: #fff;
  padding: 10px 15px;
  gap: 20px;
  z-index: 999999;
`
export const InputAnt = styled(Input)`
  width: 200px;
  display: flex;
  justify-content: flex-end;
:focus{box-shadow: none;}
`
export const ButtonAnt = styled(Button)`
  max-width: 1400px;
`