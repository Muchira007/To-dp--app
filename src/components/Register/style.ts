// styles.css
import { CSSProperties } from 'react';

const styles: Record<string, CSSProperties> = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  leftSide: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: '2rem',
  },
  img: {
    maxWidth: '200px',
  },
  rightSide: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
  },
  fieldName: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  inputField: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  keepSigned: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  checkbox: {
    marginRight: '0.5rem',
  },
  signIn: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '1rem',
  },
  signInHover: {
    backgroundColor: '#45a049',
  },
};

export default styles;