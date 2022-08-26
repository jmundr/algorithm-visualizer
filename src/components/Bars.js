import Bar from "./Bar";

import { Stack, Paper, Divider } from "@mui/material";

import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const dictionary = {
  selected: true,
  greater: "#33cc33",
  smaller: "#ff3300",
  completed: "#009933",
};

const bars = ({ bars }) => {
  const marginSize = 3;
  return (
    <>
      <div
        className="d-flex align-items-end justify-content-center"
        style={{ margin: "auto", width: "85%", height: "300px" }}
      >
        {bars.map((item, index) => {
          return (
            <Bar
              index={index}
              value={item.value}
              marginSize={marginSize}
              state={item.state}
            />
          );
        })}
      </div>
      <div
        className="d-flex align-items-end justify-content-center"
        style={{ margin: "auto", paddingTop: "2.5%", width: "50%" }}
      >
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={0}
        >
          {bars.map((item, index) => {
            return (
              <Stack
                direction="column"
                divider={
                  <Divider orientation="vertical" flexItem spacing={1} />
                }
              >
                <Item sx={{ backgroundColor: "white" }}>{index}</Item>
                <Item
                  sx={{
                    color: "#FFFFFF",
                    backgroundColor:
                      dictionary[item.state] === true
                        ? "#6114ae"
                        : dictionary[item.state] ?? "#11a8d2",
                    transition: "all .5s ease",
                    WebkitTransition: "all .5s ease",
                    MozTransition: "all .5s ease",
                  }}
                >
                  {item.value}
                </Item>
              </Stack>
            );
          })}
        </Stack>
      </div>
    </>
  );
};

/*
      <div
        className="d-flex align-items-end justify-content-center"
        style={{ margin: "auto", paddingTop: "1%", width: "50%" }}
      >
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={0}
        >
          {bars.map((item, index) => {
            return <Item>{item.value}</Item>;
          })}
        </Stack>
      </div>
*/

export default bars;
