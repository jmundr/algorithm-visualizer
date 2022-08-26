import {
  Button,
  Slider,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";

const header = ({
  onLengthChange,
  onToggleClick,
  resetToggleClick,
  handleAlgorithmChange,
  onSpeedChange,
  shouldPlay,
  algorithm
}) => {
  return (
    <div>
      <div className="d-flex align-items-end justify-content-center"
        style={{
          verticalAlign: "middle",
          paddingTop: "20px",
          paddingBottom: "20%",
          paddingLeft: "20px",
          paddingRight: "80%",
        }}
      >
        <h3 style={{ fontSize: "20px" }}>Array Size</h3>
        <Slider style={{  paddingRight: "5%" }}
          onChangeCommitted={onLengthChange}
          aria-label="Size"
          defaultValue={5}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={5}
          max={30}
          disabled={!shouldPlay}
        />
        <h3 style={{ fontSize: "20px" }}>Sort Speed</h3>
        <Slider style={{  paddingRight: "5%" }}
          onChangeCommitted={onSpeedChange}
          aria-label="Size"
          defaultValue={1}
          valueLabelDisplay="auto"
          step={0.1}
          marks
          min={0.1}
          max={5}
          disabled={!shouldPlay}
        />
        <Button variant="contained" onClick={() => onToggleClick()}>
          {shouldPlay === true ? "Play" : algorithm === "quick" ? "Stop" : "Pause"}
        </Button>
        <Button
          variant="contained"
          disabled={!shouldPlay}
          onClick={() => resetToggleClick()}
        >
          Reset
        </Button>

        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Algorithm
          </InputLabel>
          <Select
            labelId="algorithm-selector"
            id="algorithm-selector"
            value={algorithm}
            onChange={handleAlgorithmChange}
            autoWidth
            label="Algorithm"
          >
            <MenuItem value={"bubble"}>Bubble Sort</MenuItem>
            <MenuItem value={"insertion"}>Insertion Sort</MenuItem>
            <MenuItem value={"quick"}>Quick Sort</MenuItem>
            <MenuItem value={"bogo"}>Bogo Sort</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default header;
