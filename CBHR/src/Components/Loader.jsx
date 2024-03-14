import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader({ size, color }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        px: "6px",
        alignItems: "center",
      }}
    >
      <CircularProgress size={size} sx={{ color: color }} />
    </Box>
  );
}
