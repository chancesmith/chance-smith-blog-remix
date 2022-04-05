import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto mt-16 max-w-7xl text-center">
          <Link to="/posts" className="text-xl text-blue-600 underline">
            Blog Posts
          </Link>
        </div>
      </div>
    </main>
  );
}
