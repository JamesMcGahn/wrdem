import React from "react";
import Markdown from "markdown-to-jsx";
import Card from "react-bootstrap/Card";
import classes from "../../styles/MessageBanner.module.css";

interface MessageBannerProps {
  title: string;
  body: string;
}

function MessageBanner({ title, body }: MessageBannerProps) {
  return (
    <div className={classes.container}>
      <div className={classes.innercontainer}>
        <Card className={classes.card}>
          <div className={classes.cardText}>
            <h1 className={classes.title}>{title}</h1>
            <div className={classes.body}>
              <Markdown options={{ wrapper: React.Fragment }}>{body}</Markdown>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default MessageBanner;
