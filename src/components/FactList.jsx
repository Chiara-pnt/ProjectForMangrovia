import React, { useState } from "react";
import { useCatFacts } from "../lib/useCatFacts";
import { Card, Icon, Grid, Container, Button } from "semantic-ui-react";
import { SideList } from "./SideList";
import { Loader } from "./Loader";

export const FactList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedItems, setBookmarkedItems] = useState([]);

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
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  //goes back to previous pages
  const handlePrevPage = () => {
    if (hasPrevPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container style={{ display: "flex", flexDirection: "row" }}>
      {isLoading ? (
        <Loader />
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
                    height: "200px",
                    border: "1px solid lightGrey",
                    boxShadow: "3px 4px 5px lightGrey",
                  }}
                >
                  <Card.Content header={`#fact ${i.id}`} />
                  <Card.Content
                    description={i.fact}
                    style={{ overflow: "auto" }}
                  />
                  <Card.Content
                    extra
                    style={{ position: "relative", minHeight: "40px" }}
                  >
                    <Icon
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

            {hasPrevPage ? (
              <Button
                onClick={handlePrevPage}
                style={{ margin: "auto", marginTop: "20px" }}
              >
                <Icon name="angle double left" />
                Prev Page
              </Button>
            ) : (
              ""
            )}
            {hasNextPage ? (
              <Button
                onClick={handleNextPage}
                style={{ margin: "auto", marginTop: "20px" }}
              >
                Next Page
                <Icon
                  name="angle double right"
                  style={{ marginLeft: "10px" }}
                />
              </Button>
            ) : (
              ""
            )}
          </Grid>
        </Container>
      )}
      <SideList bookmarkedItems={bookmarkedItems} />
    </Container>
  );
};
