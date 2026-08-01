import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">

      <h2 className="text-xl font-semibold">
        Trading Journal
      </h2>

      <div className="flex items-center gap-4">

        <span className="text-sm">
          {user?.fullName}
        </span>

        <button
          onClick={logout}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default Navbar;