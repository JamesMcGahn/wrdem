import React from "react";
import Markdown from "markdown-to-jsx";
import classes from "../../styles/VoteCall2Action.module.css";
import { VoteCall2ActionSection } from "../../interfaces/ContentDataProps";

interface VoteCall2ActionProps {
  fields: VoteCall2ActionSection;
}

function VoteCall2Action({ fields }: VoteCall2ActionProps) {
  const { candidates, electorReelect, electiondateday } = fields;

  return (
    <div className={classes.container}>
      <div className={classes.innercontainer}>
        <div className={classes.electOrReelect}>{electorReelect}</div>

        <div className={classes.centerDiv}>
          <div className={classes.candidates}>
            <Markdown options={{ wrapper: React.Fragment }}>
              {candidates}
            </Markdown>
          </div>
          <div className={classes.dateBox}>
            <span className={classes.highlight}>VOTE</span>
            <span className={classes.highlight}>Democratic</span>
            <span>Tuesday</span>
            <span>{electiondateday}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default VoteCall2Action;
