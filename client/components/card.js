export default function Card({ desc, number, image, alt }) {
  console.log(image);
  return (
    <div className="cards__block">
      <div className="cards__image">
        <img className="cards__image--elm" src={image} alt={alt} />
      </div>
      <div className="cards__body">{desc}</div>
      <div className="cards__number">{number}</div>
    </div>
  );
}
