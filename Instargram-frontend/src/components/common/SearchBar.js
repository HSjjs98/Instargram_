import styled from 'styled-components';
import imgSearch from '../../image/search.png';
import imgArrow from '../../image/arrow.png';

const SearchContainer = styled.div`
  width: 250px;
  height: 45px;
  position: relative;
  border: 0;  
  margin-top: -20px;
  margin-bottom: 40px;
  img {
    position: absolute;
    right: 5px;
    border-radius: 4px;
    scale: 0.7;
  }
`;

const Search = styled.input`
  border: 0;
  padding-left: 10px;
  background-color: #eaeaea;
  width: 100%;
  height: 100%;
  outline: none;
`;

const AutoSearchContainer = styled.div`
  z-index: 3;
  height: 45vh;
  width: 350px;
  background-color: #fff;
  position: absolute;
  top: 45px;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 15px;
`;

const AutoSearchWrap = styled.ul`
  // display: flex;
  top: 0;
  bottom: 0;
`;

const AutoSearchData = styled.li`
  padding: 10px 8px;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  z-index: 4;
  letter-spacing: 2px;
  &:hover {
    background-color: #edf5f5;
    cursor: pointer;
  }
  position: relative;
  img {
    position: absolute;
    right: 3px;
    scale: 0.5;
    top: -4px;
    // transform: translateY(-50%);
  }
`;

const SearchBar = ({value, onChange, keyItems}) => {
  return (
    <SearchContainer>
      <Search value={value} onChange={onChange} />
      <img src={imgSearch} alt="searchIcon" />
      {keyItems.length > 0 && value && (
        <AutoSearchContainer>
          <AutoSearchWrap>
          {keyItems.map(keyItem => (
            <AutoSearchData key={keyItem}>
              <a href={keyItem}>{keyItem}</a>
              <img src={imgArrow} alt="arrowIcon" />
            </AutoSearchData>
          ))}
          </AutoSearchWrap>
        </AutoSearchContainer>
      )}
      
    </SearchContainer>
  );
};

export default SearchBar;
