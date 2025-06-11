import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import EventCard from "../components/Card/EventCard";
import Event from "../assets/events/watermark-black-opacity-half.png";
import Watermark from "../assets/events/watermark-white.png";

import Hackathon from "../assets/events/hackathon.jpg";
import Gaming from "../assets/events/gaming.jpg";
import HackaWack from "../assets/events/hackawack.jpg";
import BeyondBasicsImg from "../assets/home/carousel4.png";
import CPHackathon from "../assets/events/CP hackathon.jpg";
import LearningChallenge from "../assets/events/75 Days.png";

const imageArr = [Hackathon, Gaming, HackaWack];

// Mock API data
const mockEvents = {
    upcoming: [
        {
            id: 1,
            name: "75 Days Learning Challenge",
            criteria: "All Students",
            contestLink: "#",
            image: LearningChallenge,
            description: "Join our intensive 75-day learning challenge to master programming concepts and build real-world projects."
        },
        {
            id: 2,
            name: "Beyond Basics",
            criteria: "All Students",
            contestLink: "#",
            image: BeyondBasicsImg,
            description: "A comprehensive workshop covering advanced programming concepts and problem-solving techniques."
        },
        {
            id: 3,
            name: "CP Hackathon",
            criteria: "Competitive Programmers",
            contestLink: "#",
            image: CPHackathon,
            description: "A competitive programming hackathon for experienced coders to showcase their skills."
        }
    ],
    past: [
        {
            id: 103,
            name: "Beyond Basics",
            criteria: "All",
            contestLink: "#",
            image: BeyondBasicsImg,
            description: "Previous edition of our comprehensive programming workshop."
        },
        {
            id: 104,
            name: "Diwali Learning Program",
            criteria: "All",
            contestLink: "#",
            image: Hackathon,
            description: "Special learning program conducted during Diwali break."
        },
        {
            id: 105,
            name: "Navratri Challenge",
            criteria: "All",
            contestLink: "#",
            image: Gaming,
            description: "Coding challenge organized during Navratri festival."
        }
    ]
};

export default function Events() {
    const [upcoming_event, setUpcoming_Event] = useState([]);
    const [past_event, setPast_Event] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEvents = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Use mock data instead of API calls
            setUpcoming_Event(mockEvents.upcoming);
            setPast_Event(mockEvents.past);
        } catch (err) {
            console.error('Error fetching events:', err);
            setError('Failed to load events. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pri-blue"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <p className="text-red-600 text-xl mb-4">{error}</p>
                <button
                    onClick={fetchEvents}
                    className="bg-pri-blue text-white py-2 px-4 rounded-lg hover:bg-pri-blueDark transition-all duration-300"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="relative z-10 min-h-[100%]">
            <div className="relative mt-32 w-full flex flex-col text-center items-center justify-center py-4">
                <div className="absolute -z-10 grid items-center w-full h-full">
                    <img src={Event} className="w-full" alt="Event background"/>
                </div>

                <h1 className="font-normal min-[0px]:text-2xl min-[350px]:text-3xl min-[470px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                    BRUSH YOUR CALIBRE BY <br/> PARTICIPATING IN <br/>UPCOMING EVENTS<br/> FEATURED BY
                </h1>
                <span className="font-bold min-[0px]:text-4xl min-[350px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-yellow-500 mt-1">SHASTRA</span>
                <div className="grid grid-cols-2 justify-center items-center space-x-4 mt-4">
                    <button className="bg-pri-blue text-white py-2 px-8 lg:px-12 rounded-full text-lg md:text-xl lg:text-2xl cursor-pointer hover:bg-pri-blueDark transition-all duration-300">
                        Register Now
                    </button>
                    <button className="border border-black text-black py-2 px-8 lg:px-12 rounded-full text-lg md:text-xl lg:text-2xl cursor-pointer hover:bg-gray-200 transition-all duration-300">
                        Get Details
                    </button>
                </div>
            </div>

            {upcoming_event.length === 0 ? (
                <div className="flex flex-col my-16">
                    <span className="capitalize font-bold ml-2 md:ml-16 text-xl md:text-3xl inline-block w-max">Upcoming Events</span>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-7 self-center md:gap-10 mx-3 md:mx-0 lg:mx-3 md:p-10 p-5">
                        <EventCard
                            name="No upcoming events"
                            criteria="TBA"
                            image={Event}
                            link="#"
                        />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col my-16">
                    <span className="capitalize font-bold ml-2 md:ml-16 text-xl md:text-3xl inline-block w-max">Upcoming Events</span>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-7 self-center md:gap-10 mx-3 md:mx-0 lg:mx-3 md:p-10 p-5">
                        {upcoming_event.map(currEvent => (
                            <EventCard 
                                key={nanoid()}
                                name={currEvent.name}
                                criteria={currEvent.criteria}
                                image={currEvent.image}
                                link={currEvent.contestLink}
                                description={currEvent.description}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div className="flex flex-col my-16">
                <span className="capitalize font-bold ml-2 md:ml-16 text-xl md:text-3xl inline-block w-max">Past Events</span>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-7 self-center md:gap-10 mx-3 md:mx-0 lg:mx-3 md:p-10 p-5">
                    {past_event.map(currEvent => (
                        <EventCard
                            key={nanoid()}
                            name={currEvent.name}
                            criteria={currEvent.criteria}
                            image={currEvent.image}
                            link={currEvent.contestLink}
                            description={currEvent.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
