import styled from 'styled-components';

export const SongItem = styled.div`
    display:flex;
    border-radius:0.25rem;
    padding:0.5rem;
    margin-bottom:0.25rem;

    &:hover {
    background-color: rgba(0,0,0,0.05)
    }
`;

export const SongItemImg = styled.img`
    width: 100%;
    height: 100%;
    border: solid gray 0px;
`;

export const SongItemImgWrapper = styled.div`
    max-height: 100px;
    max-width: 100px;
    border-radius:0.25rem;
    border: solid #eee 1px;
    overflow:hidden;
`;

export default {};
