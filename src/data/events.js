import Hackathon from "../assets/events/hackathon.jpg";
import Gaming from "../assets/events/gaming.jpg";
import HackaWack from "../assets/events/hackawack.jpg";
import BeyondBasicsImg from "../assets/home/carousel4.png";
import CPHackathon from "../assets/events/CP hackathon.jpg";

export const events = {
    upcoming: [
        {
            id: 1,
            name: "Beyond Basics",
            criteria: "All Students",
            startTime: "2024-07-20T10:00:00+05:30",
            contestLink: "#",
            image: BeyondBasicsImg,
            description: "A comprehensive workshop covering advanced programming concepts and problem-solving techniques."
        },
        {
            id: 2,
            name: "CP Hackathon",
            criteria: "Competitive Programmers",
            startTime: "2024-09-01T09:00:00+05:30",
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
            startTime: "2023-01-15T00:00:00+00:00",
            contestLink: "#",
            image: BeyondBasicsImg,
            description: "Previous edition of our comprehensive programming workshop."
        },
        {
            id: 104,
            name: "Diwali Learning Program",
            criteria: "All",
            startTime: "2023-11-12T10:00:00+05:30",
            contestLink: "#",
            image: Hackathon,
            description: "Special learning program conducted during Diwali break."
        },
        {
            id: 105,
            name: "Navratri Challenge",
            criteria: "All",
            startTime: "2023-10-24T18:00:00+05:30",
            contestLink: "#",
            image: Gaming,
            description: "Coding challenge organized during Navratri festival."
        }
    ]
}; 