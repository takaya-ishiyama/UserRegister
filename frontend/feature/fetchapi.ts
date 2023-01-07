
const base_url = "http://localhost:8000";

export async function getServerSideProps() {
    const data = await fetch(`${base_url}/account/api/`);
    const users = data.json();
    return users;
  }