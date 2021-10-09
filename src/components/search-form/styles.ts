import styled from 'styled-components';

export const Input = styled.input`
    border: none;
    max-width: 100%;
    width: 100%;
    font-size: 1em;
  
    &:focus {
      outline:none
    }
    &:focus-visible {
      outline:none
    }
`;

export const Button = styled.button`
    background: none;
    border:none;

    cursor: pointer;
    color: blue;

    &:disabled {
      cursor: not-allowed;
    }
`;

export const Container = styled.form`
  background-color: #fff;
  color: #171212;
  padding: .5rem;
  border-radius:.5rem;
  webkit-box-shadow: 0 15px 35px rgb(50 50 93 / 10%), 0 5px 15px rgb(0 0 0 / 7%);
  box-shadow: 0 15px 35px rgb(50 50 93 / 10%), 0 5px 15px rgb(0 0 0 / 7%);

  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const Form = styled(Container)`
  display:flex;
  border:solid #fff 1px;
  padding-top:.5rem;
  padding-bottom: .5rem;
  border-radius: .5rem;
  font-size:1.25em
`;
