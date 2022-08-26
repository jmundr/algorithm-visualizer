import { Slider, Paper, Typography, Zoom } from "@mui/material";

import { withStyles } from "@mui/styles";

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

const Settings = ({
  onSpeedChange,
  onLengthChange,
  shouldPlay,
  sortSpeed,
  arrayLength,
}) => {
  return (
    <Zoom in={true}>
      <Paper
        elevation={5}
        style={{ backgroundColor: "#0b4187" }}
        className="menu d-flex justify-content-center"
      >
        <div
          style={{
            marginTop: "5%",
            marginLeft: "auto",
            marginRight: "auto",
            width: "50%",
            height: "100%",
          }}
        >
          <WhiteTextTypography gutterBottom>Array Size</WhiteTextTypography>
          <Slider
            style={{ paddingRight: "5%" }}
            onChangeCommitted={onLengthChange}
            aria-label="Size"
            defaultValue={arrayLength}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={5}
            max={30}
            disabled={!shouldPlay}
          />

          <WhiteTextTypography gutterBottom>Sort Speed</WhiteTextTypography>
          <Slider
            style={{ paddingRight: "5%" }}
            onChangeCommitted={onSpeedChange}
            aria-label="Size"
            defaultValue={sortSpeed}
            valueLabelDisplay="auto"
            step={0.1}
            marks
            min={0.1}
            max={5}
            disabled={!shouldPlay}
          />
        </div>
      </Paper>
    </Zoom>
  );
};

export default Settings;
