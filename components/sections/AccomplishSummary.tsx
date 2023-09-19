import React from "react";
import Markdown from "markdown-to-jsx";
import Card from "react-bootstrap/Card";
import classes from "../../styles/AccomplishSummary.module.css";

interface AccomplishSummaryProps {
  text: string;
}

function AccomplishSummary({ text }: AccomplishSummaryProps) {
  return (
    <div className={classes.container}>
      <Card className={classes.innercontainer}>
        <div className={classes.accomplishText}>
          <Markdown options={{ wrapper: React.Fragment }}>{text}</Markdown>
        </div>
      </Card>
    </div>
  );
}
export default AccomplishSummary;
