import { useState } from "react";
import "./Carousel.css";
import Card from "./Card";

/** Carousel: displays images and arrows to navigate through them
 *
 * Props:
 * - photos: array of {src, caption} objects
 * - title: string describing the collection of images
 *
 * State:
 * - currCardIdx: integer for current card index
 *
 * App --> Carousel --> Card
 */
function Carousel({ photos, title }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);

  const currCard = photos[currCardIdx];
  const total = photos.length;

  //Increments currCardIdx state by 1
  function goForward() {
    setCurrCardIdx(currCardIdx + 1);
  }

  //Decrement currCardIdx state by 1
  function goBackward() {
    setCurrCardIdx(currCardIdx - 1);
  }

  return (
    <div className="Carousel">
      <h1>{title}</h1>
      {/* only render photos if there are photos */}
      {total > 0 ? (
        <div className="Carousel-main">
          {/* Hide left arrow on the first image */}
          {currCardIdx > 0 && (
            <i className="bi bi-arrow-left-circle" onClick={goBackward} />
          )}
          <Card
            caption={currCard.caption}
            src={currCard.src}
            currNum={currCardIdx + 1}
            totalNum={total}
          />
          {/* Hide right arrow on the last image */}
          {currCardIdx < total - 1 && (
            <i className="bi bi-arrow-right-circle" onClick={goForward} />
          )}
        </div>
      ) : (
        <p>No photos</p>
      )}
    </div>
  );
}

export default Carousel;
