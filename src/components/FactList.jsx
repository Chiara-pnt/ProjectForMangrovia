import React, { useState } from "react";
import { useCatFacts } from "../lib/useCatFacts";
import { Card, Icon, Grid, Container } from "semantic-ui-react";
import { SideList } from "./SideList";
import { Loader } from "./Loader";
import { ButtonPrev } from "./ButtonPrev";
import { ButtonNext } from "./ButtonNext";

export const FactList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedItems, setBookmarkedItems] = useState([]);

  //custom hook destructured and called
  const { list, isLoading, hasNextPage, hasPrevPage } =
    useCatFacts(currentPage);

  //Receives id from caller method and stores id and fact data in the state
  //deals the bookmark selection and deselection
  const handleClick = (id) => {
    const item = list.find((item) => item.id === id);
    if (item) {
      if (bookmarkedItems.includes(item.fact)) {
        setBookmarkedItems(
          bookmarkedItems.filter((fact) => fact !== item.fact)
        );
      } else {
        setBookmarkedItems([...bookmarkedItems, item.fact]);
      }
    }
  };

  //loads next pages
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  //goes back to previous pages
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <Container style={{ display: "flex", flexDirection: "row" }}>
      {isLoading ? (
        <Container style={{ minWidth: "80%" }}>
          <Loader />
        </Container>
      ) : (
        <Container>
          <Grid
            relaxed
            columns={3}
            style={{ marginTop: "30px", marginBottom: "50px" }}
          >
            {list.map((i) => (
              <Grid.Column key={i.id}>
                <Card
                  style={{
                    height: "230px",
                    border: "1px solid lightGrey",
                    boxShadow: "3px 4px 5px lightGrey",
                  }}
                >
                  <Card.Content header={`#fact ${i.id}`} />
                  <Card.Content
                    description={i.fact}
                    style={{ overflow: "auto" }}
                  />
                  <Card.Content extra style={{ height: "50px" }}>
                    <Icon
                      style={{
                        position: "relative",
                      }}
                      name={
                        bookmarkedItems.includes(i.fact)
                          ? "bookmark"
                          : "bookmark outline"
                      }
                      onClick={() => handleClick(i.id)}
                    />
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}

            {hasPrevPage && <ButtonPrev handlePrevPage={handlePrevPage} />}

            {hasNextPage && <ButtonNext handleNextPage={handleNextPage} />}
          </Grid>
        </Container>
      )}
      <SideList bookmarkedItems={bookmarkedItems} />
    </Container>
  );
};
