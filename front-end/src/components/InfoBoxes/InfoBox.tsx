import * as React from 'react';
import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogActions,
  Button,
} from '@fluentui/react-components';
import { MarkdownRenderer } from './MarkdownRenderer';

interface IMarkdownDialogProps {
  isDialogOpen: boolean;
  selectedFilePath: string;
  onCloseDialog: () => void;
}

export const MarkdownDialog: React.FC<IMarkdownDialogProps> = ({
  isDialogOpen,
  selectedFilePath,
  onCloseDialog,
}) => {
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={(e, data) => !data.open && onCloseDialog()}>
        <DialogSurface>
          <DialogBody>
            <h2>Markdown Preview</h2>
            <MarkdownRenderer fileName={selectedFilePath} />

            <DialogActions>
              <Button appearance="secondary" onClick={onCloseDialog}>
                Close
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};
