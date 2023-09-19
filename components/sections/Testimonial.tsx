import React from 'react';
import Markdown from 'markdown-to-jsx';
import Card from 'react-bootstrap/Card';
import classes from '../../styles/Testimonial.module.css';

interface TestimonialProps {
  quote: string;
  author?: string;
}

function Testimonial({ quote, author }: TestimonialProps) {
  return (
    <div className={classes.container}>
      <div className={classes.innercontainer}>
        <Card>
          <div className={classes.quoteblock}>
            <p className={classes.quoteSym}>“</p>
            <div className={classes.quote}>
              <Markdown options={{ wrapper: React.Fragment }}>{quote}</Markdown>
            </div>
            <p className={classes.quoteSym}>”</p>
            <p className={classes.author}>- {author}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Testimonial;
