import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const Support: React.FC = () => (
  <div className="max-w-4xl mx-auto py-16 px-4">
    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Need Help?</h1>
    <p className="mb-8 text-muted-foreground text-lg">Our team is here to help you get the most out of CryptoBot Pro. Find answers to common questions or get in touch with our support team.</p>
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-2">Help Center</h2>
        <p className="text-muted-foreground mb-2">Explore frequently asked questions and guides on topics like setting up your account, configuring trading signals, and managing your subscription.</p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Trading Guide</h2>
        <p className="text-muted-foreground mb-2">Step-by-step tutorials on how to set up automated trading, interpret market signals, and get the most from our platform.</p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Documentation</h2>
        <p className="text-muted-foreground mb-2">Detailed technical documentation for developers using API access and custom integrations.</p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Community</h2>
        <p className="text-muted-foreground mb-2">Join our community forum to connect with other traders, share insights, and get tips from experienced users.</p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p className="text-muted-foreground mb-2">For additional help, feel free to reach out to us.</p>
        <ul className="text-muted-foreground">
          <li>Email: <a href="mailto:support@cryptobotpro.com" className="text-primary">support@cryptobotpro.com</a></li>
          <li>Phone: <a href="tel:+15551234567" className="text-primary">+1 (555) 123-4567</a></li>
        </ul>
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-primary">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
          <AccordionItem value="q1">
            <AccordionTrigger>How do I connect my exchange account?</AccordionTrigger>
            <AccordionContent>
              You can connect your exchange account via API keys in your account settings. We support all major exchanges.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>Is my data secure?</AccordionTrigger>
            <AccordionContent>
              Yes, we use industry-standard encryption and never share your data with third parties.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>How do I manage my subscription?</AccordionTrigger>
            <AccordionContent>
              You can upgrade, downgrade, or cancel your subscription anytime from your dashboard. Payments are handled securely via USDT.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q4">
            <AccordionTrigger>Can I get support if I have issues?</AccordionTrigger>
            <AccordionContent>
              Absolutely! Our support team is available 24/7 via email and phone. You can also use the Help Center for self-service.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  </div>
);

export default Support; 