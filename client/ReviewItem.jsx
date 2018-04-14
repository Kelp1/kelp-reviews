import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import VoteButton from './VoteButton.jsx';

const ReviewItem = props => (
  <li className="review-wrapper">
    <div className="review-content">
      <img src={props.review.stars} alt="" /> &nbsp; {props.review.date}
      <br /><br />
      {props.review.text.map(line => <Line line={line} />)}
    </div>
    <div className="review-footer clearfix">
      <div className="rateReview voting-feedback">
        <p className="voting-intro voting prompt">
          1 person voted for this review
        </p>
        <ul>
          <VoteButton title="useful" imageUrl="./useful.png" count={props.review.useful} />&nbsp;
          <VoteButton title="funny" imageUrl="./funny.png" count={props.review.funny} />&nbsp;
          <VoteButton title="cool" imageUrl="./cool.png" count={props.review.cool} />
        </ul>
      </div>
    </div>
    <br /><br />
  </li>
);

const Line = props => (
  <p>
    {props.line}
  </p>
);

export default ReviewItem;
