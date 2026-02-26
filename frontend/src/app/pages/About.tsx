import { motion } from "motion/react";
import { Award, Heart, Globe, Users, Target, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Counter } from "../components/ui/Counter";

export function About() {
  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "We are passionate about showcasing India's incredible diversity and beauty",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering exceptional experiences that exceed expectations",
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "Responsible tourism that benefits local communities and preserves heritage",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building lasting relationships with travelers and local partners",
    },
  ];

  const team = [
    {
      name: "Ravindra Bhinchar",
      role: "Founder & CEO",
      image: "/assets/images/my8.jpg",
      bio: "3+ years experience in Indian tourism",
    },
    {
      name: "Dharmender Bhinchar",
      role: "Tour Operations Head",
      image: "DB",
      bio: "Expert in crafting memorable journeys",
    },
    {
      name: "Mahipal Choudhary",
      role: "Customer Experience",
      image: "MC",
      bio: "Dedicated to traveler satisfaction",
    },
    {
      name: "Arvind Bhinchar",
      role: "Heritage Specialist",
      image: "AB",
      bio: "Historian and cultural guide expert",
    },
  ];

  const milestones = [
    { year: "2005", event: "Bhinchar India Tours Founded" },
    { year: "2010", event: "10,000 Happy Travelers Milestone" },
    { year: "2015", event: "Best Tour Operator Award" },
    { year: "2020", event: "Expanded to 50+ Destinations" },
    { year: "2024", event: "Sustainability Certification" },
    { year: "2026", event: "15,000+ Travelers Served" },
  ];

  return (
    <div className="w-full pt-20">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-orange-500 via-pink-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6"
            >
              <Sparkles size={20} />
              <span>20+ Years of Excellence</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Your Trusted Partner in
              <span className="block text-yellow-300">Indian Adventures</span>
            </h1>
            <p className="text-xl text-white/90">
              Creating unforgettable journeys and connecting hearts with the
              soul of India since 2005
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Founded in 2005 by travel enthusiast Rajesh Kumar, Bhinchar India
                Tours began with a simple mission: to share the magic of India
                with the world. What started as a small operation has grown into
                one of India's most trusted tour operators.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Over two decades, we've helped more than 15,000 travelers from
                around the globe discover India's incredible diversity - from the
                snow-capped Himalayas to tropical beaches, from ancient temples
                to modern cities.
              </p>
              <p className="text-lg text-gray-600">
                Our team of passionate travel experts, local guides, and cultural
                ambassadors work tirelessly to create authentic, immersive
                experiences that go beyond typical tourism.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="/assets/images/Inside-Amer-Fort-Jaipur.jpg"
                  alt="Inside Amer Fort Jaipur"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl opacity-20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              Two decades of milestones and memories
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-8 mb-8"
              >
                <div className="flex-shrink-0 w-32 text-right">
                  <span className="text-2xl font-bold text-orange-500">
                    {milestone.year}
                  </span>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-4 h-4 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full" />
                </div>
                <div className="flex-1 p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl">
                  <p className="text-lg text-gray-800">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              The passionate people behind your perfect journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="w-40 h-40 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full overflow-hidden flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
                  {member.image.startsWith("/") ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    member.image
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 15000, suffix: "+", label: "Happy Travelers" },
              { value: 50, suffix: "+", label: "Destinations" },
              { value: 20, suffix: "+", label: "Years Experience" },
              { value: 4.9, decimals: 1, suffix: "/5", label: "Average Rating" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold mb-2">
                  <Counter value={stat.value} decimals={stat.decimals} />
                  {stat.suffix}
                </div>
                <div className="text-orange-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Explore India?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered the magic of India
            with us
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            Start Your Journey
          </a>
        </motion.div>
      </section>
    </div>
  );
}
