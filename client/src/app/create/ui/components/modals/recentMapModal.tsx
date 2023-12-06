import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Grid, Typography } from '@mui/material';
import GeneralizedDialog from 'components/modals/GeneralizedDialog';
import { getRecents, loadMapById } from '../helpers/EditorAPICalls';
import { AuthContext } from 'context/AuthProvider';
import { EditorContext } from 'context/EditorProvider';

// const caledoniaSVG = (
//   <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//     <circle cx="50" cy="50" r="50" />
//   </svg>
// );
const rectangSvg = (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="150" height="150" />
  </svg>
);
// const svgItems = [
//   { name: 'PieChart', map: caledoniaSVG },
//   { name: 'RectMap', map: rectangSvg },
// ];
interface RecentMapModalProps {
  open: boolean;
  onClose: () => void;
}

const RecentMapModal: React.FC<RecentMapModalProps> = ({ open, onClose }) => {
  const authContext = useContext(AuthContext);
  const editorContext = useContext(EditorContext);
  const [firstRender, setFirstRender] = useState(true);
  const [selectedMap, setSelectedMap] = useState<string>('');
  const [svgItems, setSvgItems] = useState<
    Array<{
      _id: string;
      title: string;
      svg: string;
    }>
  >([]);
  const handleSelectionChange = (selection: string) => {
    setSelectedMap(selection);
  };

  useEffect(() => {
    if (firstRender) {
      if (authContext.state.isLoggedIn) {
        getRecents().then(items => {
          setSvgItems(items);
        });
      }
      setFirstRender(false);
    }
  });

  const handleConfirm = () => {
    loadMapById(selectedMap).then(map => {
      editorContext.helpers.setLoadedMap(editorContext, selectedMap, map);
      onClose();
    });
  };

  return (
    <GeneralizedDialog
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Recent Maps"
    >
      <Box sx={{ overflowY: 'auto', maxHeight: '60vh', padding: 2 }}>
        <Grid container spacing={2}>
          {svgItems.map((item, index) => (
            <Grid item xs={6} sm={4} key={index}>
              <Box
                onClick={() => {
                  handleSelectionChange(item._id);
                }}
                sx={{
                  textAlign: 'center',
                  height: '50%',
                  width: '50%',
                  margin: 'auto',
                }}
              >
                {rectangSvg}
                <Typography>{item.title}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </GeneralizedDialog>
  );
};

export default RecentMapModal;
