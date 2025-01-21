import { Link } from "react-router-dom";

const Card = ({ blogData }) => {
  return (
    <div>
      <h3>{blogData.title}</h3>
      <p>{blogData.created_at}</p>
      <Link to={`post/${blogData.id}`}>Read blog</Link>
    </div>
  );
};

export default Card;
