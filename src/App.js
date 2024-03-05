// Importing contact form component
import ContactForm from "./Components/ContactForm";
// Importing contacts component
import Contacts from "./Components/Contacts";
// Importing bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Main app component
function App() {
  return (
    <div className="App  ">
      {/* Render both components inside the app */}
      <ContactForm />
      <Contacts />
    </div>
  );
}

export default App;
