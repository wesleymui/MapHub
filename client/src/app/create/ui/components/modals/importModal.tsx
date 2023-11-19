import React, { useContext, useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';
import GeneralizedDialog from 'components/modals/GeneralizedDialog';
import LabelSelector from './LabelSelector'; // Adjust the import path as needed
import style from './LabelSelector.module.scss';
import { EditorContext } from 'context/EditorProvider';
interface ImportModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (mapName: string, selectedOptions: string[]) => void; // Added mapName to the callback
}

const ImportModal: React.FC<ImportModalProps> = ({
  open,
  onClose,
  onConfirm,
}: ImportModalProps) => {
  const [mapName, setMapName] = useState('My New Map');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const editorContext = useContext(EditorContext);

  const handleSelectionChange = (selection: string[]) => {
    setSelectedOptions(selection);
  };

  const handleConfirm = () => {
    onConfirm(mapName, selectedOptions);
    onClose();
  };

  return (
    <GeneralizedDialog
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Import Properties"
    >
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'left',
          marginBottom: '20px',
        }}
      >
        <Typography style={{ marginRight: '20px' }}>Map Name</Typography>
        <TextField
          value={mapName}
          onChange={e => setMapName(e.target.value)}
          margin="normal"
          className={style.textField}
          style={{
            padding: 0,
          }}
        />
      </Box>

      <LabelSelector
        properties={editorContext.state.mapDetails.availableProps}
        isCheckbox={true}
        onSelect={handleSelectionChange}
      />
    </GeneralizedDialog>
  );
};

export default ImportModal;
