import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignInSection from '../pages/SignInSection/SignInSection';
import SignUpSection from '../pages/SignUpSection/SignUpSection';

import GeneralLayout from '../app/Layout/GeneralLayout';
import Admin from '../pages/Admin/Admin';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInSection />} />
        <Route path="/signup" element={<SignUpSection />} />

        <Route path='/main/*' element={<GeneralLayout />} />
        <Route path='admin' element={<Admin />} />


      </Routes>
    </Router >
  );
}