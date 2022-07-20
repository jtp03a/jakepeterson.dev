import React from "react";
import portrait from "../Images/portrait.jpg";

function About(props) {
    return (
        <div className="section section-light" >
            <div className="section-content" id={props.id}>
                <div className='card'>
                    <div id="cardHeader" className='card-header'>
                        <h1>{props.title}</h1>
                    </div>
                    <div className='card-body' id="cardBody">
                    <img className="img-fluid float-left mr-3" src={portrait} alt="portrait" height="400" width="400" rounded />
                    <p>I am originally from Abilene, Texas where I obtained a Bachelors Degree in Electronic Media from Abilene Christian University. I enlisted in the Active Duty Air Force in 2011 as a Cryptologic Language Analyst and was assigned to various intelligence squadrons from 2011-2017. During this time I was selected to attend Officer Training School (OTS) and received a commission as a second lieutenant in 2018. I am married and have 2 children.</p>
                    <p>In my current job, I serve as a Cybersecurity operations program manager. In this role I manage a 12 member distributed team to interface between the Air Force cyber operations community and information technology contractors ensuring that vendor network infrastructure and devices meet to Air Force cybersecurity requirements. I also manage cybersecurity incident response and vulnerability management for Enterprise IT infrastructure.</p>
                    <p>In my previous job I conducted cybersecurity analysis in support of operational testing of Air Force and Space Force acquisition programs. In this role, I planned and analyzed tests to measure the effects of cyber attack on weapon systems. Additionally, I coordinated blue and red team cyber assessments to create a comprehensive characterization of the cybersecurity status of a system.</p>
                    <p>From July 2020 to Jun 2021, I led a team of software developers building web apps for Air Force users. During that time I stood up a DevOps pipeline and modernized a legacy web app using the MERN (MongoDB, Express.js, React.js, Node.js) technology stack. I have had a passion for software development since I was a child when I was given a book on HTML and taught myself programming. I pride myself in being a self-starter, a proficient self-learner and my ability to quickly figure out challenging technology problem sets using whatever resources I can find.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
