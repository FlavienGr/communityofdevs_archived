import Card from './Card';

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
    <div className="cards">
      <div className="cards__container">{returnDescription}</div>
    </div>
  );
}
