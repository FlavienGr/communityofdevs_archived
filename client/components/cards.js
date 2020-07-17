import Container from 'react-bootstrap/Container';
import Card from './card';

const data = [
  {
    desc: 'Définissez vos besoins',
    number: 1,
    img: '/assets/images/idea-icon.svg',
    alt: 'image idée du project'
  },
  {
    desc: 'Proposez votre projet en ligne',
    number: 2,
    img: '/assets/images/send-icon.svg',
    alt: 'image soumettre son project'
  },
  {
    desc: 'Communiquez directement avec des développeurs',
    number: 3,
    img: '/assets/images/chat-icon.svg',
    alt: 'image chat avec des développeurs'
  }
];

export default function Cards() {
  const returnDescription = data.map(item => (
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
