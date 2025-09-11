import React from "react";
import teamMember from "../../assets/images/teammember.jpg"; // Placeholder for team member images

const AboutUsPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay">
          <h1>Designing the Future with Balance & Harmony</h1>
          <p>
            Inspired by the elegance of the cube, we craft spaces that inspire
            and endure.
          </p>
          <a href="/contact" className="cta-button">
            Get in Touch
          </a>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="about-mission">
        <div className="custom-container">
          <div className="custom-row">
            <div className="custom-col-12">
              <div className="heading text-center">
                <h2>Our Philosophy</h2>
                <p>
                  At Rippotai Architecture, we’re driven by the Japanese concept
                  of "Rippotai" (cube), which symbolizes balance, structure, and
                  harmony. We believe architecture is more than just
                  buildings—it’s about creating spaces that resonate with
                  purpose and beauty.
                </p>
                <p className="mt-2">
                  Our multidisciplinary team brings together architects,
                  interior designers, and furniture craftsmen to deliver
                  holistic designs that blend form and function. From modern
                  residences to innovative commercial spaces, every project
                  reflects our commitment to excellence.
                </p>
                <p className="mt-2">
                  We integrate cutting-edge technology, sustainable practices,
                  and client-centric solutions to craft environments that
                  inspire and endure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="custom-container">
          <h2 className="text-center">Meet Our Team</h2>
          <div className="custom-row">
            <div className="custom-col-4">
              <div className="team-member">
                <img
                  src={teamMember}
                  alt="Team Member 1"
                  className="team-img"
                />
                <h3>Jane Doe</h3>
                <p className="role">Lead Architect</p>
                <p>
                  With over 15 years of experience, Jane specializes in
                  sustainable design and urban planning.
                </p>
              </div>
            </div>
            <div className="custom-col-4">
              <div className="team-member">
                <img
                  src={teamMember}
                  alt="Team Member 2"
                  className="team-img"
                />
                <h3>John Smith</h3>
                <p className="role">Interior Designer</p>
                <p>
                  John’s expertise lies in creating bespoke interiors that blend
                  aesthetics with functionality.
                </p>
              </div>
            </div>
            <div className="custom-col-4">
              <div className="team-member">
                <img
                  src={teamMember}
                  alt="Team Member 3"
                  className="team-img"
                />
                <h3>Emily Brown</h3>
                <p className="role">Furniture Designer</p>
                <p>
                  Emily crafts innovative furniture pieces that complement our
                  architectural vision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="about-milestones">
        <div className="custom-container">
          <h2 className="text-center">Our Journey</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-content">
                <h3>2010</h3>
                <p>
                  Rippotai Architecture founded with a vision to redefine modern
                  design.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h3>2015</h3>
                <p>
                  Completed our first award-winning residential project, The
                  Cube House.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h3>2020</h3>
                <p>
                  Expanded into commercial design, delivering innovative office
                  spaces.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h3>2025</h3>
                <p>
                  Recognized globally for sustainable architecture and
                  innovative furniture design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="custom-container">
          <h2 className="text-center">Our Core Values</h2>
          <div className="custom-row">
            <div className="custom-col-4">
              <div className="value-item">
                <i className="fas fa-leaf"></i>
                <h3>Sustainability</h3>
                <p>
                  We prioritize eco-friendly materials and energy-efficient
                  designs to minimize environmental impact.
                </p>
              </div>
            </div>
            <div className="custom-col-4">
              <div className="value-item">
                <i className="fas fa-lightbulb"></i>
                <h3>Innovation</h3>
                <p>
                  We push boundaries with cutting-edge technology and creative
                  solutions.
                </p>
              </div>
            </div>
            <div className="custom-col-4">
              <div className="value-item">
                <i className="fas fa-users"></i>
                <h3>Client-Centric</h3>
                <p>
                  Your vision is our blueprint—we tailor every project to your
                  unique needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="about-testimonials">
        <div className="custom-container">
          <h2 className="text-center">What Our Clients Say</h2>
          <div className="custom-row">
            <div className="custom-col-6">
              <div className="testimonial">
                <p>
                  "Rippotai transformed our home into a modern masterpiece.
                  Their attention to detail and commitment to sustainability
                  were exceptional."
                </p>
                <p className="client-name">— Sarah & Michael, Homeowners</p>
              </div>
            </div>
            <div className="custom-col-6">
              <div className="testimonial">
                <p>
                  "Working with Rippotai was a seamless experience. They brought
                  our vision to life with creativity and precision."
                </p>
                <p className="client-name">— David Lee, CEO, TechCorp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="custom-container text-center">
          <h2>Ready to Shape Your Space?</h2>
          <p>
            Contact us today to start your journey with Rippotai Architecture.
          </p>
          <a href="/contact" className="cta-button">
            Start Your Project
          </a>
        </div>
      </section>
    </div>
  );
};
export default AboutUsPage;
