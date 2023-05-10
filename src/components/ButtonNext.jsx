import React from "react";
import { Button, Icon } from "semantic-ui-react";

export const ButtonNext = ({ handleNextPage }) => {
  return (
    <Button
      onClick={handleNextPage}
      style={{ margin: "auto", marginTop: "20px" }}
    >
      Next Page
      <Icon name="angle double right" style={{ marginLeft: "10px" }} />
    </Button>
  );
};
