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

export const useGameLookup = (gameID, enabled) => {
    return useQuery({queryKey: 'gameLookup', queryFn: async () => {
        const res = await get(`games?id=${gameID}`);
        if (res.errored) {
            throw new Error("Couldn't lookup game info!");
        }
        return await res.json().then((data) => {
            return data;
        });
    }, enabled: enabled});
}

export const useDealLookup = (dealID) => {
    return useQuery({queryKey: 'dealLookup', queryFn: async () => {
            const res = await get(`deals?id=${dealID}`);
            if (res.errored) {
                throw new Error("Couldn't lookup deal info!");
            }
            return await res.json().then((data) => {
                return data;
            });
        }});
}

