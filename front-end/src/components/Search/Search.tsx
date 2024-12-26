import { ChangeEvent, useEffect, useState } from "react";
import { sendData } from "../../api/textSearch";
import { SimilarityResponseItem } from "../../types/similaritySearchRespoonse";
import { Button, Input, InputOnChangeData, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "@fluentui/react-components";
import { useStyles } from "./Styles";
import { MarkdownDialog } from "../InfoBoxes/InfoBox";

const COLUMNS = ["File Path", "Similarity Score"]

export function Search() {
    const classes = useStyles();
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [response, setResponse] = useState<SimilarityResponseItem[]>();
    const [text, setText] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        setText(data.value);
    }

    const handleQuery = () => {
        setSubmitted(true);
    }

    const handleTableCellClick = (filePath: string) => {
      setSelectedFilePath(filePath);
      setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFilePath(null);
    };

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
          <div className={classes.searchContainer}>
            <Input
              value={text}
              onChange={handleTextChange}
              placeholder="Type something here..."
              className={classes.inputBox}
            />
            <Button onClick={handleQuery} className={classes.searchButton}>
              Search
            </Button>
          </div>
          {response ? (
            <Table aria-label="Default table" className={classes.table} style={{ minWidth: "510px" }}>
              <TableHeader className={classes.tableHeaderContainer}>
                <TableRow>
                  {COLUMNS.map((column: string) => (
                    <TableHeaderCell key={column} className={classes.tableHeaderCell}>
                      {column}
                    </TableHeaderCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {response.map((item) => (
                  <TableRow key={item.file_path} className={classes.tableRowContainer}>
                    <TableCell
                      className={classes.tableCell}
                      onClick={() => handleTableCellClick(item.file_path)}
                    >                      
                      {item.file_path}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {(item.similarity * 100).toFixed(2) + '%'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : error.length > 0 ? (
            <p className={classes.errorMessage}>{error}</p>
          ) : (
            <p className={classes.noResultsMessage}>No results found, yet...</p>
          )}

          {isModalOpen && selectedFilePath && (
              <MarkdownDialog 
                isDialogOpen={isModalOpen}
                selectedFilePath={selectedFilePath}
                onCloseDialog={closeModal}
              />
            )}
        </>
      );
}