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
                    <p>I am originally from Abilene, Texas where I obtained a Bachelors Degree in Electronic Media from Abilene Christian University. I enlisted in the Active Duty Air Force in 2011 as a Cryptologic Language Analyst and was assigned to the 324th, 392d, and 94th Intelligence Squadrons from 2011-2017. During this time I was selected to attend Officer Training School (OTS) and received a commission as a second lieutenant in 2018. After OTS, I completed Undergraduate Cyber Training at Keesler AFB, Mississippi. I am married and have 2 children (Son - 10, Daughter - 7).</p>
                    <p>In my current job, I am a Cybersecurity Test Lead at Detachment 4, Air Force Operational Test and Evaluation Center (AFOTEC), Peterson AFB, Colorado.  I conduct cybersecurity analysis in support of operational testing of Air Force and Space Force acquisition programs. In this role, I plan and analyze tests to measure the effects of cyber attack on weapon systems. I coordinate closely with blue and red cyber teams to create a comprehensive characterization of the cybersecurity status of a system, identify vulnerabilities, inform reconnaissance activities in support of adversarial testing, exploit system vulnerabilities, cause potential impact to mission operations, identify mitigation techniques, and evaluate the system’s ability to support its mission while withstanding validated and representative cyber threat activity.</p>
                    <p>From July 2020 to Jan 2021, I deployed to the 609 ACOMS at Shaw AFB. During this time I led a team of software developers building web apps for AFCENT users. Over 6 months I stood up a DevOps pipeline from scratch and modernized a legacy mission reporting web app using the MERN (MongoDB, Express.js, React.js, Node.js) technology stack. I have a passion for development since my first job after college in which I spent 2 years as a software engineer building ASP.net. I pride myself in being a self-starter, a proficient self-learner and my ability to quickly figure out challenging technology problem sets using whatever resources I can find.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
