import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignInSection from '../pages/SignInSection/SignInSection';
import SignUpSection from '../pages/SignUpSection/SignUpSection';

import GeneralLayout from '../app/Layout/GeneralLayout';
import SignInAdmin from '../pages/SignInAdmin/SignInAdmin';
import GeneralLayoutAdmin from './Layout/GeneralLayoutAdmin';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInSection />} />
        <Route path="/signup" element={<SignUpSection />} />
        <Route path='/main/*' element={<GeneralLayout />} />

        <Route path='/admin_signin' element={<SignInAdmin />} />
        <Route path='/main_admin/*' element={<GeneralLayoutAdmin />} />



      </Routes>
    </Router >
  );
}