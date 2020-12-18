import React from "react";
import _ from "lodash";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function BooksCarouselComponent(props) {
  const { booksList } = props;
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
  };

  const getBestBooks = () => {
    let bestBooks = _.orderBy(booksList, "rate", "desc");
    bestBooks = _.slice(bestBooks, [0], [10]);
    return bestBooks;
  };
  getBestBooks();

  // console.log(booksList?.length);
  return (
    <React.Fragment>
      <h1>Top 10 Books</h1>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        focusOnSelect={true}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-20-px"
      >
        {getBestBooks()?.map((book) => (
          <div key={book.id}>
            <img
              className="carousel__img"
              src={book.image}
              alt={book.name}
              onClick={() => props.goToBookPage(book.id)}
            />
          </div>
        ))}
      </Carousel>
    </React.Fragment>
  );
}

export default BooksCarouselComponent;
