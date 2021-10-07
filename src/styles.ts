import styled from 'styled-components';

const sizes = {
  xs: 0,
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
};

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 1em;
  grid-row-gap: 1em;
`;

interface ColProps {
  xs?:number,
  sm?:number,
  md?:number,
  lg?:number,
  xl?:number,
}

export const Col = styled.div<ColProps>`
  grid-column: span ${(props) => props.xs || '12'};

  @media (min-width: ${sizes.sm}) {
    ${(props) => (props.sm ? `grid-column: span ${props.sm}` : '')}
  }

  @media (min-width: ${sizes.md}) {
    ${(props) => (props.md ? `grid-column: span ${props.md}` : '')}
  }

  @media (min-width: ${sizes.lg}) {
    ${(props) => (props.lg ? `grid-column: span ${props.lg}` : '')}
  }

  @media (min-width: ${sizes.xl}) {
    ${(props) => (props.xl ? `grid-column: span ${props.xl}` : '')}
  }
`;
