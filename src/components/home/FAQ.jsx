import React, { useEffect } from "react"
import { nanoid } from "nanoid"

import QuestionMark from "../../assets/home/questionMark.png"
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Box(props) {
    return (
        <Accordion
            className="col-span-4 sm:col-span-3"
            sx={{backgroundColor: "#EBEBEB", marginBottom: "1px", borderRadius: "7px", boxShadow: "none"}}
            square={false}
        >
            <AccordionSummary
                sx={{backgroundColor: "#EFEFED", borderRadius: "7px"}}
                expandIcon={<ExpandMoreIcon sx={{fontSize: "2rem"}}
                />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <p>{props.question}</p>
            </AccordionSummary>

            <AccordionDetails sx={{backgroundColor: "#EFEFED", borderRadius: "7px"}}>
                <p>{props.answer}</p>
            </AccordionDetails>
        </Accordion>
    )
}

export default function FAQ() {
    const [faq, setFaq] = React.useState(null)

    useEffect(() => {
        setFaq([
            { "id": 1, "question": "What is Shastra Coding Club?", "answer": "Shastra Coding Club is a Data Structures and Algorithms (DSA) oriented coding club operating under the Training and Placement Cell of our institution. We focus on enhancing problem-solving skills and preparing students for technical roles." },
            { "id": 2, "question": "What kind of activities does the club organize?", "answer": "We organize a variety of activities including regular coding contests, workshops on fundamental and advanced data structures and algorithms, mock interview sessions, and collaborative coding projects." },
            { "id": 3, "question": "How can I join the Shastra Coding Club?", "answer": "Membership details and enrollment procedures are announced at the beginning of each academic year. Keep an eye on our official communication channels for updates or visit our club during open house events." },
            { "id": 4, "question": "Are there any prerequisites to join the club?", "answer": "While a basic understanding of programming concepts is helpful, there are no strict prerequisites. We welcome enthusiastic learners from all backgrounds and provide resources for beginners to catch up." },
            { "id": 5, "question": "Does the club help with placements or internships?", "answer": "Absolutely! Being under the Training and Placement Cell, we conduct mock interviews, resume building workshops, and connect members with internship and job opportunities. Our goal is to ensure members are well-prepared for their careers." },
        ])
    }, [])

    return (
        <div className="relative z-10 w-full flex flex-col items-center my-20 lg:mb-28">
            <span className="ml-5 md:ml-10 select-none inline-block mx-auto w-max font-bold text-xl md:text-3xl pb-5 gradient-txt">FAQ's</span>
            <div className="grid grid-cols-4 gap-1 md:gap-6 pl-5 pr-5 sm:pr-0 md:pl-10 my-auto">
                
                {
                    faq ?
                    faq.map(item => (
                        <Box
                            key={nanoid()}
                            question={item.question}
                            answer={item.answer}
                        />
                    )) :
                    <p>Loading...</p>
                }
                
                <div className="absolute hidden sm:flex right-2 min-[500px]:right-10 sm:right-10 md:right-10 lg:right-16 top-20 sm:top-10 lg:top-10 z-10 h-full items-center justify-center">
                    <img 
                        src={QuestionMark} 
                        className=" h-28 sm:h-32 md:h-48 lg:h-60 my-auto mr-2"
                    />
                </div>
            </div>
        </div>
    )
}