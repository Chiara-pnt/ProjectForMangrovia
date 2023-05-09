import React, { useState } from "react";
import { useCatFacts } from "../lib/useCatFacts";
import { Card, Icon, Grid, Container, Button } from "semantic-ui-react";
import { SideList } from "./SideList";

export const FactList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedItems, setBookmarkedItems] = useState([]);

  const { list, isLoading, hasNextPage, hasPrevPage } =
    useCatFacts(currentPage);

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

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (hasPrevPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container style={{ display: "flex", flexDirection: "row" }}>
      {isLoading ? (
        "Loading"
      ) : (
        <Container>
          <Grid
            relaxed
            columns={3}
            style={{ marginTop: "30px", marginBottom: "50px" }}
          >
            {list.map((i) => (
              <Grid.Column key={i.id}>
                <Card style={{ height: 200 }}>
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
