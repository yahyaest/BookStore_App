import React from "react";
import { Dropdown } from "react-bootstrap";


function GenreSelector(props) {
  const { genre, books } = props;
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="danger" id="dropdown-basic" size="sm">
          {genre}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {props.getGenresList(books)?.map((genre) => (
            <Dropdown.Item key={genre} onClick={() => props.filterByGenre(genre)}>
              {genre}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default GenreSelector;
