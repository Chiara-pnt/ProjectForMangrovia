import React from "react";
import { List, Header } from "semantic-ui-react";

export const SideList = ({ bookmarkedItems }) => {
  console.log(bookmarkedItems);
  return (
    <List
      style={{
        marginLeft: "25px",
        maxWidth: "200px",
        marginTop: "45px",
        minWidth: "200px",
      }}
    >
      <Header
        size="large"
        style={{ borderBottom: "1px solid lightGrey", paddingBottom: "20px" }}
      >
        Your Bookmarks
      </Header>
      <List.Item>
        {bookmarkedItems.map((item, index) => (
          <List.Header style={{ marginBottom: "20px" }}>
            <List.Item key={index}>
              <List.Header>- {item}</List.Header>
            </List.Item>
          </List.Header>
        ))}
      </List.Item>
    </List>
  );
};
