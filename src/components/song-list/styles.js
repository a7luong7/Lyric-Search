import styled from 'styled-components';

export const SongTile = styled.div`
    border-radius: 0.25rem;
    padding: 0.5rem;
    /*margin-bottom: 0.25rem;*/
    cursor: pointer;
    background-color: #E5EAF5;
    height: 100%;
    &:hover {
        -webkit-filter: brightness(105%);
      }
`;

export const SongItem = styled.div`
    display:flex;
    border-radius:0.25rem;
    padding:0.5rem;
    margin-bottom:0.25rem;
    background-color: #E5EAF5;
    cursor:pointer;

    &:hover {
      -webkit-filter: brightness(105%);
    }
`;

export const SongItemImg = styled.img`
    width: 100%;
    height: 100%;
    border: solid gray 0px;
`;

export const SongImgWrapper = styled.div`
    max-height: 200px;
    max-width: 200px;
    border-radius:0.25rem;
    border: solid #eee 1px;
    overflow:hidden;
    margin: auto
`;

export const SongItemImgWrapper = styled.div`
    max-height: 100px;
    max-width: 100px;
    border-radius:0.25rem;
    border: solid #eee 1px;
    overflow:hidden;
    
    margin:auto 0;
    margin-right:0.5rem;
`;

export const SongTitle = styled.div`
    font-size:1.1em;
    font-weight:500
`;
export const SongArtist = styled.div`
    color: #6c757d
`;

export default {};
