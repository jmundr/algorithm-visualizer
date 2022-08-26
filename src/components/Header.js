import { Box, AppBar, Toolbar, Button
} from "@mui/material";
import { Cancel, PauseCircleOutline, PlayArrow, RestartAlt } from '@mui/icons-material'

const header = ({
  onToggleClick,
  resetToggleClick,
  handleAlgorithmChange,
  shouldPlay,
  toggleSettings,
  settingsVisible,
  algorithm
}) => {
  return (
    <Box sx={{ flexGrow: 1 }} style={{ paddingBottom: settingsVisible ? '5%' : '15%' }}>
      <AppBar position="static">
        <Toolbar>
          <Button variant="contained" sx={{ marginRight: '10px' }} disabled={!shouldPlay} onClick={() => toggleSettings()}>Settings</Button>
          <Button variant="contained" disabled={!shouldPlay}>Info</Button>
          <Button variant="contained" sx={{ marginLeft: 'auto' }} onClick={() => handleAlgorithmChange('bubble')}>Bubble Sort</Button>
          <Button variant="contained" sx={{ marginRight: '10px', marginLeft: '10px' }} onClick={() => handleAlgorithmChange('insertion')}>Insertion Sort</Button>
          <Button variant="contained" sx={{ marginRight: '10px' }} onClick={() => handleAlgorithmChange('quick')}>Quick Sort</Button>
          <Button variant="contained" sx={{ marginRight: '10px' }} onClick={() => handleAlgorithmChange('bogo')}>Bogo Sort</Button>
          <Button variant="contained" sx={{ marginRight: '10px' }} startIcon={shouldPlay === true ? <PlayArrow /> : algorithm === "quick" ? <Cancel /> : <PauseCircleOutline />} onClick={() => onToggleClick()}>{shouldPlay === true ? "Play" : algorithm === "quick" ? "Stop" : "Pause"}</Button>
          <Button variant="contained" startIcon={<RestartAlt />} disabled={!shouldPlay} onClick={() => resetToggleClick()}>Reset</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default header;
