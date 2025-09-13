import founderImg from "../../assets/images/founder.jpg"; // Updated to use founder's image

const WhoWeAre = () => {
  return (
    <section className="who-we-are">
      <div className="who-we-are-container">
        <div className="who-we-are-text">
          <h3>Meet Our Founder</h3>
          <p>
            John Rippotai, a visionary architect with over 20 years of
            experience, founded Rippotai Architecture to create spaces that
            inspire and endure. Driven by a passion for sustainable design and
            innovative solutions, John established the organization to transform
            communities through architecture that blends creativity,
            functionality, and environmental responsibility.
          </p>
        </div>
        <div className="who-we-are-image">
          <img
            src={founderImg}
            alt="John Rippotai, Founder of Rippotai Architecture"
          />
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
