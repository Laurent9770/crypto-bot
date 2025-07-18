import React from "react";

const About: React.FC = () => (
  <div className="max-w-4xl mx-auto py-16 px-4">
    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">About CryptoBot Pro</h1>
    <p className="mb-8 text-muted-foreground text-lg">CryptoBot Pro was built to make cryptocurrency trading accessible, automated, and smarter. Our mission is to provide AI-powered tools for traders of all levels to succeed in the fast-paced crypto market.</p>
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
      <p className="text-muted-foreground">CryptoBot Pro was created with one goal in mind: to help traders maximize their profits with minimal effort. By leveraging AI, TradingView, and USDT payment options, we provide a seamless, professional trading experience.</p>
    </section>
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">Our Team</h2>
      <p className="text-muted-foreground">We are a team of passionate developers, financial analysts, and traders dedicated to building the best trading platform. Our expertise in AI and blockchain technology allows us to deliver an unparalleled product to crypto traders.</p>
    </section>
    <section>
      <h2 className="text-2xl font-semibold mb-2">Why Choose CryptoBot Pro</h2>
      <ul className="list-disc pl-6 text-muted-foreground">
        <li><b>AI-Powered Signals:</b> Our proprietary algorithms offer market predictions with high accuracy.</li>
        <li><b>Live Charts:</b> Stay ahead of the game with real-time data from TradingView.</li>
        <li><b>Secure Payments:</b> All transactions are secure with USDT payments across blockchain networks.</li>
      </ul>
    </section>
  </div>
);

export default About; 