import Container from 'react-bootstrap/Container';
import Card from './Card';
import CustomCards from '../constants/customCards';

export default function Cards() {
  const returnDescription = CustomCards.map(item => (
    <Card
      desc={item.desc}
      key={item.number}
      number={item.number}
      image={item.img}
      alt={item.alt}
    />
  ));
  return (
    <section className="cards">
      <Container className="my-5 d-flex flex-column flex-md-row flex-lg-row justify-content-between align-items-center ">
        {returnDescription}
      </Container>
    </section>
  );
}
