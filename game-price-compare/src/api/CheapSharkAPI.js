import {useQuery} from "react-query";

const get = async (endpoint, abortSignal) => {
    let signal = null; if (abortSignal) { signal = abortSignal; }
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export const useGetListOfGames = (searchTitle, enabled) => {
    return useQuery({queryKey: 'getListOfGames', queryFn: async () => {
        const res = await get(`games?title=${searchTitle}`);
        if (res.errored) {
            throw new Error("Couldn't get list of games!");
        }
        return await res.json().then((data) => {
            return data;
        });
    }, enabled: enabled});
}

