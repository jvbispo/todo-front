import styled from 'styled-components'


export const Container = styled.ul`
 margin: 40px auto 40px auto;
 max-width: 1000px;
 padding: 30px;
 display: grid;
 grid-gap: 50px;
 grid-template-columns: auto auto auto;
`;

export const NoteContainer = styled.li`
  list-style:none;
  position: relative;
  width: 300px;
  height: 150px;
  background-color: #f7f7f7;
  border-radius: 5px;
  color: #312e38;
  padding: 15px;
  box-shadow: 3px 3px 7px grey;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  div {
    display: flex;
    align-items: center;

    strong {
      Color: #333;
      font-size: 20px;
    }

    >span{
      color: #ddd;
      margin-left: 5px;
      background-color: #5199FF;
      border-radius: 3px;
      font-size: 13px;
      padding: 3px 5px;
    }
  }

`;

export const TimeDiv = styled.div`
  margin-top: 5px;
  >p{
  color: #5199FF;
  background-color: #fff;
  border-radius: 3px;
  font-size: 13px;
  padding: 3px 4px;

    & + p {
      margin-left: 10px;
    }
  }

`;

export const CloseIcon = styled.button`
background-color: transparent;
border: none;
position: absolute;
top: 5px;
right: 5px;
`;

export const LogOutButton = styled.button`
  background: transparent;
  border: none;
  position: fixed;
  right: 20px;
  top: 20px;

  >svg{
    color: #4A69FF;
  }
`
