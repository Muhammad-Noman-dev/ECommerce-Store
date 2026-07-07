const Services = () => {
  return (
    <div className="pt-20 pb-16 min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-12">Our Services</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Fast Delivery", desc: "Get your orders delivered within 2-5 business days." },
            { title: "Secure Payment", desc: "Multiple secure payment options including cards & wallets." },
            { title: "24/7 Support", desc: "Our customer support team is always here to help you." },
          ].map((service, i) => (
            <div key={i} className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;