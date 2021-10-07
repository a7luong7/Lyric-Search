import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../icon';

interface SelectOptionBaseProps {
  selected?: boolean
}

const SelectOptionBase = styled.button<SelectOptionBaseProps>`
  overflow: hidden;
  border: none;
  border-radius: 4px;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  padding: 0 12px;
  vertical-align: middle;
  -webkit-tap-highlight-color: transparent;
  font-family: inherit;

  background-color: ${(props) => (props.selected ? '#ddd' : '#fff')};
  color: ${(props) => (props.selected ? 'inherit' : 'inherit')};

  &:not([disabled]) {
    cursor:pointer
  }
  &:hover {
    ${(props) => (props.selected ? '' : '-webkit-filter: brightness(90%);')};
  }`;

const SelectGroupOption = ({
  children, value, selectedValue, handleClick,
} : {
  children: any,
  value: any,
  selectedValue:any,
  handleClick: (e:any)=>void
}) => (
  <SelectOptionBase
    title={value}
    value={value}
    selected={value === selectedValue}
    onClick={handleClick}
  >
    {children}
  </SelectOptionBase>
);

export const SelectGroup = () => {
  const [selectedValue, setSelectedValue] = useState('tiles');
  const handleClick = (e:any) => {
    setSelectedValue(e.target.closest('button').value);
  };

  return (
    <div>
      <SelectGroupOption value="tiles" selectedValue={selectedValue} handleClick={handleClick}>
        <Icon icon="th-large" />
      </SelectGroupOption>
      <SelectGroupOption value="list" selectedValue={selectedValue} handleClick={handleClick}>
        <Icon icon="list" />
      </SelectGroupOption>
    </div>
  );
};

export default SelectGroupOption;
