const Contact = () => {
  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-10">Get In Touch</h1>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Your Name</label>
              <input type="text" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input type="email" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea rows="6" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-indigo-500"></textarea>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-medium hover:bg-indigo-700 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;