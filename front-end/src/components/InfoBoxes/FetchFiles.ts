import { getUrl } from "./GetUrl";

export async function fetchFileContent(fileName : string) {
    try {
        const response = await fetch(getUrl(fileName));
        if (!response.ok) {
            throw new Error('Failed to fetch file');
        }
        const text = await response.text();
        return text;
    } catch (error) {
        console.error('Error fetching file:', error);
    }
}
