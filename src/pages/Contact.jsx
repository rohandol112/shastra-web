import React, { useState } from "react"

export default function Contact() {
    const [data, setData] = useState({
        "FirstName": "",
        "LastName": "",
        "Email": "",
        "Phone": "",
        "HackerrankId": "",
        "Message": ""
    })
    const [status, setStatus] = useState("");

    function getText(event) {
        const {name, value} = event.target
        setData(prevData => ({ ...prevData, [name]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus("");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (res.ok && result.success) {
                setStatus("Message sent successfully!");
                setData({
                    "FirstName": "",
                    "LastName": "",
                    "Email": "",
                    "Phone": "",
                    "HackerrankId": "",
                    "Message": ""
                });
            } else {
                setStatus(result.error || "Failed to send message.");
            }
        } catch (err) {
            setStatus("Server error. Please try again later.");
        }
    }

    return (
        <div className="relative z-10 min-h-[100%]">
            <div className="fixed rounded-b-[30px] md:rounded-b-[40px] top-0 z-10 sm:h-[5.5rem] h-20 md:h-24 w-full bg-home shadow-[0_8px_10px_0_rgba(0,0,0,0.25)]"></div>
            {/* <div className="fixed top-20 bg-transparent backdrop-blur-[10px] backdrop-filter h-full w-full"></div> */}

            <div className="relative mt-28 mb-16 h-screen w-full flex flex-col justify-center items-center">
                <form onSubmit={handleSubmit}>  
                    <div className="p-10 px-5 sm:px-10 h-max space-y-5 relative z-[8] bg-gradient-to-br from-[#ffffff14] to-[#ffffff00] backdrop-blur-[10px]
                                shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-xl">
                        <div>
                            <h1>Name:</h1>
                            <div className="flex flex-col sm:space-x-4 space-y-3 sm:space-y-0 sm:flex-row">
                                <input 
                                    type="text"
                                    name="FirstName"
                                    placeholder="First Name"
                                    className=" w-40 md:w-80 input-box"
                                    onInput={getText}
                                    value={data.FirstName}
                                />
                                <input
                                    type="text"
                                    name="LastName" 
                                    placeholder="Last Name" 
                                    className="w-40 md:w-80 input-box"
                                    onInput={getText}
                                    value={data.LastName}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <h1>Email:</h1>
                            <input 
                                type="email"
                                name="Email"
                                placeholder="myname@example.com" 
                                className="w-72 input-box"  
                                onInput={getText}
                                value={data.Email}
                            />
                        </div>

                        <div>
                            <h1>Phone:</h1>
                            <input 
                                type="tel"
                                name="Phone"
                                placeholder="(+00) 0000000000" 
                                className="w-40 input-box"  
                                onInput={getText}
                                value={data.Phone}
                            />
                        </div>

                        <div>
                            <h1>Hackerrank Id:</h1>
                            <input  
                                type="text"
                                name="HackerrankId"
                                className="w-72 input-box"
                                onInput={getText}
                                value={data.HackerrankId}
                            />
                        </div>

                        <div>
                            <textarea 
                                name="Message"
                                placeholder="Please be as precise as possible to help us locate the correct piece of information. If possible include specific details....."
                                className="p-2 overflow-hidden w-[85%] md:w-[70%] input-box"
                                onInput={getText}
                                value={data.Message}
                                rows={7}  
                            />
                            <div className="mt-3 space-x-6">   
                                <button      
                                    type="submit"       
                                    className="rounded-lg bg-home md:font-bold text-pri-orange text-lg px-4 py-2 shadow-[0_8px_10px_0_rgba(0,0,0,0.25)] hover:scale-110 hover:shadow-[0_8px_10px_0_rgba(0,0,0,0.35)] transition duration-300 ease-in-out"   
                                >
                                    Submit
                                </button>
                                <button      
                                    type="reset"       
                                    className="rounded-lg bg-home md:font-bold text-pri-blue text-lg px-4 py-2 shadow-[0_8px_10px_0_rgba(0,0,0,0.25)] hover:scale-110 hover:shadow-[0_8px_10px_0_rgba(0,0,0,0.35)] transition duration-300 ease-in-out"   
                                    onClick={() => setData({
                                        "FirstName": "",
                                        "LastName": "",
                                        "Email": "",
                                        "Phone": "",
                                        "HackerrankId": "",
                                        "Message": ""
                                    })}
                                >
                                    Reset
                                </button>
                            </div>
                            {status && <div className="mt-4 text-center font-semibold text-lg text-green-600">{status}</div>}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}