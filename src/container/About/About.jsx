import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./About.scss";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";


// import { images } from "../../constants";
// const abouts = [
//   {
//     title: "Web Development",
//     description: "I am a good web developer",
//     imgUrl: images.about01,
//   },
//   {
//     title: "Web Design",
//     description: "I am a good web designer",
//     imgUrl: images.about02,
//   },
//   {
//     title: "Back End",
//     description: "I am a good web develope",
//     imgUrl: images.about03,
//   },
//   {
//     title: "Front End",
//     description: "I am a good web develope",
//     imgUrl: images.about04,
//   },
// ];

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';
    client.fetch(query).then((data) => setAbouts(data));
  }, []);

  return (
    <>
      <h2 className="head-text">
        I Konow That<span> Good Web</span>
        <br />
        means<span> Good Business</span>
      </h2>
      <div class="colorLine"></div>
      <div className="app__profiles">
        {abouts.map((abouts, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profile-item"
            key={abouts.title + index}
          >
            <img src={urlFor(abouts.imgUrl)} alt={abouts.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {abouts.titles}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {abouts.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
 MotionWrap( About,'app__about'),
  'about',
  "app__whitebg"
  );
