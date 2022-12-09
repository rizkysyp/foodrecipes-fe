const Button = ({ title }) => {
  return (
    <button
      className={`btn`}
      style={{ backgroundColor: "#efc81a", color: "white", width: "150px" }}
    >
      {title}
    </button>
  );
};

export default Button;
