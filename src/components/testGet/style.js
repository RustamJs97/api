import styled from "styled-components";
import { Input, Select, Button } from 'antd';

export const Container = styled.div`
width: 100%;
max-width: 1400px;
box-shadow: 0 0 10px rgba(0,0,0,.2);
margin: 0 5px;
 * svg{ fill: grey;stroke: grey;}
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
export const BranchStyle = styled.span`
  padding: 5px 30px;
  border-radius: 5px;
  background: ${({ color }) => color == 1 ? 'rgba(0, 200, 255,.1)' : "rgba(96, 255, 125,.3)"};
  color: ${({ color }) => color == 1 ? '#699ff5' : "#37851d"};
`
export const SelectAnt = styled(Select)`
  width: 100px !important;
  margin-right: auto;
`