function Dashboard() {
  const token = localStorage.getItem("token");

  return (
    <div>
      <h1>LexiBridge Dashboard</h1>

      <p>Welcome to LexiBridge.</p>

      {token ? <p>You are logged in.</p> : <p>You are not logged in.</p>}

      <h2>Documents</h2>

      <p>No documents uploaded yet.</p>

      <button
        onClick={() => {
          window.location.href = "/upload";
        }}
      >
        Upload Document
      </button>

      <button>Translation History</button>
    </div>
  );
}

export default Dashboard;
