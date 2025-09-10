import whoWeAreImg from "../../assets/images/footer-logo.png";

const WhoWeAre = () => {
  return (
    <section className="who-we-are">
      <div className="who-we-are-container">
        <div className="who-we-are-text">
          <h3>Who are we</h3>
          <p>
            We design timeless spaces blending creativity and functionality.
          </p>
        </div>
        <div className="who-we-are-image">
          <img src={whoWeAreImg} alt="Who we are" />
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
