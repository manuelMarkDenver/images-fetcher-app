const FallBackPage = ({ error, resetErrorBoundary }) => {
  console.log("🚀 ~ FallBackPage ~ error:", error);
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <p style={{ color: "red" }}>{error}</p>
    </div>
  );
};

export default FallBackPage;
