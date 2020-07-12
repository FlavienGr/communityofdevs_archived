import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div>
        <Link href="/conditions">
          <a>{"Conditions générales d'utilisation"}</a>
        </Link>
      </div>
      <div>
        <Link href="/contact">
          <a>Contact</a>
        </Link>
      </div>
      <div className="copyright">{`${new Date().getFullYear()}, ${`\xA9`} All rights reserved`}</div>
    </footer>
  );
}
