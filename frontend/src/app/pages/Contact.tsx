import { useState } from "react";
import axios from "axios";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';
      await axios.post(`${backendUrl}/api/inquiries`, formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          destination: "",
          message: "",
        });
      }, 5000);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setErrorMessage("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 8854948324"],
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["BhincharIndiaTours@gmail.com"],
      color: "from-orange-500 to-pink-600",
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["Jaipur", "Rajasthan, India"],
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: 10:00 AM - 5:00 PM"],
      color: "from-green-500 to-teal-600",
    },
  ];

  return (
    <div className="w-full pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-500 via-pink-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-white/90">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <info.icon className="text-white" size={28} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {info.title}
                </h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-600 text-sm">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center p-12 bg-green-50 rounded-2xl"
                >
                  <CheckCircle size={64} className="text-green-500 mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 text-center">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                      {errorMessage}
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 8900"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="destination"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Interested Destination
                    </label>
                    <select
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select a destination</option>
                      <option value="golden-triangle">Golden Triangle</option>
                      <option value="kerala">Kerala Backwaters</option>
                      <option value="rajasthan">Rajasthan Heritage</option>
                      <option value="goa">Goa Beach</option>
                      <option value="himalayas">Himalayan Adventure</option>
                      <option value="varanasi">Spiritual Varanasi</option>
                      <option value="custom">Custom Tour</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your travel plans..."
                      rows={6}
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white py-6 text-lg rounded-xl disabled:opacity-70 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">Sending...</span>
                    ) : (
                      <>
                        <Send size={20} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Map & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="h-96 bg-gray-200 rounded-2xl overflow-hidden shadow-sm relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113945.71761623886!2d75.71960105307527!3d26.885447917896472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan%2C%20India!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Jaipur Map Location"
                  className="absolute inset-0"
                ></iframe>
              </div>

              {/* Additional Info */}
              <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Why Choose Us?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="text-orange-500 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-gray-700">
                      24/7 customer support throughout your journey
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="text-orange-500 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-gray-700">
                      Expert local guides with deep cultural knowledge
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="text-orange-500 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-gray-700">
                      Customizable itineraries to match your preferences
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="text-orange-500 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-gray-700">
                      Best price guarantee and transparent pricing
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="text-orange-500 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-gray-700">
                      Safe and secure travel arrangements
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How far in advance should I book?",
                answer:
                  "We recommend booking at least 2-3 months in advance, especially for peak season (October-March). However, we can often accommodate last-minute bookings based on availability.",
              },
              {
                question: "What's included in the tour packages?",
                answer:
                  "Our packages typically include accommodation, transportation, guided tours, some meals, and entrance fees to attractions. Specific inclusions vary by package and are detailed on each tour page.",
              },
              {
                question: "Do you offer customized tours?",
                answer:
                  "Absolutely! We specialize in creating customized itineraries based on your interests, budget, and time constraints. Contact us to discuss your dream India journey.",
              },
              {
                question: "Is travel insurance included?",
                answer:
                  "Travel insurance is not included in our base packages but can be added. We strongly recommend purchasing comprehensive travel insurance for your trip.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
