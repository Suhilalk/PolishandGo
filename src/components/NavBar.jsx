import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Polish & Go</h2>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/" style={styles.link}>Home</Link>
        </li>
        <li>
          <Link to="/quote" style={styles.link}>Quote</Link>
        </li>
        <li>
          <Link to="/contact" style={styles.link}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#163038',
    color: 'white'
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '20px'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  logo: {
    margin: 0
  }
};