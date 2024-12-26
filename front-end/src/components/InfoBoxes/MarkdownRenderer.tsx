import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { fetchFileContent } from './FetchFiles';

export interface MarkdownRendererProps {
    fileName: string;
}

export const MarkdownRenderer : React.FC<MarkdownRendererProps> = ({ fileName }) => {
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        async function loadFile() {
            const text = await fetchFileContent(fileName);
            if (text) {
                setContent(text);
            } else {
                setContent('Not found...');
            }
        }
        loadFile();
    }, [fileName]);

    return (
        <div>
            {content ? (
                <ReactMarkdown>{content}</ReactMarkdown>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}