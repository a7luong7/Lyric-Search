import styled from 'styled-components';

export const SongItem = styled.div`
    display:flex;
    border-radius:0.25rem;
    padding:0.5rem;
    margin-bottom:0.25rem;
    background-color: #E5EAF5;

    &:hover {
    /*background-color: rgba(0,0,0,0.05)*/
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
    margin-right:0.25rem;
`;

export const SongTitle = styled.div`
    font-size:1.1em;
    font-weight:500
`;
export const SongArtist = styled.div`
    color: #6c757d
`;

export default {};
