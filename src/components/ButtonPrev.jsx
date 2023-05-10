import React from "react";
import { Button, Icon } from "semantic-ui-react";

export const ButtonPrev = ({ handlePrevPage }) => {
  return (
    <Button
      onClick={handlePrevPage}
      style={{ margin: "auto", marginTop: "20px" }}
    >
      <Icon name="angle double left" />
      Prev Page
    </Button>
  );
};
