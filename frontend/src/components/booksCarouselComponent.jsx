import React from "react";
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

  console.log(booksList?.length);
  return (
    <React.Fragment>
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
        {booksList?.map((book) => (
          <div key={book.id}>
            <img className="carousel__img" src={book.image} alt="" />
          </div>
        ))}

      </Carousel>
    </React.Fragment>
  );
}

export default BooksCarouselComponent;
