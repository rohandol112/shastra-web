import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"


// const core_API = "https://shastra-api.onrender.com/coreMembers";
const core_API = "https://alston-shastra-apis.onrender.com/api/core-members";
export default function CorePeeps() {
    const [core, setCore] = useState([])

    // const fetchcoreUser = async(url) => {
    //     try {
    //         const res = await fetch(url, {
    //             method: "GET",
    //             crossDomain: true,
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Accept: "application/json",
    //                 "Access-Control-Allow-Origin": "*"
    //             }
    //         });
    //         const data = await res.json();
    //         if(data.length > 0){
    //             setCore(data);
    //         }
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    const fetchCore = async (url, setCore) => {
        try {
          const res = await fetch(url);
          const data = await res.json();
          if (data.data.length > 0) {
            setCore(data.data);
          } else {
            throw new Error("No data found");
          }
        } catch (error) {
          console.error(error);
        }
    }

    useEffect(() => {
        fetchCore(core_API, setCore);
    }, [])

    return (
        <div className="flex flex-col self-center">
            <span className="pb-7 self-center uppercase font-bold text-2xl md:text-4xl select-none inline-block w-max gradient-txt">Meet Our Core Team</span>
            <p className="text-sm text-center md:text-base px-5 md:px-20 mb-5">Our dedicated core team comprises passionate individuals who drive the club's initiatives, organize events, and mentor members in their DSA journey. They are committed to fostering a vibrant coding community and ensuring everyone achieves their full potential.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 gap-x-10 sm:gap-x-8 sm:gap-8 md:gap-10 lg:gap-x-20 lg:gap-y-10 md:mx-2">
                {    
                    core &&
                    core.map(member => (
                        <div
                            key={nanoid()}
                            className="flex flex-col items-center aspect-square justify-center space-y-2"
                        >
                            <span className="uppercase font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl text-center mx-auto inline-block w-max gradient-txt">post</span>
                            <img src={member.attributes.image} className="inline-block aspect-square h-32 sm:h-28 md:h-36 lg:h-60 rounded-3xl border border-black"/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}