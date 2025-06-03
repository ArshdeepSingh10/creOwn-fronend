import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Welcome() {
    useEffect(() => {
    document.title = "Welcome - Admin Dashboard"; // Set the browser tab title
  }, []);
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(/Images/mainImage.png)` }}
    >
      {/* Overlay to improve text visibility */}
      <div className="bg-white bg-opacity-30 flex flex-col flex-grow">

        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 bg-white bg-opacity-90 shadow-md">
          <h1 className="text-2xl font-bold text-indigo-600">CreOwn</h1>
          <div>
            <Link to="/admin/Login" className="text-indigo-600 font-medium mr-4 hover:underline">Login</Link>
            <Link to="/admin/Registration" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Sign Up</Link>
          </div>
        </nav>

        {/* About Section */}
        <section className="px-6 py-20 text-center flex-grow">
          <h2 className="text-4xl font-extrabold mb-6 text-indigo-700">Welcome to CreOwn</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-800 leading-relaxed">
            <strong>CreOwn</strong> is your personal space to showcase your products, designs, and creations. 
            Build a beautiful digital portfolio and grow your online presence with ease.
          </p>
          <div className="mt-8">
            <Link to="/admin/Registration" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition">
              Get Started
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white bg-opacity-90 text-center text-gray-600 py-4 border-t">
          <p>&copy; {new Date().getFullYear()} CreOwn. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
