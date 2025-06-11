import React from "react"
import TeamCard from "../components/Card/TeamCard"
import RaginiImg from "../assets/teams/core_team/Ragini_Chairperson.png"
import KirtiImg from "../assets/teams/core_team/Kirti_Research Lead.png"
import SumitImg from "../assets/teams/core_team/Sumit_Technical Lead.png"
import RohanImg from "../assets/teams/core_team/Rohan_Documentation Lead.png"
import AmitabhImg from "../assets/teams/core_team/Amitabh_Editorialists Head.png"
import AdnanImg from "../assets/teams/core_team/Adnan_PR and Marketing Lead.png"
import AyushImg from "../assets/teams/core_team/Ayush_Social Meadia and Creative Lead.png"
import HarshilImg from "../assets/teams/core_team/Harshil_Problem Setters Head.png"

const coreMembers = [
  {
    name: "Ragini Gaggar",
    designation: "Chairperson",
    image: RaginiImg,
    linkedin: "https://www.linkedin.com/in/ragini-gaggar/"
  },
  {
    name: "Sumit Tiwari",
    designation: "Technical Lead",
    image: SumitImg,
    linkedin: "https://www.linkedin.com/in/sumit5604/"
  },
  {
    name: "Rohan Dol",
    designation: "Documentation Lead",
    image: RohanImg,
    linkedin: "https://www.linkedin.com/in/rohan-dol-44b62a214/"
  },
  {
    name: "Ayush Khalate",
    designation: "Creative Lead",
    image: AyushImg,
    linkedin: "https://www.linkedin.com/in/ayushkhalate/"
  },
  {
    name: "Harshil Tanwar",
    designation: "Problem Setters Head",
    image: HarshilImg,
    linkedin: "https://www.linkedin.com/in/harshil-tanwar0820/"
  },
  {
    name: "Amitabh Dwivedi",
    designation: "Editorialists Head",
    image: AmitabhImg,
    linkedin: "https://www.linkedin.com/in/amitabh-dwivedi-aa6870249/"
  },
  {
    name: "Kirti Singh",
    designation: "Research Lead",
    image: KirtiImg,
    linkedin: "https://www.linkedin.com/in/kirti-singh0543k/"
  },
  {
    name: "Adnan Qureshi",
    designation: "PR & Marketing Lead",
    image: AdnanImg,
    linkedin: "https://www.linkedin.com/in/adnan-qureshi-b36015159/"
  }
]

export default function Team() {
  return (
    <div className="relative z-10 min-h-[100%]">
      <div className="fixed rounded-b-[30px] md:rounded-b-[40px] top-0 z-10 sm:h-[5.5rem] h-20 md:h-24 w-full bg-home shadow-[0_8px_10px_0_rgba(0,0,0,0.25)]"></div>
      <div className="relative mt-32 mb-16 w-full flex flex-col items-center">
        <h1 className="uppercase font-bold text-2xl mx-auto w-max md:text-4xl mb-7 gradient-txt">Know the Core</h1>
        {/* Ragini at the top */}
        <div className="flex flex-col items-center mb-8">
          <TeamCard
            key={coreMembers[0].name}
            id={0}
            image={coreMembers[0].image}
            name={coreMembers[0].name}
            designation={coreMembers[0].designation}
            linkedin={coreMembers[0].linkedin}
            eventHover
          />
        </div>
        {/* Row: Sumit, Rohan, Ayush */}
        <div className="flex flex-row flex-wrap justify-center gap-8 mb-8">
          {[coreMembers[1], coreMembers[2], coreMembers[3]].map((member, idx) => (
            <TeamCard
              key={member.name}
              id={idx+1}
              image={member.image}
              name={member.name}
              designation={member.designation}
              linkedin={member.linkedin}
              eventHover
            />
          ))}
        </div>
        {/* Row: Harshil, Amitabh, Kirti */}
        <div className="flex flex-row flex-wrap justify-center gap-8 mb-8">
          {[coreMembers[4], coreMembers[5], coreMembers[6]].map((member, idx) => (
            <TeamCard
              key={member.name}
              id={idx+4}
              image={member.image}
              name={member.name}
              designation={member.designation}
              linkedin={member.linkedin}
              eventHover
            />
          ))}
        </div>
        {/* Adnan at the bottom (if needed) */}
        <div className="flex flex-col items-center">
          <TeamCard
            key={coreMembers[7].name}
            id={7}
            image={coreMembers[7].image}
            name={coreMembers[7].name}
            designation={coreMembers[7].designation}
            linkedin={coreMembers[7].linkedin}
            eventHover
          />
        </div>
      </div>
    </div>
  )
}   