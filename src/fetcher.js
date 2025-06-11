export async function fetchTeam(url) {
    const res = await fetch(url, {
        method: "GET",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    })
    if(!res.ok) {
        throw {
            message: "Failed to fetch teams", 
            statusText: res.statusText,
            status: res.status
        }
    } else if(!res.length) {
        throw {
            message: "No data found",
        }
    }
    const data = await res.json()
    return data
}