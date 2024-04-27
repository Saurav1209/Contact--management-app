import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Sidebar from './components/sidebar';
import ContactForm from './components/contactForm';
import ContactList from './components/contactList';
import Home from './components/home';
import './styles/tailwind.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router basename={process.env.PUBLIC_URL}>
        <div className="flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Main content */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contacts" element={<ContactList />} />
              <Route path="/create-contact" element={<ContactForm onClose={() => {}} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
