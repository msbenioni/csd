import { FaShoppingBag, FaTools } from "react-icons/fa";

const Pricing = () => {
  return (
    <section className="w-full bg-gradient-to-r from-orange-500 to-pink-500 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Simple, Transparent Pricing
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Bag Price Card */}
          <div className="pricing-card">
            <FaShoppingBag className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Bag Price</h3>
            <p className="text-4xl font-bold text-blue-600 mb-4">$8</p>
            <p className="text-gray-600">Per bag (max 10kg)</p>
            <p className="text-gray-600">No loose items</p>
          </div>

          {/* Service Fee Card */}
          <div className="pricing-card">
            <FaTools className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Service Fee</h3>
            <p className="text-4xl font-bold text-blue-600 mb-4">$6</p>
            <p className="text-gray-600">One-time fee per pickup</p>
          </div>
        </div>

        <p className="text-white text-center mt-8 text-sm">
          All prices are subject to 12.5% GST
        </p>
      </div>
    </section>
  );
};

export default Pricing;
