import React from "react";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

function PanelCard({
  primaryText,
  secondaryText,
  icon,
  backgroundColor,
  textColor,
  onClick,
  to,
}) {
  return (
    <Card
      sx={{
        backgroundColor,
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardActionArea component={to ? Link : "div"} to={to} onClick={onClick}>
        <CardContent>
          {icon && (
            <div style={{ color: icon.props.color }}>
              {React.cloneElement(icon, { style: { fontSize: 60 } })}
            </div>
          )}
          <Typography variant="h5" component="div" sx={{ mt: 2, color: textColor }}>
            {primaryText}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, color: textColor }}
          >
            {secondaryText}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PanelCard;
