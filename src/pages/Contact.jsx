import React, { useState } from "react"
import { API_ENDPOINTS } from "../config"

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
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    function getText(event) {
        const {name, value} = event.target
        setData(prevData => ({ ...prevData, [name]: value }))
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus("");
        setErrors({});
        setIsLoading(true);

        // Basic client-side validation
        const newErrors = {};
        if (!data.FirstName.trim()) newErrors.FirstName = "First name is required";
        if (!data.LastName.trim()) newErrors.LastName = "Last name is required";
        if (!data.Email.trim()) {
            newErrors.Email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.Email)) {
            newErrors.Email = "Please enter a valid email address";
        }
        if (!data.Message.trim()) newErrors.Message = "Message is required";
        if (data.Phone && !/^[0-9]{10}$/.test(data.Phone)) {
            newErrors.Phone = "Please enter a valid 10-digit phone number";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setStatus("Please fix the errors in the form.");
            setIsLoading(false);
            return;
        }

        try {
            console.log('Submitting form data:', data); // Debug log
            const res = await fetch(API_ENDPOINTS.CONTACT, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            });
            
            console.log('Response status:', res.status); // Debug log
            const result = await res.json();
            console.log('Response data:', result); // Debug log
            
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
            } else if (res.status === 400) {
                // Handle validation errors
                if (result.errors) {
                    setErrors(result.errors);
                } else if (result.error) {
                    setStatus(result.error);
                } else {
                    setStatus("Please fix the errors in the form.");
                }
            } else {
                setStatus(result.error || "Failed to send message. Please try again.");
            }
        } catch (err) {
            console.error("Contact form error:", err);
            setStatus("Server error. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="relative z-10 min-h-[100%]">
            <div className="fixed rounded-b-[30px] md:rounded-b-[40px] top-0 z-10 sm:h-[5.5rem] h-20 md:h-24 w-full bg-home shadow-[0_8px_10px_0_rgba(0,0,0,0.25)]"></div>
            {/* <div className="fixed top-20 bg-transparent backdrop-blur-[10px] backdrop-filter h-full w-full"></div> */}

            <div className="relative mt-28 mb-16 h-screen w-full flex flex-col justify-center items-center">
                <form onSubmit={handleSubmit} className="w-full max-w-4xl px-4">  
                    <div className="p-10 px-5 sm:px-10 h-max space-y-5 relative z-[8] bg-gradient-to-br from-[#ffffff14] to-[#ffffff00] backdrop-blur-[10px]
                                shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-xl">
                        <div>
                            <h1>Name:</h1>
                            <div className="flex flex-col sm:space-x-4 space-y-3 sm:space-y-0 sm:flex-row">
                                <div className="flex-1">
                                    <input 
                                        type="text"
                                        name="FirstName"
                                        placeholder="First Name"
                                        className={`w-full input-box ${errors.FirstName ? 'border-red-500' : ''}`}
                                        onInput={getText}
                                        value={data.FirstName}
                                    />
                                    {errors.FirstName && <p className="text-red-500 text-sm mt-1">{errors.FirstName}</p>}
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="LastName" 
                                        placeholder="Last Name" 
                                        className={`w-full input-box ${errors.LastName ? 'border-red-500' : ''}`}
                                        onInput={getText}
                                        value={data.LastName}
                                    />
                                    {errors.LastName && <p className="text-red-500 text-sm mt-1">{errors.LastName}</p>}
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h1>Email:</h1>
                            <input 
                                type="email"
                                name="Email"
                                placeholder="myname@example.com" 
                                className={`w-full input-box ${errors.Email ? 'border-red-500' : ''}`}
                                onInput={getText}
                                value={data.Email}
                            />
                            {errors.Email && <p className="text-red-500 text-sm mt-1">{errors.Email}</p>}
                        </div>

                        <div>
                            <h1>Phone:</h1>
                            <input 
                                type="tel"
                                name="Phone"
                                placeholder="(+00) 0000000000" 
                                className={`w-full input-box ${errors.Phone ? 'border-red-500' : ''}`}
                                onInput={getText}
                                value={data.Phone}
                            />
                            {errors.Phone && <p className="text-red-500 text-sm mt-1">{errors.Phone}</p>}
                        </div>

                        <div>
                            <h1>Hackerrank Id:</h1>
                            <input  
                                type="text"
                                name="HackerrankId"
                                className={`w-full input-box ${errors.HackerrankId ? 'border-red-500' : ''}`}
                                onInput={getText}
                                value={data.HackerrankId}
                            />
                            {errors.HackerrankId && <p className="text-red-500 text-sm mt-1">{errors.HackerrankId}</p>}
                        </div>

                        <div>
                            <textarea 
                                name="Message"
                                placeholder="Please be as precise as possible to help us locate the correct piece of information. If possible include specific details....."
                                className={`p-2 overflow-hidden w-full input-box ${errors.Message ? 'border-red-500' : ''}`}
                                onInput={getText}
                                value={data.Message}
                                rows={7}  
                            />
                            {errors.Message && <p className="text-red-500 text-sm mt-1">{errors.Message}</p>}
                            <div className="mt-3 space-x-6">   
                                <button      
                                    type="submit"       
                                    className="rounded-lg bg-home md:font-bold text-pri-orange text-lg px-4 py-2 shadow-[0_8px_10px_0_rgba(0,0,0,0.25)] hover:scale-110 hover:shadow-[0_8px_10px_0_rgba(0,0,0,0.35)] transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"   
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Sending...' : 'Submit'}
                                </button>
                                <button      
                                    type="reset"       
                                    className="rounded-lg bg-home md:font-bold text-pri-blue text-lg px-4 py-2 shadow-[0_8px_10px_0_rgba(0,0,0,0.25)] hover:scale-110 hover:shadow-[0_8px_10px_0_rgba(0,0,0,0.35)] transition duration-300 ease-in-out"
                                    onClick={() => {
                                        setData({
                                            "FirstName": "",
                                            "LastName": "",
                                            "Email": "",
                                            "Phone": "",
                                            "HackerrankId": "",
                                            "Message": ""
                                        });
                                        setErrors({});
                                        setStatus("");
                                    }}
                                    disabled={isLoading}
                                >
                                    Reset
                                </button>
                            </div>
                            {status && (
                                <div className={`mt-4 text-center font-semibold text-lg ${
                                    status.includes('success') ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {status}
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}