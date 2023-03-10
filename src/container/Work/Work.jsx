import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { uerFor, client, urlFor } from "../../client";

import "./Work.scss";
const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 10, opaciy: 1 });
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opaciy: 0 }]);
    setTimeout(() => {
      setAnimateCard([{ y: 0, opaciy: 1 }]);
      if (item ==='All') setFilterWork(works)
      else setFilterWork(works.filter((work)=>work.tags.includes(item)))
    }, 500);
  };
  return (
    <>
      <h2 className="head-text">
        My Creative<span className="app__head-portfolio"> Portfolio</span> Section
      </h2>
      <div class="colorLine"></div>

      <div className="app__work-filter">
        {["UI/UX", "Web App", "Mobile App", "Api's", "All"].map(
          (item, index) => (
            <div
              key={index}
              onClick={() => handleWorkFilter(item)}
              className={`app__work-filter-item app__flex p-text ${
                activeFilter === item ? "item-active" : ""
              }`}
            >
              {item}
            </div>
          )
        )}
      </div>
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((works, index) => (
          <div className="app__work-item app_flex" key={index}>
            <div className="app__work-img app__flex">
              <img src={urlFor(works.imgUrl)} alt={works.name} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0,
                }}
                className="app__work-hower app__flex"
              >
                <a href={works.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileHover={{ scale: [1, 0.9] }}
                    whileInView={{ scale: [0, 1] }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                <a href={works.codeLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileHover={{ scale: [1, 0.9] }}
                    whileInView={{ scale: [0, 1] }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="app__flex"
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>
            <div className="app__work-content app__flex">
              <h4 className="bold-text">{works.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>
                {works.description}
              </p>

              <div className="app__work-tag app__flex">
                <p className="p-text">{works.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap( Work,'app__work'),
   'work',
   "app__primarybg"
   );
 
