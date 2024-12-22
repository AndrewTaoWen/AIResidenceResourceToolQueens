import { ChangeEvent, useEffect, useState } from "react";
import { sendData } from "../api/textSearch";
import { SimilarityResponseItem } from "../types/similaritySearchRespoonse";
import { Button, Input, InputOnChangeData, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "@fluentui/react-components";

const COLUMNS = ["File Path", "Similarity Score"]

export function Search() {

    const [submitted, setSubmitted] = useState<boolean>(false);
    const [response, setResponse] = useState<SimilarityResponseItem[]>();
    const [text, setText] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        setText(data.value);
    }

    const handleQuery = () => {
        setSubmitted(true);
    }

    useEffect(() => {
        if (submitted && text !== '') {
          const fetchData = async () => {
            try {
              const result = await sendData(text);
              console.log("Result:", result);
              setResponse(result);
              console.log("Response:", response);
            } catch (err) {
              console.error(err);
              setError('An error occurred while fetching data');
            } finally {
              setSubmitted(false);
              setText('');
            }
          };
          fetchData();
        }
      }, [submitted, text]);
      
    
    useEffect(() => {
        console.log('Updated Response:', response);
      }, [response]);

    return (
        <>
            <Input
                value={text}
                onChange={handleTextChange}
                placeholder="Type something here..."
            />
            <p>{text}</p>
            <Button onClick={handleQuery}>Search</Button>
            {response ? <Table arial-label="Default table" style={{ minWidth: "510px" }}>
                <TableHeader>
                    <TableRow>
                    {COLUMNS.map((column : string) => (
                        <TableHeaderCell key={column}>
                        {column}
                        </TableHeaderCell>
                    ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {response.map((item) => (
                    <TableRow key={item.file_path}>
                        <TableCell>
                            {item.file_path}
                        </TableCell>
                        <TableCell>
                            {(item.similarity * 100).toFixed(2) + '%'}
                        </TableCell>                        
                    </TableRow>
                    ))}
                </TableBody>
            </Table> : error.length > 0 ? <p>{error}</p> : <p>No results found, yet...</p>}
        </>
    )
}