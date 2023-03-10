import styled from "styled-components";
import { Input, Select, Button } from 'antd';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 1400px;
  margin: 0 5px;
  border-radius: 6px !important;
 * svg{ fill: grey;stroke: grey;}
.img_status{
  width: 50px !important;
  object-fit: contain;
}
.img{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  /* background-color: #3333; */
  object-fit: cover;
  cursor: pointer;
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
  margin-bottom: 50px;
  padding:0 0 50px 0;
  border-radius: 6px !important;
`
export const Navbar = styled.div`
  border-radius: 6px 6px 0 0  !important;
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid #3333;
  background-color: #fff;
  padding: 20px 15px;
  gap: 20px;
  z-index: 999999;
`
export const InputAnt = styled(Input)`
  width: 200px;
  display: flex;
  justify-content: flex-end;
`
export const ButtonAnt = styled(Button)`
  max-width: 1400px;
`
export const BranchStyle = styled.span`
  padding: 5px 30px;
  border-radius: 5px;
  background: ${({ color }) => color == 1 ? 'rgba(57, 190, 215,.1)' : "rgba(255, 90, 71,.1)"};
  color: ${({ color }) => color == 1 ? '#699ff5' : "#eb4634"};
`
export const SelectAnt = styled(Select)`
  width: 100px !important;
  margin-right: auto;
`