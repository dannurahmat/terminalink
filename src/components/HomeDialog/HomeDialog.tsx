import { useState, useEffect } from "react";
import logo from "../../logo.svg";
import {
  Avatar,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  Link,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tab,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { BrowserTab } from "../../chromeServices/browserTab";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import OpenInNewSharpIcon from "@mui/icons-material/OpenInNewSharp";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { DoneAll } from "@mui/icons-material";

let allTabs: any[] = [];
chrome.tabs.query({ currentWindow: true }, function (tabs) {
  console.log(tabs);
  allTabs = tabs;
});
console.log("allTabs", allTabs);

function HomeDialog() {
  const [selectedAll, setSelectedAll] = useState(false);
  const [checked, setChecked] = useState<BrowserTab[]>([]);

  const toggleBulkSelect = (): void => {
    if (!selectedAll) {
      setChecked(allTabs);
      setSelectedAll(true);
    } else {
      setChecked([]);
      setSelectedAll(false);
    }
  };
  const handleToggle = (value: number) => () => {
    const obj = allTabs.find((obj) => obj.id === value);
    const result = checked.find((o) => o.id === obj.id);
    let newChecked = [...checked];

    if (result) {
      newChecked = newChecked.filter((obj) => obj.id !== result.id);
    } else {
      newChecked.push(obj);
    }

    if (newChecked.length === allTabs.length) {
      setSelectedAll(true);
    } else {
      setSelectedAll(false);
    }

    setChecked(newChecked);
  };

  const openDashboard = () => {
    chrome.tabs.create({ active: true });
  };

  return (
    <Grid
      container
      rowSpacing={2}
      spacing={2}
    >
      <Grid
        container
        item
        xs={2}
        justifyItems="center"
      >
        <Avatar
          variant="square"
          src={logo}
          alt="terminalink.com"
          sx={{ height: 48, width: 48 }}
        />
      </Grid>
      <Grid
        container
        item
        xs={10}
        justifyContent="flex-end"
        alignItems="center"
      >
        <Avatar src="/broken-image.jpg" />
      </Grid>
      <Grid
        item
        xs={12}
        container
        justifyContent="flex-end"
      >
        <ButtonGroup>
          <Button
            variant={selectedAll ? "contained" : "outlined"}
            onClick={toggleBulkSelect}
          >
            <Tooltip title="Select or deselect all">
              <DoneAll fontSize="inherit" />
            </Tooltip>
          </Button>
          <Button onClick={openDashboard}>
            <Tooltip title="Open Dashboard">
              <OpenInNewSharpIcon fontSize="inherit" />
            </Tooltip>
          </Button>
          <Button
            variant="outlined"
            disabled={checked.length ? false : true}
          >
            <Tooltip title="Add to folder">
              <AddSharpIcon fontSize="inherit" />
            </Tooltip>
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid
        item
        xs={12}
      >
        <List disablePadding>
          {allTabs.map((i, idx) => {
            return (
              <>
                <ListItem
                  dense
                  disablePadding
                  key={idx}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      size="small"
                      color="success"
                      icon={<RadioButtonUncheckedOutlinedIcon />}
                      checkedIcon={<CheckCircleIcon />}
                      onChange={handleToggle(i.id)}
                      checked={checked.indexOf(i) !== -1}
                      inputProps={{ "aria-labelledby": i.id }}
                    />
                  }
                >
                  <ListItemButton
                    selected={checked.find((x) => x.id === i.id) ? true : false}
                    onClick={handleToggle(i.id)}
                  >
                    <ListItemIcon sx={{ minWidth: 35 }}>
                      <Avatar
                        alt={i.Title}
                        src={i.favIconUrl}
                        variant="rounded"
                        sx={{ height: 24, width: 24 }}
                      />
                    </ListItemIcon>
                    <Tooltip title={i.title}>
                      <ListItemText
                        id={i.id}
                        secondary={i.title}
                        secondaryTypographyProps={{
                          maxWidth: 265,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      />
                    </Tooltip>
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            );
          })}
        </List>
      </Grid>
      {/* <Grid item xs={12}>
        <Grid container justifyContent='center' alignItems='center'>
            <Link href="https://terminalink.com" underline='hover' variant='body2'>Terminalink.com</Link>
        </Grid>
      </Grid> */}
    </Grid>
  );
}

export default HomeDialog;
