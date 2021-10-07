import styled from 'styled-components';

const Button = styled.button`
  overflow: hidden;
  border: none;
  border-radius: 4px;
  display: inline-block;
  height: 36px;
  line-height: 36px;
  padding: 0 16px;
  vertical-align: middle;
  -webkit-tap-highlight-color: transparent;
  font-family: inherit;
  background-color: #E03A40;
  color: white;
  font-weight: 500;

  &:not([disabled]) {
    cursor:pointer
  }
  &:hover {
    -webkit-filter: brightness(90%);
  }`;

export default Button;
