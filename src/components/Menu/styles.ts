import styled, {css} from 'styled-components'

interface ContainerProps {
  visible: boolean;
}

export const Container = styled.div<ContainerProps>`
  border: 1px solid #ccc;
  box-shadow: 3px 3px 7px #888;
  display:none;
  z-index:2;
  width: 300px;
  position: fixed;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  bottom: 70px;
  right: 70px;



  form{
  display:flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;



  span{
    margin-top: 10px;
    color: #312E38;
    font-weight:bold;
  }


  input{
    height: 20px;
  }
  }

  ${props => props.visible && css`display:flex`}
`;

export const ButtonContainer = styled.div`
  margin: 15px auto 0 auto;
  display:flex;
  align-items:center;

  color: #fff;
  button {
    span{
      color: #fff;
    }
  }
`
